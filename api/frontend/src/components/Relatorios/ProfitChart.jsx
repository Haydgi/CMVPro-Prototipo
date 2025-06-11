import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css';

const ProfitChart = ({ recipes }) => {
  const [filter, setFilter] = useState('mais');

  // Ordena receitas conforme filtro
  const sorted = [...recipes].sort((a, b) =>
    filter === 'mais'
      ? b.cost * (b.profitMargin / 100) - a.cost * (a.profitMargin / 100)
      : a.cost * (a.profitMargin / 100) - b.cost * (b.profitMargin / 100)
  );

  // Top 5 conforme filtro
  const data = sorted.slice(0, 5).map(r => ({
    name: r.name.length > 15 ? `${r.name.substring(0, 12)}...` : r.name,
    lucro: r.cost * (r.profitMargin / 100),
    custo: r.cost
  }));

  return (
    <div className={`${styles['chart-card']} ${styles['full-width']}`}>
      <div className={styles['chart-header']}>
        <h3 className={styles['chart-title']}>Top 5 Receitas</h3>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={styles['ingredient-select']}
        >
          <option value="mais">Mais lucrativas</option>
          <option value="menos">Menos lucrativas</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ left: 30, right: 20 }}
        >
          <XAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="number"
            tick={{ fontSize: 12 }}
            label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <Tooltip
            formatter={(value, name) =>
              [`R$ ${value.toFixed(2)}`, name]
            }
          />
          <Bar
            dataKey="lucro"
            name="Lucro"
            fill="var(--secondary)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="custo"
            name="Custo"
            fill="var(--primary)"
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitChart;