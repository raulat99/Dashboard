'use client';
import React, { useEffect, useRef } from 'react';

export default function Video(props:any){

  const videoRef = useRef(null)

  const PlayVideo = ()=>{
    const currentVideo = videoRef.current
    currentVideo.play()
  }

  const PauseVideo = ()=>{
    const currentVideo = videoRef.current
    currentVideo.pause()
  }

  useEffect(()=>{

    if(props.syncVideo){
      PlayVideo()
    }else{
      PauseVideo()
    }

  },[props.syncVideo])

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