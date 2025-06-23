import React, { useState, useEffect } from 'react';
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
    const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Ao montar o componente, lê o userId do localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId)); // converte string para número
    }
  }, []);


  return (
    <div className={styles.dashboard}>
      {/* Linha 1 - Histórico IngredientHistory */}
      <div className={styles.row}>
        <IngredientHistory ingredients={ingredients} />
      </div>

      {/* Linha 2 - Lucro Por Receita: ProfitChart*/}
      <div className={styles.row}>
        <ProfitChart userId={userId} />
      </div>

      {/* Linha 3 - Ingredientes com Maior Desperdício WasteChart /// Desperdício Médio AvgWaste */}
      <div className={styles.row}>
        <WasteChart userId={userId}/>
        <AvgWaste userId={userId} />
      </div>

      {/* Linha 4 - Tempo Médio Por Categoria TimeChart  */}
      <div className={styles.row}>
        <TimeChart userId={userId} />
      </div>

      {/* Linha 5 - Receitas Cadastradas: RecipeCount recipes /// Ingredientes Cadastrados IngredientCount ingredients /// Distribuição Por Categoria: CategoriesChart recipes */}
      <div className={styles.row}>
        <RecipeCount userId={userId} />
        <IngredientCount userId={userId} />
        <CategoriesChart userId={userId} />
      </div>

      {/* Linha 6 - Ingredientes Subutilizados: UnderusedIngredients recipes */}
      <div className={styles.row}>
        <UnderusedIngredients recipes={recipes} ingredients={ingredients} />
      </div>
    </div>
  );
};

export default Dashboard;