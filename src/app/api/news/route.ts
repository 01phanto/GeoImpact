import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'geopolitics';
    const country = searchParams.get('country') || 'in';
    const category = searchParams.get('category') || 'general';
    
    // Get API key from environment variable
    const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    
    if (!NEWS_API_KEY) {
      return NextResponse.json(
        { error: 'News API key is not configured' },
        { status: 500 }
      );
    }
    
    // Try multiple endpoints for comprehensive news coverage
    const endpoints = [
      // India-specific geopolitical news
      `https://newsapi.org/v2/top-headlines?country=${country}&q=${query}&apiKey=${NEWS_API_KEY}`,
      // Global geopolitical news
      `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`,
      // World news with geopolitical focus
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=15&apiKey=${NEWS_API_KEY}`,
    ];
    
    let allArticles: any[] = [];
    
    // Fetch from multiple endpoints
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'User-Agent': 'GeoImpact/1.0',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.articles) {
            allArticles = [...allArticles, ...data.articles];
          }
        }
      } catch (error) {
        console.log(`Failed to fetch from ${endpoint}:`, error);
      }
    }
    
    // Remove duplicates and filter quality articles
    const uniqueArticles = allArticles.filter((article, index, self) => 
      article.title && 
      article.url && 
      index === self.findIndex(a => a.title === article.title)
    );
    
    interface NewsArticleRaw {
      title?: string;
      description?: string;
      content?: string;
      url?: string;
      source?: { name?: string };
      publishedAt?: string;
      urlToImage?: string;
    }
    
    // Enhance descriptions for better quality
    const enhancedArticles = uniqueArticles.map((article: NewsArticleRaw, index: number) => {
      let enhancedDescription = article.description || article.content || '';
      
      // If description is too short or missing, create a better one
      if (!enhancedDescription || enhancedDescription.length < 50) {
        const title = article.title || '';
        
        // Create contextual descriptions based on keywords
        if (title.toLowerCase().includes('china') || title.toLowerCase().includes('chinese')) {
          enhancedDescription = `Recent developments in India-China relations highlight ongoing diplomatic efforts and strategic considerations in the region. This development could have significant implications for regional stability and bilateral cooperation.`;
        } else if (title.toLowerCase().includes('usa') || title.toLowerCase().includes('america') || title.toLowerCase().includes('united states')) {
          enhancedDescription = `Strategic developments in India-US partnership continue to evolve, reflecting the deepening cooperation between the two nations in various sectors including defense, technology, and regional security.`;
        } else if (title.toLowerCase().includes('economic') || title.toLowerCase().includes('trade')) {
          enhancedDescription = `Economic developments affecting India's international trade relations and domestic economic policies. These changes could impact India's position in the global economic landscape.`;
        } else if (title.toLowerCase().includes('security') || title.toLowerCase().includes('defense')) {
          enhancedDescription = `Security-related developments that could influence India's defense posture and regional security dynamics. These updates are crucial for understanding India's strategic position.`;
        } else if (title.toLowerCase().includes('diplomatic') || title.toLowerCase().includes('foreign')) {
          enhancedDescription = `Diplomatic developments involving India's foreign policy and international relations. These updates provide insights into India's global engagement and strategic partnerships.`;
        } else {
          enhancedDescription = `Important geopolitical development that could have significant implications for India's international relations, economic policies, and strategic positioning in the global arena.`;
        }
      }
      
      return {
        ...article,
        id: `article-${index}`,
        title: article.title || 'Breaking News',
        description: enhancedDescription,
        content: article.content || enhancedDescription,
        url: article.url || '#',
        source: {
          name: article.source?.name || 'International News'
        },
        publishedAt: article.publishedAt || new Date().toISOString(),
        urlToImage: article.urlToImage || null,
      };
    });
    
    // Sort by publication date (most recent first)
    enhancedArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Limit to top 20 articles
    const finalArticles = enhancedArticles.slice(0, 20);
    
    return NextResponse.json({
      articles: finalArticles,
      totalResults: finalArticles.length,
      message: `Found ${finalArticles.length} recent geopolitical news articles`
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch news',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
