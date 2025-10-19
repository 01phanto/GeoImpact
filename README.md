# GeoImpact - How Geopolitics Impact India

A modern Next.js 15 application that provides AI-powered analysis of geopolitical news and its impact on India. Built with TypeScript, Tailwind CSS v4, and shadcn/ui components.

## 🌟 Features

### Core Features
- **📰 News Feed**: Real-time geopolitical news from multiple sources via NewsAPI
- **🤖 AI Analysis**: Powered by Google's Gemini 2.0 Flash for 500-word comprehensive reports
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS v4
- **🌙 Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **🎯 Smart Filtering**: 8 filter categories including real-time latest updates (24h)
- **🔄 Fallback System**: Graceful degradation with sample data when API is unavailable

### Analysis Features
- **📊 Sentiment Analysis**: AI determines positive/negative/neutral impact for India
- **🌍 Geopolitical Context**: Detailed 100-150 word explanation of global context
- **🇮🇳 India Impact**: 500-word comprehensive analysis covering:
  - Economic implications (trade, investment, supply chains, markets)
  - Diplomatic and foreign policy implications
  - Security and defense implications
  - Long-term strategic positioning
  - Opportunities and challenges
  - Recommended response strategies
- **🎯 Key Takeaways**: Bullet-point summary of critical insights
- **⏱️ Timeline**: Expected timeframe for impact (immediate/short/medium/long-term)
- **📤 Sharing**: Share analysis results with others
- **💾 Save Analysis**: Bookmark important insights for future reference

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Node.js 20+ (recommended)
- npm, yarn, or pnpm
- NewsAPI key (get free at [newsapi.org](https://newsapi.org))
- Google Gemini API key (get free at [ai.google.dev](https://ai.google.dev))

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env.local` file in the root directory:
   ```bash
   GOOGLE_API_KEY=your_google_gemini_api_key
   NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
   ```
   
   Or use the pre-configured API keys in the code (not recommended for production).

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/analyze/          # Gemini AI analysis endpoint
│   ├── analysis/[id]/        # Dynamic analysis pages
│   ├── globals.css           # Global styles with dark mode
│   ├── layout.tsx            # Root layout with navbar
│   └── page.tsx              # Landing page with news feed
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── Navbar.tsx            # Navigation with dark mode toggle
│   └── NewsCard.tsx          # News article cards
├── lib/
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts              # TypeScript type definitions
```

## 🔧 API Integration

### NewsAPI Integration
- **Multiple Endpoints**: Fetches from 3 different NewsAPI endpoints for comprehensive coverage
  - India-specific top headlines
  - Global geopolitical news (everything endpoint)
  - Category-based world news
- **Features**: 
  - Real-time news fetching with deduplication
  - Enhanced descriptions for better context
  - Automatic fallback data for API unavailability
  - Smart content enhancement based on keywords
  - Sorting by publication date (most recent first)
  - Quality filtering (removes articles without title/URL)
  - Limit to top 20 most relevant articles
- **Error Handling**: Retry mechanism and graceful degradation

### Gemini AI Integration
- **Model**: `gemini-2.0-flash` (Google's latest fast AI model)
- **Analysis**: 500-word comprehensive report covering:
  - Summary and geopolitical context
  - Economic, diplomatic, and security implications for India
  - Sentiment analysis and key takeaways
  - Timeline for impact materialization
- **API Route**: `/api/analyze`

## 🎨 UI Components

Built with **shadcn/ui** components:
- **Cards**: For news articles and analysis results
- **Buttons**: Interactive elements with variants
- **Badges**: Source names and sentiment indicators
- **Spinners**: Loading states
- **Responsive Grid**: Mobile-first layout

## 🌙 Dark Mode

- **Automatic Detection**: Respects system preference
- **Manual Toggle**: Navbar toggle button
- **Persistent**: Saves preference in localStorage
- **Smooth Transitions**: CSS transitions for theme changes

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm, md, lg, xl responsive grid
- **Touch Friendly**: Large touch targets
- **Readable Typography**: Optimized font sizes

## 🔍 Filtering System

Filter news by topics:
- **All News**: Complete feed
- **India-China**: Bilateral relations and border developments
- **India-USA**: Strategic partnership and defense cooperation
- **Global Conflicts**: International tensions and their India impact
- **Economic**: Trade, investment, and economic implications
- **Security & Defense**: Military and strategic developments
- **Diplomatic**: Foreign policy and international relations
- **Latest Updates**: News from the last 24 hours

## 🚀 Deployment

### Environment Variables
Before deploying, ensure you set up the following environment variables:
```
GOOGLE_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
```

**Security Note**: The demo includes hardcoded API keys for quick setup. For production deployments, always use environment variables and never commit API keys to version control.

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Static site generation with environment variables
- **Railway**: Full-stack deployment with secrets management
- **AWS**: EC2 or Lambda deployment with AWS Secrets Manager

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui with Radix UI
- **AI**: Google Gemini 2.0 Flash
- **News**: NewsAPI
- **Icons**: Lucide React

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue on GitHub.

---

**Built with ❤️ for understanding geopolitics and its impact on India**