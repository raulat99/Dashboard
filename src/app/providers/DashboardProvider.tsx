'use client'
import React, { RefObject, createContext, useContext, useState } from "react";
import { Graph } from "../models/Graph";
import ReactPlayer from "react-player";


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
    

    const updateCurrentTime = (currentTime: number) => { setCurrentTime(currentTime);}
    const updateVideoSync = (videoSync: boolean) => {setVideoSync(videoSync);}
    const updateGraphs = (graph : Graph) => {setGraphs((prevGraphs: Graph[]) => [...prevGraphs, graph]);}
    const updatePercentageX = (n: number) => {setPercentageX(n)}
    const updateDataX = (n: number)=>{setDataX(n);}
    const updateVolume = (n: number) => {setVolume(n)}

    const updateVideoRefs = (videoRefProp : videoRefProp) => {
        const videoRefFound = videoRefs.find((v) => v.id === videoRefProp.id )

        if(videoRefFound === undefined){
            var aux = videoRefs
            aux.push(videoRefProp)
            setvideoRefs(aux)
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