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
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      {/* Linha 1 - Histórico */}
      <div className={styles.row}>
        <IngredientHistory ingredients={ingredients} />
      </div>

      {/* Linha 2 - Lucro Por Receita */}
      <div className={styles.row}>
        <ProfitChart recipes={recipes} />
      </div>

      {/* Linha 3 - Ingredientes com Maior Desperdício /// Desperdício Médio */}
      <div className={styles.row}>
        <WasteChart ingredients={ingredients} />
        <AvgWaste ingredients={ingredients} />
      </div>

      {/* Linha 4 - Tempo Médio Por Categoria */}
      <div className={styles.row}>
        <TimeChart recipes={recipes} />
      </div>

      {/* Linha 5 - Receitas Cadastradas /// Ingredientes Cadastrados /// Distribuição Por Categoria */}
      <div className={styles.row}>
        <RecipeCount recipes={recipes} />
        <IngredientCount ingredients={ingredients} />
        <CategoriesChart recipes={recipes} />
      </div>

      {/* Linha 6 - Ingredientes Subutilizados */}
      <div className={styles.row}>
        <UnderusedIngredients recipes={recipes} ingredients={ingredients} />
      </div>
    </div>
  );
};

export default Dashboard;