import { Moon, Sun, Bell, BellRing, Search, Globe, Volume2, VolumeX, Settings, AlertTriangle, CheckCircle, X, Filter, Clock } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

const Header = ({ darkMode, setDarkMode, currentTime, alertSystem }) => {
  const [showAlertPanel, setShowAlertPanel] = useState(false)
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState(1)

  const logoPath = '/GeoImpact/geoimpact-logo.svg'

  // Get alert system data if provided
  const {
    alerts = [],
    preferences = { enableNotifications: true, enableSounds: true, minPriority: 3 },
    isNotificationPermissionGranted = false,
    requestNotificationPermission = () => {},
    acknowledgeAlert = () => {},
    clearAllAlerts = () => {},
    updatePreferences = () => {},
    testAlert = () => {},
    getUnacknowledgedAlerts = () => []
  } = alertSystem || {}

  const unacknowledgedAlerts = getUnacknowledgedAlerts()
  const filteredAlerts = alerts.filter(alert => alert.priority >= selectedPriorityFilter)

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 5: return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 4: return <Bell className="w-4 h-4 text-orange-600" />;
      case 3: return <Bell className="w-4 h-4 text-yellow-600" />;
      case 2: return <Bell className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 5: return 'bg-red-100 border-red-500 text-red-800';
      case 4: return 'bg-orange-100 border-orange-500 text-orange-800';
      case 3: return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 2: return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  }

  const handleTestAlert = () => {
    if (testAlert) testAlert(4)
  }
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            {/* Logo - Using your beautiful GeoImpact logo */}
            <div className="relative">
              <img 
                src="/geoimpact-logo.svg" 
                alt="GeoImpact Logo" 
                className="h-16 w-16"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">
                <span style={{ color: '#FF6B35' }}>Geo</span>
                <span style={{ color: '#0066CC' }}>Imp</span>
                <span style={{ color: '#228B22' }}>act</span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                How Geopolitics Impact India
              </p>
            </div>
          </div>

          {/* Search Bar */}
          {/* Logo */}
          <div className="flex items-center">
            <img src={logoPath} alt="GeoImpact Logo" className="h-8 w-auto mr-4" />
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search geopolitical events, countries, impacts..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200
                         hover:bg-white dark:hover:bg-gray-600"
              />
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 
                          text-green-800 dark:text-green-200 px-4 py-2 rounded-full border border-green-200 dark:border-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">LIVE</span>
            </div>

            {/* Enhanced Alert System */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAlertPanel(!showAlertPanel)}
                className={`relative p-3 rounded-xl transition-all duration-200 ${
                  unacknowledgedAlerts.length > 0 
                    ? 'text-red-600 bg-red-50 hover:bg-red-100 animate-pulse' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {unacknowledgedAlerts.length > 0 ? (
                  <BellRing className="w-6 h-6" />
                ) : (
                  <Bell className="w-6 h-6" />
                )}
                
                {unacknowledgedAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {unacknowledgedAlerts.length > 9 ? '9+' : unacknowledgedAlerts.length}
                  </span>
                )}
              </motion.button>

              {/* Alert Panel */}
              <AnimatePresence>
                {showAlertPanel && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-16 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-96 max-h-96 overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <BellRing className="w-5 h-5" />
                          Alert Center
                        </h3>
                        <div className="flex items-center gap-2">
                          {/* Notification Permission */}
                          {!isNotificationPermissionGranted && (
                            <button
                              onClick={requestNotificationPermission}
                              className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                            >
                              Enable Notifications
                            </button>
                          )}
                          
                          {/* Sound Toggle */}
                          <button
                            onClick={() => updatePreferences({ enableSounds: !preferences.enableSounds })}
                            className={`p-2 rounded-lg transition-colors ${
                              preferences.enableSounds 
                                ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {preferences.enableSounds ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                          </button>

                          {/* Test Alert */}
                          <button
                            onClick={handleTestAlert}
                            className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                          >
                            Test
                          </button>
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="flex items-center gap-2 mt-3">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                          value={selectedPriorityFilter}
                          onChange={(e) => setSelectedPriorityFilter(parseInt(e.target.value))}
                          className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value={1}>All Alerts</option>
                          <option value={2}>Low & Above</option>
                          <option value={3}>Medium & Above</option>
                          <option value={4}>High & Above</option>
                          <option value={5}>Critical Only</option>
                        </select>

                        {alerts.length > 0 && (
                          <button
                            onClick={clearAllAlerts}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ml-auto"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Alerts List */}
                    <div className="max-h-80 overflow-y-auto">
                      {filteredAlerts.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No alerts to display</p>
                          <p className="text-xs mt-1">
                            {alerts.length === 0 ? 'Monitoring for breaking news...' : 'Try adjusting filters'}
                          </p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          {filteredAlerts.slice(0, 10).map((alert, index) => (
                            <motion.div
                              key={alert.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                !alert.acknowledged ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {getPriorityIcon(alert.priority)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                                      {alert.priorityInfo?.name || 'Alert'}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {formatDistanceToNow(alert.timestamp)} ago
                                    </span>
                                  </div>
                                  
                                  <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
                                    {alert.article.title}
                                  </h4>
                                  
                                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                                    {alert.article.description}
                                  </p>

                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                      {alert.article.category}
                                    </span>
                                    
                                    {!alert.acknowledged && (
                                      <button
                                        onClick={() => acknowledgeAlert(alert.id)}
                                        className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center gap-1"
                                      >
                                        <CheckCircle className="w-3 h-3" />
                                        Dismiss
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Breaking Alert Banner */}
              <AnimatePresence>
                {unacknowledgedAlerts.some(alert => alert.priority >= 4) && !showAlertPanel && (
                  <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    className="absolute top-0 right-16 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg min-w-80 max-w-96 z-40"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 mt-0.5 animate-pulse" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">BREAKING ALERT</h4>
                        <p className="text-sm opacity-90">
                          {unacknowledgedAlerts.find(alert => alert.priority >= 4)?.article.title}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const criticalAlert = unacknowledgedAlerts.find(alert => alert.priority >= 4);
                          if (criticalAlert) acknowledgeAlert(criticalAlert.id);
                        }}
                        className="text-white hover:text-gray-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                       hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            {/* Time display */}
            <div className="hidden lg:block text-sm bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl border">
              <div className="font-medium text-gray-900 dark:text-white">{currentTime.toLocaleDateString()}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events, countries..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
