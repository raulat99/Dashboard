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


  var valuesArray: any[] = [];
  var auxTimeStamps: number[] = [];

  console.log(labels);

  labels.map(() => {
    valuesArray.push([]);
  });

  values.map((objectValue: any) => {
    for (let i = 0; i < objectValue.sample.length; i++) {
      valuesArray[i].push(objectValue.sample[i]);
    }
    const timeInIncrements : number = objectValue.timestamp - values[0].timestamp
    auxTimeStamps.push(timeInIncrements.toFixed(2) as unknown as number);
  });
  const colorArray = [
    'rgb(255, 99, 132)',
    'rgb(55, 0, 232)',
    'rgb(55, 99, 132)',
    'rgb(55, 99, 232)',
    'rgb(255, 0, 132)',
  ];

  // var auxAuxTimestamps = auxTimeStamps
  // var auxAuxValues = valuesArray
  
  // const [timeStamps, setTimeStamps] = useState<number[]>(auxAuxTimestamps.splice(0,9));
  // const [valuesGraph, setvaluesGraph] = useState<any[]>(auxAuxValues.map((value: any) => value.splice(0,9)));

  // console.log(timeStamps, valuesGraph)

 

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
              value: dataX ? dataX : -1,
            },
          },
        },
      }
  };

//   useEffect(()=>{
    
//     // Index to know the position of the last element in the array of timeStamps in auxTimeStamps
//     //console.log(dataX, timeStamps, auxTimeStamps)


//   //   if(auxTimeStamps && timeStamps && auxTimeStamps.length > 0 && timeStamps?.length > 0){

    
//   //   const indexAux = auxTimeStamps.findIndex((value: number) => value === timeStamps[8])
//   //     console.log(indexAux)
//   //   if(dataX && indexAux !== -1 && dataX + 5 > indexAux){

//   //     console.log(dataX)
//   //     console.log(indexAux)


//   //     labels.map((label: any) => {

//   //       var temporalTimeStamps = timeStamps
//   //       var temporalValuesGraph = valuesGraph 
//   //       temporalTimeStamps.shift()
//   //       temporalTimeStamps.push(auxTimeStamps[dataX])
//   //       temporalValuesGraph[label.labelId].shift()  
//   //       temporalValuesGraph[label.labelId].push(valuesArray[label.labelId][dataX])

//   //       console.log(temporalTimeStamps)
//   //       console.log(temporalValuesGraph)

//   //       setTimeStamps(temporalTimeStamps)
//   //       setvaluesGraph(temporalValuesGraph)


//   //       chartRef.current.data.datasets.push(timeStamps)

//   //     })
//   //   }
//   // }


//   if (chartRef.current) {
//     var data = chartRef.current.data;

//     if (data.datasets.length > 0) {
//       data.labels = 1;

//       for (let index = 0; index < data.datasets.length; ++index) {
//         data.datasets[index].data.push(100);
//       }

//       console.log({ data });
//       console.log({'chartRef': chartRef.current.ctx.canvas});

//       //chartRef.current.ctx.canvas.update();
//     }
//   }
// },[]);

  return (
      <div className='h-full w-full ' >
        <Line
          className=''
          ref={chartRef}
          data={midata2}
          options={misoptions}
          //plugins={[annotationPlugin.afterDraw(annotation)]}
        />
    </div>
  );
}
