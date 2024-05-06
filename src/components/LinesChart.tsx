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
  Interaction,
} from "chart.js";
import { use, useContext, useEffect, useRef, useState } from "react";
import { getRelativePosition } from "chart.js/helpers";
import {SignalConfig} from "@/models/SignalConfig";
import { plugin } from "mongoose";
import { DashboardGraphsContext, SignalConfigProp } from "../providers/DashboardProvider";
//import { Graph } from "../models/Graph";

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

export interface Graph {

    id: number;
    type: string;
    data: any;

    MousePointerX: number;
    MousePointerY: number;

}

var pulsaciones = [
  72, 75, 78, 82, 85, 88, 90, 92, 91, 89, 86, 84, 82, 79, 76, 74, 72, 70, 68,
  66, 64, 62, 60, 63, 66, 70, 74, 78, 82,
];
var minutos = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30,
];

export default function LinesChart(props: SignalConfig) {
  
  const {name, descripcion, signalID, labels, values} = props.props;

  console.log(props)

  const chartRef = useRef(null);

  var id = null;
  const {dataX, updateDataX, updatePercentageX} = useContext(DashboardGraphsContext);

  // var midata = timeStamps.length !== 0 && coordinateXValues.length !== 0 && coordinateXValues.length !== 0 ?{
  //   //labels: uploadedData !== null && uploadedData.session.signals[0].labels[0] ? uploadedData.session.signals[0].labels[0] : minutos,
  //   labels:  timeStamps,
  //   datasets: [{
  //     label: "Coordinate X",
  //     data: coordinateXValues,
  //     tension: 0.5,
  //     borderColor: "rgb(255, 99, 132)",
  //     backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     pointRadius: 2,
  //     pointBorderColor: "rgba(255, 99, 132)",
  //     pointBackgroundColor: "rgba(255, 99, 132)",
  //   },
  //   {
  //     label: "Coordinate Y",
  //     data: coordinateYValues,
  //     tension: 0.5,
  //     borderColor: "rgb(55, 0, 232)",
  //     backgroundColor: "rgba(55, 0, 232, 0.5)",
  //     pointRadius: 2,
  //     pointBorderColor: "rgba(55, 0, 232)",
  //     pointBackgroundColor: "rgba(55, 0, 232)",
  //   }
  // ],
  // } : {
  //     labels: minutos,
  //     datasets: [
  //       // Cada una de las líneas del gráfico
  //       {
  //         label: "Pulsaciones",
  //         data: pulsaciones,
  //         tension: 0.5,
  //         borderColor: "rgb(255, 99, 132)",
  //         backgroundColor: "rgba(255, 99, 132, 0.5)",
  //         pointRadius: 5,
  //         pointBorderColor: "rgba(255, 99, 132)",
  //         pointBackgroundColor: "rgba(255, 99, 132)",
  //       },
  //     ],
  //   };
  
    var valuesArray : any[] = []
    var auxTimeStamps : number[] = []

    console.log(labels)

    labels.map(()=>{
      valuesArray.push([])  
    })

   values.map((objectValue: any)=>{
            for (let i = 0; i <( objectValue.sample.length); i++) {
              valuesArray[i].push(objectValue.sample[i])
            }
            auxTimeStamps.push(objectValue.timestamp.toFixed(2))
        })             
    const colorArray = ["rgb(255, 99, 132)" ,  "rgb(55, 0, 232)", "rgb(55, 99, 132)", "rgb(55, 99, 232)", "rgb(255, 0, 132)"]

    var midata2 = {
      labels:  auxTimeStamps,
      datasets: labels.map((label: any)=>{
        const indexColor = label.labelId + signalID
        return (
          {
            label: label.value,
            data: valuesArray[label.labelId],
            tension: 0.5,
            borderColor: colorArray[indexColor],
            backgroundColor: colorArray[indexColor],
            pointRadius: 2,
            pointBorderColor: colorArray[indexColor],
            pointBackgroundColor: colorArray[indexColor],
          }
        )
      })
    }
    console.log(midata2)

    // Opciones del gráfico ()
  var misoptions = {
    responsive: true,
    maintainAspectRatio: false,
    redraw: true,
    borderWidth: 1,
    Interaction:{
      mode: 'index',
      intersect: false,
    },
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
      //console.log(e);
  
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
  
      // console.log({
      //   dataX: dataXAux,
      //   label: label,
      //   dataY: dataY,
      //   value: value,
      // });
      //console.log(chart)
      //console.log({percentageX: e.x/ chart.width})

      updatePercentageX(e.x / chart.width)
      updateDataX(label);
      dataY = value;
      id = chart.id;
    },
  };

  return (
    <div className="display flex flex-col h-[38vh] mx-6 my-16 mb-20">
      {/* <Statistics dataX={dataX} dataY={dataY} /> */}
      <div className="display flex flex-col">
      <h2> <b>{signalID}  {name} </b></h2>
      <h2> {descripcion} </h2>
      <h2>  </h2>
      {/* <div className="display flex flex col">
          <p> DataX label: </p>
          {dataX && <p> {dataX} </p>}
      </div> */}
      <div className="display flex-col">
          <p> Labels: </p>
          {/* {dataX && labels.map(label => {
            return (
              <p key={label.labelId}> {label.value} :     
              { 
              auxTimeStamps.map((value) => {
                if(dataX && (dataX-0.01) < value && value < (dataX+0.01)){
                  var auxIndex = auxTimeStamps.indexOf(value)
                  return valuesArray[label.labelId][auxIndex]
                } 
              }) || "nothing"} </p>
            )
          })} */}
        </div>
      </div>
     
      <div className="w-full h-[38vh]">
        <Line
          className="pb-10 w-full"
          ref={chartRef}
          data={midata2}
          options={misoptions}
          
        />
      </div>

    </div>
  )
}
