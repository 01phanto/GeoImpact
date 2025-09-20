import { Calendar, ExternalLink, TrendingUp, Clock, Globe, BookOpen, Filter, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const NewsSection = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const newsArticles = [
    {
      id: 1,
      title: "India-US Trade Relations Under New Tariff Regime",
      summary: "Analysis of how Trump's proposed 25% tariffs could reshape Indo-US trade partnerships and affect key sectors",
      source: "Economic Times",
      category: "Trade",
      publishedAt: "2 hours ago",
      impact: "High",
      readTime: "5 min read",
      imageUrl: "/api/placeholder/400/200",
      tags: ["Trade War", "USA", "Economy", "Tariffs"],
      url: "#"
    },
    {
      id: 2,
      title: "Nepal's Political Turmoil: Border Security Implications",
      summary: "How ongoing political instability in Nepal affects India's northern border security and bilateral trade",
      source: "The Hindu",
      category: "Regional",
      publishedAt: "4 hours ago",
      impact: "Medium",
      readTime: "4 min read",
      imageUrl: "/api/placeholder/400/200",
      tags: ["Nepal", "Border Security", "Politics", "Trade"],
      url: "#"
    },
    {
      id: 3,
      title: "Canadian Student Visa Changes Impact Indian Youth",
      summary: "New immigration policies affecting 200,000+ Indian students and future study abroad prospects",
      source: "India Today",
      category: "Education",
      publishedAt: "8 hours ago",
      impact: "High",
      readTime: "6 min read",
      imageUrl: "/api/placeholder/400/200",
      tags: ["Canada", "Education", "Immigration", "Students"],
      url: "#"
    },
    {
      id: 4,
      title: "QUAD Alliance Strengthens Indo-Pacific Strategy",
      summary: "Recent developments in QUAD partnership enhance India's strategic position in the region",
      source: "Diplomat",
      category: "Strategy",
      publishedAt: "12 hours ago",
      impact: "Medium",
      readTime: "7 min read",
      imageUrl: "/api/placeholder/400/200",
      tags: ["QUAD", "Strategy", "Indo-Pacific", "Alliance"],
      url: "#"
    },
    {
      id: 5,
      title: "Rupee Volatility Amid Global Economic Uncertainty",
      summary: "Currency fluctuations and their impact on trade, imports, and economic stability",
      source: "Business Standard",
      category: "Economy",
      publishedAt: "1 day ago",
      impact: "Medium",
      readTime: "4 min read",
      imageUrl: "/api/placeholder/400/200",
      tags: ["Currency", "Economy", "Global Trade", "Finance"],
      url: "#"
    },
    {
      id: 6,
      title: "Climate Diplomacy: India's Green Energy Push",
      summary: "How environmental policies are becoming key to India's international relations",
      source: "Reuters",
      category: "Environment",
      publishedAt: "1 day ago",
      impact: "Low",
      readTime: "5 min read",
      imageUrl: "/api/placeholder/400/200",
      tags: ["Climate", "Environment", "Energy", "Diplomacy"],
      url: "#"
    }
  ]

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'trade': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'regional': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'education': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
      case 'strategy': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
      case 'economy': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      case 'environment': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  // Filter functionality
  const categories = ['All', 'Trade', 'Regional', 'Education', 'Strategy', 'Economy', 'Environment']
  
  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="mb-12">
      {/* Section Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Latest Geopolitical News
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with the latest developments affecting India's global position and interests
        </p>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div 
        className="mb-8 flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-3 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Featured Article */}
      <motion.div 
        className={`mb-8 rounded-2xl border shadow-xl overflow-hidden ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="lg:flex">
          <div className="lg:w-1/3">
            <div className="h-64 lg:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Featured Story</h3>
                <p className="text-blue-100">Breaking geopolitical development</p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 p-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(filteredNews[0]?.category || 'Trade')}`}>
                {filteredNews[0]?.category || 'Trade'}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(filteredNews[0]?.impact || 'High')}`}>
                {filteredNews[0]?.impact || 'High'} Impact
              </span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{filteredNews[0]?.publishedAt || '2 hours ago'}</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {filteredNews[0]?.title || newsArticles[0].title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {filteredNews[0]?.summary || newsArticles[0].summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{filteredNews[0]?.source || newsArticles[0].source}</span>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{filteredNews[0]?.readTime || newsArticles[0].readTime}</span>
                </div>
              </div>
              <motion.button 
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                           text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Read Full Article</span>
                <ExternalLink className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.slice(1).map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            className={`rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 
                       transform hover:-translate-y-1 cursor-pointer group overflow-hidden
                       ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            {/* Article Image */}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <div className="text-center text-white">
                <Globe className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm opacity-80">{article.category} News</p>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(article.impact)}`}>
                  {article.impact}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 
                           group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              {/* Summary */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 
                             text-xs rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <span>{article.source}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{article.publishedAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className={`px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 
                           hover:bg-blue-600 hover:text-white transition-all duration-300 
                           font-medium ${darkMode ? 'hover:bg-blue-700' : ''}`}>
          Load More Articles
        </button>
      </div>

      {/* News Sources */}
      <div className={`mt-8 p-6 rounded-xl border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Trusted News Sources
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Economic Times', 'The Hindu', 'India Today', 'Reuters', 'Business Standard', 'Diplomat'].map((source, index) => (
            <div key={index} className={`p-3 rounded-lg text-center border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            } hover:shadow-md transition-shadow`}>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{source}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsSection
