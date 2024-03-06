'use client';
import React, { useContext, useEffect, useRef } from 'react';
import { DashboardGraphsContext } from '../providers/DashboardProvider';

export default function Video(props:any){
  const {percentajeX} = useContext(DashboardGraphsContext)
  const videoRef = useRef(null)

  const PlayVideo = ()=>{
    const currentVideo = videoRef.current
    if (currentVideo) {
    currentVideo.play()
    }
  }

  const PauseVideo = ()=>{
    const currentVideo = videoRef.current;
    if (currentVideo) {
      currentVideo.pause();
    }
  }

  useEffect(()=>{
    if(percentajeX && videoRef.current){
      videoRef.current.currentTime = videoRef.current.duration * percentajeX;
    }
    if(props.syncVideo){
      PlayVideo();
    }else{
      PauseVideo();
    }
  },[props.syncVideo, percentajeX])

    return (
      <div className="mx-auto">
        <p className="my-5">
          <b>Video:</b>
        </p>
        <div
          className="bg-light mx-2 border border-2 border-black bg-black"
          style={{ width: "450px", height: "250px" }}
        >
          <video ref={videoRef} controls className='w-full h-full'>
            <source src={props.src} type="video/mp4"/>
          </video>
        </div>
      </div>
    );
}