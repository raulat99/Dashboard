"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var pulsaciones = [
  72, 75, 78, 82, 85, 88, 90, 92, 91, 89, 86, 84, 82, 79, 76, 74, 72, 70, 68,
  66, 64, 62, 60, 63, 66, 70, 74, 78, 82,72, 75, 78, 82, 85, 88, 90, 92, 91, 89, 86, 84, 82, 79, 76, 74, 72, 70, 68,
  66, 64, 62, 60, 63, 66, 70, 74, 78, 82,
];
var minutos = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
];

var midata = {
  labels: minutos,
  datasets: [
    // Cada una de las líneas del gráfico
    {
      label: "Pulsaciones",
      data: pulsaciones,
      tension: 0.5,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 1,
      pointBorderColor: "rgba(255, 99, 132)",
      pointBackgroundColor: "rgba(255, 99, 132)",
    },
  ],
};

// Opciones del gráfico ()
var misoptions = {
  responsive: true,   
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0, // Mínimo valor del eje Y en 0
    },
    x: {
      ticks: { color: "rgb(255, 99, 132)" },
    },
  },
};

export default function LinesChart() {
  return (
    <div
      className="bg-light mx-16 border border-1 border-black h-[28vh] "

      // className="w-full md:col-span-2 relative lg:h-[25vh] h-[50vh] m-auto p-4 border rounded-lg bg-white"
    >
      <p className="p-2" ><b>Ejemplo #1: </b>Gráfico de líneas básico</p>

        <Line className="pb-10" data={midata} options={misoptions} />
      
    </div>
  );
}
