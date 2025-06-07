import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const TimeChart = ({ recipes }) => {
  const categoryTimes = recipes.reduce((acc, recipe) => {
    if (!acc[recipe.category]) {
      acc[recipe.category] = { total: 0, count: 0 };
    }
    acc[recipe.category].total += recipe.tempoDePreparo;
    acc[recipe.category].count++;
    return acc;
  }, {});

  const data = Object.keys(categoryTimes).map(category => ({
    name: category,
    tempo: Math.round(categoryTimes[category].total / categoryTimes[category].count)
  })).sort((a, b) => b.tempo - a.tempo);

  return (
    <div className="chart-card">
      <h3>Tempo Médio por Categoria</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value} min`, 'Tempo']} />
          <Bar 
  dataKey="tempo" 
  fill="var(--primary-light)" 
  radius={[4, 4, 0, 0]} 
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeChart;