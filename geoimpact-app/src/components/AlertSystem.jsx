import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, BellRing, Settings, Volume2, VolumeX, 
  AlertTriangle, CheckCircle, X, Filter,
  Clock, Zap, Shield, Info
} from 'lucide-react';
import { useAlertSystem } from '../hooks/useAlertSystem';
import { formatDistanceToNow } from 'date-fns';

const AlertSystem = ({ newsData = [] }) => {
  const {
    alerts,
    preferences,
    isNotificationPermissionGranted,
    processNewsForAlerts,
    requestNotificationPermission,
    acknowledgeAlert,
    clearAllAlerts,
    updatePreferences,
    getUnacknowledgedAlerts,
    testAlert,
    ALERT_PRIORITIES
  } = useAlertSystem();

  const [showSettings, setShowSettings] = useState(false);
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState(1);

  // Process news data for alerts when it changes
  useEffect(() => {
    if (newsData && newsData.length > 0) {
      processNewsForAlerts(newsData);
    }
  }, [newsData, processNewsForAlerts]);

  const unacknowledgedAlerts = getUnacknowledgedAlerts();
  const filteredAlerts = alerts.filter(alert => alert.priority >= selectedPriorityFilter);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 5: return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 4: return <Zap className="w-5 h-5 text-orange-600" />;
      case 3: return <Shield className="w-5 h-5 text-yellow-600" />;
      case 2: return <Bell className="w-5 h-5 text-blue-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 5: return 'bg-red-100 border-red-500 text-red-800';
      case 4: return 'bg-orange-100 border-orange-500 text-orange-800';
      case 3: return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 2: return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const handlePermissionRequest = async () => {
    await requestNotificationPermission();
  };

  const handleTestAlert = () => {
    testAlert(4); // Test with high priority
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Alert Bell Icon */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(!showSettings)}
          className={`p-3 rounded-full shadow-lg transition-all ${
            unacknowledgedAlerts.length > 0 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {unacknowledgedAlerts.length > 0 ? (
            <BellRing className="w-6 h-6" />
          ) : (
            <Bell className="w-6 h-6" />
          )}
          
          {unacknowledgedAlerts.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {unacknowledgedAlerts.length > 9 ? '9+' : unacknowledgedAlerts.length}
            </span>
          )}
        </motion.button>

        {/* Breaking Alert Banner */}
        <AnimatePresence>
          {unacknowledgedAlerts.some(alert => alert.priority >= 4) && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute top-0 right-16 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg min-w-80 max-w-96"
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

      {/* Alert Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20 }}
            className="absolute top-16 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 w-96 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BellRing className="w-5 h-5" />
                  Alert Center
                </h3>
                <div className="flex items-center gap-2">
                  {/* Notification Permission */}
                  {!isNotificationPermissionGranted && (
                    <button
                      onClick={handlePermissionRequest}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      Enable Notifications
                    </button>
                  )}
                  
                  {/* Sound Toggle */}
                  <button
                    onClick={() => updatePreferences({ enableSounds: !preferences.enableSounds })}
                    className={`p-2 rounded-lg transition-colors ${
                      preferences.enableSounds 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {preferences.enableSounds ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  {/* Test Alert */}
                  <button
                    onClick={handleTestAlert}
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
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
                  className="text-sm border border-gray-300 rounded-lg px-2 py-1"
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
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors ml-auto"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Alerts List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredAlerts.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No alerts to display</p>
                  <p className="text-xs mt-1">
                    {alerts.length === 0 ? 'Monitoring for breaking news...' : 'Try adjusting filters'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !alert.acknowledged ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getPriorityIcon(alert.priority)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                              {alert.priorityInfo.name}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDistanceToNow(alert.timestamp)} ago
                            </span>
                          </div>
                          
                          <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                            {alert.article.title}
                          </h4>
                          
                          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {alert.article.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-600 font-medium">
                              {alert.article.category}
                            </span>
                            
                            {!alert.acknowledged && (
                              <button
                                onClick={() => acknowledgeAlert(alert.id)}
                                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition-colors flex items-center gap-1"
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

            {/* Settings Panel */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Alert Preferences
                </h4>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={preferences.enableNotifications}
                      onChange={(e) => updatePreferences({ enableNotifications: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    Browser Notifications
                  </label>
                  
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={preferences.enableSounds}
                      onChange={(e) => updatePreferences({ enableSounds: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    Sound Alerts
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Priority
                  </label>
                  <select
                    value={preferences.minPriority}
                    onChange={(e) => updatePreferences({ minPriority: parseInt(e.target.value) })}
                    className="w-full text-sm border border-gray-300 rounded-lg px-2 py-1"
                  >
                    <option value={1}>All Alerts</option>
                    <option value={2}>Low & Above</option>
                    <option value={3}>Medium & Above</option>
                    <option value={4}>High & Above</option>
                    <option value={5}>Critical Only</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertSystem;
