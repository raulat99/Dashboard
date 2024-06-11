'use client';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import { use, useContext, useEffect, useRef, useState } from 'react';
import { getRelativePosition } from 'chart.js/helpers';
import { SignalConfig } from '@/models/SignalConfig';
import { plugin } from 'mongoose';
import annotationPlugin from 'chartjs-plugin-annotation';



import {
  DashboardGraphsContext,
  SignalConfigProp,
} from '../providers/DashboardProvider';
//import { Graph } from "../models/Graph";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
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

export default function LinesChartWithInfo(props: SignalConfig) {
  const { name, descripcion, signalID, labels, values } = props.props;

  console.log(props);

  const chartRef = useRef(null);

  var id = null;
  const { dataX, updateDataX, updatePercentageX } = useContext(
    DashboardGraphsContext
  );

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

  var valuesArray: any[] = [];
  var auxTimeStamps: number[] = [];
  var auxValueIndex: number = -1;
  console.log(labels);

  labels.map(() => {
    valuesArray.push([]);
  });

  values.map((objectValue: any) => {
    for (let i = 0; i < objectValue.sample.length; i++) {
      valuesArray[i].push(objectValue.sample[i]);
    }
    const timeInIncrements : number = objectValue.timestamp.toFixed(2) - values[0].timestamp.toFixed(2)
    auxTimeStamps.push(timeInIncrements.toFixed(2));
  });
  const colorArray = [
    'rgb(255, 99, 132)',
    'rgb(55, 0, 232)',
    'rgb(55, 99, 132)',
    'rgb(55, 99, 232)',
    'rgb(255, 0, 132)',
  ];

  var midata2 = {
    labels: auxTimeStamps,
    datasets: labels.map((label: any) => {
      const indexColor = label.labelId + signalID;
      return {
        label: label.value,
        data: valuesArray[label.labelId],
        tension: 0.5,
        borderColor: colorArray[indexColor],
        backgroundColor: colorArray[indexColor],
        pointRadius: 2,
        pointBorderColor: colorArray[indexColor],
        pointBackgroundColor: colorArray[indexColor],
      };
    }),
  };
  console.log(midata2);

  // Opciones del gráfico ()
  var misoptions = {
    responsive: true,
    maintainAspectRatio: false,
    redraw: true,
    borderWidth: 1,
    Interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        min: 0, // Mínimo valor del eje Y en 0
      },
      x: {
        min: 0,
        ticks: { color: 'rgb(255, 99, 132)' },
      },
    },
      plugins: {
        annotation: {
          annotations: {
            annotation1: {
              type: 'line',
              borderColor: 'black',
              borderWidth: 2,
              
              label: {
                backgroundColor: 'red',
                content: ' Player ',
                display: true,
                position: 'start',
              },
              
              scaleID: 'x',
              // value: dataX && (auxTimeStamps.includes(dataX)) ? dataX : -1,
               value: dataX ? dataX : -1,
            },
          },
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
      // //console.log(chart)

      // console.log(canvasPosition)

      // console.log(e)
      // console.log({percentageX:e.x/ chart.width , event: canvasPosition.x, chart: chart.width})

      console.log(e.x / chart.width * midata2.labels.length)
      console.log(dataXAux)
      console.log(dataY)
      //const percentaje : string = (e.x / chart.width * midata2.labels.length).toFixed(0);

      updatePercentageX(dataXAux/ midata2.labels.length);
      updateDataX(dataXAux);

      dataY = value;
      id = chart.id;

      // {label && labels.map(label => {
      //     auxTimeStamps.map((value) => {
      //       if(dataX  && (parseFloat(dataX)-0.01) < value && value < (parseFloat(dataX)+ 0.01)){
              
      //         //var auxIndex = auxTimeStamps.indexOf(value)
      //         //return valuesArray[label.labelId][auxIndex]
      //         chartRef.current.options.plugins.annotation.annotations.annotation1.value = value;
      //       } else {
      //         return 
      //       }
      //     })} 
          
      //   )
      // }
    },
  };

  return (
    <div className='display mx-6 my-6 flex h-[38vh] flex-col'>
      {/* <Statistics dataX={dataX} dataY={dataY} /> */}
      <div className='display flex flex-col'>
        <h2>
          {' '}
          <b>
            {signalID} {name}{' '}
          </b>
        </h2>
        <h2> {descripcion} </h2>
        <h2> </h2>
        {/* <div className="display flex flex col">
          <p> DataX label: </p>
          {dataX && <p> {dataX} </p>}
      </div> */}
        <div className='display flex-col'>
          <p> Labels: </p>
          {dataX && labels.map(label => {
            if(dataX && auxValueIndex != valuesArray[label.labelId][dataX] ){
            return (
              <p key={label.labelId}> {label.value} : {valuesArray[label.labelId][dataX]}</p>
            )
          }
          }) || "nothing"}
        </div>
      </div>

      <div className='h-full w-full'>
        <Line
          className=''
          ref={chartRef}
          data={midata2}
          options={misoptions}
          //plugins={[annotationPlugin.afterDraw(annotation)]}
        />
      </div>
    </div>
  );
}
