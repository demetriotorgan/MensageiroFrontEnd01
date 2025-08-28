import React from 'react'
import '../../styles/Campanha/GraficoPizza.css'

import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const GraficoPizza = ({medias}) => {
     // Transformando em dados para o gráfico
  const data = [
    { name: "Grupo 1", value: medias.grupo1 },
    { name: "Grupo 2", value: medias.grupo2 },
    { name: "Grupo 3", value: medias.grupo3 },
  ];

  const COLORS = ["#29fd53", "#3399ff", "#ff9933"];
  return (
    <>
    <div className="grafico-container">
    <div>
      <h3>Distribuição das Médias</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
    </div>
    </>
  )
}

export default GraficoPizza