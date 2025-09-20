import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  TrendingUp, 
  Newspaper, 
  GraduationCap, 
  Info, 
  Settings,
  Globe,
  BarChart3,
  Calendar,
  Search,
  Target,
  Activity
} from 'lucide-react';

const HamburgerMenu = ({ currentSection, onSectionChange, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      description: 'Overview & Quick Metrics',
      color: 'text-blue-600'
    },
    { 
      id: 'sector-analytics', 
      label: 'Sector Analytics', 
      icon: Activity, 
      description: 'Stock Market Style Performance',
      color: 'text-emerald-600'
    },
    { 
      id: 'kpi-metrics', 
      label: 'KPI Metrics', 
      icon: Target, 
      description: 'Detailed Impact Analysis',
      color: 'text-cyan-600'
    },
    { 
      id: 'economic-analysis', 
      label: 'Economic Analysis', 
      icon: TrendingUp, 
      description: 'Comprehensive Economic Data & Trends',
      color: 'text-green-600'
    },
    { 
      id: 'news', 
      label: 'Live News', 
      icon: Newspaper, 
      description: 'Real-time Geopolitical Updates',
      color: 'text-red-600'
    },
    { 
      id: 'study-abroad', 
      label: 'Study Abroad', 
      icon: GraduationCap, 
      description: 'University & Visa Analysis',
      color: 'text-purple-600'
    },
    { 
      id: 'timeline', 
      label: 'Timeline', 
      icon: Calendar, 
      description: 'Historical Events',
      color: 'text-orange-600'
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: Info, 
      description: 'Project Information',
      color: 'text-gray-600'
    }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        onClick={toggleMenu}
        className={`relative z-50 p-3 rounded-lg transition-all duration-200 ${
          darkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-900'
        } shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed left-0 top-0 h-full w-80 z-50 flex flex-col ${
              darkMode 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-200'
            } border-r shadow-2xl`}
          >
            {/* Menu Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    GeoImpact
                  </h2>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Geopolitical Analysis Hub
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Navigation Items */}
            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id)}
                    className={`w-full px-6 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? `${darkMode ? 'bg-gray-800' : 'bg-blue-50'} ${
                            darkMode ? 'border-blue-500' : 'border-blue-200'
                          } border-r-4`
                        : `${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isActive 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
                          : `${darkMode ? 'bg-gray-700' : 'bg-gray-100'} ${item.color}`
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-sm ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        } ${isActive ? 'text-blue-600' : ''}`}>
                          {item.label}
                        </div>
                        <div className={`text-xs truncate ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Menu Footer */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Made for Academic Excellence
                </div>
                <motion.button
                  className={`p-2 rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  } transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;