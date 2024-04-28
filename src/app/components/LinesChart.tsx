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
import { use, useContext, useEffect, useRef, useState } from "react";
import { getRelativePosition } from "chart.js/helpers";
import { DashboardGraphsContext } from "../providers/DashboardProvider";
import { Graph } from "../models/Graph";

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
  66, 64, 62, 60, 63, 66, 70, 74, 78, 82,
];
var minutos = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30,
];

export default function LinesChart() {
  
  const chartRef = useRef(null);

  var id = null;

  const {uploadedData, dataX, updateDataX, updatePercentageX} = useContext(DashboardGraphsContext);

  // var midata = {
  //   labels: minutos,
  //   datasets: [
  //     // Cada una de las líneas del gráfico
  //     {
  //       label: "Pulsaciones",
  //       data: pulsaciones,
  //       tension: 0.5,
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       pointRadius: 5,
  //       pointBorderColor: "rgba(255, 99, 132)",
  //       pointBackgroundColor: "rgba(255, 99, 132)",
  //     },
  //   ],
  // };

  //console.log(uploadedData?.session?.signals[0].labels[0])

  var midata = {
    //labels: uploadedData !== null && uploadedData.session.signals[0].labels[0] ? uploadedData.session.signals[0].labels[0] : minutos,
    labels: minutos,
    datasets: [{
      label: "Pulsaciones",
      data: pulsaciones,
      tension: 0.5,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
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
      var dataXAux: number;
      var label: number;
      var value: number;
      var dataY: number;
  
      const canvasPosition = getRelativePosition(e, chart);
  
      // Substitute the appropriate scale IDs
      dataXAux = chart.scales.x.getValueForPixel(canvasPosition.x);
      dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
  
      label = chart.config.data.labels[dataXAux];
      value = chart.config.data.datasets[0].data[dataXAux];
  
      console.log({
        dataX: dataXAux,
        label: label,
        dataY: dataY,
        value: value,
      });
  
      //console.log(chart)

      console.log({percentageX: e.x/ chart.width})

      updatePercentageX(e.x / chart.width)
      
      
      
      updateDataX(label);
      dataY = value;
      id = chart.id;

      
    },
  };

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

      <div className="display flex flex row">
        <div className="display flex flex col">
          <p> DataX label: </p>
          {dataX && <p> {dataX} </p>}
        </div>
        {/* <div className="display flex flex col">
          <p> DataY value: </p>
          {dataY && <p> {dataY} </p>}
        </div> */}
      </div>
    </div>
  );
}
