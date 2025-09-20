import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe, RefreshCw, AlertTriangle, Clock, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useEconomicData } from '../hooks/useEconomicData';
import { formatDistanceToNow } from 'date-fns';
import CountUp from 'react-countup'

const EconomicAnalysis = ({ darkMode }) => {
  const {
    economicData,
    loading,
    error,
    lastUpdated,
    isUsingMockData,
    refreshData,
    getHighImpactIndicators,
    getCurrencyTrends
  } = useEconomicData();

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Economic Trends Data
  const impactData = [
    { name: 'Trade Relations', impact: 85, change: 12, trend: 'up' },
    { name: 'Currency Stability', impact: 72, change: -8, trend: 'down' },
    { name: 'Investment Flow', impact: 68, change: 15, trend: 'up' },
    { name: 'Export Growth', impact: 91, change: 7, trend: 'up' },
    { name: 'Import Dependency', impact: 76, change: -3, trend: 'down' }
  ]

  const timeSeriesData = [
    { month: 'Jan', gdp: 2.1, inflation: 5.8, exports: 42.1, imports: 48.5, fiscal: -3.2 },
    { month: 'Feb', gdp: 2.3, inflation: 5.6, exports: 43.2, imports: 49.1, fiscal: -3.1 },
    { month: 'Mar', gdp: 2.5, inflation: 5.4, exports: 44.8, imports: 50.2, fiscal: -2.9 },
    { month: 'Apr', gdp: 2.4, inflation: 5.9, exports: 45.1, imports: 51.8, fiscal: -3.0 },
    { month: 'May', gdp: 2.6, inflation: 6.1, exports: 46.3, imports: 52.4, fiscal: -2.8 },
    { month: 'Jun', gdp: 2.7, inflation: 5.7, exports: 47.2, imports: 53.1, fiscal: -2.7 }
  ]

  const formatNumber = (num, decimals = 2) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  };

  const formatPercent = (num) => {
    const sign = num >= 0 ? '+' : '';
    return `${sign}${formatNumber(num, 2)}%`;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600 bg-green-100';
    if (change < 0) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getImpactColor = (impact) => {
    if (impact >= 8) return 'text-red-700 bg-red-100';
    if (impact >= 6) return 'text-orange-700 bg-orange-100';
    return 'text-blue-700 bg-blue-100';
  };

  const renderIndicatorCard = (name, data, category, index) => (
    <motion.div
      key={`${category}-${name}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-lg ${
        darkMode 
          ? 'bg-gray-800 border-gray-600 hover:border-gray-500' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h4>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {typeof data.value === 'number' ? formatNumber(data.value, 1) : data.value}
              {data.unit && <span className="text-sm ml-1">{data.unit}</span>}
            </span>
            {data.change && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(data.change)}`}>
                {formatPercent(data.change)}
              </span>
            )}
          </div>
        </div>

        {data.period && (
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Period</div>
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {data.period}
            </div>
            {data.period && <span className="text-gray-500 ml-1">({data.period})</span>}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>
              {data.lastUpdate ? formatDistanceToNow(new Date(data.lastUpdate)) + ' ago' : 'Recently'}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(8)}`}>
            Impact: High
          </span>
        </div>
      </div>
    </motion.div>
  );

  const renderCategoryData = () => {
    if (selectedCategory === 'all') {
      return Object.entries(economicData).flatMap(([category, items], categoryIndex) =>
        Object.entries(items).map(([name, data], itemIndex) =>
          renderIndicatorCard(name, data, category, categoryIndex * 10 + itemIndex)
        )
      );
    } else {
      const categoryData = economicData[selectedCategory] || {};
      return Object.entries(categoryData).map(([name, data], index) =>
        renderIndicatorCard(name, data, selectedCategory, index)
      );
    }
  };

  return (
    <div className="mb-12">
      {/* Economic Trends Analysis Section */}
      <motion.div 
        className={`p-6 rounded-2xl border shadow-lg mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          <span style={{ color: darkMode ? '#ffffff' : '#111827' }}>Economic Trends Analysis</span>
        </h3>

        {/* Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {impactData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-xl text-center border ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
              }`}
            >
              <h3 className="text-xl font-semibold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                {item.name}
              </h3>
              <div className="mt-2 flex items-center justify-center space-x-2">
                <span className="text-3xl font-bold text-blue-600">
                  <CountUp end={item.impact} duration={2} />
                </span>
                <div className={`flex items-center space-x-1 ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Economic Time Series Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
            }`}
          >
            <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
              GDP Growth & Inflation
            </h3>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
                  />
                  <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="gdp" stroke="#3B82F6" strokeWidth={3} name="GDP Growth %" />
                  <Line type="monotone" dataKey="inflation" stroke="#EF4444" strokeWidth={3} name="Inflation %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
            }`}
          >
            <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
              Trade Balance
            </h3>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
                  />
                  <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="exports" stackId="1" stroke="#10B981" fill="#10B981" name="Exports (B$)" />
                  <Area type="monotone" dataKey="imports" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Imports (B$)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Key Economic Indicators Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
            Key Economic Indicators
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="text-2xl font-bold text-blue-600 mb-1">7.9</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Economic Health</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="text-2xl font-bold text-green-600 mb-1">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Growth Sectors</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
              <div className="text-2xl font-bold text-red-600 mb-1">1</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Risk Factors</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="text-2xl font-bold text-purple-600 mb-1">9.1</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Resilience Index</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Economic Dashboard Section */}
      <motion.div 
        className={`p-6 rounded-2xl border shadow-lg ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-500" />
            <span style={{ color: darkMode ? '#ffffff' : '#111827' }}>Live Economic Indicators</span>
          </h3>
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            <span className="text-sm font-medium">
              {loading ? 'Updating...' : 'Live Market Data'}
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
              <AlertTriangle className="w-4 h-4" />
              <span>Demo Mode</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-orange-100 text-orange-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'currency', 'commodities', 'indices', 'trade'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Economic Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
                }`}>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            renderCategoryData()
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default EconomicAnalysis