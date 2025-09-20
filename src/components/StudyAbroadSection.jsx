import { GraduationCap, MapPin, DollarSign, TrendingUp, TrendingDown, Users, Calendar, ExternalLink, Star, BarChart3, Globe, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import CountUp from 'react-countup'

const StudyAbroadSection = ({ darkMode }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [sortBy, setSortBy] = useState('students')
  const studyDestinations = [
    {
      id: 1,
      country: "United States",
      flag: "🇺🇸",
      students: "200,000+",
      trend: "declining",
      trendPercent: "-15%",
      avgCost: "$50,000",
      visaStatus: "Restrictive",
      topUniversities: ["MIT", "Stanford", "Harvard"],
      popularCourses: ["Computer Science", "Business", "Engineering"],
      geopoliticalImpact: "High",
      description: "Traditional destination facing new visa challenges and increased costs",
      pros: ["World-class education", "Research opportunities", "Tech industry connections"],
      cons: ["High costs", "Visa restrictions", "Political uncertainty"],
      riskLevel: "Medium-High"
    },
    {
      id: 2,
      country: "Canada",
      flag: "🇨🇦",
      students: "320,000+",
      trend: "stable",
      trendPercent: "+2%",
      avgCost: "$35,000",
      visaStatus: "Moderate",
      topUniversities: ["University of Toronto", "UBC", "McGill"],
      popularCourses: ["Healthcare", "Engineering", "Business"],
      geopoliticalImpact: "Medium",
      description: "Stable option with recent policy changes affecting new applications",
      pros: ["Post-study work permits", "Immigration pathways", "Multicultural society"],
      cons: ["Climate challenges", "Limited job market", "Regional restrictions"],
      riskLevel: "Low-Medium"
    },
    {
      id: 3,
      country: "United Kingdom",
      flag: "🇬🇧",
      students: "118,000+",
      trend: "improving",
      trendPercent: "+8%",
      avgCost: "$45,000",
      visaStatus: "Favorable",
      topUniversities: ["Oxford", "Cambridge", "Imperial College"],
      popularCourses: ["Finance", "Law", "Medicine"],
      geopoliticalImpact: "Low",
      description: "Recovering post-Brexit with new graduate visa schemes",
      pros: ["Shorter degree duration", "Graduate visa route", "Global recognition"],
      cons: ["High living costs", "Weather", "Limited work hours"],
      riskLevel: "Low"
    },
    {
      id: 4,
      country: "Australia",
      flag: "🇦🇺",
      students: "100,000+",
      trend: "improving",
      trendPercent: "+12%",
      avgCost: "$40,000",
      visaStatus: "Favorable",
      topUniversities: ["ANU", "University of Melbourne", "UNSW"],
      popularCourses: ["Mining Engineering", "Healthcare", "Business"],
      geopoliticalImpact: "Low",
      description: "Strong Indo-Pacific relationships driving education partnerships",
      pros: ["Work opportunities", "Quality of life", "Immigration pathways"],
      cons: ["High living costs", "Distance from India", "Limited scholarships"],
      riskLevel: "Low"
    }
  ]

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'stable': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'declining': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'Low-Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'Medium-High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getVisaStatusColor = (status) => {
    switch (status) {
      case 'Favorable': return 'text-green-600'
      case 'Moderate': return 'text-yellow-600'
      case 'Restrictive': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // Sorting functionality
  const sortedDestinations = [...studyDestinations].sort((a, b) => {
    if (sortBy === 'students') {
      return parseInt(b.students.replace(/[^\d]/g, '')) - parseInt(a.students.replace(/[^\d]/g, ''))
    } else if (sortBy === 'cost') {
      return parseInt(a.avgCost.replace(/[^\d]/g, '')) - parseInt(b.avgCost.replace(/[^\d]/g, ''))
    } else if (sortBy === 'risk') {
      const riskOrder = { 'Low': 1, 'Low-Medium': 2, 'Medium-High': 3, 'High': 4 }
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
    }
    return 0
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Study Abroad Impact Analysis
            </h2>
          </div>
          
          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-xl border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              <option value="students">Sort by Student Count</option>
              <option value="cost">Sort by Cost</option>
              <option value="risk">Sort by Risk Level</option>
            </select>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          How geopolitical changes are reshaping education opportunities for Indian students
        </p>
      </motion.div>

      {/* Global Statistics */}
      <motion.div 
        className={`mb-8 p-6 rounded-2xl border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } shadow-lg`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Globe className="h-6 w-6 text-blue-500" />
          <span>Global Education Landscape for Indian Students</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div 
            className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">
              <CountUp end={1.2} duration={2} decimals={1} />M+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Students Abroad</div>
          </motion.div>
          <motion.div 
            className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">
              $<CountUp end={50} duration={2} />B
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Annual Spending</div>
          </motion.div>
          <motion.div 
            className="text-center p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">
              <CountUp end={45} duration={2} />+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Destination Countries</div>
          </motion.div>
          <motion.div 
            className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">
              <CountUp end={68} duration={2} />%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">STEM Fields</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Destination Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {sortedDestinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className={`rounded-2xl border shadow-xl hover:shadow-2xl transition-all duration-300 
                       transform hover:-translate-y-1 cursor-pointer group overflow-hidden
                       ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{destination.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {destination.country}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {destination.students} Indian students
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(destination.trend)}`}>
                    {destination.trend === 'improving' ? '↗' : destination.trend === 'declining' ? '↘' : '→'} {destination.trendPercent}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">vs last year</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl border text-center ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {destination.avgCost}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Avg. Annual Cost</div>
                </div>
                
                <div className={`p-4 rounded-xl border text-center ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className={`text-lg font-bold ${getVisaStatusColor(destination.visaStatus)}`}>
                    {destination.visaStatus}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Visa Status</div>
                </div>
                
                <div className={`p-4 rounded-xl border text-center ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getRiskColor(destination.riskLevel)}`}>
                    {destination.riskLevel}
                  </span>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Risk Level</div>
                </div>
              </div>

              {/* Universities & Courses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Top Universities
                  </h4>
                  <div className="space-y-2">
                    {destination.topUniversities.map((uni, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{uni}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Popular Courses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.popularCourses.map((course, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 
                                 text-xs rounded font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-3">
                    Advantages
                  </h4>
                  <ul className="space-y-2">
                    {destination.pros.map((pro, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">
                    Challenges
                  </h4>
                  <ul className="space-y-2">
                    {destination.cons.map((con, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Geopolitical Impact: <span className="font-medium">{destination.geopoliticalImpact}</span>
                </span>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 
                                 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  <span className="text-sm font-medium">View Details</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <div className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } shadow-lg`}>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Strategic Recommendations for Students
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Diversify Options</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Consider multiple countries to reduce geopolitical risk and maximize opportunities
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Monitor Policies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stay updated on visa and immigration policy changes that could affect your plans
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Plan Early</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Start applications early and have backup plans ready for changing conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyAbroadSection
