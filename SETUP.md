# GeoImpact Environment Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
GOOGLE_API_KEY=your_google_gemini_api_key_here
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
```

## Getting API Keys

### Google Gemini API Key
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key" → "Create API Key"
4. Copy your API key

### NewsAPI Key
1. Visit [NewsAPI.org](https://newsapi.org/register)
2. Sign up for a free account
3. Verify your email
4. Copy your API key from the dashboard

## Running the Application

1. Install dependencies: `npm install`
2. Create `.env.local` with your API keys (see above)
3. Start development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)
2. Start the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

✅ **Landing Page**: News feed with India-related geopolitics news
✅ **Analysis Page**: AI-powered analysis using Gemini API
✅ **Responsive Design**: Mobile-friendly with Tailwind CSS
✅ **Dark Mode**: Toggle between light and dark themes
✅ **Filtering**: Filter news by topics (India-China, India-USA, etc.)
✅ **Sentiment Analysis**: AI determines impact sentiment
✅ **Sharing**: Share analysis results
✅ **Modern UI**: Built with shadcn/ui components
