import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Multiple news sources for comprehensive India geopolitical content
const NEWS_SOURCES = {
  // Primary API: NewsAPI (1000 requests/day free)
  newsapi: {
    url: 'https://newsapi.org/v2/everything',
    apiKey: 'e6e3334a36fc4ce3b63e879efc3800dd', // Get free key from newsapi.org
    params: {
      q: 'India AND (geopolitics OR China OR Pakistan OR border OR diplomacy OR trade war OR LAC OR Kashmir OR QUAD OR BRICS OR bilateral OR strategic OR security OR defense)',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 30,
      sources: 'the-times-of-india,the-hindu,reuters,bbc-news,cnn,al-jazeera-english,associated-press,the-wall-street-journal',
      from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Only last 24 hours
      to: new Date().toISOString()
    }
  },

  // Backup API: MediaStack (1000 requests/month free)
  mediastack: {
    url: 'http://api.mediastack.com/v1/news',
    apiKey: 'YOUR_MEDIASTACK_KEY', // Get free key from mediastack.com
    params: {
      keywords: 'India,geopolitics,China,Pakistan,border,diplomacy',
      languages: 'en',
      countries: 'in,us,cn,pk,gb',
      limit: 20,
      sort: 'published_desc'
    }
  },

  // Third option: Currents API (600 requests/day free)
  currents: {
    url: 'https://api.currentsapi.services/v1/search',
    apiKey: 'YOUR_CURRENTS_KEY', // Get free key from currentsapi.services
    params: {
      keywords: 'India geopolitics China Pakistan border diplomacy',
      language: 'en',
      region: 'IN,US,CN,PK,GB',
      limit: 20
    }
  },
  
  // Free RSS feeds (unlimited, no API key needed)
  rss: [
    // Major Indian News Sources
    'https://feeds.feedburner.com/ndtvnews-india-news',
    'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    'https://www.hindustantimes.com/feeds/rss/india-news/index.xml',
    'https://www.thehindu.com/news/national/feeder/default.rss',
    'https://indianexpress.com/section/india/feed/',
    
    // International Sources
    'https://feeds.reuters.com/reuters/INtopNews',
    'https://feeds.bbci.co.uk/news/world/asia/india/rss.xml',
    'https://rss.cnn.com/rss/edition.rss',
    
    // Specialized Geopolitical Sources
    'https://www.cfr.org/feeds/global-conflict-tracker',
    'https://www.fpri.org/feeds/',
    'https://www.stimson.org/feed/'
  ]
};

// Keywords that indicate geopolitical relevance to India (enhanced with more specific terms)
const GEOPOLITICAL_KEYWORDS = [
  // Primary neighbors and strategic rivals
  'china', 'pakistan', 'bangladesh', 'sri lanka', 'nepal', 'bhutan', 'maldives',
  
  // Border and territorial keywords
  'border', 'lac', 'line of actual control', 'kashmir', 'ladakh', 'arunachal pradesh', 
  'doklam', 'galwan', 'pangong tso', 'cease fire line', 'cfl',
  
  // Strategic partnerships and alliances
  'quad', 'brics', 'sco', 'asean', 'g20', 'g7', 'unsc', 'iaea',
  'bilateral', 'multilateral', 'strategic partnership',
  
  // Economic and trade terms
  'trade war', 'sanctions', 'tariff', 'supply chain', 'semiconductor', 'rare earth',
  'bri', 'belt and road', 'cpec', 'china pakistan economic corridor',
  
  // Security and defense
  'defense', 'military', 'navy', 'army', 'air force', 'missile', 'nuclear',
  'terrorism', 'cyber attack', 'security', 'intelligence', 'surveillance',
  
  // Diplomatic terms
  'diplomacy', 'foreign policy', 'summit', 'visit', 'embassy', 'consulate',
  'ambassador', 'foreign minister', 'prime minister meeting',
  
  // Energy and resources
  'energy security', 'oil', 'gas', 'pipeline', 'renewable energy', 'coal',
  'water dispute', 'river', 'dam', 'indus water treaty',
  
  // Technology and cyber
  'technology transfer', 'cyber warfare', 'data security', 'telecom', '5g',
  'artificial intelligence', 'space', 'satellite',
  
  // General geopolitical terms
  'geopolitics', 'international relations', 'sovereignty', 'territorial',
  'strategic', 'regional power', 'influence', 'alliance'
];

// Calculate relevance score for news articles (enhanced scoring)
const calculateRelevanceScore = (article) => {
  const text = `${article.title} ${article.description || ''}`.toLowerCase();
  let score = 0;
  
  // Check for high-priority geopolitical keywords
  const highPriorityKeywords = ['china', 'pakistan', 'lac', 'border', 'kashmir', 'quad', 'brics'];
  const mediumPriorityKeywords = ['diplomacy', 'trade war', 'sanctions', 'bilateral', 'security'];
  
  highPriorityKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      score += 3;
    }
  });
  
  mediumPriorityKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      score += 2;
    }
  });
  
  // Check other geopolitical keywords
  GEOPOLITICAL_KEYWORDS.forEach(keyword => {
    if (text.includes(keyword) && !highPriorityKeywords.includes(keyword) && !mediumPriorityKeywords.includes(keyword)) {
      score += 1;
    }
  });
  
  // Boost score significantly for very recent articles (within 6 hours)
  const hoursOld = (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60);
  if (hoursOld < 1) score += 4; // Very recent
  else if (hoursOld < 6) score += 3; // Recent
  else if (hoursOld < 12) score += 2; // Somewhat recent
  else if (hoursOld < 24) score += 1; // Today
  
  // Boost for reliable sources
  const reliableSources = ['reuters', 'bbc', 'the-hindu', 'times of india', 'economic times'];
  const sourceName = article.source?.name?.toLowerCase() || '';
  if (reliableSources.some(source => sourceName.includes(source))) {
    score += 1;
  }
  
  return score;
};

// Enhanced mock data with current geopolitical events affecting India (December 2025)
const MOCK_NEWS_DATA = [
  {
    title: "Breaking: India-China LAC Standoff Resolved After Emergency Military Talks",
    description: "After 72 hours of intense negotiations, Indian and Chinese military commanders reach breakthrough agreement on disengagement from friction points in Eastern Ladakh, marking significant de-escalation in border tensions.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1586967842399-e7fb9e00a79c?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    source: { name: "Reuters" },
    relevanceScore: 10,
    category: "Border Security",
    apiSource: "Demo",
    isBreaking: true
  },
  {
    title: "QUAD Leaders Summit 2025: India Announces New Defense Technology Sharing Initiative",
    description: "Prime Minister Modi unveils ambitious defense technology sharing framework with US, Japan, and Australia, focusing on AI-powered surveillance systems and quantum communication networks for Indo-Pacific security.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    source: { name: "The Hindu" },
    relevanceScore: 9,
    category: "Diplomacy",
    apiSource: "Demo",
    isBreaking: false
  },
  {
    title: "Pakistan Terror Module Busted: Cross-Border Drone Attack Plot Foiled by Indian Forces",
    description: "Intelligence agencies uncover Pakistan-backed terror plot involving weaponized drones targeting critical infrastructure in Punjab and J&K, leading to high-alert across border states.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    source: { name: "Times of India" },
    relevanceScore: 9,
    category: "Border Security",
    apiSource: "Demo",
    isBreaking: false
  },
  {
    title: "US-China Tech War Escalation: India Becomes Major Semiconductor Hub",
    description: "As US imposes new restrictions on Chinese chip manufacturers, India emerges as preferred alternative with three major semiconductor fabrication plants announced this week, backed by $12 billion in international investment.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    source: { name: "Economic Times" },
    relevanceScore: 8,
    category: "Economic Impact",
    apiSource: "Demo",
    isBreaking: false
  },
  {
    title: "Bangladesh Crisis: India Deploys Border Security Force Amid Political Unrest",
    description: "Following violent protests in Dhaka against interim government, India strengthens border security along West Bengal and Tripura frontiers, while maintaining diplomatic channels for stability.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    source: { name: "NDTV" },
    relevanceScore: 8,
    category: "Border Security",
    apiSource: "Demo",
    isBreaking: false
  },
  {
    title: "Russia-Ukraine War: India's Energy Diplomacy Balances Western Pressure and Domestic Needs",
    description: "External Affairs Minister S. Jaishankar defends India's continued energy imports from Russia during G7 meeting, emphasizing developing nation's right to affordable energy while supporting peace initiatives.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    source: { name: "Indian Express" },
    relevanceScore: 7,
    category: "Energy Security",
    apiSource: "Demo",
    isBreaking: false
  },
  {
    title: "Maldives Diplomatic Reset: President Muizzu Seeks to Repair Ties with India",
    description: "In significant policy shift, Maldivian President announces withdrawal of 'India Out' campaign and proposes new framework for bilateral cooperation including defense and maritime security partnerships.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    source: { name: "Hindustan Times" },
    relevanceScore: 7,
    category: "Diplomacy",
    apiSource: "Demo",
    isBreaking: false
  },
  {
    title: "Chinese Cyber Attack on Indian Power Grid Thwarted by National Cyber Security Agency",
    description: "Sophisticated state-sponsored cyber attack targeting India's critical power infrastructure successfully neutralized, revealing new patterns of digital warfare tactics from across the border.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 hours ago
    source: { name: "Business Standard" },
    relevanceScore: 8,
    category: "Cyber Security",
    apiSource: "Demo",
    isBreaking: false
  }
];

export const useRealTimeNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const fetchNewsFromAPI = async () => {
    const allArticles = [];
    
    // Note: NewsAPI has CORS restrictions for client-side calls
    // For production, you'd need a backend proxy or server-side implementation
    
    // Try NewsAPI first (best quality) - will likely fail due to CORS
    try {
      const { newsapi } = NEWS_SOURCES;
      
      if (newsapi.apiKey && newsapi.apiKey !== 'YOUR_NEWSAPI_KEY') {
        console.log('Attempting NewsAPI request...');
        const response = await axios.get(newsapi.url, {
          params: {
            ...newsapi.params,
            apiKey: newsapi.apiKey
          }
        });

        console.log('NewsAPI response status:', response.status);
        console.log('NewsAPI response data status:', response.data?.status);

        if (response.data.status === 'ok' && response.data.articles) {
          const articles = response.data.articles.map(article => ({
            ...article,
            source: { name: article.source.name || 'NewsAPI' },
            apiSource: 'NewsAPI'
          }));
          allArticles.push(...articles);
          console.log('NewsAPI returned', articles.length, 'articles');
        }
      } else {
        console.log('NewsAPI key not configured or invalid');
      }
    } catch (error) {
      console.warn('NewsAPI failed (likely CORS issue):', error.message);
      if (error.response) {
        console.warn('NewsAPI error status:', error.response.status);
        console.warn('NewsAPI error data:', error.response.data);
      }
    }

    // Try alternative RSS-based approach using multiple services
    try {
      console.log('Attempting RSS-based news fetch...');
      
      // Try multiple RSS sources for better coverage
      const rssSources = [
        'https://feeds.feedburner.com/ndtvnews-india-news',
        'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
        'https://www.thehindu.com/news/national/feeder/default.rss'
      ];
      
      for (const rssUrl of rssSources) {
        try {
          // Using RSS2JSON service (free tier)
          const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=15`;
          
          const response = await axios.get(rssToJsonUrl, {
            timeout: 5000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          
          console.log(`RSS response from ${rssUrl}:`, response.data.status);
          
          if (response.data.status === 'ok' && response.data.items && response.data.items.length > 0) {
            const articles = response.data.items
              .filter(item => {
                // Filter for geopolitical content
                const text = `${item.title} ${item.description || ''}`.toLowerCase();
                return GEOPOLITICAL_KEYWORDS.some(keyword => text.includes(keyword));
              })
              .map(item => ({
                title: item.title,
                description: item.description || item.content || 'No description available',
                url: item.link,
                urlToImage: item.enclosure?.link || item.thumbnail || 'https://images.unsplash.com/photo-1586967842399-e7fb9e00a79c?w=400&h=300&fit=crop',
                publishedAt: item.pubDate,
                source: { name: response.data.feed?.title || 'RSS Source' },
                apiSource: 'RSS'
              }));
            
            if (articles.length > 0) {
              allArticles.push(...articles);
              console.log(`RSS from ${response.data.feed?.title} returned ${articles.length} geopolitical articles`);
            }
          }
        } catch (sourceError) {
          console.warn(`RSS source ${rssUrl} failed:`, sourceError.message);
        }
      }
    } catch (error) {
      console.warn('RSS fetch failed:', error.message);
    }

    // Try NewsAPI with CORS proxy if no articles found yet
    if (allArticles.length === 0) {
      try {
        console.log('Attempting NewsAPI with CORS proxy...');
        const { newsapi } = NEWS_SOURCES;
        const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
        
        if (newsapi.apiKey && newsapi.apiKey !== 'YOUR_NEWSAPI_KEY') {
          const proxyResponse = await axios.get(`${corsProxyUrl}${newsapi.url}`, {
            params: {
              ...newsapi.params,
              apiKey: newsapi.apiKey
            },
            headers: {
              'Origin': window.location.origin
            }
          });
          // Using a public CORS proxy (note: for demo only)
          const proxyUrl = 'https://api.allorigins.win/get?url=';
          const newsApiUrl = `${newsapi.url}?${new URLSearchParams({
            ...newsapi.params,
            apiKey: newsapi.apiKey
          })}`;
          
          const response = await axios.get(`${proxyUrl}${encodeURIComponent(newsApiUrl)}`, {
            timeout: 10000
          });
          
          if (response.data.contents) {
            const newsData = JSON.parse(response.data.contents);
            
            if (newsData.status === 'ok' && newsData.articles) {
              const articles = newsData.articles.map(article => ({
                ...article,
                source: { name: article.source.name || 'NewsAPI' },
                apiSource: 'NewsAPI-Proxy'
              }));
              allArticles.push(...articles);
              console.log('NewsAPI via proxy returned', articles.length, 'articles');
            }
          }
        }
      } catch (error) {
        console.warn('NewsAPI with proxy failed:', error.message);
      }
    }

    // Try free Guardian API (with API key)
    if (allArticles.length === 0) {
      try {
        console.log('Attempting Guardian API...');
        const guardianUrl = 'https://content.guardianapis.com/search';
        const response = await axios.get(guardianUrl, {
          params: {
            q: 'India AND (China OR Pakistan OR border OR geopolitics)',
            'show-fields': 'headline,trailText,thumbnail,short-url,body',
            'page-size': 20,
            'order-by': 'newest',
            'api-key': '0cc1c5bc-7fe4-47bc-80cc-f17c13be193f' // Guardian API key
          },
          timeout: 8000
        });

        if (response.data.response && response.data.response.results) {
          const articles = response.data.response.results.map(article => ({
            title: article.fields?.headline || article.webTitle,
            description: article.fields?.trailText || 'No description available',
            url: article.fields?.shortUrl || article.webUrl,
            urlToImage: article.fields?.thumbnail || 'https://images.unsplash.com/photo-1586967842399-e7fb9e00a79c?w=400&h=300&fit=crop',
            publishedAt: article.webPublicationDate,
            source: { name: 'The Guardian' },
            apiSource: 'Guardian'
          }));
          
          allArticles.push(...articles);
          console.log('Guardian API returned', articles.length, 'articles');
        }
      } catch (error) {
        console.warn('Guardian API failed:', error.message);
      }
    }

    // Try MediaStack as backup
    try {
      const { mediastack } = NEWS_SOURCES;
      
      if (mediastack.apiKey && mediastack.apiKey !== 'YOUR_MEDIASTACK_KEY') {
        const response = await axios.get(mediastack.url, {
          params: {
            ...mediastack.params,
            access_key: mediastack.apiKey
          }
        });

        if (response.data && response.data.data) {
          const articles = response.data.data.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.image,
            publishedAt: article.published_at,
            source: { name: article.source },
            apiSource: 'MediaStack'
          }));
          allArticles.push(...articles);
        }
      }
    } catch (error) {
      console.warn('MediaStack failed:', error.message);
    }

    // Try Currents API as third option
    try {
      const { currents } = NEWS_SOURCES;
      
      if (currents.apiKey && currents.apiKey !== 'YOUR_CURRENTS_KEY') {
        const response = await axios.get(currents.url, {
          params: {
            ...currents.params,
            apiKey: currents.apiKey
          }
        });

        if (response.data && response.data.news) {
          const articles = response.data.news.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.image,
            publishedAt: article.published,
            source: { name: 'Currents' },
            apiSource: 'Currents'
          }));
          allArticles.push(...articles);
        }
      }
    } catch (error) {
      console.warn('Currents API failed:', error.message);
    }

    // If we got any articles from APIs, process them
    if (allArticles.length > 0) {
      console.log('Processing', allArticles.length, 'articles from live sources');
      const articlesWithScore = allArticles
        .map(article => ({
          ...article,
          relevanceScore: calculateRelevanceScore(article),
          category: getCategoryFromContent(article)
        }))
        .filter(article => article.relevanceScore > 1) // Reduced threshold to get more articles
        .sort((a, b) => {
          // Sort by relevance score first, then by recency
          if (b.relevanceScore !== a.relevanceScore) {
            return b.relevanceScore - a.relevanceScore;
          }
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        })
        .slice(0, 20); // Limit to 20 best articles

      if (articlesWithScore.length > 0) {
        console.log('Returning', articlesWithScore.length, 'filtered articles with scores');
        return articlesWithScore;
      }
    }

    // If no APIs worked, throw error to fallback to mock data
    throw new Error('All news APIs failed or not configured');
  };

  const getCategoryFromContent = (article) => {
    const text = `${article.title} ${article.description || ''}`.toLowerCase();
    
    if (text.includes('border') || text.includes('lac') || text.includes('military')) return 'Border Security';
    if (text.includes('trade') || text.includes('economy') || text.includes('export')) return 'Economic Impact';
    if (text.includes('diplomacy') || text.includes('summit') || text.includes('bilateral')) return 'Diplomacy';
    if (text.includes('energy') || text.includes('oil') || text.includes('gas')) return 'Energy Security';
    if (text.includes('cyber') || text.includes('technology') || text.includes('digital')) return 'Cyber Security';
    
    return 'General';
  };

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Attempting to fetch live news...');
      const newsData = await fetchNewsFromAPI();
      setNews(newsData);
      setIsUsingMockData(false);
      console.log('Successfully fetched live news:', newsData.length, 'articles');
    } catch (error) {
      console.warn('API fetch failed, using demo data:', error.message);
      // Fallback to mock data
      setNews(MOCK_NEWS_DATA);
      setIsUsingMockData(true);
      setError('Using enhanced demo data with realistic geopolitical scenarios. Live API requires backend implementation to avoid CORS restrictions.');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  // Auto-refresh every 10 minutes for more up-to-date news
  useEffect(() => {
    fetchNews();
    
    const interval = setInterval(fetchNews, 10 * 60 * 1000); // 10 minutes instead of 15
    return () => clearInterval(interval);
  }, [fetchNews]);

  const refreshNews = () => {
    fetchNews();
  };

  const getBreakingNews = () => {
    return news.filter(article => {
      const hoursOld = (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60);
      // More strict breaking news criteria: within 3 hours and high relevance score
      return hoursOld < 3 && article.relevanceScore >= 7;
    });
  };

  const getNewsByCategory = (category) => {
    return news.filter(article => article.category === category);
  };

  return {
    news,
    loading,
    error,
    lastUpdated,
    isUsingMockData,
    refreshNews,
    getBreakingNews,
    getNewsByCategory,
    categories: ['All', 'Border Security', 'Diplomacy', 'Economic Impact', 'Energy Security', 'Cyber Security']
  };
};
