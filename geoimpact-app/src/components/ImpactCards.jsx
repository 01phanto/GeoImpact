import { AlertTriangle, TrendingUp, TrendingDown, Clock, MapPin, ExternalLink, BarChart3, Zap, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import CountUp from 'react-countup'

const ImpactCards = ({ darkMode }) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [sortBy, setSortBy] = useState('urgency')
  const currentEvents = [
    {
      id: 1,
      title: "Trump's New Tariff Policy",
      category: "Trade War",
      urgency: "high",
      impact: "8.5/10",
      description: "Proposed 25% tariffs on imports could significantly impact India's textile and IT exports",
      lastUpdated: "2 hours ago",
      region: "USA",
      affectedSectors: ["IT Services", "Textiles", "Pharmaceuticals"],
      potentialLoss: "$12.3B",
      timeline: "Q1 2025",
      actionItems: [
        "Monitor WTO response",
        "Diversify export markets",
        "Negotiate bilateral agreements"
      ]
    },
    {
      id: 2,
      title: "Nepal Political Crisis",
      category: "Regional Stability",
      urgency: "medium",
      impact: "6.2/10",
      description: "Political instability in Nepal affecting cross-border trade and security cooperation",
      lastUpdated: "5 hours ago",
      region: "Nepal",
      affectedSectors: ["Border Trade", "Tourism", "Energy"],
      potentialLoss: "$2.1B",
      timeline: "Ongoing",
      actionItems: [
        "Enhance diplomatic engagement",
        "Secure alternative trade routes",
        "Monitor border security"
      ]
    },
    {
      id: 3,
      title: "Student Visa Changes",
      category: "Education Impact",
      urgency: "medium",
      impact: "7.8/10",
      description: "New visa restrictions in key destinations affecting Indian students' abroad plans",
      lastUpdated: "1 day ago",
      region: "Canada, UK",
      affectedSectors: ["Education", "Remittances", "Skilled Migration"],
      potentialLoss: "$5.4B",
      timeline: "2025-2026",
      actionItems: [
        "Explore alternative destinations",
        "Strengthen domestic education",
        "Negotiate education partnerships"
      ]
    }
  ]

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-500 bg-red-100 dark:bg-red-900/30'
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low': return 'text-green-500 bg-green-100 dark:bg-green-900/30'
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getImpactTrend = (impact) => {
    const score = parseFloat(impact.split('/')[0])
    return score >= 7 ? 'high' : score >= 5 ? 'medium' : 'low'
  }

  const getUrgencyScore = (urgency) => {
    switch (urgency) {
      case 'high': return 3
      case 'medium': return 2
      case 'low': return 1
      default: return 0
    }
  }

  const getImpactScore = (impact) => {
    return parseFloat(impact.split('/')[0])
  }

  const sortedEvents = [...currentEvents].sort((a, b) => {
    if (sortBy === 'urgency') {
      return getUrgencyScore(b.urgency) - getUrgencyScore(a.urgency)
    } else if (sortBy === 'impact') {
      return getImpactScore(b.impact) - getImpactScore(a.impact)
    } else if (sortBy === 'timeline') {
      return new Date(a.lastUpdated) - new Date(b.lastUpdated)
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
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Critical Geopolitical Events
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Latest developments that could significantly impact India's interests across multiple sectors
            </p>
          </div>
          
          {/* Sort Controls */}
          <div className="mt-4 md:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-xl border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              <option value="urgency">Sort by Urgency</option>
              <option value="impact">Sort by Impact</option>
              <option value="timeline">Sort by Recent</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Impact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {sortedEvents.map((event, index) => {
          const impactTrend = getImpactTrend(event.impact)
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-2xl border shadow-xl hover:shadow-2xl transition-all duration-300 
                         transform hover:-translate-y-2 cursor-pointer group overflow-hidden
                         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              onClick={() => setSelectedCard(selectedCard === event.id ? null : event.id)}
            >
              {/* Header Section */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`h-6 w-6 ${
                      event.urgency === 'high' ? 'text-red-500' : 
                      event.urgency === 'medium' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getUrgencyColor(event.urgency)}`}>
                      {event.urgency} Priority
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">{event.lastUpdated}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">{event.region}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    event.category === 'Trade War' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    event.category === 'Regional Stability' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {event.category}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {event.description}
                </p>

                {/* Impact Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {impactTrend === 'high' ? (
                        <TrendingUp className="h-5 w-5 text-red-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-yellow-500" />
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Impact Score</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      <CountUp end={parseFloat(event.impact.split('/')[0])} duration={2} decimals={1} />/10
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Potential Loss
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {event.potentialLoss}
                    </div>
                  </div>
                </div>

                {/* Affected Sectors */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Affected Sectors
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.affectedSectors.map((sector, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 
                                 text-xs rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 
                                 transition-colors cursor-pointer"
                      >
                        {sector}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Expandable Action Items */}
                <AnimatePresence>
                  {selectedCard === event.id && (
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Recommended Actions</span>
                      </h4>
                      <ul className="space-y-3">
                        {event.actionItems.map((action, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start space-x-3 text-sm p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-400">{action}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Timeline: <span className="font-medium">{event.timeline}</span>
                  </div>
                  <motion.button 
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 
                               dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-medium">
                      {selectedCard === event.id ? 'Less Details' : 'More Details'}
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ImpactCards
