// Sample news data for demonstration
export const sampleNews = [
  {
    title: "Trump Announces New Tariffs on Indian IT Services - Major Impact Expected",
    impact: 8.5,
    source: "Reuters",
    time: "2 hours ago",
    category: "Trade War",
    description: "New 25% tariffs on Indian IT services could affect $50B in annual exports, impacting major companies like TCS, Infosys, and Wipro.",
    affectedSectors: ["Information Technology", "Software Services", "Business Process Outsourcing"],
    trend: "negative"
  },
  {
    title: "Nepal Political Crisis Affects Border Trade Routes with India",
    impact: 6.3,
    source: "Economic Times",
    time: "4 hours ago",
    category: "Regional Politics",
    description: "Political instability in Nepal disrupts key trade corridors, affecting $2.1B bilateral trade and causing delays in essential imports.",
    affectedSectors: ["Agriculture", "Manufacturing", "Transportation"],
    trend: "negative"
  },
  {
    title: "China's Belt Road Initiative Presents New Challenges for Indian Ocean Strategy",
    impact: 7.1,
    source: "The Hindu",
    time: "6 hours ago",
    category: "Strategic",
    description: "China's expanded BRI in South Asia poses strategic challenges for India's maritime interests and regional influence.",
    affectedSectors: ["Defense", "Maritime Trade", "Regional Diplomacy"],
    trend: "negative"
  },
  {
    title: "UK Announces Favorable Visa Changes for Indian Students and Professionals",
    impact: 5.8,
    source: "BBC",
    time: "8 hours ago",
    category: "Education",
    description: "New UK visa policies could benefit 200,000+ Indian students and skilled workers, reversing previous restrictions.",
    affectedSectors: ["Education", "Professional Services", "Migration"],
    trend: "positive"
  },
  {
    title: "Russia-Ukraine Conflict Drives Global Energy Prices Up, Affecting Indian Economy",
    impact: 7.9,
    source: "Bloomberg",
    time: "12 hours ago",
    category: "Energy Crisis",
    description: "Continued conflict pushes oil prices to $95/barrel, increasing India's import bill by $15B annually.",
    affectedSectors: ["Energy", "Transportation", "Manufacturing"],
    trend: "negative"
  },
  {
    title: "QUAD Summit Strengthens India's Strategic Position in Indo-Pacific",
    impact: 6.7,
    source: "Foreign Affairs",
    time: "1 day ago",
    category: "Alliance",
    description: "Enhanced cooperation with US, Japan, and Australia boosts India's regional security and economic partnerships.",
    affectedSectors: ["Defense", "Technology", "Trade"],
    trend: "positive"
  }
]

// Impact data for different sectors
export const impactData = {
  economic: {
    current: 8.5,
    trend: "increasing",
    factors: [
      { name: "Trade Wars", impact: 8.2, change: "+1.2" },
      { name: "Currency Fluctuation", impact: 6.8, change: "-0.5" },
      { name: "Energy Prices", impact: 7.9, change: "+2.1" },
      { name: "Supply Chain", impact: 7.2, change: "+0.8" }
    ]
  },
  political: {
    current: 6.2,
    trend: "stable",
    factors: [
      { name: "Regional Conflicts", impact: 7.5, change: "+0.3" },
      { name: "Diplomatic Relations", impact: 5.8, change: "-0.2" },
      { name: "Alliance Partnerships", impact: 6.7, change: "+1.1" },
      { name: "Border Security", impact: 5.9, change: "+0.1" }
    ]
  },
  education: {
    current: 7.8,
    trend: "mixed",
    factors: [
      { name: "Visa Policies", impact: 8.2, change: "+1.5" },
      { name: "University Partnerships", impact: 7.1, change: "+0.3" },
      { name: "Student Safety", impact: 6.9, change: "-0.7" },
      { name: "Cost of Education", impact: 8.1, change: "+1.2" }
    ]
  },
  strategic: {
    current: 5.4,
    trend: "improving",
    factors: [
      { name: "Military Alliances", impact: 6.8, change: "+1.3" },
      { name: "Tech Partnerships", impact: 7.2, change: "+1.8" },
      { name: "Maritime Security", impact: 5.9, change: "+0.4" },
      { name: "Space Cooperation", impact: 6.5, change: "+0.9" }
    ]
  }
}

// Country relationship data
export const countryRelations = [
  {
    country: "United States",
    flag: "🇺🇸",
    relationship: "Strategic Partner",
    trade: "$119.4B",
    impact: 8.7,
    trend: "improving",
    keyAreas: ["Technology", "Defense", "Trade"]
  },
  {
    country: "China",
    flag: "🇨🇳",
    relationship: "Complex Rivalry",
    trade: "$87.1B",
    impact: 7.9,
    trend: "tense",
    keyAreas: ["Border Security", "Trade", "Technology"]
  },
  {
    country: "Russia",
    flag: "🇷🇺",
    relationship: "Traditional Partner",
    trade: "$13.1B",
    impact: 6.8,
    trend: "cautious",
    keyAreas: ["Energy", "Defense", "Space"]
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    relationship: "Post-Brexit Partner",
    trade: "$17.5B",
    impact: 6.2,
    trend: "improving",
    keyAreas: ["Education", "Finance", "Technology"]
  },
  {
    country: "European Union",
    flag: "🇪🇺",
    relationship: "Trade Partner",
    trade: "$88.2B",
    impact: 7.1,
    trend: "stable",
    keyAreas: ["Trade", "Climate", "Technology"]
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    relationship: "Strategic Partner",
    trade: "$18.8B",
    impact: 6.9,
    trend: "strengthening",
    keyAreas: ["Infrastructure", "Technology", "Defense"]
  }
]

// Study abroad impact data
export const studyAbroadData = [
  {
    country: "United States",
    students: 200000,
    safety: 7.8,
    cost: 8.9,
    opportunities: 9.2,
    visaStatus: "Moderate",
    trend: "stable"
  },
  {
    country: "United Kingdom", 
    students: 55000,
    safety: 8.1,
    cost: 8.7,
    opportunities: 8.5,
    visaStatus: "Improving",
    trend: "positive"
  },
  {
    country: "Canada",
    students: 183000,
    safety: 9.1,
    cost: 7.2,
    opportunities: 8.8,
    visaStatus: "Favorable",
    trend: "positive"
  },
  {
    country: "Australia",
    students: 100000,
    safety: 8.5,
    cost: 8.2,
    opportunities: 8.1,
    visaStatus: "Moderate",
    trend: "stable"
  },
  {
    country: "Germany",
    students: 25000,
    safety: 8.9,
    cost: 6.1,
    opportunities: 7.8,
    visaStatus: "Good",
    trend: "positive"
  }
]

// Economic indicators
export const economicIndicators = {
  exchangeRates: {
    usd: 82.45,
    eur: 88.12,
    gbp: 101.23,
    cny: 11.78,
    jpy: 0.55
  },
  tradeData: {
    exports: "$323.7B",
    imports: "$507.5B",
    deficit: "$183.8B",
    growth: "+2.3%"
  },
  markets: {
    sensex: 65432,
    nifty: 19567,
    change: "+1.2%",
    mood: "bullish"
  }
};
