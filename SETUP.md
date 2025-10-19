# GeoImpact Environment Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
GOOGLE_API_KEY=AIzaSyBhZp4QBZwYqjiicc9hKhjZP2Lcu5D_vys
NEXT_PUBLIC_NEWS_API_KEY=ded83fb2081045cd9124fb45d2d1c896
```

## API Keys Already Configured

The application is already configured with the provided API keys:
- **Google API Key**: For Gemini AI analysis
- **News API Key**: For fetching geopolitical news

## Running the Application

1. Install dependencies: `npm install`
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
