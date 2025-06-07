import React from 'react';
import './Dashboard.css';

const AvgWaste = ({ ingredients }) => {
  const latestIngredients = [...ingredients]
    .sort((a, b) => new Date(b.createdAt || '2024-01-01') - new Date(a.createdAt || '2024-01-01'))
    .filter((ing, index, self) => 
      index === self.findIndex(i => i.name === ing.name)
    );

  const avgWaste = latestIngredients.length > 0
    ? (latestIngredients.reduce((sum, ing) => sum + ing.wasteRate, 0) / latestIngredients.length).toFixed(1)
    : 0;

  return (
    <div className="chart-card compact">
      <h3>Desperdício Médio</h3>
      <div className="metric-value large">
        {avgWaste}%
      </div>
      <div className="metric-subtext">Média ponderada do sistema</div>
    </div>
  );
};

export default AvgWaste;