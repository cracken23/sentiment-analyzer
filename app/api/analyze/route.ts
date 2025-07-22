import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Extract text from the incoming request
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // 2. Get the API Key from environment variables
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_API_KEY is not set in .env.local");
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
    }

    // 3. Construct the API request payload
    const apiRequestPayload = {
      document: {
        content: text,
        type: 'PLAIN_TEXT',
      },
      encodingType: 'UTF8',
    };

    // 4. Make the request to the Google Cloud Natural Language API
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

    // 5. Extract and return the sentiment analysis results
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