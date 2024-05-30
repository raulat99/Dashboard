'use client';
import { Scatter } from 'react-chartjs-2';
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
} from 'chart.js';
import { useEffect, useRef } from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';

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
  //signalConfig: any;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  points: number;
  signalOnVideo: number[];
  signals: any;
  currentTimeNow: number;
  durationVideo: number;
}

export default function LinesChart(props: Props) {
const { minX, maxX, minY, maxY, points, signalOnVideo, signals, currentTimeNow, durationVideo } = props;
  
  const chartRef = useRef(null);
  const previousPointRef = useRef<number>(0);
  const previousPreviousPointRef = useRef<number>(0);

  var id = null;
  var idsRequested : any[] = []

  signalOnVideo.map((signal: any) => {
    idsRequested.push(signal.signalID)
  })

  var signalRequested : any[] = []
  
  signals.map((signal: any) => {
    if(idsRequested.includes(signal.signalID))
      {
        signalRequested.push(signal)
      }
  })

  console.log(signalOnVideo)
  console.log(signalRequested)
  console.log(signals)

  const point: string = ((currentTimeNow / durationVideo) * signalRequested[0].values.length).toFixed(0);
  let beginingNumber = parseFloat(point) - points < 0 ? 0 : parseFloat(point) - points;

  if(beginingNumber > previousPointRef.current)
{
  beginingNumber = previousPreviousPointRef.current || previousPointRef.current

  console.log(beginingNumber)

}
    
  console.log(beginingNumber,parseFloat(point) + 1)

  const jumpingNumber = Math.floor(Math.max((parseFloat(point) - beginingNumber)/ points, 1))

  console.log(jumpingNumber)

  var signalsSortArray : any = []

  signalRequested.map((signal: any) => {
    signalsSortArray.push({...signal})
  })

  var signalSortValues : any[] = []

  // signalsSortArray.map((signal: any) => { 
  //   signal.values = signal.values.slice(beginingNumber,parseFloat(point) + 1);
  //   signalSortValues.push(signal.values)
  // })
    
  signalsSortArray.forEach((signal: any) => {
    if (jumpingNumber > 1) {
      let adjustedValues = [];
      for (let i = beginingNumber; i <= parseFloat(point); i += jumpingNumber) {
        signal.values[Math.floor(i)] && adjustedValues.push(signal.values[Math.floor(i)]);
        //console.log(signal.values[Math.floor(i)]);
      }
      signalSortValues.push(adjustedValues);
    } else {
      signal.values = signal.values.slice(beginingNumber, parseFloat(point) + 1);
      signalSortValues.push(signal.values);
    }
  });


  console.log(signalSortValues)

  var valuesXYtogether : any[] = []

  var valuesXYtogetherAux : any[] = []

  signalSortValues.map((signal: any) => {
    valuesXYtogetherAux = []
    signal.map((objectValue: any) => {
      valuesXYtogetherAux.push({x: objectValue.sample[0], y: objectValue.sample[1]})
    });
    valuesXYtogether.push(valuesXYtogetherAux)
   })

   console.log(valuesXYtogether)

  const colorArray = [
    'rgb(255, 99, 132)',
    'rgb(55, 0, 232)',
    'rgb(55, 99, 132)',
    'rgb(55, 99, 232)',
    'rgb(255, 0, 132)',
  ];

  var angleArray : number[] = []
  var angleArrayFinal : number[][] = []

  for(let i = 0 ; i < valuesXYtogether.length ; i++)
    {
      console.log(i)
      angleArray = []
      for (let j = valuesXYtogether[i].length-1 ; j >= 0 ; j--)
        {
          console.log(i,j)
          console.log(valuesXYtogether[i][j])
          var p1 
          var p2 
    
          if(valuesXYtogether[i].length === 1)
            {
              p1 = { x: valuesXYtogether[i][j].x, y: valuesXYtogether[i][j].y };
              p2 = { x: valuesXYtogether[i][j].x, y: valuesXYtogether[i][j].y };
            }
            else{
              if(j===0)
                {
                  p1 = { x: valuesXYtogether[i][j].x, y: valuesXYtogether[i][j].y };
                  p2 = { x: valuesXYtogether[i][j + 1].x, y: valuesXYtogether[i][j + 1].y };
                }
                else{
                  p1 = { x: valuesXYtogether[i][j - 1].x, y: valuesXYtogether[i][j - 1].y }; 
                  p2 = { x: valuesXYtogether[i][j].x, y: valuesXYtogether[i][j].y }; 
                }
            }
            console.log(p1,p2)
          var angleDeg = Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI ;
          var adjustedAngle = angleDeg  + 90
          angleArray.push(-adjustedAngle || 0)
        }
        angleArrayFinal.push(angleArray.reverse())
    }

  const yourImage = new Image()
  yourImage.src ="/ARROW.png";
  yourImage.width = 15;
  yourImage.height = 15;


  const datasetArray = valuesXYtogether.map((data, i) => ({
    label: signalRequested[i].name,
    data: data,
    lineTension: 0.5,
    pointStyle: [yourImage],
    pointRotation: angleArrayFinal[i],
    borderColor: colorArray[i],
    backgroundColor: colorArray[i],
    pointRadius: 5,
    pointBorderColor: colorArray[i],
    pointBackgroundColor: colorArray[i],
  }));

  const midata2 = {
    //labels: valuesX,
    datasets: datasetArray
  }
 
  // Opciones del gráfico ()
  const misoptions = {
    responsive: true,
    maintainAspectRatio: false,
    redraw: true,
    borderWidth: 2,
    showLine: true,
    interaction: {
      mode: 'index',
      intersect: true,
    },
    scales: {
      y: {
        min: minY ,
        max: maxY ,
      },
      x: {
        min: minX,
        max: maxX,
      },
    }
  };
  
  useEffect(() => {
    // Store the current point value as the previous value for the next render
    previousPreviousPointRef.current = previousPointRef.current;
    previousPointRef.current = parseFloat(point);
    
  }, [point]);

  const previousPoint = previousPointRef.current;
  const previousPreviousPoint = previousPreviousPointRef.current;

  console.log("Previous Previous point:", previousPreviousPoint);
  console.log("Previous point:", previousPoint);
  console.log("Current point:", point);

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
