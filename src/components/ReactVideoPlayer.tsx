'use client'

import React, { RefObject, use, useContext, useEffect, useRef, useState } from 'react';
import { DashboardGraphsContext, VideoConfigProp } from '../providers/DashboardProvider';
import {VideoContext} from '../providers/VideoProvider';
import ReactPlayer from 'react-player';
import dynamic from "next/dynamic";

//export default function Video(props:any){

// interface Props {
//   url: string;
//   id: string;
//   //height: number;
//   //width: number;
//   fps: number;
//   //timeStart?: number;
// }

const ReactVideoPlayer = ( props: VideoConfigProp) => {

  const {
    fps,
    videoID,
    url,
    //width,
    //height
  } = props;

  const {percentageX} = useContext(DashboardGraphsContext)
  const {videoSync, volume, updateVideoRefs, currentTime} = useContext(VideoContext)

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
    updateVideoRefs({videoID, videoRef});
  },[]);
  
  useEffect(()=>{
    if (percentageX && videoRef.current !== null) {
      console.log((videoRef.current).getDuration(), percentageX,(videoRef.current).getDuration() * percentageX, 'seconds')
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
      <div className="mx-auto shrink " >
        <div className="bg-light mx-2 border border-2 border-black bg-black">
          <ReactPlayer 
            url={url} 
            playing={isPlaying}
            volume={volume}
            ref = {videoRef}
            fps={fps}
            
          />
        </div>
      </div>
    );
}


export default dynamic (() => Promise.resolve(ReactVideoPlayer), {ssr: false})
