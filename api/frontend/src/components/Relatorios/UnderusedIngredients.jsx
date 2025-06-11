import React from 'react';
import styles from './Dashboard.module.css';

const UnderusedIngredients = ({ ingredients, recipes }) => {
  // 1. Pegar apenas a versão mais recente de cada ingrediente
  const latestIngredients = [...ingredients]
    .sort((a, b) => new Date(b.createdAt || '2024-01-01') - new Date(a.createdAt || '2024-01-01'))
    .filter((ing, index, self) => 
      index === self.findIndex(i => i.name === ing.name)
    );

  // 2. Lista de ingredientes usados nas receitas (considerando todas as versões)
  const usedIngredients = new Set();
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => usedIngredients.add(ing.name));
  });

  // 3. Filtra ingredientes não utilizados
  const underused = latestIngredients
    .filter(ing => !usedIngredients.has(ing.name));

  // 4. Mensagem quando não houver ingredientes subutilizados
  if (underused.length === 0) {
    return (
      <div className={`${styles['chart-card']} ${styles['compact']} ${styles['list-card']}`}>
        <h3 className={styles['chart-title']}>Ingredientes Subutilizados</h3>
        <p className={styles['no-data-message']}>
          Todos os ingredientes estão sendo utilizados em receitas
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles['chart-card']} ${styles['compact']} ${styles['list-card']}`}>
      <h3 className={styles['chart-title']}>Ingredientes Subutilizados</h3>
      <ul className={styles['ingredient-list']}>
        {underused.map(ing => (
          <li key={ing.name} className={styles['ingredient-item']}>
            <span className={styles['ing-name']}>{ing.name}</span>
            <span className={styles['ing-category']}>{ing.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnderusedIngredients;