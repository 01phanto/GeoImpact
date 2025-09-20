import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Color palette for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Currency Trend Chart Component
export const CurrencyTrendChart = ({ data }) => {
  const chartData = data.map((item, index) => ({
    time: `Day ${index + 1}`,
    INR: item.inr || 83.25 + (Math.random() - 0.5) * 2,
    CNY: item.cny || 7.23 + (Math.random() - 0.5) * 0.5,
    PKR: item.pkr || 287.5 + (Math.random() - 0.5) * 10
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Currency Trends vs USD</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="INR" 
            stroke="#FF6B6B" 
            strokeWidth={3}
            dot={{ fill: '#FF6B6B', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="CNY" 
            stroke="#4ECDC4" 
            strokeWidth={3}
            dot={{ fill: '#4ECDC4', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="PKR" 
            stroke="#45B7D1" 
            strokeWidth={3}
            dot={{ fill: '#45B7D1', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Commodity Prices Chart
export const CommodityChart = ({ data }) => {
  const commodityData = [
    { name: 'Crude Oil', price: 88.45, change: 2.3, impact: 'High' },
    { name: 'Gold', price: 2045.20, change: -0.8, impact: 'Medium' },
    { name: 'Natural Gas', price: 3.24, change: 5.2, impact: 'High' },
    { name: 'Coal', price: 145.80, change: 1.7, impact: 'Medium' },
    { name: 'Wheat', price: 687.50, change: -1.2, impact: 'Low' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Commodity Prices Impact</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={commodityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Market Indices Area Chart
export const MarketIndicesChart = ({ data }) => {
  const indicesData = [
    { time: '9 AM', NIFTY: 19750, SENSEX: 66200, HANGSENG: 17800 },
    { time: '10 AM', NIFTY: 19780, SENSEX: 66350, HANGSENG: 17820 },
    { time: '11 AM', NIFTY: 19825, SENSEX: 66480, HANGSENG: 17850 },
    { time: '12 PM', NIFTY: 19800, SENSEX: 66400, HANGSENG: 17830 },
    { time: '1 PM', NIFTY: 19850, SENSEX: 66550, HANGSENG: 17880 },
    { time: '2 PM', NIFTY: 19875, SENSEX: 66600, HANGSENG: 17900 }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Asian Market Indices</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={indicesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="NIFTY"
            stackId="1"
            stroke="#FF6B6B"
            fill="#FF6B6B"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="HANGSENG"
            stackId="2"
            stroke="#4ECDC4"
            fill="#4ECDC4"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Trade Balance Pie Chart
export const TradeBalanceChart = ({ data }) => {
  const tradeData = [
    { name: 'Exports to China', value: 21.5, color: '#0088FE' },
    { name: 'Imports from China', value: 87.4, color: '#00C49F' },
    { name: 'Exports to USA', value: 76.8, color: '#FFBB28' },
    { name: 'Imports from USA', value: 28.9, color: '#FF8042' },
    { name: 'Others', value: 45.2, color: '#8884D8' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Trade Balance Distribution (Billion USD)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={tradeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: $${value}B`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {tradeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Geopolitical Risk Indicator
export const RiskIndicatorChart = ({ data }) => {
  const riskData = [
    { region: 'South Asia', risk: 7.2, trend: 'up' },
    { region: 'East Asia', risk: 6.8, trend: 'down' },
    { region: 'Middle East', risk: 8.5, trend: 'up' },
    { region: 'Europe', risk: 5.2, trend: 'stable' },
    { region: 'Americas', risk: 4.1, trend: 'down' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Geopolitical Risk by Region</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={riskData} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="region" type="category" />
          <Tooltip />
          <Bar dataKey="risk" fill="#FF6B6B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
