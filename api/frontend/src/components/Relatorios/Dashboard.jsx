import React from 'react';
import { recipes, ingredients } from '../../Data/recipes';
import ProfitChart from './ProfitChart';
import TimeChart from './TimeChart';
import RecipeCount from './RecipeCount';
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

      {/* Linha 1 - Histórico */}
      <div className="row">
        <IngredientHistory ingredients={ingredients} />
      </div>

      {/* Linha 2 - Lucro Por Receita */}
      <div className="row">
        <ProfitChart recipes={recipes} />
      </div>

      {/* Linha 3 - Ingredientes com Maior Desperdicio /// Desperdicio Medio */}
      <div className="row ">
        <WasteChart ingredients={ingredients} />
        <AvgWaste ingredients={ingredients} />
      </div>

      {/* Linha 4 - Tempo Medio Por Categoria */}
      <div className="row">
        <TimeChart recipes={recipes} />
      </div>

      {/*<div className="row">
        <ComplexRecipes recipes={recipes} />
      </div>*/}

      {/* Linha 5 - Receitas Cadastradas /// Ingredientes Cadastrados /// Distribuicao Por Categoria */}
      <div className="row">
        <RecipeCount recipes={recipes} />
        <IngredientCount ingredients={ingredients} />
        <CategoriesChart recipes={recipes} />
      </div>

      {/* Linha 6 - Ingredientes Subutilizados */}
      <div className="row">
        <UnderusedIngredients recipes={recipes} ingredients={ingredients} />
      </div>
      
    </div>
  );
};

export default Dashboard;