'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle, RefreshCw, Filter, Clock } from 'lucide-react';
import { NewsArticle } from '@/types';
import NewsCard from '@/components/NewsCard';

const FILTERS = [
  { id: 'all', label: 'All News' },
  { id: 'india-china', label: 'India-China' },
  { id: 'india-usa', label: 'India-USA' },
  { id: 'global-conflicts', label: 'Global Conflicts' },
  { id: 'economic', label: 'Economic' },
  { id: 'security', label: 'Security & Defense' },
  { id: 'diplomatic', label: 'Diplomatic' },
  { id: 'latest', label: 'Latest Updates' },
];

export default function HomePage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const router = useRouter();

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/news?country=in&q=geopolitics');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to fetch news');
      }
      
      const data = await response.json();
      
      // If no articles returned, use fallback data
      if (!data.articles || data.articles.length === 0) {
        const fallbackArticles = [
          {
            id: 'fallback-1',
            title: 'India-China Border Tensions Continue Amid Diplomatic Talks',
            description: 'Recent developments in the India-China border region highlight ongoing diplomatic efforts to maintain peace and stability.',
            content: 'Diplomatic channels remain open between India and China as both nations work towards resolving border disputes through peaceful dialogue.',
            url: 'https://example.com/news1',
            source: { name: 'Geopolitical News' },
            publishedAt: new Date().toISOString(),
          },
          {
            id: 'fallback-2',
            title: 'India-US Strategic Partnership Strengthens in Indo-Pacific',
            description: 'The United States and India continue to deepen their strategic partnership in the Indo-Pacific region.',
            content: 'Both nations are working together to ensure regional stability and counter emerging security challenges.',
            url: 'https://example.com/news2',
            source: { name: 'Strategic Affairs' },
            publishedAt: new Date().toISOString(),
          },
          {
            id: 'fallback-3',
            title: 'Global Economic Shifts Impact India\'s Trade Relations',
            description: 'Changing global economic dynamics are reshaping India\'s international trade partnerships.',
            content: 'India is adapting to new economic realities while maintaining its position as a key global player.',
            url: 'https://example.com/news3',
            source: { name: 'Economic Times' },
            publishedAt: new Date().toISOString(),
          }
        ];
        setArticles(fallbackArticles);
      } else {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error('News fetch error:', err);
      // Use fallback data on error
      const fallbackArticles = [
        {
          id: 'fallback-1',
          title: 'India-China Border Tensions Continue Amid Diplomatic Talks',
          description: 'Recent developments in the India-China border region highlight ongoing diplomatic efforts to maintain peace and stability.',
          content: 'Diplomatic channels remain open between India and China as both nations work towards resolving border disputes through peaceful dialogue.',
          url: 'https://example.com/news1',
          source: { name: 'Geopolitical News' },
          publishedAt: new Date().toISOString(),
        },
        {
          id: 'fallback-2',
          title: 'India-US Strategic Partnership Strengthens in Indo-Pacific',
          description: 'The United States and India continue to deepen their strategic partnership in the Indo-Pacific region.',
          content: 'Both nations are working together to ensure regional stability and counter emerging security challenges.',
          url: 'https://example.com/news2',
          source: { name: 'Strategic Affairs' },
          publishedAt: new Date().toISOString(),
        },
        {
          id: 'fallback-3',
          title: 'Global Economic Shifts Impact India\'s Trade Relations',
          description: 'Changing global economic dynamics are reshaping India\'s international trade partnerships.',
          content: 'India is adapting to new economic realities while maintaining its position as a key global player.',
          url: 'https://example.com/news3',
          source: { name: 'Economic Times' },
          publishedAt: new Date().toISOString(),
        }
      ];
      setArticles(fallbackArticles);
      setError('Using sample data - NewsAPI may be temporarily unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleReadMore = (article: NewsArticle) => {
    // Navigate to analysis page with article data
    const params = new URLSearchParams({
      title: article.title,
      description: article.description || '',
      content: article.content || '',
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
    });
    
    router.push(`/analysis/${article.id}?${params.toString()}`);
  };

  const filteredArticles = articles.filter(article => {
    if (activeFilter === 'all') return true;
    
    const title = article.title.toLowerCase();
    const description = article.description?.toLowerCase() || '';
    const content = article.content?.toLowerCase() || '';
    const text = `${title} ${description} ${content}`;
    
    switch (activeFilter) {
      case 'india-china':
        return text.includes('china') || text.includes('chinese');
      case 'india-usa':
        return text.includes('usa') || text.includes('america') || text.includes('united states');
      case 'global-conflicts':
        return text.includes('conflict') || text.includes('war') || text.includes('tension') || text.includes('crisis');
      case 'economic':
        return text.includes('economic') || text.includes('trade') || text.includes('economy') || text.includes('financial');
      case 'security':
        return text.includes('security') || text.includes('defense') || text.includes('military') || text.includes('strategic');
      case 'diplomatic':
        return text.includes('diplomatic') || text.includes('foreign') || text.includes('relations') || text.includes('partnership');
      case 'latest':
        // Show articles from last 24 hours
        const articleDate = new Date(article.publishedAt);
        const now = new Date();
        const hoursDiff = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60);
        return hoursDiff <= 24;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Spinner className="h-8 w-8 mx-auto" />
            <p className="text-muted-foreground">Loading geopolitical news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Error Loading News
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={fetchNews} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Warning Banner */}
      {error && (
        <div className="mb-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchNews}
                className="ml-auto"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Global Geopolitical News Feed
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Stay informed about the latest global geopolitical developments and their impact on India&apos;s economy, diplomacy, and security. 
          Get AI-powered analysis of breaking news from around the world.
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Updated in real-time
          </span>
          <span className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            {articles.length} articles available
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filter by topic:</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh News
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onReadMore={handleReadMore}
          />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}