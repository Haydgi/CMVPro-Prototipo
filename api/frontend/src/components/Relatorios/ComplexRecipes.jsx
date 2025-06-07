import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const ComplexRecipes = ({ recipes }) => {
  const data = [...recipes]
    .sort((a, b) => b.tempoDePreparo - a.tempoDePreparo)
    .slice(0, 5)
    .map(r => ({
      name: r.name,
      tempo: r.tempoDePreparo
    }));

  return (
    <div className="chart-card">
      <h3>Receitas Mais Complexas (Tempo)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value} min`, 'Tempo']} />
          <Bar 
  dataKey="tempo" 
  fill="var(--secondary-dark)" 
  radius={[4, 4, 0, 0]} 
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComplexRecipes;