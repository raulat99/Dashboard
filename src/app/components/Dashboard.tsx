'use client'
import React, { RefObject, createRef, useContext, useEffect, useRef, useState } from 'react';
import { DashboardGraphsContext, DashboardProvider } from '../providers/DashboardProvider';
import LinesChart from './LinesChart';
import VideoPlayer from './VideoPlayer';
import { Marker } from '../models/Market';
import ReactVideoPlayer from './ReactVideoPlayer';
import ControlsVideo from './ControlsVideo';
import ReactPlayer from 'react-player';



export default function Dashboard () {

    // "https://www.youtube.com/watch?v=OlL1bDImVkM"
    // "//vjs.zencdn.net/v/oceans.mp4 "
    const videoConfig1 = {
      url: "//vjs.zencdn.net/v/oceans.mp4",
      //url: "https://www.youtube.com/watch?v=OlL1bDImVkM",
      id: "1",
      height: 350,
      width: 700,
      fps: 30,
    }

    const videoConfig2 = {
      url: "//vjs.zencdn.net/v/oceans.mp4",
      //url: "https://www.youtube.com/watch?v=OlL1bDImVkM",
      id: "2",
      height: 350,
      width: 700,
      fps: 30,
    }

    const videoConfig3 = {
      url: "//vjs.zencdn.net/v/oceans.mp4",
      //url: "https://www.youtube.com/watch?v=OlL1bDImVkM",
      id: "3",
      height: 350,
      width: 700,
      fps: 30,
    }

    const videoConfig4 = {
      url: "//vjs.zencdn.net/v/oceans.mp4",
      //url: "https://www.youtube.com/watch?v=OlL1bDImVkM",
      id: "4",
      height: 350,
      width: 700,
      fps: 30,
    }
    var configArray = [videoConfig1, videoConfig2, videoConfig3, videoConfig4]

  return (
    
      <main className="flex flex-col items-center">
          <h1 className="text-4xl p-2 py-4 text-center"> Dashboard page </h1>
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center gap-4">    
          {configArray.map((videoConfigItem) => {
            return <ReactVideoPlayer {...videoConfigItem} key={videoConfigItem.id} />
          })}

          </div>
          <div className="z-10 w-full flex-col items-center font-mono text-md display flex ">
            <ControlsVideo               
              />
            <h2 className="text-lg m-2"> Components: </h2>
            <div className="w-full space-y-4 display flex flex-col">
              {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
              <LinesChart />
              <LinesChart />
            </div>
          </div>
        </div>
      </main>
  );
}


