import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaFilter } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const WasteChart = ({ ingredients }) => {
  const [filter, setFilter] = useState('maior');
  const [showOptions, setShowOptions] = useState(false); // Controla a visibilidade das opções
  const [menuAnimation, setMenuAnimation] = useState(''); // Controla a animação do menu

  const toggleMenu = () => {
    if (showOptions) {
      setMenuAnimation('exit'); // Aplica a animação de saída
      setTimeout(() => setShowOptions(false), 300); // Fecha o menu após a animação
    } else {
      setShowOptions(true);
      setMenuAnimation('enter'); // Aplica a animação de entrada
    }
  };

  // Pega a versão mais recente de cada ingrediente
  const latestIngredients = [...ingredients]
    .sort((a, b) => new Date(b.createdAt || '2024-01-01') - new Date(a.createdAt || '2024-01-01'))
    .filter((ing, index, self) =>
      index === self.findIndex(i => i.name === ing.name)
    );

  // Ordena e filtra top 5 conforme filtro
  const sorted = [...latestIngredients].sort((a, b) =>
    filter === 'maior'
      ? b.wasteRate - a.wasteRate
      : a.wasteRate - b.wasteRate
  );

  const data = sorted
    .map(ing => ({
      name: ing.name,
      desperdicio: ing.wasteRate
    }))
    .slice(0, 5);

  return (
    <div className={`${styles['chart-card']} ${styles['compact']}`}>
      <div className={styles['chart-header']}>
        <h3 className={styles['chart-title-mini']}>
          Desperdício de Ingrediente - <span className={styles['filter-marker']}>{filter === 'maior' ? 'Maior' : 'Menor'}</span>
        </h3>
        <div className={styles['select-container']}>
          <button
            className={styles['icon-button']}
            onClick={toggleMenu}
          >
            <FaFilter />
          </button>
          {showOptions && (
            <div className={`${styles['dropdown-menu']} ${styles[menuAnimation]}`}>
              <button
                className={styles['dropdown-item']}
                onClick={() => {
                  setFilter('maior');
                  toggleMenu();
                }}
              >
                Maior desperdício
              </button>
              <button
                className={styles['dropdown-item']}
                onClick={() => {
                  setFilter('menor');
                  toggleMenu();
                }}
              >
                Menor desperdício
              </button>
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
          <YAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`${value}%`, 'Desperdício']} />
          <Bar
            dataKey="desperdicio"
            fill="var(--primary-dark)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteChart;