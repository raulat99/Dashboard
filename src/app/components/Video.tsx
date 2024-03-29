'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DashboardGraphsContext } from '../providers/DashboardProvider';
import ReactPlayer from 'react-player';
import dynamic from "next/dynamic";

//export default function Video(props:any){

const Video = (props:any) => {
  const {percentajeX} = useContext(DashboardGraphsContext)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.5)
  const videoRef = useRef(null)

  const play = ()=>{
    setIsPlaying(true)
  } 

  const pause = ()=>{
    setIsPlaying(false)
  }

  useEffect(()=>{
    if (percentajeX && videoRef.current !== null) {
      (videoRef.current as any).seekTo((videoRef.current as any).getDuration() * percentajeX, 'seconds');
    }
    if (props.syncVideo) {
      play();
    } else {
      pause();
    }
  },[props.syncVideo, percentajeX])

    return (
      <div className="mx-auto">
        <div className="my-5">
          <p><b>Video:</b></p>
        </div>
        <div className="bg-light mx-2 border border-2 border-black bg-black">
          <ReactPlayer 
            
            url={props.src} 
            controls={true}
            playing={isPlaying}
            volume={volume}
            ref = {videoRef}
          />
        </div>
      </div>
    );
}


export default dynamic (() => Promise.resolve(Video), {ssr: false})
