import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, GraduationCap, Shield } from 'lucide-react'
import CountUp from 'react-countup'

const KPIMetrics = ({ darkMode }) => {
  const impactMetrics = [
    {
      title: 'Economic Impact',
      value: '8.5',
      change: '+0.3',
      trend: 'up',
      icon: DollarSign,
      description: 'Trade & Investment',
      details: '$12.3B at risk from tariffs',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      title: 'Political Stability',
      value: '6.2',
      change: '-0.8',
      trend: 'down',
      icon: Users,
      description: 'Regional Relations',
      details: 'Border tensions escalating',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      title: 'Education Impact',
      value: '7.8',
      change: '+0.5',
      trend: 'up',
      icon: GraduationCap,
      description: 'Study Abroad',
      details: '200K+ students affected',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      title: 'Strategic Position',
      value: '9.1',
      change: '+0.2',
      trend: 'up',
      icon: Shield,
      description: 'Global Standing',
      details: 'QUAD alliance strengthened',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    }
  ]

  return (
    <div className="mb-12">
      {/* Enhanced KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
        {impactMetrics.map((metric, index) => {
          const IconComponent = metric.icon
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 
                         transform hover:-translate-y-2 cursor-pointer group
                         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              {/* Header with Icon and Trend */}
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-xl ${metric.bgColor} ${metric.borderColor} border group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`h-8 w-8 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-2 ${metric.color}`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                  <span className="text-lg font-bold">{metric.change}</span>
                </div>
              </div>
              
              {/* Title and Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                  {metric.title}
                </h3>
                <p className="text-sm" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                  {metric.description}
                </p>
              </div>
              
              {/* Impact Score with CountUp Animation */}
              <div className="flex items-baseline space-x-3 mb-6">
                <div className="text-5xl font-bold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                  <CountUp end={parseFloat(metric.value)} duration={2} decimals={1} />
                </div>
                <div className="text-xl" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>/10</div>
              </div>
              
              {/* Details */}
              <p className="text-sm mb-6" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                {metric.details}
              </p>
              
              {/* Enhanced Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                <motion.div
                  className={`h-3 rounded-full ${
                    metric.trend === 'up' 
                      ? 'bg-gradient-to-r from-green-400 to-green-600' 
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(parseFloat(metric.value) / 10) * 100}%` }}
                  transition={{ duration: 2, delay: 0.5 }}
                ></motion.div>
              </div>
              
              {/* Status and Score Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`font-medium capitalize ${metric.color}`}>
                    {metric.trend === 'up' ? 'Improving' : 'Declining'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Score:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {metric.value}/10.0
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Monthly Change:</span>
                  <span className={`font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary Statistics */}
      <motion.div 
        className={`p-6 rounded-2xl border shadow-lg ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
          KPI Summary Overview
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">7.9</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
            <div className="text-xs text-green-600 mt-1">↑ 0.05 vs last month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Improving</div>
            <div className="text-xs text-green-600 mt-1">Economic, Education, Strategic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">1</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Declining</div>
            <div className="text-xs text-red-600 mt-1">Political Stability</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">9.1</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Highest Score</div>
            <div className="text-xs text-purple-600 mt-1">Strategic Position</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default KPIMetrics