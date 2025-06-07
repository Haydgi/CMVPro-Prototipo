import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const IngredientHistory = ({ ingredients }) => {
  const [selectedIngredient, setSelectedIngredient] = useState('Arroz Arbóreo');

  // Agrupa todas as versões históricas do ingrediente selecionado
  const historicalData = ingredients
    .filter(ing => ing.name === selectedIngredient)
    .sort((a, b) => new Date(a.createdAt || '2024-01-01') - new Date(b.createdAt || '2024-01-01'))
    .map(ing => ({
      date: ing.createdAt?.split('-').reverse().join('/') || 'N/A',
      cost: ing.costPerUnit,
      waste: ing.wasteRate
    }));

  // Lista de ingredientes únicos para o dropdown
  const uniqueIngredients = [...new Set(ingredients.map(i => i.name))].sort();

  return (
    <div className="chart-card full-width">
      <div className="chart-header">
        <h3>Custo Histórico do Ingrediente</h3>
        <select 
          value={selectedIngredient} 
          onChange={(e) => setSelectedIngredient(e.target.value)}
          className="ingredient-select"
        >
          {uniqueIngredients.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={historicalData}>
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" label={{ value: 'Custo (R$)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Desperdício (%)', angle: 90, position: 'insideRight' }} />
          <Tooltip 
            formatter={(value, name) => name === 'Custo' 
              ? [`R$ ${Number(value).toFixed(2)}`, name] 
              : [`${value}%`, name]
            }
          />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="cost" 
            name="Custo por Unidade" 
            stroke="var(--primary)" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="waste" 
            name="Taxa de Desperdício" 
            stroke="var(--secondary-dark)" 
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IngredientHistory;