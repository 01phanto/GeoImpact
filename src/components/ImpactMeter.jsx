import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react'

const ImpactMeter = ({ impact, title, color, description, trend }) => {
  const percentage = (impact / 10) * 100
  
  const getColor = (color) => {
    switch (color) {
      case 'red': return 'text-red-500 border-red-500 bg-red-50 dark:bg-red-900/20'
      case 'yellow': return 'text-yellow-500 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'blue': return 'text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'green': return 'text-green-500 border-green-500 bg-green-50 dark:bg-green-900/20'
      default: return 'text-gray-500 border-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'decreasing':
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getImpactLevel = (impact) => {
    if (impact >= 8) return { level: 'High', color: 'text-red-600' }
    if (impact >= 6) return { level: 'Medium', color: 'text-yellow-600' }
    return { level: 'Low', color: 'text-green-600' }
  }

  const impactLevel = getImpactLevel(impact)

  return (
    <div className="impact-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          {getTrendIcon(trend)}
          <span className="text-xs text-gray-500 capitalize">{trend}</span>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${percentage * 2.83} 283`}
            strokeLinecap="round"
            className={getColor(color).split(' ')[0]}
            style={{
              transition: 'stroke-dasharray 1s ease-in-out',
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {impact}
          </span>
          <span className="text-xs text-gray-500">/10</span>
        </div>
      </div>

      {/* Impact level indicator */}
      <div className="text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getColor(color)}`}>
          <span className={impactLevel.color}>{impactLevel.level} Impact</span>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Status:</span>
          <span className="font-medium text-gray-900 dark:text-white capitalize">
            {trend}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ImpactMeter
