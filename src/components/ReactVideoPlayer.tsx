'use client';

import React, {
  RefObject,
  use,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  DashboardGraphsContext,
  VideoConfigProp,
} from '../providers/DashboardProvider';
import { VideoContext } from '../providers/VideoProvider';
import ReactPlayer from 'react-player';
import dynamic from 'next/dynamic';
import { DashboardResponse } from '@/lib/handlers';
import LinesChartWithInfo from './LinesChartWithInfo';
import LinesChart from './LinesChart';

//export default function Video(props:any){

interface Props {
  url: string;
  videoID: string;
  fps: number;
  signals?: any;
}

const ReactVideoPlayer = (props: Props) => {
  const { url, videoID, fps, signals } = props;
  const [currentTimeNow, setCurrentTimeNow] = useState<number>(0)

  // const dashboard1 : DashboardResponse = dashboard;

  console.log(signals);

  const { percentageX, dataX, updateDataX } = useContext(DashboardGraphsContext);
  const { videoSync, volume, updateVideoRefs, currentTime } =
    useContext(VideoContext);

  const videoRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [signalsSort, setSignalsSort] = useState(signals[0]);

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const OnPlayerClick = () => {
    if (videoRef.current) {
      console.log(videoRef.current?.getCurrentTime());
    }
  };

  const OnPlayerProgress = (state: any) => {
    console.log(state)
    
    console.log(videoRef.current.getDuration())

    console.log(signals[0].values.length )



    console.log(state.playedSeconds/videoRef.current.getDuration()*signals[0].values.length)
    const point: string = (state.playedSeconds / videoRef.current.getDuration()*signals[0].values.length).toFixed(0)
    console.log(parseFloat(point))
    
    // if(dataX !== parseFloat(point))
    //   {
        updateDataX(parseFloat(point));
        setCurrentTimeNow(state.playedSeconds)
    

        let beginingNumber = (parseFloat(point) - 10)  < 0 ? 0 : parseFloat(point)-10
        //let endNumber = parseFloat(point) + 10 > 

        console.log(beginingNumber  )

        let signalsSort = {...signals[0]}

        console.log(signalsSort)

        signalsSort.values = signalsSort.values.slice(beginingNumber, parseFloat(point)+1)

        // signalsSort.values = signals[0].values.slice(beginingNumber, parseFloat(point))
        
         console.log(signalsSort.values.length)


        

        setSignalsSort(signalsSort)



        // let auxSignalsSort 
        
        // auxSignalsSort= signals[0].values.slice(0);
        // // let auxSignalsSort2 = signals[0].values.slice(0);
        // // auxSignalsSort2 = auxSignalsSort2.splice((parseFloat(point) - 10 < 0))

        

        // console.log(beginingNumber)
        // console.log(parseFloat(point))
        // let justTenNumbers = auxSignalsSort.slice(beginingNumber, parseFloat(point))

        // console.log(justTenNumbers)
        // console.log(justTenNumbers.length)
      // }
   
    
    // auxSignalsSort = auxSignalsSort.splice(0, parseFloat(point))

    // signalsSort.values = auxSignalsSort

    // setSignalsSort(signalsSort)
     
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(currentTime);
    }
  }, [currentTime]);

  useEffect(() => {
    updateVideoRefs({ videoID, videoRef });
  }, []);

  useEffect(() => {
    if (percentageX && videoRef.current !== null) {
      console.log(
        videoRef.current.getDuration(),
        percentageX,
        videoRef.current.getDuration() * percentageX,
        'seconds'
      );
      videoRef.current.seekTo(
        videoRef.current.getDuration() * percentageX,
        'seconds'
      );
    }
  }, [percentageX]);

  useEffect(() => {
    if (videoSync) {
      play();
    } else {
      pause();
    }
  }, [videoSync]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  return (
    // style={{width:width, height: height}}

    <div className='bg-light mx-2 border border-2 border-black bg-black'>
      <div className='relative h-full w-full'>
        <div>
        <ReactPlayer
          url={url}
          playing={isPlaying}
          volume={volume}
          ref={videoRef}
          fps={fps}
          onProgress={OnPlayerProgress}
        />
        </div>
        {signals && ( 
          <div className=' absolute left-0 top-0 h-full w-full'>
            <LinesChart signalConfig={signalsSort} currentTimeNow = {currentTimeNow} totalTime={videoRef.current?.getDuration()} />
          </div>
        )}
      </div>
       
    </div>
  );
};

export default dynamic(() => Promise.resolve(ReactVideoPlayer), { ssr: false });
