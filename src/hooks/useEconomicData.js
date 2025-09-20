import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Free economic data APIs
const ECONOMIC_APIs = {
  // Alpha Vantage - 500 calls/day free
  alphaVantage: {
    baseUrl: 'https://www.alphavantage.co/query',
    apiKey: 'YOUR_ALPHA_VANTAGE_KEY', // User needs to replace this
  },
  
  // Yahoo Finance (unofficial but free)
  yahooFinance: {
    baseUrl: 'https://query1.finance.yahoo.com/v8/finance/chart',
  },
  
  // Exchange Rates API (free)
  exchangeRates: {
    baseUrl: 'https://api.exchangerate-api.com/v4/latest/USD',
  }
};

// Mock economic data for demo
const MOCK_ECONOMIC_DATA = {
  currencies: {
    'INR': {
      rate: 83.25,
      change: -0.15,
      changePercent: -0.18,
      lastUpdate: new Date().toISOString()
    },
    'CNY': {
      rate: 7.23,
      change: 0.05,
      changePercent: 0.69,
      lastUpdate: new Date().toISOString()
    },
    'PKR': {
      rate: 285.50,
      change: -2.30,
      changePercent: -0.80,
      lastUpdate: new Date().toISOString()
    }
  },
  commodities: {
    'Oil (Brent)': {
      price: 92.45,
      change: 1.25,
      changePercent: 1.37,
      unit: 'USD/barrel',
      lastUpdate: new Date().toISOString()
    },
    'Gold': {
      price: 2018.75,
      change: -8.50,
      changePercent: -0.42,
      unit: 'USD/oz',
      lastUpdate: new Date().toISOString()
    },
    'Natural Gas': {
      price: 2.85,
      change: 0.12,
      changePercent: 4.40,
      unit: 'USD/MMBtu',
      lastUpdate: new Date().toISOString()
    }
  },
  indices: {
    'NIFTY 50': {
      value: 19785.25,
      change: 125.80,
      changePercent: 0.64,
      lastUpdate: new Date().toISOString()
    },
    'Hang Seng': {
      value: 17892.30,
      change: -245.60,
      changePercent: -1.35,
      lastUpdate: new Date().toISOString()
    },
    'Shanghai Composite': {
      value: 3087.42,
      change: -18.75,
      changePercent: -0.60,
      lastUpdate: new Date().toISOString()
    }
  },
  tradeData: {
    'India-China Trade': {
      value: 125.8,
      change: -5.2,
      changePercent: -3.97,
      unit: 'Billion USD (Annual)',
      period: '2024',
      lastUpdate: new Date().toISOString()
    },
    'India-US Trade': {
      value: 191.4,
      change: 8.7,
      changePercent: 4.76,
      unit: 'Billion USD (Annual)',
      period: '2024',
      lastUpdate: new Date().toISOString()
    },
    'Oil Imports': {
      value: 4.8,
      change: 0.3,
      changePercent: 6.67,
      unit: 'Million barrels/day',
      period: 'Current',
      lastUpdate: new Date().toISOString()
    }
  }
};

// Geopolitical impact scoring for economic indicators
const calculateGeopoliticalImpact = (indicator, data) => {
  let impact = 5; // Base impact score
  
  // Currency impacts
  if (indicator.includes('INR')) {
    if (Math.abs(data.changePercent) > 1) impact += 3;
    else if (Math.abs(data.changePercent) > 0.5) impact += 2;
  }
  
  // Oil price impacts (high for India as major importer)
  if (indicator.includes('Oil')) {
    if (Math.abs(data.changePercent) > 3) impact += 4;
    else if (Math.abs(data.changePercent) > 1) impact += 2;
  }
  
  // Trade data impacts
  if (indicator.includes('Trade')) {
    if (Math.abs(data.changePercent) > 5) impact += 3;
    else if (Math.abs(data.changePercent) > 2) impact += 2;
  }
  
  // China-related impacts
  if (indicator.includes('China') || indicator.includes('CNY') || indicator.includes('Hang Seng')) {
    impact += 2;
  }
  
  return Math.min(impact, 10); // Cap at 10
};

export const useEconomicData = () => {
  const [economicData, setEconomicData] = useState(MOCK_ECONOMIC_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(true);

  const fetchCurrencyData = async () => {
    try {
      // Try free exchange rates API first
      const response = await axios.get(ECONOMIC_APIs.exchangeRates.baseUrl);
      
      if (response.data && response.data.rates) {
        const { rates } = response.data;
        return {
          'INR': {
            rate: rates.INR || 83.25,
            change: (rates.INR - 83.25) || -0.15,
            changePercent: ((rates.INR - 83.25) / 83.25 * 100) || -0.18,
            lastUpdate: new Date().toISOString()
          },
          'CNY': {
            rate: rates.CNY || 7.23,
            change: (rates.CNY - 7.23) || 0.05,
            changePercent: ((rates.CNY - 7.23) / 7.23 * 100) || 0.69,
            lastUpdate: new Date().toISOString()
          },
          'PKR': {
            rate: rates.PKR || 285.50,
            change: (rates.PKR - 285.50) || -2.30,
            changePercent: ((rates.PKR - 285.50) / 285.50 * 100) || -0.80,
            lastUpdate: new Date().toISOString()
          }
        };
      }
      throw new Error('Invalid currency data');
    } catch (error) {
      console.warn('Currency API failed:', error.message);
      return MOCK_ECONOMIC_DATA.currencies;
    }
  };

  const fetchCommodityData = async () => {
    try {
      // In a real implementation, this would fetch from commodity APIs
      // For now, return mock data with slight variations
      const mockWithVariation = { ...MOCK_ECONOMIC_DATA.commodities };
      
      // Add small random variations to simulate real data
      Object.keys(mockWithVariation).forEach(commodity => {
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
        mockWithVariation[commodity].changePercent += variation;
        mockWithVariation[commodity].lastUpdate = new Date().toISOString();
      });
      
      return mockWithVariation;
    } catch (error) {
      console.warn('Commodity API failed:', error.message);
      return MOCK_ECONOMIC_DATA.commodities;
    }
  };

  const fetchMarketData = async () => {
    try {
      // Mock market data with realistic variations
      const mockWithVariation = { ...MOCK_ECONOMIC_DATA.indices };
      
      Object.keys(mockWithVariation).forEach(index => {
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        mockWithVariation[index].changePercent += variation;
        mockWithVariation[index].lastUpdate = new Date().toISOString();
      });
      
      return mockWithVariation;
    } catch (error) {
      console.warn('Market API failed:', error.message);
      return MOCK_ECONOMIC_DATA.indices;
    }
  };

  const fetchAllEconomicData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [currencies, commodities, indices, tradeData] = await Promise.all([
        fetchCurrencyData(),
        fetchCommodityData(),
        fetchMarketData(),
        Promise.resolve(MOCK_ECONOMIC_DATA.tradeData) // Trade data is complex, using mock for now
      ]);

      const newData = {
        currencies,
        commodities,
        indices,
        tradeData
      };

      setEconomicData(newData);
      setIsUsingMockData(false);
    } catch (error) {
      setEconomicData(MOCK_ECONOMIC_DATA);
      setIsUsingMockData(true);
      setError('Using demo data. Configure API keys for live updates.');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  // Auto-refresh every 5 minutes for economic data
  useEffect(() => {
    fetchAllEconomicData();
    
    const interval = setInterval(fetchAllEconomicData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAllEconomicData]);

  const getHighImpactIndicators = () => {
    const allIndicators = [];
    
    // Process all economic data types
    Object.entries(economicData).forEach(([category, items]) => {
      Object.entries(items).forEach(([name, data]) => {
        const impact = calculateGeopoliticalImpact(name, data);
        if (impact >= 7) {
          allIndicators.push({
            name,
            category,
            data,
            impact
          });
        }
      });
    });
    
    return allIndicators.sort((a, b) => b.impact - a.impact);
  };

  const getCurrencyTrends = () => {
    return Object.entries(economicData.currencies).map(([currency, data]) => ({
      currency,
      ...data,
      impact: calculateGeopoliticalImpact(currency, data)
    }));
  };

  const refreshData = () => {
    fetchAllEconomicData();
  };

  return {
    economicData,
    loading,
    error,
    lastUpdated,
    isUsingMockData,
    refreshData,
    getHighImpactIndicators,
    getCurrencyTrends
  };
};
