import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const COLORS = [
  'var(--primary)',
  'var(--primary-light)',
  'var(--accent)',
  'var(--secondary)',
  'var(--secondary-dark)'
];

const CostImpactChart = ({ recipes, ingredients }) => {
  // Lógica otimizada para cálculo real do impacto
  const ingredientImpact = {};
  
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const fullIngredient = ingredients.find(i => i.name === ing.name);
      if (fullIngredient) {
        if (!ingredientImpact[ing.name]) {
          ingredientImpact[ing.name] = 0;
        }
        ingredientImpact[ing.name] += ing.quantity * fullIngredient.costPerUnit;
      }
    });
  });

  const data = Object.entries(ingredientImpact)
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="chart-card compact">
      <h3>Ingredientes com Maior Impacto no Custo</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name }) => name}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`R$ ${value}`, 'Custo Total']}
            labelFormatter={(name) => `Ingrediente: ${name}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostImpactChart;