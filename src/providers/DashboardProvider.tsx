'use client'
import React, { RefObject, createContext, useContext, useState } from "react";
import { Graph } from "../models/Graph";
import ReactPlayer from "react-player";
import { Marker } from "../models/Marker";


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
    //uploadedData: null;
    markersUploaded: Marker[];
    videosConfig: VideoConfigProp[];
    signalsConfig: SignalConfigProp[];

    // TEMPORAL
    // coordinateXValues: number[];
    // coordinateYValues: number[];
    // timeStamps: number[];
    // TEMPORAL

    updateMarkersUploaded: (markers: Marker[]) => void;
    //updateUploadedData: (e : React.ChangeEvent<HTMLInputElement>) => void;
    updatePercentageX: (n: number) => void;
    updateGraphs: (NewGraph: Graph) => void;
    updateDataX: (n: number) => void;
  }
  
  export const DashboardGraphsContext = createContext<IDashboardGraphsContext>({
    graphs: [],
    dataX: null,
    percentageX: null,
    //uploadedData: null,
    markersUploaded: [],
    videosConfig: [],
    signalsConfig: [],

    // TEMPORAL
    // coordinateXValues: [],
    // coordinateYValues: [],
    // timeStamps: [],
    // TEMPORAL

    updateMarkersUploaded: () => {},
    //updateUploadedData: () => {},
    updatePercentageX: () => {},
    updateGraphs: () => {},
    updateDataX: () => {},
  });

  
export function DashboardProvider ({children} : {children: React.ReactNode})
{
    const [graphs, setGraphs] = useState<Graph[]>([]);
    const [dataX, setDataX] = useState<number>(null);
    const [percentageX, setPercentageX] = useState<number>(null);
    //const [uploadedData, setUploadedData] = useState<any>(null)
    const [markersUploaded, setMarkersUploaded] = useState<Marker[]>([])
    const [videosConfig, setVideosConfig] = useState<VideoConfigProp[]>([])
    const [signalsConfig, setSignalsConfig] = useState<SignalConfigProp[]>([])
    const updateGraphs = (graph : Graph) => {setGraphs((prevGraphs: Graph[]) => [...prevGraphs, graph]);}
    const updatePercentageX = (n: number) => {setPercentageX(n)}
    const updateDataX = (n: number)=>{setDataX(n);}
    const updateMarkersUploaded = (markers: Marker[]) => {setMarkersUploaded(markers)}

    // TEMPORAL

    // const [coordinateXValues, setCoordinateXValues] = useState<number[]>([])
    // const [coordinateYValues, setCoordinateYValues] = useState<number[]>([])
    // const [timeStamps, setTimeStamps] = useState<number[]>([])
    
    

    return(
        <DashboardGraphsContext.Provider value={
            {graphs, 
            dataX, 
            percentageX, 
            //uploadedData,
            markersUploaded,
            // coordinateXValues,
            // coordinateYValues,
            // timeStamps,
            videosConfig,
            signalsConfig,
            updateMarkersUploaded,
            //updateUploadedData,
            updatePercentageX,
            updateGraphs, 
            updateDataX
          }}>
            
            {children}
        </DashboardGraphsContext.Provider>
    );
}