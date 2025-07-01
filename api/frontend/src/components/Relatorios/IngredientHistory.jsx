import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './Dashboard.module.css';

const IngredientHistory = ({ usuarioId }) => {
  const [ingredientes, setIngredientes] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [historicalData, setHistoricalData] = useState([]);

  // Buscar lista de ingredientes (únicos) do usuário
  useEffect(() => {
    if (!usuarioId) return;

    const token = localStorage.getItem('token'); // ou o nome que você usa para o token

    axios
      .get(`http://localhost:3001/api/ingredientes?usuario=${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('🟢 Ingredientes recebidos do backend:', res.data);
        const nomesUnicos = [
          ...new Set(res.data.map((ing) => ing.Nome_Ingrediente)),
        ].sort();
        setIngredientes(nomesUnicos);
        if (nomesUnicos.length > 0) setSelectedIngredient(nomesUnicos[0]);
      })
      .catch((err) => {
        console.error('🔴 Erro ao carregar ingredientes:', err);
        setIngredientes([]);
        setSelectedIngredient('');
      });
  }, [usuarioId]);

  // Buscar histórico do ingrediente selecionado
  useEffect(() => {
    if (!selectedIngredient || !usuarioId) return;

    console.log(`🔎 Buscando histórico de "${selectedIngredient}" para o usuário ${usuarioId}`);
    axios
      .get(
        `http://localhost:3001/api/historico-ingredientes/${encodeURIComponent(
          selectedIngredient
        )}/${usuarioId}`
      )
      .then((res) => {
        console.log('🟢 Histórico recebido do backend:', res.data);
        const dadosOrdenados = res.data
          .sort(
            (a, b) =>
              new Date(a.createdAt || '2024-01-01') -
              new Date(b.createdAt || '2024-01-01')
          )
          .map((ing) => ({
            date: ing.createdAt?.split('-').reverse().join('/') || 'N/A',
            cost: ing.costPerUnit,
            waste: ing.wasteRate,
          }));
        console.log('🟡 Histórico formatado para o gráfico:', dadosOrdenados);
        setHistoricalData(dadosOrdenados);
      })
      .catch((err) => {
        console.error('🔴 Erro ao carregar histórico do ingrediente:', err);
        setHistoricalData([]);
      });
  }, [selectedIngredient, usuarioId]);

  if (!usuarioId) {
    console.log('usuarioId não informado:', usuarioId);
    return <p>Informe o usuário para carregar o histórico.</p>;
  }
  if (ingredientes.length === 0) {
    console.log('Lista de ingredientes vazia:', ingredientes);
    return <p>Carregando lista de ingredientes...</p>;
  }
  if (historicalData.length === 0) {
    console.log('Histórico do ingrediente vazio:', historicalData);
    return <p>Carregando histórico do ingrediente selecionado...</p>;
  }

  return (
    <div className={`${styles['chart-card']} ${styles['full-width']}`}>
      <div className={styles['chart-header']}>
        <h3 className={styles['chart-title']}>Custo Histórico do Ingrediente</h3>
        <select
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
          className={styles['ingredient-select']}
        >
          {ingredientes.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={historicalData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            label={{ value: 'Custo (R$)', angle: -90, position: 'insideLeft', fontSize: 12 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'Desperdício (%)', angle: 90, position: 'insideRight', fontSize: 12 }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value, name) =>
              name === 'Custo por Unidade'
                ? [`R$ ${Number(value).toFixed(2)}`, name]
                : [`${value}%`, name]
            }
          />
          <Legend wrapperStyle={{ fontSize: 12 }} verticalAlign="bottom" align="center" />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="cost"
            name="Custo por Unidade"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="waste"
            name="Taxa de Desperdício"
            stroke="var(--secondary-dark)"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IngredientHistory;

