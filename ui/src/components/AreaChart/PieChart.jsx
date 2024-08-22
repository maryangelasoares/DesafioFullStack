/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Componente CustomTooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:
            <span className="ml-2">${entry.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Componente do gráfico de pizza
const PieChartComponent = () => {
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/projetosAcoes/projetosacoes/relatorios/graficos');
        console.log('Dados recebidos:', response); // Log para verificar os dados recebidos
        setPieData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados do gráfico:', error);
      } finally {
        setLoading(false); // Atualize o estado de carregamento
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log('Estado de pieData:', pieData); // Log para verificar o estado de pieData
  }, [pieData]);

  if (loading) {
    return <p>Carregando...</p>; // Mensagem de carregamento
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={Array.isArray(pieData) ? pieData : []} // Certifique-se de que pieData é um array
          cx="50%"
          cy="25%"
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {Array.isArray(pieData) && pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend layout="vertical" align="left" margin-top={100} verticalAlign="top" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
