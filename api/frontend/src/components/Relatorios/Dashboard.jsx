import React from 'react';
import { recipes, ingredients } from '../../Data/recipes';
import ProfitChart from './ProfitChart';
import TimeChart from './TimeChart';
import CostImpactChart from './CostImpactChart';
import WasteChart from './WasteChart';
import IngredientCount from './IngredientCount';
import ComplexRecipes from './ComplexRecipes';
import CategoriesChart from './CategoriesChart';
import UnderusedIngredients from './UnderusedIngredients';
import AvgWaste from './AvgWaste';
import IngredientHistory from './IngredientHistory';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Linha 1 - Gráficos principais */}
      <div className="row">
        <ProfitChart recipes={recipes} />
        <TimeChart recipes={recipes} />
      </div>

      {/* Linha 2 - Métricas compactas */}
      <div className="row compact">
        <CostImpactChart recipes={recipes} ingredients={ingredients} />
        <WasteChart ingredients={ingredients} />
        <IngredientCount ingredients={ingredients} />
      </div>

      {/* Linha 3 - Análises */}
      <div className="row">
        <ComplexRecipes recipes={recipes} />
        <CategoriesChart recipes={recipes} />
        <AvgWaste ingredients={ingredients} />
      </div>

      {/* Linha 4 - Lista */}
      <UnderusedIngredients recipes={recipes} ingredients={ingredients} />

      {/* Linha 5 - Histórico */}
      <IngredientHistory ingredients={ingredients} />
    </div>
  );
};

export default Dashboard;