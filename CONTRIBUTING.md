# Contributing to GeoImpact

Thank you for your interest in contributing to GeoImpact! 

## Getting Started

### Prerequisites
- Node.js 18+ or Node.js 20+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/01phanto/GeoImpact.git
   cd GeoImpact
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GOOGLE_API_KEY=your_google_gemini_api_key
   NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
   ```
   
   Get your API keys:
   - Google Gemini AI: https://ai.google.dev/
   - NewsAPI: https://newsapi.org/register

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes for news and AI analysis
│   ├── analysis/      # Dynamic analysis pages
│   ├── globals.css    # Global styles with dark mode
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page with news feed
├── components/
│   ├── ui/            # Reusable UI components (shadcn/ui)
│   ├── Navbar.tsx     # Navigation bar
│   └── NewsCard.tsx   # News article cards
├── lib/
│   └── utils.ts       # Utility functions
└── types/
    └── index.ts       # TypeScript type definitions
```

## Available Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui with Radix UI
- **AI:** Google Gemini 2.0 Flash
- **News API:** NewsAPI
- **Icons:** Lucide React

## Contributing Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Code Style

- Follow TypeScript best practices
- Use ESLint for code linting
- Write clean, readable code
- Add comments for complex logic

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue on GitHub.
