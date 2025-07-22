import { NextRequest, NextResponse } from "next/server";

// In-memory store for rate limiting
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

export async function POST(request: NextRequest) {
  // 1. Get the user's IP address
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || '127.0.0.1';
  const now = Date.now();

  // 2. Check and update the request count for the IP
  const record = ipRequestCounts.get(ip);

  if (record && now - record.timestamp < RATE_LIMIT_WINDOW_MS) {
    if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    }
    ipRequestCounts.set(ip, { count: record.count + 1, timestamp: record.timestamp });
  } else {
    // Start a new window for this IP
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
  }

  // Clean up old records to prevent memory leaks
  for (const [key, value] of ipRequestCounts.entries()) {
      if (now - value.timestamp > RATE_LIMIT_WINDOW_MS) {
          ipRequestCounts.delete(key);
      }
  }

  try {
    // 3. Extract text from the incoming request
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // 4. Get the API Key from environment variables
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_API_KEY is not set in .env.local");
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
    }

    // 5. Construct the API request payload
    const apiRequestPayload = {
      document: {
        content: text,
        type: 'PLAIN_TEXT',
      },
      encodingType: 'UTF8',
    };

    // 6. Make the request to the Google Cloud Natural Language API
    const response = await fetch(
      `https://language.googleapis.com/v2/documents:analyzeSentiment?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestPayload),
      }
    );

    if (!response.ok) {
      // If the API returns an error, forward it
      const errorBody = await response.json();
      console.error("Google NLP API Error:", errorBody);
      return NextResponse.json({ error: errorBody.error.message || 'Failed to analyze sentiment' }, { status: response.status });
    }

    const data = await response.json();

    // 7. Extract and return the sentiment analysis results
    const sentiment = data.documentSentiment;

    // A simple interpretation of the results
    let sentimentLabel = "Neutral";
    if (sentiment.score > 0.25) {
        sentimentLabel = "Positive";
    } else if (sentiment.score < -0.25) {
        sentimentLabel = "Negative";
    }

    const analysis = {
      sentiment: sentimentLabel,
      score: sentiment.score, // from -1.0 to 1.0
      magnitude: sentiment.magnitude, // from 0.0 to +inf
    };

    return NextResponse.json(analysis);

  } catch (error) {
    console.error("Error in analyze route:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
