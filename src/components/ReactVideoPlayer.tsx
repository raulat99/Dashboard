'use client';

import React, {
  RefObject,
  use,
  useCallback,
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
import { SignalConfig } from '@/models/SignalConfig';

//export default function Video(props:any){

interface Props {
  url: string;
  videoID: string;
  fps: number;
  signals?: any;
  signalOnVideo?: number[];
}

const ReactVideoPlayer = (props: Props) => {
  const { url, videoID, fps, signals, signalOnVideo } = props;
  const [currentTimeNow, setCurrentTimeNow] = useState<number>(0)

  //const [duration, setDuration] = useState<number>(0)


  const { percentageX, dataX, updateDataX } = useContext(DashboardGraphsContext);
  const { videoSync, volume, updateVideoRefs, currentTime, durationVideo, updateDurationVideo } = useContext(VideoContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const videoRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [signalsSort, setSignalsSort] = useState([]);

  const [minGraphX, setMinGraphX] = useState(0);
const [maxGraphX, setMaxGraphX] = useState(100);
const [minGraphY, setMinGraphY] = useState(0);
const [maxGraphY, setMaxGraphY] = useState(100);
const [pointsGraph, setPointsGraph] = useState(10);

const inputMinGraphX = useRef<HTMLInputElement>(null);
const inputMaxGraphX = useRef<HTMLInputElement>(null);
const inputMinGraphY = useRef<HTMLInputElement>(null);
const inputMaxGraphY = useRef<HTMLInputElement>(null);
const inputPointsGraph = useRef<HTMLInputElement>(null);


  const play = () => {setIsPlaying(true);};
  const pause = () => { setIsPlaying(false);};

  const OnPlayerClick = () => {
    if (videoRef.current) {
      console.log(videoRef.current?.getCurrentTime());
    }
  };
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const OnDurationLoaded = useCallback((durationLoaded: any) => {

    if(durationLoaded && durationLoaded !== durationVideo)
     updateDurationVideo(durationLoaded);

  },[durationVideo, updateDurationVideo])

  const OnPlayerProgress = useCallback((state: any) => {
    if (videoRef.current === null) return;
    if (signalOnVideo === undefined) return;


    // console.log(signals)

    // var signalRequested = signalOnVideo.map((signal: any) => {
    //   return signals.find(
    //     (signalItem: SignalConfig) => signalItem.signalID === signal.signalID
    //   );
    // });

    // console.log(durationVideo)

    const point: string = ((state.playedSeconds / durationVideo) * signals[0].values.length).toFixed(0);

    console.log(point)
    updateDataX(parseFloat(point));
    setCurrentTimeNow(state.playedSeconds);

    // let beginingNumber = parseFloat(point) - pointsGraph < 0 ? 0 : parseFloat(point) - pointsGraph;

    // let signalsSort = { ...signalRequested[0] };

    // signalsSort.values = signalsSort.values.slice(beginingNumber,parseFloat(point) + 1);

    // setSignalsSort(signalsSort);
  }, [signalOnVideo, durationVideo, signals, updateDataX]);

  const onChangePropertiesClick = () => {
    if (!videoRef.current) return;
    if (!inputMinGraphX.current) return;
    if (!inputMaxGraphX.current) return;
    if (!inputMinGraphY.current) return;
    if (!inputMaxGraphY.current) return;
    if (!inputPointsGraph.current) return;
  
    const minGraphXInput = parseFloat(inputMinGraphX.current.value) || minGraphX;
    const maxGraphXInput = parseFloat(inputMaxGraphX.current.value) || maxGraphX;
    const minGraphYInput = parseFloat(inputMinGraphY.current.value) || minGraphY;
    const maxGraphYInput = parseFloat(inputMaxGraphY.current.value) || maxGraphY;
    const pointsGraphInput = parseFloat(inputPointsGraph.current.value) || pointsGraph;
  
    setMinGraphX(minGraphXInput);
    setMaxGraphX(maxGraphXInput);
    setMinGraphY(minGraphYInput);
    setMaxGraphY(maxGraphYInput);
    setPointsGraph(pointsGraphInput);
  };
  

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(currentTime);
    }
  }, [currentTime]);

  useEffect(() => {
    console.log(videoID, videoRef)
    updateVideoRefs({ videoID, videoRef });
  }, [updateVideoRefs, videoID]);

  useEffect(() => {
    if (percentageX && videoRef.current !== null) {
      videoRef.current.seekTo(videoRef.current.getDuration() * percentageX,'seconds');
    }
  }, [percentageX]);

  useEffect(() => {
    if (videoSync) play();
    else pause();
  }, [videoSync]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className='bg-light '>
      <div className='sticky m-2 border border-2 border-black'>
        <div>
          <ReactPlayer
            url={url}
            playing={isPlaying}
            volume={volume}
            ref={videoRef}
            //fps={fps}
            onProgress={OnPlayerProgress}
            onDuration={OnDurationLoaded}
          />
        </div>
        {signals && signalOnVideo && (
          <div className=' absolute left-0 top-0 h-full w-full'>
            <LinesChart
              signals={signals}
              minX={minGraphX}
              maxX={maxGraphX}
              minY={minGraphY}
              maxY={maxGraphY}
              points={pointsGraph}
              signalOnVideo={signalOnVideo}
              currentTimeNow={currentTimeNow}
              durationVideo={durationVideo}
            />
          </div>
        )}
      </div>

      {signals.length !== 0 && signalOnVideo && (
        <div className='w-50 relative mx-2 h-8'>
          <button
            onClick={toggleModal}
            className='block h-8 rounded-lg bg-blue-700 px-5 py-1.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            type='button'
          >
            Change properties
          </button>

          <div
            id='crud-modal'
            aria-hidden='true'
            className={`absolute bottom-full left-0 z-50 mb-2 flex items-center justify-center ${isModalVisible ? '' : 'hidden'}`}
          >
            <div className='relative max-h-full w-max	 p-4'>
              <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
                <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Change properties
                  </h3>
                  <button
                    type='button'
                    onClick={toggleModal}
                    className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <svg
                      className='h-3 w-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 14'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                      />
                    </svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                </div>
                <div className='p-4 md:p-5'>
                  <div className='mb-4 grid grid-cols-4 gap-4'>
                    <div className='col-span-2'>
                      <label
                        htmlFor='minGraphX'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Min X
                      </label>
                      <input
                        type='text'
                        id='minGraphX'
                        ref={inputMinGraphX}
                        className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                        placeholder={minGraphX.toString()}
                        required
                      />
                    </div>
                    <div className='col-span-2'>
                      <label
                        htmlFor='maxGraphX'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Max X
                      </label>
                      <input
                        type='text'
                        id='maxGraphX'
                        ref={inputMaxGraphX}
                        className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                        placeholder={maxGraphX.toString()}
                        required
                      />
                    </div>
                    <div className='col-span-2'>
                      <label
                        htmlFor='minGraphY'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Min Y
                      </label>
                      <input
                        type='text'
                        id='minGraphY'
                        ref={inputMinGraphY}
                        className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                        placeholder={minGraphY.toString()}
                        required
                      />
                    </div>
                    <div className='col-span-2'>
                      <label
                        htmlFor='maxGraphY'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Max Y
                      </label>
                      <input
                        type='text'
                        id='maxGraphY'
                        ref={inputMaxGraphY}
                        className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                        placeholder={maxGraphY.toString()}
                        required
                      />
                    </div>
                    <div className='col-span-4'>
                      <label
                        htmlFor='name'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Points graph
                      </label>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        ref={inputPointsGraph}
                        className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                        placeholder={pointsGraph.toString()}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={onChangePropertiesClick}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ReactVideoPlayer), { ssr: false });
