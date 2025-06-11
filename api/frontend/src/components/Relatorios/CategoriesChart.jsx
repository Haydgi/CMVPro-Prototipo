import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css';

const COLORS = [
  'var(--primary)',
  'var(--secondary)',
  'var(--primary-light)',
  'var(--secondary-dark)',
  'var(--accent)'
];

const CategoriesChart = ({ recipes }) => {
  const categoryCount = recipes.reduce((acc, recipe) => {
    acc[recipe.category] = (acc[recipe.category] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(categoryCount).map(category => ({
    name: category,
    value: categoryCount[category]
  }));

  return (
    <div className={`${styles['chart-card']} ${styles.compact}`}>
      <h3 className={styles['chart-title']}>Distribuição por Categoria</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name }) => name}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} receitas`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoriesChart;