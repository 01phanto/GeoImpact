'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft, Share2, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '@/types';

const SENTIMENT_COLORS = {
  positive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  negative: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articleData, setArticleData] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract article data from URL parameters
    const article = {
      title: searchParams.get('title') || '',
      description: searchParams.get('description') || '',
      content: searchParams.get('content') || '',
      url: searchParams.get('url') || '',
      source: searchParams.get('source') || '',
      publishedAt: searchParams.get('publishedAt') || '',
    };
    
    setArticleData(article);
    
    // Analyze the article
    analyzeArticle(article);
  }, [searchParams]);

  const analyzeArticle = async (article: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: article.title,
          content: article.content || article.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze article');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze article');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shareAnalysis = async () => {
    if (navigator.share && analysis) {
      try {
        await navigator.share({
          title: `GeoImpact Analysis: ${articleData?.title}`,
          text: `Summary: ${analysis.summary}\n\nImpact for India: ${analysis.impactForIndia}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      const text = `GeoImpact Analysis: ${articleData?.title}\n\nSummary: ${analysis?.summary}\n\nImpact for India: ${analysis?.impactForIndia}`;
      navigator.clipboard.writeText(text);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Spinner className="h-8 w-8 mx-auto" />
            <div className="space-y-2">
              <p className="text-muted-foreground font-medium">Generating Comprehensive Analysis</p>
              <p className="text-sm text-muted-foreground">Creating detailed 500-word report on India's impact...</p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Analysis Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <div className="flex gap-2">
              <Button onClick={() => analyzeArticle(articleData)}>
                Try Again
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Button>
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{articleData?.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(articleData?.publishedAt)}
              </div>
              <Badge variant="secondary">{articleData?.source}</Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={shareAnalysis}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.open(articleData?.url, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Summary and Context Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📝 Summary
                  <Badge className={SENTIMENT_COLORS[analysis.sentiment]}>
                    {analysis.sentiment}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
              </CardContent>
            </Card>

            {/* Geopolitical Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌍 Geopolitical Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{analysis.geopoliticalContext}</p>
              </CardContent>
            </Card>
          </div>

          {/* Key Takeaways */}
          {analysis.keyTakeaways && analysis.keyTakeaways.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Key Takeaways for India
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-bold">{index + 1}.</span>
                      <span className="text-muted-foreground">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          {analysis.timeline && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⏰ Expected Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-sm">
                  {analysis.timeline}
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Impact for India - Full Width */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🇮🇳 Comprehensive Impact Analysis for India
              </CardTitle>
              <CardDescription>
                Detailed 500-word analysis covering economic, diplomatic, and security implications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {analysis.impactForIndia}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Original Article */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Original Article</CardTitle>
          <CardDescription>Source content for reference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">{articleData?.description}</p>
            <Button 
              variant="outline" 
              onClick={() => window.open(articleData?.url, '_blank')}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Read Full Article
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
