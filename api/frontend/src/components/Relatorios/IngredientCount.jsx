import React from 'react';
import styles from './Dashboard.module.css';

const IngredientCount = ({ ingredients }) => {
  const uniqueIngredients = [...new Set(ingredients.map(i => i.name))].length;

  return (
    <div className={`${styles['chart-card']} ${styles.compact}`}>
      <h3 className={styles['chart-title']}>Ingredientes Cadastrados</h3>
      <div className={styles['metric-value']}>
        {uniqueIngredients}
        <span className={styles['metric-label']}>ingredientes únicos</span>
      </div>
    </div>
  );
};

export default IngredientCount;