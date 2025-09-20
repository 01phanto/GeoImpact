import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { motion } from 'framer-motion'

const SectorAnalytics = ({ darkMode }) => {
  // Professional Stock Market Style Data for Sector Performance - Monthly 2025 Data
  const sectorTimeSeriesData = [
    { 
      sector: 'Technology', 
      current: 85, 
      change: '+12.4%', 
      trend: 'up',
      data: [
        { time: 'Jan', value: 75.2, volume: 1200, date: 'January 2025' },
        { time: 'Feb', value: 76.8, volume: 1350, date: 'February 2025' },
        { time: 'Mar', value: 78.1, volume: 1100, date: 'March 2025' },
        { time: 'Apr', value: 79.5, volume: 980, date: 'April 2025' },
        { time: 'May', value: 81.2, volume: 1420, date: 'May 2025' },
        { time: 'Jun', value: 82.7, volume: 1680, date: 'June 2025' },
        { time: 'Jul', value: 83.9, volume: 1590, date: 'July 2025' },
        { time: 'Aug', value: 84.5, volume: 1750, date: 'August 2025' },
        { time: 'Sep', value: 85.0, volume: 1820, date: 'September 2025' }
      ],
      color: '#10B981',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      sector: 'Manufacturing',
      current: 72,
      change: '-5.2%',
      trend: 'down',
      data: [
        { time: 'Jan', value: 76.0, volume: 890, date: 'January 2025' },
        { time: 'Feb', value: 75.5, volume: 920, date: 'February 2025' },
        { time: 'Mar', value: 74.8, volume: 1050, date: 'March 2025' },
        { time: 'Apr', value: 74.2, volume: 980, date: 'April 2025' },
        { time: 'May', value: 73.8, volume: 1120, date: 'May 2025' },
        { time: 'Jun', value: 73.1, volume: 1380, date: 'June 2025' },
        { time: 'Jul', value: 72.6, volume: 1250, date: 'July 2025' },
        { time: 'Aug', value: 72.3, volume: 1320, date: 'August 2025' },
        { time: 'Sep', value: 72.0, volume: 1280, date: 'September 2025' }
      ],
      color: '#EF4444',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      sector: 'Agriculture',
      current: 68,
      change: '+8.7%',
      trend: 'up',
      data: [
        { time: 'Jan', value: 62.5, volume: 760, date: 'January 2025' },
        { time: 'Feb', value: 63.2, volume: 820, date: 'February 2025' },
        { time: 'Mar', value: 64.1, volume: 790, date: 'March 2025' },
        { time: 'Apr', value: 65.0, volume: 850, date: 'April 2025' },
        { time: 'May', value: 65.8, volume: 930, date: 'May 2025' },
        { time: 'Jun', value: 66.5, volume: 1080, date: 'June 2025' },
        { time: 'Jul', value: 67.2, volume: 990, date: 'July 2025' },
        { time: 'Aug', value: 67.8, volume: 1150, date: 'August 2025' },
        { time: 'Sep', value: 68.0, volume: 1200, date: 'September 2025' }
      ],
      color: '#F59E0B',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      sector: 'Services',
      current: 90,
      change: '+6.2%',
      trend: 'up',
      data: [
        { time: 'Jan', value: 84.8, volume: 1450, date: 'January 2025' },
        { time: 'Feb', value: 85.5, volume: 1520, date: 'February 2025' },
        { time: 'Mar', value: 86.2, volume: 1380, date: 'March 2025' },
        { time: 'Apr', value: 87.0, volume: 1420, date: 'April 2025' },
        { time: 'May', value: 87.8, volume: 1680, date: 'May 2025' },
        { time: 'Jun', value: 88.5, volume: 1750, date: 'June 2025' },
        { time: 'Jul', value: 89.1, volume: 1620, date: 'July 2025' },
        { time: 'Aug', value: 89.6, volume: 1820, date: 'August 2025' },
        { time: 'Sep', value: 90.0, volume: 1900, date: 'September 2025' }
      ],
      color: '#3B82F6',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      sector: 'Energy',
      current: 76,
      change: '-3.8%',
      trend: 'down',
      data: [
        { time: 'Jan', value: 79.0, volume: 1120, date: 'January 2025' },
        { time: 'Feb', value: 78.5, volume: 1180, date: 'February 2025' },
        { time: 'Mar', value: 78.0, volume: 1250, date: 'March 2025' },
        { time: 'Apr', value: 77.5, volume: 1320, date: 'April 2025' },
        { time: 'May', value: 77.0, volume: 1280, date: 'May 2025' },
        { time: 'Jun', value: 76.8, volume: 1450, date: 'June 2025' },
        { time: 'Jul', value: 76.5, volume: 1380, date: 'July 2025' },
        { time: 'Aug', value: 76.2, volume: 1420, date: 'August 2025' },
        { time: 'Sep', value: 76.0, volume: 1380, date: 'September 2025' }
      ],
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  return (
    <div className="mb-12">
      {/* Professional Stock Market Style Sector Analysis */}
      <motion.div 
        className={`p-6 rounded-2xl border shadow-lg mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-emerald-500" />
          <span style={{ color: darkMode ? '#ffffff' : '#111827' }}>Sector Performance Analytics - 2025</span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">MONTHLY TRENDS</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sectorTimeSeriesData.map((sector, index) => (
            <motion.div
              key={index}
              className={`${sector.bgColor} border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-all duration-300`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Sector Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {sector.sector}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {sector.current}
                    </span>
                    <div className={`flex items-center space-x-1 ${sector.textColor}`}>
                      {sector.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{sector.change}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Latest Month</div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Sep 2025</div>
                </div>
              </div>

              {/* Professional Line Chart */}
              <div className="h-32 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sector.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: darkMode ? '#9ca3af' : '#6b7280' }}
                    />
                    <YAxis 
                      hide
                      domain={['dataMin - 2', 'dataMax + 2']}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontSize: '12px'
                      }}
                      labelStyle={{ color: darkMode ? '#ffffff' : '#111827' }}
                      formatter={(value, name) => [
                        `${value.toFixed(1)}%`,
                        'Impact Score'
                      ]}
                      labelFormatter={(label) => {
                        const monthData = sector.data.find(d => d.time === label);
                        return monthData ? monthData.date : label;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={sector.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ 
                        r: 4, 
                        fill: sector.color,
                        stroke: '#ffffff',
                        strokeWidth: 2
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Volume Bar Chart */}
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sector.data}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '11px'
                      }}
                      formatter={(value, name) => [`${value}K`, 'Monthly Volume']}
                      labelFormatter={(label) => {
                        const monthData = sector.data.find(d => d.time === label);
                        return monthData ? monthData.date : label;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke={sector.color}
                      fill={sector.color}
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Trading Stats */}
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <span>Vol: {sector.data[sector.data.length - 1].volume}K</span>
                <span>Range: {Math.min(...sector.data.map(d => d.value))}-{Math.max(...sector.data.map(d => d.value))}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Market Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-bold text-emerald-600">3↑</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Sectors Rising</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-bold text-red-600">2↓</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Sectors Declining</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-bold text-blue-600">78.2</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Score Sep</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-bold text-purple-600">7.5K</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Sep Volume</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-bold text-gray-600 dark:text-gray-300">+3.7%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">YTD Change</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SectorAnalytics