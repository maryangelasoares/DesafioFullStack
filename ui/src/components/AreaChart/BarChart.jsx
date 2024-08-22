/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Dados para o gráfico de barras
const salesData = [
  {
    name: 'Jan',
    AprovadoMG: 4000,
    ReprovadoMG: 2400,
    Reenviado: 4000,
    profit: 2400,
    revenue: 4000,
    // profit: 2400,
    // revenue: 4000,
    // profit: 2400,
    // profit: 2400,
  },
  {
    name: 'Fev',
    revenue: 3000,
    profit: 1398,
  },
  {
    name: 'Mar',
    revenue: 9800,
    profit: 2000,
  },
  {
    name: 'Apr',
    revenue: 3908,
    profit: 2780,
  },
  {
    name: 'May',
    revenue: 4800,
    profit: 1890,
  },
  {
    name: 'Jun',
    revenue: 3800,
    profit: 2390,
  },
];

// Componente CustomTooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:
            <span className="ml-2"> {entry.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Componente do gráfico de barras
const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={salesData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="AprovadoMG" fill="#3D978F" />
        <Bar dataKey="ReprovadoMG" fill="#FF6961" />
        <Bar dataKey="ReenviadoMG" fill="#dedb0e" />
        <Bar dataKey="AprovadoRJ" fill="#3D978F" />
        <Bar dataKey="ReprovadoRJ" fill="#FF6961" />
        <Bar dataKey="ReenviadoRJ" fill="#dedb0e" />
        <Bar dataKey="AprovadoPB" fill="#3D978F" />
        <Bar dataKey="ReprovadoPB" fill="#FF6961" />
        <Bar dataKey="ReenviadoPB" fill="#dedb0e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
