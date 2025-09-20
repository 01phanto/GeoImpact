import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import { useEconomicData } from '../hooks/useEconomicData';
import { formatDistanceToNow } from 'date-fns';
// Temporarily commented out charts to test basic functionality
// import { 
//   CurrencyTrendChart, 
//   CommodityChart, 
//   MarketIndicesChart, 
//   TradeBalanceChart, 
//   RiskIndicatorChart 
// } from './EconomicCharts';

const EconomicDashboard = () => {
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

  const categories = [
    { id: 'all', name: 'All Indicators', icon: BarChart3 },
    { id: 'currencies', name: 'Currencies', icon: DollarSign },
    { id: 'commodities', name: 'Commodities', icon: TrendingUp },
    { id: 'indices', name: 'Markets', icon: BarChart3 },
    { id: 'tradeData', name: 'Trade', icon: Globe }
  ];

  const renderIndicatorCard = (name, data, category, index) => (
    <motion.div
      key={`${category}-${name}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
          <p className="text-sm text-gray-500 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</p>
        </div>
        <div className="flex items-center gap-2">
          {data.changePercent !== undefined && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(data.changePercent)}`}>
              {data.changePercent > 0 ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
              {formatPercent(data.changePercent)}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {data.rate ? formatNumber(data.rate) : 
             data.price ? formatNumber(data.price) : 
             data.value ? formatNumber(data.value) : 
             formatNumber(data)}
          </span>
          <span className="text-sm text-gray-500">
            {data.unit || (category === 'currencies' ? 'vs USD' : '')}
          </span>
        </div>

        {data.change !== undefined && (
          <div className={`text-sm font-medium ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.change >= 0 ? '+' : ''}{formatNumber(data.change, 2)} 
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
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mt-6 p-4 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
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

            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
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

        {/* High Impact Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {getHighImpactIndicators().length > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-xl font-bold">High Impact Economic Events</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getHighImpactIndicators().slice(0, 3).map((indicator, index) => (
                  <div key={index} className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-semibold">{indicator.name}</h4>
                    <p className="text-sm opacity-90">
                      {formatPercent(indicator.data.changePercent)} change - Impact: {indicator.impact}/10
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </motion.div>

        {/* Economic Indicators Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {renderCategoryData()}
        </motion.div>

        {/* Currency Trends Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-purple-600" />
            Currency Impact on India
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getCurrencyTrends().map((trend, index) => (
              <div key={trend.currency} className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-900 mb-2">
                  {trend.currency}/USD
                </h4>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatNumber(trend.rate)}
                </div>
                <div className={`text-sm font-medium ${trend.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.change >= 0 ? '+' : ''}{formatNumber(trend.change, 3)} ({formatPercent(trend.changePercent)})
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(trend.impact)}`}>
                    Geopolitical Impact: {trend.impact}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Charts Section - Temporarily disabled for testing */}
        {/* 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              📊 Interactive Economic Analytics
            </h3>
            <p className="text-lg text-gray-600">
              Advanced visualizations showing India's economic relationships and trends
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <CurrencyTrendChart data={economicData.currencies || []} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MarketIndicesChart data={economicData.indices || []} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CommodityChart data={economicData.commodities || []} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TradeBalanceChart data={economicData.tradeData || []} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <RiskIndicatorChart data={economicData.geopoliticalRisk || []} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200"
          >
            <h4 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Key Economic Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">7.2/10</div>
                <div className="text-sm text-blue-800">Overall Risk Level</div>
                <div className="text-xs text-blue-600 mt-1">↑ Increased from 6.8</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">+2.3%</div>
                <div className="text-sm text-green-800">Trade Growth</div>
                <div className="text-xs text-green-600 mt-1">↑ Month over month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">$87.4B</div>
                <div className="text-sm text-orange-800">Trade Deficit</div>
                <div className="text-xs text-orange-600 mt-1">→ With China</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        */}

        {/* API Setup Instructions */}
        {isUsingMockData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 p-6 bg-purple-50 rounded-xl border border-purple-200"
          >
            <h3 className="text-lg font-semibold text-purple-900 mb-3">
              📊 Enable Live Economic Data
            </h3>
            <p className="text-purple-800 mb-4">
              Currently showing demo data. To get real-time economic indicators:
            </p>
            <ul className="list-disc list-inside text-purple-800 space-y-2">
              <li>Sign up for Alpha Vantage API (500 calls/day free) at <code className="bg-purple-100 px-1 rounded">alphavantage.co</code></li>
              <li>Get exchange rates from <code className="bg-purple-100 px-1 rounded">exchangerate-api.com</code> (free tier available)</li>
              <li>Replace API keys in <code className="bg-purple-100 px-1 rounded">useEconomicData.js</code></li>
              <li>Refresh to see live market data</li>
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EconomicDashboard;
