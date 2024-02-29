"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var oxigenoEnSangre = [
  98, 97, 95, 92, 90, 88, 87, 85, 82, 80, 78, 76, 75, 74, 72, 71, 70, 69, 68,
  67, 65, 63, 62, 60, 58, 57, 55, 54, 52,
];
var minutos = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

var options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
    },
    x: {
      ticks: { color: "rgba(0, 220, 195)" },
    },
  },
};

var midata = {
  labels: minutos,
  datasets: [
    {
      label: "Oxígeno en sangre (%)",
      data: oxigenoEnSangre,
      backgroundColor: "rgba(0, 220, 195, 0.5)",
    },
  ],
};

export default function Bars() {
  return (
    <div
      className="bg-light px-2 border border-2 border-black h-[55vh] w-[95vh]" 
    >
      <p className="m-2">
        <b>Ejemplo #2: </b>Gráfico de barras
      </p>

      <Bar className= "w-fit" data={midata} options={options} />
    </div>
  );
}
