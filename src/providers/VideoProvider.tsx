'use client'
import React, { RefObject, createContext, useContext, useState } from "react";
import { Graph } from "../models/Graph";
import ReactPlayer from "react-player";
import { Marker } from "../models/Marker";
import { getDashboards } from "@/lib/handlers";


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

interface IVideoContext {
    videoRefs: VideoRefProp[];
    videoSync: boolean;
    currentTime: number;
    volume: number;
    markers: Marker[];
    durationVideo: number;
    playBackRate: number;
    //videosConfig: VideoConfigProp[];
    //signalsConfig: SignalConfigProp[];
    updatePlayBackRate: (n: number) => void;
    updateDurationVideo: (n: number) => void;
    updateMarkers: (markers: Marker[]) => void;
    updateVolume: (n: number) => void;
    updateVideoSync: (videoSync: boolean) => void;
    updateVideoRefs: (videoRef : VideoRefProp) => void;
    updateCurrentTime: (currentTime: number) => void;
  }
  
  export const VideoContext = createContext<IVideoContext>({
    videoRefs: [],
    videoSync: false,
    currentTime: 0,
    volume: 0,
    markers: [],
    durationVideo: 0,
    playBackRate: 1,
    //videosConfig: [],
    //signalsConfig: [],
    updatePlayBackRate: () => {},
    updateDurationVideo: () => {},
    updateMarkers: () => {},
    updateVolume: () => {},
    updateVideoSync: () => {},
    updateVideoRefs: () => {},
    updateCurrentTime: () => {},
  });

  
export function VideoProvider ({children} : {children: React.ReactNode})
{
    //const {markersUploaded} = useContext(VideoContext)

    const [videoRefs, setvideoRefs] = useState<VideoRefProp[]>([])   
    const [videoSync, setVideoSync] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0);

    const [durationVideo, setDurationVideo] = useState<number>(0);
    const [playBackRate, setPlayBackRate] = useState<number>(1);
    const [volume, setVolume] = useState<number>(0.5)
    //const [uploadedData, setUploadedData] = useState<any>(null)
    const [markers, setMarkers] = useState<Marker[]>([])
    //const [videosConfig, setVideosConfig] = useState<VideoConfigProp[]>([])
    //const [signalsConfig, setSignalsConfig] = useState<SignalConfigProp[]>([])

    const updateCurrentTime = (currentTime: number) => { setCurrentTime(currentTime);}
    const updateVideoSync = (videoSync: boolean) => {setVideoSync(videoSync);}
    const updateVolume = (n: number) => {setVolume(n)}
    const updateDurationVideo = (n: number) => {setDurationVideo(n)}
    const updateMarkers = (markersGiven: Marker[]) => {
        //console.log(markersGiven.length)
        setMarkers(markersGiven)
    }

    const updatePlayBackRate = (n: number) => {setPlayBackRate(n)}


    
    // TEMPORAL

    const updateVideoRefs = (videoRefProp : VideoRefProp) => {
        const videoRefFound = videoRefs.find((v) => v.videoID === videoRefProp.videoID )

        if(videoRefFound === undefined){
            var aux = videoRefs
            aux.push(videoRefProp)
            setvideoRefs(aux)
        }
    }
    
    return(
        <VideoContext.Provider value={
            { 
            
            videoRefs,
            videoSync,
            currentTime,
            volume,
            markers,
            durationVideo,
            playBackRate,
           
            //signalsConfig,
            updateMarkers,
            updateVolume,
            updatePlayBackRate,
            updateDurationVideo,
            updateVideoRefs,
            updateVideoSync,
            updateCurrentTime
            }}>
            
            {children}
        </VideoContext.Provider>
    );
}