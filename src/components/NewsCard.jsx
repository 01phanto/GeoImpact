import { Clock, TrendingUp, TrendingDown, AlertTriangle, ExternalLink } from 'lucide-react'

const NewsCard = ({ title, impact, source, time, category, description, affectedSectors, trend }) => {
  const getImpactColor = (impact) => {
    if (impact >= 8) return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300"
    if (impact >= 6) return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300"
    return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300"
  }

  const getCategoryColor = (category) => {
    const colors = {
      "Trade War": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      "Regional Politics": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Strategic": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "Education": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "Energy Crisis": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      "Alliance": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
  }

  const getTrendIcon = () => {
    if (trend === 'positive') return <TrendingUp className="w-4 h-4 text-green-500" />
    if (trend === 'negative') return <TrendingDown className="w-4 h-4 text-red-500" />
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />
  }

  return (
    <div className="impact-card hover:scale-105 transition-transform duration-200 cursor-pointer group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
          {category}
        </span>
        <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getImpactColor(impact)}`}>
          Impact: {impact}/10
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {description}
      </p>

      {/* Affected Sectors */}
      {affectedSectors && affectedSectors.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Affected Sectors:</p>
          <div className="flex flex-wrap gap-1">
            {affectedSectors.map((sector, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">{source}</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
    </div>
  )
}

export default NewsCard
