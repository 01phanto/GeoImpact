import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const Dashboard = ({ darkMode }) => {
  // Essential chart data for main dashboard - detailed analytics moved to hamburger menu
  const sectorImpactData = [
    { sector: 'Technology', current: 85, previous: 78 },
    { sector: 'Manufacturing', current: 72, previous: 75 },
    { sector: 'Agriculture', current: 68, previous: 65 },
    { sector: 'Services', current: 90, previous: 88 },
    { sector: 'Energy', current: 76, previous: 80 }
  ]

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
      {/* Essential Quick View - Moved detailed charts to hamburger menu */}

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
    </div>
  )
}

export default Dashboard
