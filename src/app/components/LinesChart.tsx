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
import { use, useEffect, useRef, useState } from "react";
import { getRelativePosition } from "chart.js/helpers";
import Statistics from "./Statistics";

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

var dataX: number;
var label: number;
var dataY: number;
var value: number;

var pulsaciones = [
  72, 75, 78, 82, 85, 88, 90, 92, 91, 89, 86, 84, 82, 79, 76, 74, 72, 70, 68,
  66, 64, 62, 60, 63, 66, 70, 74, 78, 82,
];
var minutos = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30,
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
      min: 0,
      ticks: { color: "rgb(255, 99, 132)" },
    },
  },
  onClick: (e: any) => {
    console.log(e);

    var chart = e.chart;

    const canvasPosition = getRelativePosition(e, chart);

    // Substitute the appropriate scale IDs
    dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
    dataY = chart.scales.y.getValueForPixel(canvasPosition.y);

    label = chart.config.data.labels[dataX];
    value = chart.config.data.datasets[0].data[dataX];

    console.log({
      dataX: dataX,
      label: label,
      dataY: dataY,
      value: value,
    });

    dataX = label;
    dataY = value;
  },
};

export default function LinesChart() {
  const chartRef = useRef(null);
  

  return (
    <div className="display flex flex row h-[28vh] mx-6">
      
      {/* <Statistics dataX={dataX} dataY={dataY} /> */}

      <div className="w-full">
        <Line
          className="pb-10 w-full"
          ref={chartRef}
          data={midata}
          options={misoptions}
        />
      </div>
    </div>
  );
  }