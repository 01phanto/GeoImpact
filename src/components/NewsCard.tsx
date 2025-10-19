'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Clock } from 'lucide-react';
import { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  onReadMore: (article: NewsArticle) => void;
}

export default function NewsCard({ article, onReadMore }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getTimeBadgeColor = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (diffInHours < 6) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (diffInHours < 24) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="shrink-0 text-xs">
            {article.source.name}
          </Badge>
          <Badge className={`text-xs ${getTimeBadgeColor(article.publishedAt)}`}>
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(article.publishedAt)}
          </Badge>
        </div>
        
        <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {article.description}
        </CardDescription>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => onReadMore(article)}
            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            Analyze with AI
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => window.open(article.url, '_blank')}
            className="group-hover:border-primary group-hover:text-primary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
