import { useState, useEffect } from 'react'
import Header from './components/Header'
import HamburgerMenu from './components/HamburgerMenu'
import Dashboard from './components/Dashboard'
import SectorAnalytics from './components/SectorAnalytics'
import KPIMetrics from './components/KPIMetrics'
import EconomicAnalysis from './components/EconomicAnalysis'
import ImpactCards from './components/ImpactCards'
import RealTimeNewsSection from './components/RealTimeNewsSection'
import StudyAbroadSection from './components/StudyAbroadSection'
import { useRealTimeNews } from './hooks/useRealTimeNews'
import { useAlertSystem } from './hooks/useAlertSystem'
import './index.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentSection, setCurrentSection] = useState('dashboard') // Navigation state
  
  // Get news data for the alert system
  const { news } = useRealTimeNews()
  
  // Initialize alert system
  const alertSystem = useAlertSystem()

  // Process news for alerts when it changes
  useEffect(() => {
    if (news && news.length > 0) {
      alertSystem.processNewsForAlerts(news)
    }
  }, [news, alertSystem.processNewsForAlerts])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  // Function to handle section changes
  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId)
    // Smooth scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Function to render current section content
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <>
            <ImpactCards darkMode={darkMode} />
            <Dashboard darkMode={darkMode} />
          </>
        )
      case 'sector-analytics':
        return <SectorAnalytics darkMode={darkMode} />
      case 'kpi-metrics':
        return <KPIMetrics darkMode={darkMode} />
      case 'economic-analysis':
        return <EconomicAnalysis darkMode={darkMode} />
      case 'news':
        return <RealTimeNewsSection darkMode={darkMode} />
      case 'study-abroad':
        return <StudyAbroadSection darkMode={darkMode} />
      case 'timeline':
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Timeline Feature</h2>
            <p className="text-gray-600">Coming soon - Interactive timeline of geopolitical events</p>
          </div>
        )
      case 'about':
        return (
          <div className="max-w-4xl mx-auto py-20">
            <h2 className="text-3xl font-bold mb-8 text-center">
              About <span style={{ color: '#FF6B35' }}>Geo</span>
              <span style={{ color: '#0066CC' }}>Imp</span>
              <span style={{ color: '#228B22' }}>act</span>
            </h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-600 text-lg">
                GeoImpact is a comprehensive platform analyzing how global geopolitical events 
                affect India's economy, education, and strategic interests. Built for students, 
                researchers, and policy makers to understand complex international relationships.
              </p>
            </div>
          </div>
        )
      default:
        return (
          <>
            <Dashboard darkMode={darkMode} />
            <EconomicAnalysis darkMode={darkMode} />
            <ImpactCards darkMode={darkMode} />
            <RealTimeNewsSection darkMode={darkMode} />
            <StudyAbroadSection darkMode={darkMode} />
          </>
        )
    }
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div 
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: darkMode ? '#111827' : '#ffffff' }}
      >
        {/* Header with Hamburger Menu */}
        <div className="relative">
          {/* Hamburger Menu */}
          <div className="fixed top-4 left-4 z-50">
            <HamburgerMenu 
              currentSection={currentSection}
              onSectionChange={handleSectionChange}
              darkMode={darkMode}
            />
          </div>
          
          {/* Header */}
          <Header 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            currentTime={currentTime}
            alertSystem={alertSystem}
            newsData={news}
          />
        </div>
        
        {/* Main Content - Section Based */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: darkMode ? '#111827' : '#f8fafc' }}>
          {renderCurrentSection()}
        </main>
      </div>
    </div>
  )
}

export default App
