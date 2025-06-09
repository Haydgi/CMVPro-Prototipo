import React from 'react';
import './Dashboard.css';

const RecipeCount = ({ recipes }) => {
  const uniqueRecipes = [...new Set(recipes.map(i => i.name))].length;

  return (
    <div className="chart-card compact">
      <h3>Receitas Cadastrados</h3>
      <div className="metric-value">
        {uniqueRecipes}
        <span className="metric-label">Receitas únicos</span>
      </div>
    </div>
  );
};

export default RecipeCount;