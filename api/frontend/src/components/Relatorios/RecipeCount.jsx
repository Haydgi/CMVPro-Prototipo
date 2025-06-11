import React from 'react';
import styles from './Dashboard.module.css';

const RecipeCount = ({ recipes }) => {
  const uniqueRecipes = [...new Set(recipes.map(i => i.name))].length;

  return (
    <div className={`${styles['chart-card']} ${styles.compact}`}>
      <h3 className={styles['chart-title']}>Receitas Cadastradas</h3>
      <div className={styles['metric-value']}>
        {uniqueRecipes}
        <span className={styles['metric-label']}>Receitas únicas</span>
      </div>
    </div>
  );
};

export default RecipeCount;