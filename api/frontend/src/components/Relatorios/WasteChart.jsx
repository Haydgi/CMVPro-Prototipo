import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const WasteChart = ({ ingredients }) => {
  const latestIngredients = [...ingredients]
    .sort((a, b) => new Date(b.createdAt || '2024-01-01') - new Date(a.createdAt || '2024-01-01'))
    .filter((ing, index, self) => 
      index === self.findIndex(i => i.name === ing.name)
    );

  const data = latestIngredients
    .map(ing => ({
      name: ing.name,
      desperdicio: ing.wasteRate
    }))
    .sort((a, b) => b.desperdicio - a.desperdicio)
    .slice(0, 5);

  return (
    <div className="chart-card compact">
      <h3>Top 5 Ingredientes com Maior Desperdício</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="name" type="category" width={80} />
          <Tooltip formatter={(value) => [`${value}%`, 'Desperdício']} />
          <Bar 
  dataKey="desperdicio" 
  fill="var(--primary-dark)" 
  radius={[0, 4, 4, 0]} 
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteChart;