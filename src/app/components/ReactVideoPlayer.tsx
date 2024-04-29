'use client'

import React, { RefObject, use, useContext, useEffect, useRef, useState } from 'react';
import { DashboardGraphsContext } from '../providers/DashboardProvider';
import ReactPlayer from 'react-player';
import dynamic from "next/dynamic";

//export default function Video(props:any){

interface Props {
  url: string;
  id: string;
  height: number;
  width: number;
  fps: number;
  timeStart?: number;
}

const ReactVideoPlayer = ( props: Props) => {

  const {
    fps,
    id,
    width,
    height
  } = props;

  const {percentageX, videoSync, volume, updateVideoRefs, currentTime} = useContext(DashboardGraphsContext)
  const videoRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = ()=>{
    setIsPlaying(true)
  } 

  const pause = ()=>{
    setIsPlaying(false)
  }

  const OnPlayerClick = () => {
    if (videoRef.current)
    {
      console.log(videoRef.current?.getCurrentTime());
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(currentTime);
    }
  }
  ,[currentTime])

  useEffect(() => {
    updateVideoRefs({id, videoRef});
  },[]);
  
  useEffect(()=>{
    if (percentageX && videoRef.current !== null) {
      videoRef.current.seekTo((videoRef.current).getDuration() * percentageX, 'seconds');
    }
  },[percentageX])
 
  useEffect(()=>{
    if (videoSync ) {
      play();
    } else {
      pause();
    }
  },[videoSync])

   useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume])

    return (
      // style={{width:width, height: height}}
      <div className="mx-auto " >
        <div className="my-5">
          <p><b>Video:</b></p>
        </div>
        <div className="bg-light mx-2 border border-2 border-black bg-black">
          <ReactPlayer 
            url={props.url} 
            playing={isPlaying}
            volume={volume}
            ref = {videoRef}
          />
        </div>
      </div>
    );
}


export default dynamic (() => Promise.resolve(ReactVideoPlayer), {ssr: false})
