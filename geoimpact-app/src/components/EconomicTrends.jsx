import React from 'react'
import { motion } from 'framer-motion'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar
} from 'recharts'
import { BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react'

const EconomicTrends = ({ darkMode }) => {
  // Comprehensive economic trend data
  const economicTrendData = [
    { month: 'Jan', impact: 7.2, gdp: 6.8, inflation: 3.2, exports: 12.5 },
    { month: 'Feb', impact: 6.8, gdp: 6.9, inflation: 3.1, exports: 13.2 },
    { month: 'Mar', impact: 7.5, gdp: 7.1, inflation: 2.9, exports: 14.1 },
    { month: 'Apr', impact: 6.2, gdp: 6.7, inflation: 3.5, exports: 11.8 },
    { month: 'May', impact: 8.1, gdp: 7.3, inflation: 2.8, exports: 15.6 },
    { month: 'Jun', impact: 7.8, gdp: 7.2, inflation: 3.0, exports: 14.9 },
    { month: 'Jul', impact: 6.9, gdp: 6.8, inflation: 3.3, exports: 13.4 },
    { month: 'Aug', impact: 7.6, gdp: 7.1, inflation: 2.7, exports: 15.2 },
    { month: 'Sep', impact: 8.3, gdp: 7.4, inflation: 2.9, exports: 16.1 }
  ]

  const monthlyComparison = [
    { month: 'Jan 2025', current: 7.2, previous: 6.8, target: 7.5 },
    { month: 'Feb 2025', current: 6.8, previous: 6.9, target: 7.5 },
    { month: 'Mar 2025', current: 7.5, previous: 7.1, target: 7.5 },
    { month: 'Apr 2025', current: 6.2, previous: 6.7, target: 7.5 },
    { month: 'May 2025', current: 8.1, previous: 7.3, target: 7.5 },
    { month: 'Jun 2025', current: 7.8, previous: 7.2, target: 7.5 },
    { month: 'Jul 2025', current: 6.9, previous: 6.8, target: 7.5 },
    { month: 'Aug 2025', current: 7.6, previous: 7.1, target: 7.5 },
    { month: 'Sep 2025', current: 8.3, previous: 7.4, target: 7.5 }
  ]

  return (
    <div className="mb-12">
      {/* Main Economic Impact Chart */}
      <motion.div 
        className={`p-6 rounded-2xl border shadow-lg mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-semibold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
            Multi-Dimensional Economic Impact - 2025
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={economicTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="impact" 
              stackId="1"
              stroke="#3B82F6" 
              fill="#3B82F6" 
              fillOpacity={0.6}
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="gdp" 
              stackId="2"
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Side by Side Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Inflation & Export Trends */}
        <motion.div 
          className={`p-6 rounded-2xl border shadow-lg ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
              Inflation vs Export Performance
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={economicTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="inflation" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="exports" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Performance Comparison */}
        <motion.div 
          className={`p-6 rounded-2xl border shadow-lg ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
              Target vs Achievement Analysis
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="current" fill="#3B82F6" name="Current Score" />
              <Bar dataKey="target" fill="#10B981" name="Target Score" />
              <Bar dataKey="previous" fill="#6B7280" name="Previous Month" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Economic Insights Summary */}
      <motion.div 
        className={`p-6 rounded-2xl border shadow-lg ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <span style={{ color: darkMode ? '#ffffff' : '#111827' }}>Key Economic Insights</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">8.3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Latest Impact Score</div>
            <div className="text-xs text-green-600 mt-1">↑ 0.7 from Aug</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">7.4%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">GDP Growth Rate</div>
            <div className="text-xs text-green-600 mt-1">↑ 0.3% YTD</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">16.1B</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Export Value (USD)</div>
            <div className="text-xs text-green-600 mt-1">↑ 28.6% YoY</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EconomicTrends