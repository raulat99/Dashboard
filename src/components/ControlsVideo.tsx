'use client';
import { IoSyncOutline } from 'react-icons/io5';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { Marker, MarkerConfiguration } from '../models/Marker';
import MarkerView from './MakerView';
import { IoIosArrowBack, IoIosArrowForward, IoMdAdd } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import NavbarMarkers from '@/components/NavbarMarkers';

import {
  use,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DashboardGraphsContext } from '../providers/DashboardProvider';
import { INFINITY } from 'chart.js/helpers';
import { FaFileDownload } from 'react-icons/fa';
import { IoCloudUpload } from 'react-icons/io5';
import { ValidationResult } from 'joi';
import { markersValidationSchema } from '../models/import-markers-validation';
import { VideoContext } from '../providers/VideoProvider';
import { useSession } from 'next-auth/react';

export default function ControlsVideo(props: any) {
  const { percentageX, dataX } = useContext(DashboardGraphsContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    videoSync,
    videoRefs,
    volume,
    currentTime,
    markers,
    durationVideo,
    updateMarkers,
    updateVolume,
    updateVideoSync,
    updateCurrentTime,
  } = useContext(VideoContext);

  console.log(markers)

  const {
    markersUploaded,
    dashboardId
  } = props;

   
  const progressEl = useRef<HTMLProgressElement>(null);
  const volumeEl = useRef<HTMLInputElement>(null);
  const [muted, updateMuted] = useState<boolean>(false);
  const [selectedMarker, setSelectedMarker] = useState<Marker | undefined>(
    undefined
  );
  const [markerConfiguration, setMarkerConfiguration] = useState<
    MarkerConfiguration | undefined
  >(undefined);
  //const [duration, setVideoDuration] = useState<number>(0);
  const [currentTimeProgressBar, setCurrentTimeProgressBar] =
    useState<number>(currentTime);

  const inputTitleMarker = useRef<HTMLInputElement>(null);
  const inputDescriptionMarker = useRef<HTMLInputElement>(null);
  const { data: session } = useSession({ required: true });

  const updateMarkersDatabase = async (markers:  Marker[]) => {
    console.log(markers.length)
    try {
      const res = await fetch(
        `/api/users/${session!.user._id}/dashboards/${dashboardId}`,
        {
          method: 'PUT',
          body:  JSON.stringify(
            {markers: markers})
          ,
        }
      );

      if (res.ok) {
        const body = await res.json();
        console.log(body);
      }
    }
    catch (error) {
      console.log(error);
    } 
  };


  const getTimeCode = (secs: number): string => {
    let secondsNumber = secs ? parseInt(String(secs), 10) : 0;
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let seconds = secondsNumber - hours * 3600 - minutes * 60;
    let hoursStr: string = String(hours);
    let minutesStr: string = String(minutes);
    let secondsStr: string = String(seconds);

    if (hours < 10) {
      hoursStr = '0' + hours;
    }
    if (minutes < 10) {
      minutesStr = '0' + minutes;
    }
    if (seconds < 10) {
      secondsStr = '0' + seconds;
    }

    return `${
      hoursStr !== '00' ? hoursStr + ':' : ''
    }${minutesStr}:${secondsStr}`;
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // const durationTimeCode = getTimeCode(Math.ceil(duration));
  // const currentTimeCode =
  //   currentTime !== duration ? getTimeCode(currentTime) : durationTimeCode;

  // const getDuration = useCallback(() => {
  //   if (videoRefs.length === 0) return 0;

  //   const player = videoRefs[0].videoRef.current;
  //   if (player) {
  //     return player.getDuration();
  //   }
  //   return 0;
  // }, [videoRefs]);

  const onClickSynchronize = () => {
    //setTimeout(() => {
    updateVideoSync(false);
    //},100);
    setTimeout(() => {
      updateCurrentTime(getCurrentTime());
    }, 200);
    setTimeout(() => {
      updateVideoSync(true);
    }, 1500);
  };

  const onPlayClick = () => {
    updateVideoSync(true);
  };

  const onPauseClick = () => {
    updateVideoSync(false);
  };

  const onNextFrameClick = () => {
    const player = videoRefs[0].videoRef.current;
    const frameTime = 1 / 60;

    //Si pulso en el siguiente frame, sumo 1/frame al tiempo actual para pasar al siguiente frame
    //Utilizo el min para que no pueda ser mayor que la duración del video
    if (!player) return;
    updateCurrentTime(
      Math.min(player.getDuration(), player.getCurrentTime() + frameTime)
    );
  };

  const onLastFrameClick = () => {
    const player = videoRefs[0].videoRef.current;
    const frameTime = 1 / 60;

    //Si pulso en el anterior frame, resto 1/frame al tiempo actual para pasar al anterior frame
    // Utilizo el max para que no pueda ser negativo
    if (!player) return;
    updateCurrentTime(Math.max(0, player.getCurrentTime() - frameTime));
  };

  const onVolumeClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!volumeEl.current) return;
    const volumeX = Number(e.target.value);

    if (volumeX === 0) {
      updateMuted(true);
    } else {
      updateMuted(false);
    }
    updateVolume(volumeX);
  };

  const onMuteClick = () => {
    if (muted) {
      updateVolume(volume);
      updateMuted(false);
    } else {
      updateVolume(0);
      updateMuted(true);
    }
  };

  const getCurrentTime = () => {
    console.log("hola")
    if (videoRefs.length === 0) return 0;
    if (videoRefs[0].videoRef.current) {
      console.log("hola")

      return videoRefs[0].videoRef.current.getCurrentTime();
    }
    console.log("hola")
    return 0;
  };

  const getCurrentTimeNow = () => {
    if (videoRefs.length === 0) return 0;
    if (videoRefs[0].videoRef.current) {
      return videoRefs[0].videoRef.current.getCurrentTime();
    }

    return 0;
  };

  const getMarker = (currentTime: number, titleMarker?: string, descriptionMarker?: string): Marker => {
    return {
      id: Math.random(),
      time: currentTime,
      title: titleMarker || `Marker ${markers.length + 1}`,
      description: descriptionMarker || ""
    };
  };

  const onAddMarkerClick = () => {
    const videoRef = videoRefs[0].videoRef.current;
    if (!videoRef) return;

    if (!inputTitleMarker.current) return;

    if (!inputDescriptionMarker.current) return;

    const newMarker: Marker = getMarker(
      getCurrentTimeNow(),
      inputTitleMarker.current.value,
      inputDescriptionMarker.current.value
    );
    markers.push(newMarker);
    updateMarkers(markers);
    updateMarkersDatabase(markers);

    console.log({ markers: markers });
    toggleModal();


  };



  const handleMarkerClick = (marker: Marker) => {
    if (!videoRefs) return;

    const videoRef = videoRefs[0]?.videoRef.current;
    if (!videoRef) return;
    console.log('markerTime', marker['time']);
    updateCurrentTime(marker['time']);
    handleOnMarkerSelection(marker);
  };

  
  const navbarMarkerClick = (marker: Marker) => {
    handleMarkerClick(marker);
  }

  const onDeleteMarker = (markerToDelete: Marker) => {
    const remainingMarkers = markers.filter(
      (m) => m.id !== markerToDelete.id //&& m.time !== markerToDelete.time
    );

    console.log(remainingMarkers.length)
    updateMarkers(remainingMarkers);
    updateMarkersDatabase(remainingMarkers);

    console.log({ remainingMarkers: remainingMarkers });
  };

  const onDeleteMarkerClick = () => {
    if (selectedMarker && selectedMarker.time == getCurrentTime()) {
      onDeleteMarker(selectedMarker);
    } else {
      //const newErrors = this.state.errors.concat('No Marker is selected')
      //this.setState({ errors: newErrors })
      console.log('No Marker is selected');
    }
  };

  const onDeleteAllMarkersClick = () => {
    updateMarkers([]);
    updateMarkersDatabase([]);

  };

  const handleOnMarkerSelection = (selectedMarker: Marker): void => {
    setSelectedMarker(selectedMarker);
  };

  const downloadAttachment = (data: string, fileName: string) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    downloadAttachmentFromUrl(url, fileName);
  };

  const downloadAttachmentFromUrl = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.click();
  };

  const onExportMarkersClick = () => {
    downloadAttachment(
      JSON.stringify(markers, null, 2),
      `Markers_${new Date().toISOString().substring(0, 10)}.json`
    );
  };

  const onMarkerImported = (importedMarkers: Marker[]) => {
    const completeMarkers = markers.slice().concat(importedMarkers);
    updateMarkers(completeMarkers);
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const updatedJSON = e.target.files[0];
      if (updatedJSON.type === 'application/json') {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0]);
        fileReader.onload = (ev: ProgressEvent<FileReader>) => {
          const target = ev.target;
          if (target) {
            const result: Marker[] = JSON.parse(target.result as any);
            const { error }: ValidationResult =
              markersValidationSchema.validate(result);
            if (error) {
              //this.setState({ errors: error.details.map((m) => m.message) })
              console.warn(`Invalid file`);
            } else {
              onMarkerImported(result);
            }
          } else {
            console.warn(`Unable to read the uploaded file`);
          }
        };
      }
    }
  };

  const handleProgressClick = (
    e: React.MouseEvent<HTMLProgressElement, MouseEvent>
  ) => {
    if (!progressEl.current) return;
    const player = videoRefs[0].videoRef.current;
    if (!player) return;

    onPauseClick()
    const x =
      e['clientX'] -
      progressEl.current.getBoundingClientRect().left +
      document.body.scrollLeft;
    const percentage =
      (x * progressEl.current.max) / progressEl.current.offsetWidth;
    progressEl.current.value = percentage;

    console.log('percentage', percentage);
    const percentageInSeconds = durationVideo * (percentage / 100);
    //updatePercentageX((percentage / 100))

    console.log('percentageInSeconds', percentageInSeconds);
    updateCurrentTime(percentageInSeconds);
    setCurrentTimeProgressBar(percentageInSeconds);

    if(videoSync)
    onClickSynchronize();
  };

  useEffect(() => {
    //setTimeout(() => {
      if (progressEl && progressEl.current) {

        if (videoRefs.length === 0) return ;
        if (!videoRefs[0].videoRef.current ) return ;    

        const timeNow = videoRefs[0].videoRef.current.getCurrentTime();
        console.log(timeNow)
        setCurrentTimeProgressBar(timeNow);

        if (
          selectedMarker !== undefined &&
          (timeNow - 0.1 > selectedMarker.time ||
            selectedMarker.time > timeNow + 0.1)
        )
          setSelectedMarker(undefined);

        markers.map((marker: Marker) => {
          if (timeNow - 0.1 < marker.time && marker.time < timeNow + 0.1) {
            setSelectedMarker(marker);
          }
        });
        let percentage = (timeNow / durationVideo) * 100;
        console.log(percentage)
        if (percentage === Infinity || Number.isNaN(percentage)) percentage = 0;
        progressEl.current.value = percentage;
        progressEl.current.innerHTML = percentage + '% played';

        if(percentage === 100)
          onPauseClick()
      }
    //}, 500);
  }, [currentTimeProgressBar, videoSync, durationVideo, markers, selectedMarker, dataX, percentageX, videoRefs, onPauseClick]);

  useEffect(()=>{
    console.log(props)

    if(markersUploaded !== undefined)
      updateMarkers(markersUploaded)

  }, [])


  return (
    <div className='mx-auto  my-8 w-[95vw] min-w-[992px]'>
      <div className='flex flex-row rounded-t-lg bg-gray-200 dark:bg-gray-700'>
        <div className='mx-2 mt-1 h-12 text-white'>
          {getTimeCode(currentTimeProgressBar)}
        </div>
        <div className='mt-1 w-full bg-gray-200 dark:bg-gray-700'>
          <progress
            ref={progressEl}
            max='100'
            onClick={handleProgressClick}
            className='w-full bg-red-900 text-center text-xs font-medium text-red-100 '
          ></progress>
          <div className='relative mt-1 flex bg-gray-200 dark:bg-gray-700'>
            {markers &&
              markers.map((marker, index) => {
                return (
                  <MarkerView
                    key={index}
                    marker={marker}
                    duration={durationVideo}
                    onMarkerClick={handleMarkerClick}
                    selectedMarker={selectedMarker}
                    configuration={markerConfiguration}
                  />
                );
              })}
          </div>
        </div>

        <div className='mx-2 mt-1 text-white'>{getTimeCode(durationVideo)}</div>
      </div>

      <div className='diplay row flex flex h-12 rounded-b-lg  bg-black bg-opacity-15 pt-1 '>
        <button className='last-frame' onClick={onLastFrameClick}>
          <div className='h-8 w-10 '>
            <IoIosArrowBack size={24} />
          </div>
        </button>

        <button
          onClick={videoSync ? onPauseClick : onPlayClick}
          className='play-pause'
        >
          {videoSync ? (
            <div className='h-8 w-10 '>
              <BsPauseFill size={24} />
            </div>
          ) : (
            <div className='h-8 w-10'>
              <BsFillPlayFill size={24} />
            </div>
          )}
        </button>

        <button className='next-frame' onClick={onNextFrameClick}>
          <div className='h-8 w-10'>
            <IoIosArrowForward size={24} />
          </div>
        </button>

        <button className='synchronize' onClick={onClickSynchronize}>
          <div className='h-8 w-10'>
            <IoSyncOutline size={24} />
          </div>
        </button>
        <div className='ml-auto mt-2 flex flex-row space-x-1'>
          <div className=' relative h-8 w-10'>
            <button
              onClick={toggleModal}
              //className='block rounded-lg bg-blue-700 h-8 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              type='button'
            >
              <IoMdAdd size={24} />
            </button>

            <div
              id='crud-modal'
              aria-hidden='true'
              className={`absolute bottom-full right-0 z-50 mb-2 flex items-center justify-center ${isModalVisible ? '' : 'hidden'}`}
            >
              <div className='relative max-h-full w-max	 p-4'>
                <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
                  <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                      Create New Marker
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
                    <div className='mb-4 grid grid-cols-2 gap-4 '>
                      <div className='col-span-2'>
                        <label
                          htmlFor='name'
                          className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Name
                        </label>
                        <input
                          type='text'
                          name='name'
                          id='name'
                          ref={inputTitleMarker}
                          className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                          placeholder='Type marker name'
                          required
                        />
                      </div>
                      <div className='col-span-2'>
                        <label
                          htmlFor='description'
                          className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Marker Description
                        </label>
                        <textarea
                          id='description'
                          rows={4}
                          ref={inputDescriptionMarker}
                          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                          placeholder='Write marker description here'
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      onClick={onAddMarkerClick}
                    >
                      <svg
                        className='-ms-1 me-1 h-5 w-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      Add new marker
                    </button>
                </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <input
              type='text'
              ref={inputTitleMarker}
              id='first_name'
              className='-mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-white dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='Marker title'
              required
            />
          </div> */}

          {/* <button className='add-marker' onClick={onAddMarkerClick}>
            <div className='h-8 w-10'>
              <IoMdAdd size={24} />
            </div>
          </button> */}
          <button className='delete-marker' onClick={onDeleteMarkerClick}>
            <div className='relative h-8 w-10'>
              <TiDeleteOutline size={24} />
            </div>
          </button>

          <button
            className='delete-all-markers'
            onClick={onDeleteAllMarkersClick}
          >
            <div className=' relative h-8 w-10'>
              <MdDeleteForever size={24} />
            </div>
          </button>
          <button className='download-markers' onClick={onExportMarkersClick}>
            <div className='relative h-8 w-10'>
              <FaFileDownload size={22} />
            </div>
          </button>
          <div className='relative h-8 w-10'>
            <IoCloudUpload size={24} />
          </div>
          <div className=' relative h-8 w-14'>
            <label htmlFor='input_json'> Import </label>
            <input
              type='file'
              id='input_json'
              accept='.json'
              style={{ visibility: 'hidden' }}
              onChange={onChangeFile}
              onClick={(event) => {
                event.currentTarget.value = null;
              }}
            />
          </div>
          <div className='relative h-8 w-20'>
            <label htmlFor='input_json'> markers </label>
          </div>

          
        </div>

        <div className="display flex mr-auto">
        <NavbarMarkers markers={markers} handleMarkerClick={navbarMarkerClick} currentTime={currentTimeProgressBar}  />
        </div>

        

        <div className='w-30 mx-2 mt-1 flex h-8 flex-row'>
          <input
            type='range'
            ref={volumeEl}
            className='h-4.5 mr-2 w-40 rounded-full bg-gray-600'
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={onVolumeClick}
          />

          <div className='w-22 mx-1 mt-1 h-8'>
            {/* {Math.round(Math.max((parseFloat(volume.toFixed(2))) * 100 ,0))}  */}
            {(volume * 100).toFixed(0)} % volume
          </div>
        </div>
        <button
          className={muted ? 'no-volume' : 'volume'}
          onClick={onMuteClick}
        >
          <div className='relative h-8 w-10'>
            {muted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
          </div>
        </button>
      </div>
    </div>
  );
}
