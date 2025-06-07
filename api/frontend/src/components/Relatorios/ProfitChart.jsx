import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const ProfitChart = ({ recipes }) => {
  const data = recipes
    .map(r => ({
      name: r.name.length > 15 ? `${r.name.substring(0, 12)}...` : r.name,
      lucro: r.cost * (r.profitMargin / 100),
      custo: r.cost
    }))
    .sort((a, b) => b.lucro - a.lucro);

  return (
    <div className="chart-card">
      <h3>Lucro Estimado por Receita</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 30, right: 20 }}
        >
          <XAxis 
            type="number" 
            label={{ value: 'Valor (R$)', position: 'insideBottom' }} 
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={80} 
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value, name) => 
              name === 'Lucro' 
                ? [`R$ ${value.toFixed(2)}`, name]
                : [`R$ ${value.toFixed(2)}`, name]
            }
          />
          <Bar 
          dataKey="lucro" 
          name="Lucro"
          fill="var(--secondary)" 
          radius={[0, 4, 4, 0]} 
        />
        <Bar 
          dataKey="custo" 
          name="Custo"
          fill="var(--primary)" 
          radius={[0, 4, 4, 0]}
          opacity={0.8}
        />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitChart;