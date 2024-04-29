'use client'
import React, { RefObject, createContext, useContext, useState } from "react";
import { Graph } from "../models/Graph";
import ReactPlayer from "react-player";
import { Marker } from "../models/Market";


interface videoRefProp
{
      id: string;
      videoRef: RefObject<ReactPlayer>;
}
interface IDashboardGraphsContext {
    graphs: Graph[];
    dataX: number | null;
    percentageX: number | null;
    videoRefs: videoRefProp[];
    videoSync: boolean;
    currentTime: number;
    volume: number;
    uploadedData: null;
    markers: Marker[];

    // TEMPORAL
    coordinateXValues: number[];
    coordinateYValues: number[];
    timeStamps: number[];
    // TEMPORAL

    updateMarkers: (markers: Marker[]) => void;
    updateUploadedData: (e : React.ChangeEvent<HTMLInputElement>) => void;
    updateVolume: (n: number) => void;
    updateVideoSync: (videoSync: boolean) => void;
    updatePercentageX: (n: number) => void;
    updateGraphs: (NewGraph: Graph) => void;
    updateDataX: (n: number) => void;
    updateVideoRefs: (videoRef : videoRefProp) => void;
    updateCurrentTime: (currentTime: number) => void;
  }
  
  export const DashboardGraphsContext = createContext<IDashboardGraphsContext>({
    graphs: [],
    dataX: null,
    percentageX: null,
    videoRefs: [],
    videoSync: false,
    currentTime: 0,
    volume: 0,
    uploadedData: null,
    markers: [],

    // TEMPORAL
    coordinateXValues: [],
    coordinateYValues: [],
    timeStamps: [],
    // TEMPORAL

    updateMarkers: () => {},
    updateUploadedData: () => {},
    updateVolume: () => {},
    updateVideoSync: () => {},
    updatePercentageX: () => {},
    updateGraphs: () => {},
    updateDataX: () => {},
    updateVideoRefs: () => {},
    updateCurrentTime: () => {},
  });

  
export function DashboardProvider ({children} : {children: React.ReactNode})
{
    const [videoRefs, setvideoRefs] = useState<videoRefProp[]>([])   
    const [videoSync, setVideoSync] = useState<boolean>(false)
    const [graphs, setGraphs] = useState<Graph[]>([]);
    const [dataX, setDataX] = useState<number>(null);
    const [percentageX, setPercentageX] = useState<number>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const [volume, setVolume] = useState<number>(0.5)
    const [uploadedData, setUploadedData] = useState<any>(null)
    const [markers, setMarkers] = useState<Marker[]>([])

    const updateCurrentTime = (currentTime: number) => { setCurrentTime(currentTime);}
    const updateVideoSync = (videoSync: boolean) => {setVideoSync(videoSync);}
    const updateGraphs = (graph : Graph) => {setGraphs((prevGraphs: Graph[]) => [...prevGraphs, graph]);}
    const updatePercentageX = (n: number) => {setPercentageX(n)}
    const updateDataX = (n: number)=>{setDataX(n);}
    const updateVolume = (n: number) => {setVolume(n)}
    const updateMarkers = (markers: Marker[]) => {setMarkers(markers)}

    // TEMPORAL

    const [coordinateXValues, setCoordinateXValues] = useState<number[]>([])
    const [coordinateYValues, setCoordinateYValues] = useState<number[]>([])
    const [timeStamps, setTimeStamps] = useState<number[]>([])

    const updateVideoRefs = (videoRefProp : videoRefProp) => {
        const videoRefFound = videoRefs.find((v) => v.id === videoRefProp.id )

        if(videoRefFound === undefined){
            var aux = videoRefs
            aux.push(videoRefProp)
            setvideoRefs(aux)
        }
    }
    
    const updateUploadedData = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files && e.target.files[0]) {
            const updatedJSON = e.target.files[0]
            if (updatedJSON.type === 'application/json') {
              const fileReader = new FileReader()
              fileReader.readAsText(e.target.files[0])
              fileReader.onload = (ev: ProgressEvent<FileReader>) => {
                const target = ev.target
                if (target) {
                  const result = JSON.parse(target.result as any)
                
                    console.log(result)
                    console.log(result.session.signals[0])
                    console.log(result.session.signals[0].labels[0])
                    console.log(result.session.signals[0].values[0])
                    
                    // result.session.signals[0].values.map((objectValue: any)=>{

                    //     console.log("x", objectValue.sample[0])

                    //     var prevCoordinatesXValues = coordinateXValues.push(objectValue.sample[0])
                    //     setCoordinateXValues(prevCoordinatesXValues)

                    //     console.log("y", objectValue.sample[1])

                    //     var prevCoordinatesYValues = coordinateYValues.push(objectValue.sample[1])
                    //     setCoordinateYValues(prevCoordinatesYValues)

                    //     console.log("timestamp", objectValue.timestamp)
                    //     var prevTimeStamps = timeStamps.push(objectValue.timestamp)
                    //     setTimeStamps(prevTimeStamps)
                    // })
                    var auxCoordinatesXValue : number[] = []
                    var auxCoordinatesYValue : number[] = []
                    var auxTimeStamps : number[] = []

                    result.session.signals[0].values.map((objectValue: any)=>{

                            console.log("x", objectValue.sample[0])
                            auxCoordinatesXValue.push(objectValue.sample[0])
                            
                            console.log("y", objectValue.sample[1])
                            auxCoordinatesYValue.push(objectValue.sample[1])
                            
                            console.log("timestamp", objectValue.timestamp)
                            auxTimeStamps.push(objectValue.timestamp)
                        })

                    setCoordinateXValues(auxCoordinatesXValue)
                    setCoordinateYValues(auxCoordinatesYValue)
                    setTimeStamps(auxTimeStamps)
                    updateMarkers(result.session.markers)
                    setUploadedData(result)
                }
                 else {
                  console.warn(`Unable to read the uploaded file`)
                }
              }
            }
          }
    }

    return(
        <DashboardGraphsContext.Provider value={
            {graphs, 
            dataX, 
            percentageX, 
            videoRefs,
            videoSync,
            currentTime,
            volume,
            uploadedData,
            markers,
            coordinateXValues,
            coordinateYValues,
            timeStamps,
            updateMarkers,
            updateUploadedData,
            updateVolume,
            updatePercentageX,
            updateGraphs, 
            updateDataX,
            updateVideoRefs,
            updateVideoSync,
            updateCurrentTime}}>
            
            {children}
        </DashboardGraphsContext.Provider>
    );
}