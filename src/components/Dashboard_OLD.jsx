import { 
  TrendingUp, TrendingDown, DollarSign, Users, GraduationCap, Shield, 
  BarChart3, PieChart, Activity, Globe, AlertTriangle, Target, 
  ArrowUpRight, ArrowDownRight, Eye, Zap, Brain, Heart,
  Clock, Calendar, MapPin, Briefcase, BookOpen, Handshake
} from 'lucide-react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart as RechartsPieChart, Cell, Pie, 
  BarChart, Bar, RadialBarChart, RadialBar, Legend,
  ComposedChart, ReferenceLine
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import { useState, useEffect } from 'react'

const Dashboard = ({ darkMode }) => {
  const [selectedMetric, setSelectedMetric] = useState(null)
  const [timeFilter, setTimeFilter] = useState('7d')
  const [realTimeData, setRealTimeData] = useState({
    lastUpdate: new Date(),
    activeEvents: 127,
    sentimentScore: 0.72,
    volatilityIndex: 8.3
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        lastUpdate: new Date(),
        activeEvents: prev.activeEvents + Math.floor(Math.random() * 3) - 1,
        sentimentScore: Math.max(0, Math.min(1, prev.sentimentScore + (Math.random() - 0.5) * 0.02)),
        volatilityIndex: Math.max(0, Math.min(10, prev.volatilityIndex + (Math.random() - 0.5) * 0.2))
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const impactMetrics = [
    {
      id: 'economic',
      title: 'Economic Impact',
      value: '8.5',
      change: '+0.3',
      trend: 'up',
      icon: DollarSign,
      description: 'Trade & Investment',
      details: '$12.3B at risk from tariffs',
      sentiment: 0.65,
      volatility: 'high',
      subMetrics: [
        { label: 'Trade Volume', value: '$245B', change: '+2.1%' },
        { label: 'FDI Inflows', value: '$83.5B', change: '-1.2%' },
        { label: 'Currency Impact', value: '₹83.42', change: '+0.8%' }
      ],
      color: 'text-red-500',
      bgColor: 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      ringColor: 'ring-red-500/20'
    },
    {
      id: 'political',
      title: 'Political Stability',
      value: '6.2',
      change: '-0.8',
      trend: 'down',
      icon: Users,
      description: 'Regional Relations',
      details: 'Border tensions escalating',
      sentiment: 0.45,
      volatility: 'critical',
      subMetrics: [
        { label: 'Diplomatic Score', value: '6.2/10', change: '-0.8' },
        { label: 'Border Tension', value: 'High', change: '↑' },
        { label: 'Alliance Strength', value: '7.8/10', change: '+0.2' }
      ],
      color: 'text-yellow-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      ringColor: 'ring-yellow-500/20'
    },
    {
      id: 'education',
      title: 'Education Impact',
      value: '7.8',
      change: '+0.5',
      trend: 'up',
      icon: GraduationCap,
      description: 'Study Abroad',
      details: '200K+ students affected',
      sentiment: 0.78,
      volatility: 'moderate',
      subMetrics: [
        { label: 'Student Mobility', value: '320K', change: '+12%' },
        { label: 'Visa Approvals', value: '85%', change: '+5%' },
        { label: 'University Rankings', value: '↑23', change: 'Improved' }
      ],
      color: 'text-blue-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      ringColor: 'ring-blue-500/20'
    },
    {
      id: 'strategic',
      title: 'Strategic Position',
      value: '9.1',
      change: '+0.2',
      trend: 'up',
      icon: Shield,
      description: 'Global Standing',
      details: 'QUAD alliance strengthened',
      sentiment: 0.88,
      volatility: 'stable',
      subMetrics: [
        { label: 'Global Influence', value: '9.1/10', change: '+0.2' },
        { label: 'Military Capability', value: '8.7/10', change: '+0.1' },
        { label: 'Soft Power', value: '8.9/10', change: '+0.3' }
      ],
      color: 'text-green-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      ringColor: 'ring-green-500/20'
    }
  ]

  const sentimentAnalysisData = [
    { date: 'Mon', positive: 65, negative: 20, neutral: 15 },
    { date: 'Tue', positive: 70, negative: 18, neutral: 12 },
    { date: 'Wed', positive: 58, negative: 28, neutral: 14 },
    { date: 'Thu', positive: 72, negative: 15, neutral: 13 },
    { date: 'Fri', positive: 68, negative: 22, neutral: 10 },
    { date: 'Sat', positive: 75, negative: 12, neutral: 13 },
    { date: 'Sun', positive: 73, negative: 16, neutral: 11 }
  ]

  const realTimeEvents = [
    { 
      id: 1, 
      title: 'US-China Trade Agreement Update',
      impact: 'High',
      sentiment: 0.8,
      time: '2 min ago',
      category: 'Economic',
      source: 'Reuters'
    },
    {
      id: 2,
      title: 'QUAD Summit Announcement',
      impact: 'Critical',
      sentiment: 0.9,
      time: '5 min ago',
      category: 'Strategic',
      source: 'MEA India'
    },
    {
      id: 3,
      title: 'Border Infrastructure Development',
      impact: 'Medium',
      sentiment: 0.7,
      time: '12 min ago',
      category: 'Security',
      source: 'Economic Times'
    }
  ]

  const advancedChartData = [
    { 
      month: 'Jan', 
      economic: 8.2, 
      political: 6.8, 
      education: 7.5, 
      strategic: 8.9,
      sentiment: 0.68,
      volatility: 7.2
    },
    { 
      month: 'Feb', 
      economic: 8.0, 
      political: 6.5, 
      education: 7.8, 
      strategic: 9.0,
      sentiment: 0.65,
      volatility: 7.8
    },
    { 
      month: 'Mar', 
      economic: 8.3, 
      political: 6.2, 
      education: 7.6, 
      strategic: 9.1,
      sentiment: 0.72,
      volatility: 8.1
    },
    { 
      month: 'Apr', 
      economic: 8.1, 
      political: 6.0, 
      education: 7.9, 
      strategic: 9.2,
      sentiment: 0.70,
      volatility: 8.5
    },
    { 
      month: 'May', 
      economic: 8.5, 
      political: 6.2, 
      education: 8.0, 
      strategic: 9.1,
      sentiment: 0.75,
      volatility: 8.3
    },
    { 
      month: 'Jun', 
      economic: 8.7, 
      political: 6.4, 
      education: 7.8, 
      strategic: 9.0,
      sentiment: 0.73,
      volatility: 8.0
    }
  ]

  const economicTrendData = [
    { month: 'Jan', impact: 7.2, volatility: 6.5 },
    { month: 'Feb', impact: 6.8, volatility: 7.1 },
    { month: 'Mar', impact: 7.5, volatility: 6.9 },
    { month: 'Apr', impact: 8.1, volatility: 7.3 },
    { month: 'May', impact: 8.5, volatility: 7.8 },
    { month: 'Jun', impact: 8.2, volatility: 7.5 }
  ]

  const sectorPerformanceData = [
    { name: 'Technology', current: 85, previous: 82, target: 90 },
    { name: 'Manufacturing', current: 78, previous: 75, target: 85 },
    { name: 'Services', current: 92, previous: 89, target: 95 },
    { name: 'Agriculture', current: 65, previous: 68, target: 75 },
    { name: 'Energy', current: 73, previous: 70, target: 80 }
  ]

  const regionImpactData = [
    { name: 'US Relations', value: 85, fill: '#3b82f6' },
    { name: 'China Tensions', value: 72, fill: '#ef4444' },
    { name: 'EU Partnership', value: 78, fill: '#10b981' },
    { name: 'Russia Ties', value: 65, fill: '#f59e0b' },
    { name: 'ASEAN Cooperation', value: 82, fill: '#8b5cf6' }
  ]

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 0.7) return 'text-green-500'
    if (sentiment >= 0.5) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getVolatilityColor = (volatility) => {
    switch(volatility) {
      case 'stable': return 'text-green-500'
      case 'moderate': return 'text-yellow-500'
      case 'high': return 'text-orange-500'
      case 'critical': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Real-time Indicators */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Activity className="w-10 h-10" />
                Live Impact Dashboard
              </h1>
              <p className="text-blue-100 text-lg">
                Real-time geopolitical analysis powered by AI sentiment analysis
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mt-6 lg:mt-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live</span>
                </div>
                <div className="text-sm">
                  Last updated: {realTimeData.lastUpdate.toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-xs text-blue-100">Active Events</div>
                  <div className="text-2xl font-bold">
                    <CountUp end={realTimeData.activeEvents} duration={2} />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-xs text-blue-100">Sentiment Score</div>
                  <div className="text-2xl font-bold">
                    {(realTimeData.sentimentScore * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Impact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            className={`relative overflow-hidden rounded-2xl ${metric.bgColor} ${metric.borderColor} border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:${metric.ringColor} hover:ring-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${metric.color} bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getVolatilityColor(metric.volatility)} bg-white/80 dark:bg-gray-800/80`}>
                  {metric.volatility}
                </span>
                <Brain className={`w-4 h-4 ${getSentimentColor(metric.sentiment)}`} />
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {metric.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.description}
                </p>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </span>
                <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {metric.details}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">Sentiment:</div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getSentimentColor(metric.sentiment).replace('text-', 'bg-')}`}
                      style={{ width: `${metric.sentiment * 100}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs ${getSentimentColor(metric.sentiment)}`}>
                    {(metric.sentiment * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {selectedMetric === metric.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="space-y-2">
                    {metric.subMetrics.map((sub, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{sub.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{sub.value}</span>
                          <span className={`text-xs ${sub.change.startsWith('+') ? 'text-green-500' : sub.change.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>
                            {sub.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      {/* Impact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {impactMetrics.map((metric, index) => {
          const IconComponent = metric.icon
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 
                         transform hover:-translate-y-1 cursor-pointer group
                         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              {/* Header with Icon and Trend */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor} ${metric.borderColor} border group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 ${metric.color}`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-semibold">{metric.change}</span>
                </div>
              </div>
              
              {/* Title and Description */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                  {metric.title}
                </h3>
                <p className="text-sm" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                  {metric.description}
                </p>
              </div>
              
              {/* Impact Score with CountUp Animation */}
              <div className="flex items-baseline space-x-2 mb-4">
                <div className="text-4xl font-bold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                  <CountUp end={parseFloat(metric.value)} duration={2} decimals={1} />
                </div>
                <div className="text-lg" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>/10</div>
              </div>
              
              {/* Details */}
              <p className="text-sm mb-4" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                {metric.details}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    metric.trend === 'up' 
                      ? 'bg-gradient-to-r from-green-400 to-green-600' 
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(parseFloat(metric.value) / 10) * 100}%` }}
                  transition={{ duration: 2, delay: 0.5 }}
                ></motion.div>
              </div>
              
              {/* Status */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`font-medium capitalize ${metric.color}`}>
                    {metric.trend === 'up' ? 'Improving' : 'Declining'}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Economic Trends Chart */}
        <motion.div 
          className={`p-6 rounded-2xl border shadow-lg ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
              Economic Impact Trends
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
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
                stroke="#3B82F6" 
                fill="url(#colorImpact)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Regional Impact Distribution */}
        <motion.div 
          className={`p-6 rounded-2xl border shadow-lg ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
              Regional Impact Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={regionImpactData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelStyle={{ fontSize: '12px', fill: darkMode ? '#ffffff' : '#111827' }}
              >
                {regionImpactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Sector Impact Comparison */}
      <motion.div 
        className={`p-6 rounded-2xl border shadow-lg mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-purple-500" />
          <span style={{ color: darkMode ? '#ffffff' : '#111827' }}>Sector Impact Analysis</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {sectorImpactData.map((sector, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <span className="text-sm font-medium" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                  {sector.sector}
                </span>
              </div>
              <div className="relative h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <motion.div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${sector.current}%` }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                />
                <div className="absolute top-2 left-2 text-xs font-semibold text-white">
                  <CountUp end={sector.current} duration={2} />%
                </div>
              </div>
              <div className="mt-1 text-xs" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
                {sector.current > sector.previous ? '+' : ''}{sector.current - sector.previous}% vs last month
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Economic Indicators */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className={`p-4 rounded-xl text-center border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } shadow hover:shadow-md transition-shadow`}>
          <div className="text-2xl font-bold text-blue-600">
            ₹<CountUp end={82.45} duration={2} decimals={2} />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">USD Exchange</div>
        </div>
        <div className={`p-4 rounded-xl text-center border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } shadow hover:shadow-md transition-shadow`}>
          <div className="text-2xl font-bold text-green-600">
            +<CountUp end={2.3} duration={2} decimals={1} />%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">GDP Growth</div>
        </div>
        <div className={`p-4 rounded-xl text-center border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } shadow hover:shadow-md transition-shadow`}>
          <div className="text-2xl font-bold text-orange-600">
            <CountUp end={1200000} duration={2} separator="," />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Students Abroad</div>
        </div>
        <div className={`p-4 rounded-xl text-center border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } shadow hover:shadow-md transition-shadow`}>
          <div className="text-2xl font-bold text-purple-600">
            <CountUp end={45} duration={2} />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Trade Partners</div>
        </div>
      </motion.div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        {/* Multi-Dimensional Impact Chart */}
        <motion.div 
          className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Multi-Dimensional Impact Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Comprehensive view of all impact factors over time
              </p>
            </div>
            <div className="flex gap-2">
              {['7d', '30d', '90d', '1y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    timeFilter === period
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={advancedChartData}>
                <defs>
                  <linearGradient id="economicGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="strategicGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="economic"
                  stackId="1"
                  stroke="#ef4444"
                  fill="url(#economicGradient)"
                  name="Economic Impact"
                />
                <Area
                  type="monotone"
                  dataKey="strategic"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#strategicGradient)"
                  name="Strategic Position"
                />
                <Line
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  name="Sentiment Score"
                  yAxisId="right"
                />
                <Bar
                  dataKey="volatility"
                  fill="#f59e0b"
                  name="Volatility Index"
                  opacity={0.7}
                />
                <ReferenceLine y={7} stroke="#ef4444" strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Real-time Events Feed */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Live Events
            </h3>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Real-time</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {realTimeEvents.map((event) => (
              <motion.div
                key={event.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      event.impact === 'Critical' ? 'bg-red-500' :
                      event.impact === 'High' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    } animate-pulse`}></div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      event.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                      event.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {event.impact}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{event.time}</span>
                </div>
                
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {event.title}
                </h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {event.category}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {event.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className={`w-3 h-3 ${getSentimentColor(event.sentiment)}`} />
                    <span className={`text-xs ${getSentimentColor(event.sentiment)}`}>
                      {(event.sentiment * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <button className="w-full py-3 text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium">
              View All Events
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sentiment Analysis Dashboard */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Advanced Sentiment Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              AI-powered sentiment tracking across all geopolitical events
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Neutral</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Negative</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sentimentAnalysisData}>
              <defs>
                <linearGradient id="positiveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="negativeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="neutralGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b7280" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6b7280" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="positive"
                stackId="1"
                stroke="#10b981"
                fill="url(#positiveGrad)"
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stackId="1"
                stroke="#6b7280"
                fill="url(#neutralGrad)"
              />
              <Area
                type="monotone"
                dataKey="negative"
                stackId="1"
                stroke="#ef4444"
                fill="url(#negativeGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Insights Panel */}
      <motion.div 
        className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800 p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              AI-Powered Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Machine learning analysis of current geopolitical trends
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900 dark:text-white">Key Prediction</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Economic tensions likely to stabilize within 2-3 weeks based on historical patterns
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-gray-900 dark:text-white">Risk Alert</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Monitor China-Taiwan developments - 73% probability of impact on Indian tech sector
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900 dark:text-white">Opportunity</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              QUAD partnership strengthening suggests 15% increase in strategic cooperation
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
