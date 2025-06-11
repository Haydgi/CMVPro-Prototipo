import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const WasteChart = ({ ingredients }) => {
  const [filter, setFilter] = useState('maior');

  // Pega a versão mais recente de cada ingrediente
  const latestIngredients = [...ingredients]
    .sort((a, b) => new Date(b.createdAt || '2024-01-01') - new Date(a.createdAt || '2024-01-01'))
    .filter((ing, index, self) =>
      index === self.findIndex(i => i.name === ing.name)
    );

  // Ordena e filtra top 5 conforme filtro
  const sorted = [...latestIngredients].sort((a, b) =>
    filter === 'maior'
      ? b.wasteRate - a.wasteRate
      : a.wasteRate - b.wasteRate
  );

  const data = sorted
    .map(ing => ({
      name: ing.name,
      desperdicio: ing.wasteRate
    }))
    .slice(0, 5);

  return (
    <div className="chart-card compact">
      <div className="chart-header">
        <h3>Top 5 Ingredientes</h3>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="ingredient-select"
        >
          <option value="maior">Maior desperdício</option>
          <option value="menor">Menor desperdício</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" type="category" 
          tick={{ fontSize: 22 }}/>
          <YAxis type="number" domain={[0, 100]} 
          tick={{ fontSize: 22 }}/>
          <Tooltip formatter={(value) => [`${value}%`, 'Desperdício']} />
          <Bar
            dataKey="desperdicio"
            fill="var(--primary-dark)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteChart;