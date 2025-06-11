import React from 'react';
import './Dashboard.css';

const IngredientCount = ({ ingredients }) => {
  const uniqueIngredients = [...new Set(ingredients.map(i => i.name))].length;

  return (
    <div className="chart-card compact">
      <h3>Ingredientes Cadastrados</h3>
      <div className="metric-value">
        {uniqueIngredients}
        <span className="metric-label">ingredientes únicos</span>
      </div>
    </div>
  );
};

export default IngredientCount;