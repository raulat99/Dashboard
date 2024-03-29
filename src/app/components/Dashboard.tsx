'use client'
import React, { useState } from 'react';
import { DashboardProvider } from '../providers/DashboardProvider';
import LinesChart from './LinesChart';
import Video from './Video';


export default function Dashboard () {
    const [videoSync, setVideoSync] = useState<Boolean>(false)

  const playAllVideos = ()=>{
    setVideoSync(true)
  } 

  const pauseAllVideos = ()=>{
    setVideoSync(false)
  }

  return (
    <DashboardProvider>
      <main className="flex flex-col items-center">
        <div>
          <h1 className="text-4xl p-2 py-4 text-center"> Dashboard page </h1>
          <button
            onClick={playAllVideos}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            PlayAllVideos
          </button>
          <button
            onClick={pauseAllVideos}
            className="inline-flex items-center rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            PauseAllVideos
          </button>
        </div>
        <div className="flex-col">
          <div className="display flex w-full flex-wrap">
            <Video src="//vjs.zencdn.net/v/oceans.mp4" syncVideo={videoSync} />
            <Video src="//vjs.zencdn.net/v/oceans.mp4" syncVideo={videoSync} />
            <Video src="//vjs.zencdn.net/v/oceans.mp4" syncVideo={videoSync} />
            <Video src="//vjs.zencdn.net/v/oceans.mp4" syncVideo={videoSync} />
            
            
          </div>
          <div className="z-10 w-full flex-col items-center font-mono text-md display flex ">
            <h2 className="text-lg m-2"> Components: </h2>
            <div className="w-full space-y-4 display flex flex-col">
              {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
              <LinesChart />
              <LinesChart />
            </div>
          </div>
        </div>
      </main>
    </DashboardProvider>
  );
}


