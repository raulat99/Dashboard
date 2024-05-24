'use client';
import { Line, Scatter } from 'react-chartjs-2';
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
import { randomInt } from 'crypto';
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

interface Props {

    signalConfig: SignalConfig;
    currentTimeNow: any;
    totalTime: any;
}


export default function LinesChart(props: Props) {
  const { name, descripcion, signalID, labels, values } = props.signalConfig;
  const { currentTimeNow, totalTime } = props;

  console.log(props);

  const chartRef = useRef(null);

  var id = null;
  const { dataX, updateDataX, updatePercentageX } = useContext(
    DashboardGraphsContext
  );

  var valuesX: number[] = [];
  var valuesY: number[] = [];

  values.map((objectValue: any) => {
    valuesX.push(objectValue.sample[0]);
    valuesY.push(objectValue.sample[1]);
  });

  const colorArray = [
    'rgb(255, 99, 132)',
    'rgb(55, 0, 232)',
    'rgb(55, 99, 132)',
    'rgb(55, 99, 232)',
    'rgb(255, 0, 132)',
  ];

  var angleArray : number[] = []

  for (let i = valuesX.length-1 ; i >= 0 ; i--)
    {
      var p1 = { x: valuesX[i - 1], y: valuesY[i - 1] };
      var p2 = { x: valuesX[i], y: valuesY[i] };

      if(i===0)
        {
          p1 = { x: valuesX[i], y: valuesY[i] };
          p2 = { x: valuesX[i + 1], y: valuesY[i + 1] };
        }
      var angleDeg = Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI ;
      var adjustedAngle = angleDeg  + 90
      // console.log(p1, p2, angleDeg)
      angleArray.push(-adjustedAngle || 0)
    }
  
  // console.log(valuesX)
  // console.log(valuesY)

  console.log(valuesX, valuesY);
  var yourImage = new Image()
  yourImage.src ='https://cdn-icons-png.flaticon.com/512/60/60564.png';
  //yourImage.src ='https://imgs.search.brave.com/QmDNNLkmapk8OK-S8HSAPO-aQyq61vtiOQvZ1Wrl0iA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzgzLzAyLzkz/LzM2MF9GXzI4MzAy/OTM4MF82U0FiN2tI/blhtRWpwQkZzbmdt/anhETEE0c1EwSWlo/RS5qcGc';

  yourImage.width = 15;
  yourImage.height = 15;
  
  var midata2 = {
    labels: valuesX,
    datasets: [{
        label: labels[0].name,
        data: valuesY,
        lineTension: 0,
        pointStyle: [yourImage],
        pointRotation: angleArray.reverse(),
        borderColor: colorArray[0],
        backgroundColor: colorArray[0],
        pointRadius: 5,
        pointBorderColor: colorArray[0],
        pointBackgroundColor: colorArray[0],
    },]
  };
 

  console.log(midata2);

  // Opciones del gráfico ()
  var misoptions = {
    responsive: true,
    maintainAspectRatio: false,
    redraw: true,
    borderWidth: 2,
    showLine: true,
    Interaction: {
      mode: 'index',
      intersect: true,
    },
    scales: {
      y: {
        min: 0, // Mínimo valor del eje Y en 0
        max: 800
      },
      x: {
        min: 0,
        max: 800,
        ticks: { color: 'rgb(255, 99, 132)' },
      },
    },
  };

  return (
      <div className='h-full w-full ' >
        <Scatter
          className=''
          ref={chartRef}
          data={midata2}
          options={misoptions}
        />
    </div>
  );
}
