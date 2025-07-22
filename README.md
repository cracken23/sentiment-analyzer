# Sentiment Analyzer

This is a simple web application for analyzing the sentiment of text using the Google Cloud Natural Language API. It's built with Next.js and styled with Tailwind CSS.

## Features

*   Enter text into a form to analyze its sentiment.
*   Displays the sentiment as Positive, Negative, or Neutral.
*   Provides the sentiment score and magnitude.
*   Simple, clean, and responsive user interface.
*   Includes a dark mode theme.

## Project Flow

The application follows this data flow:

1.  **`app/page.tsx`**: The main page that renders the `InputForm` component.
2.  **`components/InputForm.tsx`**: Users enter text into a form. On submission, it sends a POST request to the backend API.
3.  **`app/api/analyze/route.ts`**: The API route receives the text, calls the Google Cloud Natural Language API for sentiment analysis, and returns the result.
4.  **`components/InputForm.tsx`**: The form component receives the API response and stores it in its state.
5.  **`components/Results.tsx`**: This component receives the analysis results as props from `InputForm.tsx` and displays them to the user.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need the following software installed on your machine:

*   [Node.js](https://nodejs.org/) (which includes npm)
*   A Google Cloud Platform account with the Natural Language API enabled.
*   An API key for the Google Cloud Natural Language API.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/sentiment-analyzer.git
    cd sentiment-analyzer
    ```

2.  **Install the dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your environment variables:**

    Create a file named `.env.local` in the root of your project and add your Google Cloud API key like this:

    ```
    GOOGLE_API_KEY=your_api_key_here
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

The application uses a single API endpoint to handle sentiment analysis requests.

*   **`POST /api/analyze`**

    This endpoint accepts a JSON payload with a `text` field and returns the sentiment analysis results.

    **Request Body:**

    ```json
    {
      "text": "This is a wonderful day!"
    }
    ```

    **Success Response:**

    ```json
    {
      "sentiment": "Positive",
      "score": 0.8,
      "magnitude": 0.8
    }
    ```

    **Error Response:**

    ```json
    {
      "error": "Text is required"
    }
    ```

## Built With

*   [Next.js](https://nextjs.org/) - The React framework for production.
*   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
*   [Google Cloud Natural Language API](https://cloud.google.com/natural-language) - For sentiment analysis.
*   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript.