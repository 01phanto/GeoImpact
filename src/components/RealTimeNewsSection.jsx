import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Globe, TrendingUp, AlertCircle, RefreshCw, Filter, ExternalLink } from 'lucide-react';
import { useRealTimeNews } from '../hooks/useRealTimeNews';
import { formatDistanceToNow } from 'date-fns';

const RealTimeNewsSection = () => {
  const {
    news,
    loading,
    error,
    lastUpdated,
    isUsingMockData,
    refreshNews,
    getBreakingNews,
    getNewsByCategory,
    categories
  } = useRealTimeNews();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBreakingOnly, setShowBreakingOnly] = useState(false);

  const filteredNews = showBreakingOnly 
    ? getBreakingNews()
    : selectedCategory === 'All' 
      ? news 
      : getNewsByCategory(selectedCategory);

  const getRelevanceColor = (score) => {
    if (score >= 7) return 'text-red-500 bg-red-100';
    if (score >= 5) return 'text-orange-500 bg-orange-100';
    return 'text-blue-500 bg-blue-100';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Border Security': 'bg-red-100 text-red-700',
      'Diplomacy': 'bg-blue-100 text-blue-700',
      'Economic Impact': 'bg-green-100 text-green-700',
      'Energy Security': 'bg-yellow-100 text-yellow-700',
      'Cyber Security': 'bg-purple-100 text-purple-700',
      'General': 'bg-gray-100 text-gray-700'
    };
    return colors[category] || colors['General'];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Live Geopolitical News
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time updates on events directly impacting India's geopolitical landscape
          </p>
          
          {/* Status Bar */}
          <div className="flex items-center justify-center gap-4 mt-6 p-4 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
              <span className="text-sm font-medium">
                {loading ? 'Updating...' : 'Live'}
              </span>
            </div>
            
            {lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Updated {formatDistanceToNow(lastUpdated)} ago</span>
              </div>
            )}

            {isUsingMockData && (
              <div className="flex items-center gap-2 text-sm text-orange-600">
                <AlertCircle className="w-4 h-4" />
                <span>Demo Mode</span>
              </div>
            )}

            <button
              onClick={refreshNews}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-orange-100 text-orange-700 rounded-lg max-w-2xl mx-auto">
              {error}
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Filter:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowBreakingOnly(!showBreakingOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
              showBreakingOnly
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Breaking Only
          </button>
        </motion.div>

        {/* Breaking News Banner */}
        <AnimatePresence>
          {getBreakingNews().length > 0 && !showBreakingOnly && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <span className="font-bold text-lg">BREAKING</span>
                  </div>
                  <span className="text-red-100">
                    {getBreakingNews().length} urgent update{getBreakingNews().length !== 1 ? 's' : ''}
                  </span>
                </div>
                <p className="font-medium">
                  {getBreakingNews()[0]?.title}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* News Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredNews.map((article, index) => (
              <motion.article
                key={`${article.url}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.urlToImage || `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop`;
                    }}
                  />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRelevanceColor(article.relevanceScore)}`}>
                      Impact: {article.relevanceScore}/10
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <span className="font-medium">{article.source.name}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {article.relevanceScore >= 7 && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                          High Impact
                        </span>
                      )}
                      {formatDistanceToNow(new Date(article.publishedAt)) < '2 hours' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Recent
                        </span>
                      )}
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredNews.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No news found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later for updates.
            </p>
          </motion.div>
        )}

        {/* API Setup Instructions */}
        {isUsingMockData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              🚀 Enable Live News Updates
            </h3>
            <p className="text-blue-800 mb-4">
              Currently showing demo data. To get real-time news updates:
            </p>
            <ol className="list-decimal list-inside text-blue-800 space-y-2">
              <li>Sign up for a free NewsAPI account at <code className="bg-blue-100 px-1 rounded">newsapi.org</code></li>
              <li>Get your free API key (1000 requests/day)</li>
              <li>Replace <code className="bg-blue-100 px-1 rounded">YOUR_NEWSAPI_KEY</code> in <code className="bg-blue-100 px-1 rounded">useRealTimeNews.js</code></li>
              <li>Refresh the page to see live updates</li>
            </ol>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RealTimeNewsSection;
