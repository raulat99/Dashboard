'use client'
import React, { RefObject, createContext, useContext, useState } from "react";
import { Graph } from "../models/Graph";
import ReactPlayer from "react-player";
import { Marker } from "../models/Market";


interface VideoRefProp
{
      videoID: number;
      videoRef: RefObject<ReactPlayer>;
}

export interface VideoConfigProp
{
    videoID: number,
    fps: number
    url: string
}

interface LabelConfigProp{
    labelId: number,
    name: string,
    value: string
}

interface ValueConfigProp{
    idValue: number,
    sample: any,
    timestamp: number
}

export interface SignalConfigProp{
    name: string,
    descripcion: string,
    signalID: number,
    labels: LabelConfigProp[],
    values: ValueConfigProp[]
}

interface IDashboardGraphsContext {
    graphs: Graph[];
    dataX: number | null;
    percentageX: number | null;
    //videoRefs: VideoRefProp[];
    //videoSync: boolean;
    //currentTime: number;
    //volume: number;
    uploadedData: null;
    markersUploaded: Marker[];
    videosConfig: VideoConfigProp[];
    signalsConfig: SignalConfigProp[];

    // TEMPORAL
    coordinateXValues: number[];
    coordinateYValues: number[];
    timeStamps: number[];
    // TEMPORAL

    updateMarkersUploaded: (markers: Marker[]) => void;
    updateUploadedData: (e : React.ChangeEvent<HTMLInputElement>) => void;
    //updateVolume: (n: number) => void;
    //updateVideoSync: (videoSync: boolean) => void;
    updatePercentageX: (n: number) => void;
    updateGraphs: (NewGraph: Graph) => void;
    updateDataX: (n: number) => void;
    //updateVideoRefs: (videoRef : VideoRefProp) => void;
    //updateCurrentTime: (currentTime: number) => void;
  }
  
  export const DashboardGraphsContext = createContext<IDashboardGraphsContext>({
    graphs: [],
    dataX: null,
    percentageX: null,
    // videoRefs: [],
    // videoSync: false,
    // currentTime: 0,
    // volume: 0,
    uploadedData: null,
    markersUploaded: [],
    videosConfig: [],
    signalsConfig: [],

    // TEMPORAL
    coordinateXValues: [],
    coordinateYValues: [],
    timeStamps: [],
    // TEMPORAL

    updateMarkersUploaded: () => {},
    updateUploadedData: () => {},
    // updateVolume: () => {},
    // updateVideoSync: () => {},
    updatePercentageX: () => {},
    updateGraphs: () => {},
    updateDataX: () => {},
    // updateVideoRefs: () => {},
    // updateCurrentTime: () => {},
  });

  
export function DashboardProvider ({children} : {children: React.ReactNode})
{
    //const [videoRefs, setvideoRefs] = useState<VideoRefProp[]>([])   
    //const [videoSync, setVideoSync] = useState<boolean>(false)
    const [graphs, setGraphs] = useState<Graph[]>([]);
    const [dataX, setDataX] = useState<number>(null);
    const [percentageX, setPercentageX] = useState<number>(null);
    //const [currentTime, setCurrentTime] = useState<number>(0);

    //const [volume, setVolume] = useState<number>(0.5)
    const [uploadedData, setUploadedData] = useState<any>(null)
    const [markersUploaded, setMarkersUploaded] = useState<Marker[]>([])
    const [videosConfig, setVideosConfig] = useState<VideoConfigProp[]>([])
    const [signalsConfig, setSignalsConfig] = useState<SignalConfigProp[]>([])

    //const updateCurrentTime = (currentTime: number) => { setCurrentTime(currentTime);}
    //const updateVideoSync = (videoSync: boolean) => {setVideoSync(videoSync);}
    const updateGraphs = (graph : Graph) => {setGraphs((prevGraphs: Graph[]) => [...prevGraphs, graph]);}
    const updatePercentageX = (n: number) => {setPercentageX(n)}
    const updateDataX = (n: number)=>{setDataX(n);}
    //const updateVolume = (n: number) => {setVolume(n)}
    const updateMarkersUploaded = (markers: Marker[]) => {setMarkersUploaded(markers)}

    // TEMPORAL

    const [coordinateXValues, setCoordinateXValues] = useState<number[]>([])
    const [coordinateYValues, setCoordinateYValues] = useState<number[]>([])
    const [timeStamps, setTimeStamps] = useState<number[]>([])

    // const updateVideoRefs = (videoRefProp : VideoRefProp) => {
    //     const videoRefFound = videoRefs.find((v) => v.videoID === videoRefProp.videoID )

    //     if(videoRefFound === undefined){
    //         var aux = videoRefs
    //         aux.push(videoRefProp)
    //         setvideoRefs(aux)
    //     }
    // }
    
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
                
                    var auxCoordinatesXValue : number[] = []
                    var auxCoordinatesYValue : number[] = []
                    var auxTimeStamps : number[] = []

                    result.session.signals[0].values.map((objectValue: any)=>{
                            auxCoordinatesXValue.push(objectValue.sample[0])
                            auxCoordinatesYValue.push(objectValue.sample[1])
                            var timefixed = objectValue.timestamp.toFixed(2)
                            auxTimeStamps.push(timefixed)
                        })

                    setCoordinateXValues(auxCoordinatesXValue)
                    setCoordinateYValues(auxCoordinatesYValue)
                    setTimeStamps(auxTimeStamps)
                    updateMarkersUploaded(result.session.markers)
                    setVideosConfig(result.session.videos)
                    setSignalsConfig(result.session.signals)
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
            // videoRefs,
            // videoSync,
            // currentTime,
            // volume,
            uploadedData,
            markersUploaded,
            coordinateXValues,
            coordinateYValues,
            timeStamps,
            videosConfig,
            signalsConfig,
            updateMarkersUploaded,
            updateUploadedData,
            //updateVolume,
            updatePercentageX,
            updateGraphs, 
            updateDataX,
            //updateVideoRefs,
            //updateVideoSync,
            //updateCurrentTime
          }}>
            
            {children}
        </DashboardGraphsContext.Provider>
    );
}