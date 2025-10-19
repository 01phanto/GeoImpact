export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
  urlToImage?: string;
}

export interface AnalysisResult {
  summary: string;
  geopoliticalContext: string;
  impactForIndia: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keyTakeaways?: string[];
  timeline?: string;
}
