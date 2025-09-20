import { useState } from 'react'
import { MapPin, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'

const IndiaMap = () => {
  const [selectedState, setSelectedState] = useState(null)

  // State impact data
  const stateImpacts = {
    "Maharashtra": { impact: 8.5, reason: "IT Services Export Hub", sectors: ["Technology", "Manufacturing"] },
    "Karnataka": { impact: 7.2, reason: "Tech Capital Affected", sectors: ["Technology", "Biotechnology"] },
    "Tamil Nadu": { impact: 6.8, reason: "Manufacturing Export Base", sectors: ["Automotive", "Textiles"] },
    "Gujarat": { impact: 9.1, reason: "Trade & Port Operations", sectors: ["Chemicals", "Petroleum"] },
    "West Bengal": { impact: 5.4, reason: "Regional Border Issues", sectors: ["Jute", "Coal"] },
    "Uttar Pradesh": { impact: 4.7, reason: "Agricultural Impact", sectors: ["Agriculture", "Handicrafts"] },
    "Delhi": { impact: 7.8, reason: "Political & Diplomatic Center", sectors: ["Services", "Government"] },
    "Rajasthan": { impact: 5.9, reason: "Tourism & Mining", sectors: ["Tourism", "Mining"] },
    "Punjab": { impact: 6.2, reason: "Agricultural Exports", sectors: ["Agriculture", "Textiles"] },
    "Haryana": { impact: 6.5, reason: "Industrial Belt", sectors: ["Automotive", "Agriculture"] }
  }

  const getImpactColor = (impact) => {
    if (impact >= 8) return "#EF4444" // red-500
    if (impact >= 6) return "#F59E0B" // yellow-500
    return "#10B981" // green-500
  }

  const getImpactLevel = (impact) => {
    if (impact >= 8) return "High"
    if (impact >= 6) return "Medium"
    return "Low"
  }

  return (
    <div className="impact-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          🗺️ India Impact Zones
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simplified India Map */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
          <svg viewBox="0 0 400 500" className="w-full h-64">
            {/* Simplified India outline */}
            <path
              d="M100,50 L300,50 L350,150 L320,300 L280,450 L120,450 L80,300 L50,150 Z"
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            
            {/* State markers */}
            {Object.entries(stateImpacts).map(([state, data], index) => {
              const positions = {
                "Maharashtra": { x: 180, y: 250 },
                "Karnataka": { x: 170, y: 320 },
                "Tamil Nadu": { x: 190, y: 380 },
                "Gujarat": { x: 130, y: 220 },
                "West Bengal": { x: 280, y: 200 },
                "Uttar Pradesh": { x: 220, y: 150 },
                "Delhi": { x: 200, y: 120 },
                "Rajasthan": { x: 150, y: 180 },
                "Punjab": { x: 180, y: 100 },
                "Haryana": { x: 190, y: 130 }
              }
              
              const pos = positions[state] || { x: 200, y: 200 }
              
              return (
                <g key={state}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="12"
                    fill={getImpactColor(data.impact)}
                    stroke="white"
                    strokeWidth="3"
                    className="cursor-pointer hover:r-16 transition-all duration-200 drop-shadow-md"
                    onClick={() => setSelectedState(selectedState === state ? null : state)}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white pointer-events-none"
                  >
                    {data.impact}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">High Impact (8+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Medium (6-8)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Low (&lt;6)</span>
            </div>
          </div>
        </div>

        {/* State details */}
        <div className="space-y-4">
          {selectedState ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                📍 {selectedState}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Impact Level:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg" style={{ color: getImpactColor(stateImpacts[selectedState].impact) }}>
                      {stateImpacts[selectedState].impact}/10
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stateImpacts[selectedState].impact >= 8 ? 'bg-red-100 text-red-800' :
                      stateImpacts[selectedState].impact >= 6 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {getImpactLevel(stateImpacts[selectedState].impact)}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Reason:</span>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {stateImpacts[selectedState].reason}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Key Sectors:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {stateImpacts[selectedState].sectors.map((sector, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                Click on any state marker to view detailed impact analysis
              </p>
            </div>
          )}

          {/* Top affected states */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
              Most Affected States
            </h4>
            <div className="space-y-2">
              {Object.entries(stateImpacts)
                .sort(([,a], [,b]) => b.impact - a.impact)
                .slice(0, 5)
                .map(([state, data]) => (
                  <div key={state} className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{state}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{data.impact}/10</span>
                      {data.impact >= 7 ? 
                        <TrendingUp className="w-3 h-3 text-red-500" /> : 
                        <TrendingDown className="w-3 h-3 text-green-500" />
                      }
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndiaMap
