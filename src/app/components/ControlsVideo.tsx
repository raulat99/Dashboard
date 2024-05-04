"use client";
import { IoSyncOutline } from "react-icons/io5";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { Marker, MarkerConfiguration } from "../models/Market";
import MarkerView from "./MakerView";
import { IoIosArrowBack, IoIosArrowForward, IoMdAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { use, useCallback, useContext, useEffect, useRef, useState } from "react";
import { DashboardGraphsContext } from "../providers/DashboardProvider";
import { INFINITY } from "chart.js/helpers";
import { FaFileDownload } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";
import { ValidationResult } from 'joi'
import { markersValidationSchema } from "../models/import-markers-validation";
import { VideoContext } from "../providers/VideoProvider";

export default function ControlsVideo() {

  //const {percentageX, dataX, markersUploaded, updatePercentageX} = useContext(DashboardGraphsContext)
  const {markersUploaded} = useContext(DashboardGraphsContext)

  const {videoSync, videoRefs, volume, currentTime, updateMarkers, updateVolume, updateVideoSync, updateCurrentTime} = useContext(VideoContext)

  var markers = markersUploaded

  const progressEl = useRef<HTMLProgressElement>(null)
  const volumeEl = useRef<HTMLInputElement>(null)
  const [muted, updateMuted] = useState<boolean>(false)
  const [selectedMarker, setSelectedMarker] = useState<Marker | undefined>(undefined)
  const [markerConfiguration, setMarkerConfiguration] = useState<MarkerConfiguration | undefined>(undefined)
  const [duration, setVideoDuration] = useState<number>(0)
  const [currentTimeProgressBar, setCurrentTimeProgressBar] = useState<number>(currentTime)

  const getTimeCode = (secs: number): string => {
    let secondsNumber = secs ? parseInt(String(secs), 10) : 0;
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let seconds = secondsNumber - hours * 3600 - minutes * 60;
    let hoursStr: string = String(hours);
    let minutesStr: string = String(minutes);
    let secondsStr: string = String(seconds);

    if (hours < 10) {
      hoursStr = "0" + hours;
    }
    if (minutes < 10) {
      minutesStr = "0" + minutes;
    }
    if (seconds < 10) {
      secondsStr = "0" + seconds;
    }

    return `${
      hoursStr !== "00" ? hoursStr + ":" : ""
    }${minutesStr}:${secondsStr}`;
  };

  const durationTimeCode = getTimeCode(Math.ceil(duration));
  const currentTimeCode = currentTime !== duration ? getTimeCode(currentTime) : durationTimeCode;

  



  const getDuration = useCallback(() =>{
    if(videoRefs.length === 0) return 0

    const player = videoRefs[0].videoRef.current
    if(player)
    {
      return player.getDuration()
    }
    return 0
  },[videoRefs])

  const onClickSynchronize = () =>{
    setTimeout(() => {
    updateVideoSync(false)
  },100);
  setTimeout(() => {
    updateCurrentTime(getCurrentTime())
  },500);
    setTimeout(() => {
      updateVideoSync(true)
    },1000);
  }

  const onPlayClick = ()=>{
    updateVideoSync(true)
  } 

  const onPauseClick = ()=>{
    updateVideoSync(false)
  }

  const onNextFrameClick = () => {
    const player = videoRefs[0].videoRef.current;
    const frameTime = 1 / 30;

    //Si pulso en el siguiente frame, sumo 1/frame al tiempo actual para pasar al siguiente frame
    //Utilizo el min para que no pueda ser mayor que la duración del video
    if(!player) return
    updateCurrentTime( Math.min(player.getDuration(),player.getCurrentTime() + frameTime))
  };
  
  const onLastFrameClick = () => {
    const player = videoRefs[0].videoRef.current;
    const frameTime = 1 / 30;

    //Si pulso en el anterior frame, resto 1/frame al tiempo actual para pasar al anterior frame
    // Utilizo el max para que no pueda ser negativo
    if(!player) return
    updateCurrentTime(Math.max(0,player.getCurrentTime() - frameTime))
  };

  const onVolumeClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(!volumeEl.current) return    
      const volumeX = Number(e.target.value)

      if(volumeX === 0) {
        updateMuted(true)
      } else {
        updateMuted(false)
      }
      updateVolume(volumeX)
    }

    const onMuteClick = () => {
    if (muted) {
      updateVolume(volume)
      updateMuted(false)
    } else {
      updateVolume(0)
      updateMuted(true)
    }
  }

  const getCurrentTime = ()=>
    {
      if(videoRefs.length === 0) return 0
      if(videoRefs[0].videoRef.current)
      {
        return videoRefs[0].videoRef.current.getCurrentTime()
      }

      return 0
    }

    const getCurrentTimeNow = ()=>
      {
        if(videoRefs.length === 0) return 0
      if(videoRefs[0].videoRef.current)
      {
        return videoRefs[0].videoRef.current.getCurrentTime()
      }

      return 0
      }

   const getMarker = (currentTime: number): Marker => {
    return {
      id: Math.random(),
      time: currentTime,
      title: `Marker ${markers.length + 1}`,
    };
  };

  const onAddMarkerClick = () => {
    const videoRef = videoRefs[0].videoRef.current
    if (!videoRef) return;

    const newMarker: Marker = getMarker(getCurrentTimeNow());
    markers.push(newMarker);
    updateMarkers(markers);
    console.log({ markers: markers });
  };

   const handleMarkerClick = (marker: Marker) => {
    const videoRef = videoRefs[0].videoRef.current
    if (!videoRef) return
    console.log("markerTime", marker['time']);
    updateCurrentTime(marker['time'])
    handleOnMarkerSelection(marker);
  }

  const onDeleteMarker = (markerToDelete: Marker) => {
    const remainingMarkers = markers.filter(
      (m) => m.id !== markerToDelete.id //&& m.time !== markerToDelete.time
    );
    updateMarkers(remainingMarkers);
    console.log({ remainingMarkers: remainingMarkers });
  };

  const onDeleteMarkerClick = () => {
    if (selectedMarker && selectedMarker.time == getCurrentTime()) {
      onDeleteMarker(selectedMarker);
    } else {
      //const newErrors = this.state.errors.concat('No Marker is selected')
      //this.setState({ errors: newErrors })
      console.log("No Marker is selected");
    }
  };

  const onDeleteAllMarkersClick = () => {
    updateMarkers([]);
  };

  const handleOnMarkerSelection = (selectedMarker: Marker): void => {
    setSelectedMarker(selectedMarker);
  };

  const downloadAttachment = (data: string, fileName: string) => {
    const url = window.URL.createObjectURL(new Blob([data]))
    downloadAttachmentFromUrl(url, fileName)
  }
  
  const downloadAttachmentFromUrl = (url: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    link.click()
  }

  const onExportMarkersClick = () => {  
      downloadAttachment(
        JSON.stringify(markers, null, 2),
        `Markers_${new Date().toISOString().substring(0, 10)}.json`,
      )
    }

  const onMarkerImported = (importedMarkers: Marker[]) => {
      const completeMarkers = markers.slice().concat(importedMarkers)
      updateMarkers(completeMarkers)
    }
  

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const updatedJSON = e.target.files[0]
      if (updatedJSON.type === 'application/json') {
        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0])
        fileReader.onload = (ev: ProgressEvent<FileReader>) => {
          const target = ev.target
          if (target) {
            const result: Marker[] = JSON.parse(target.result as any)
            const { error }: ValidationResult = markersValidationSchema.validate(result)
            if (error) {
              //this.setState({ errors: error.details.map((m) => m.message) })
              console.warn(`Invalid file`)
            } else {
              onMarkerImported(result)
            }
          } else {
            console.warn(`Unable to read the uploaded file`)
          }
        }
      }
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    if(!progressEl.current ) return
    const player = videoRefs[0].videoRef.current
    if(!player) return

    const x = e['clientX'] - progressEl.current.getBoundingClientRect().left + document.body.scrollLeft
    const percentage = (x * progressEl.current.max) / progressEl.current.offsetWidth
    progressEl.current.value = percentage

    const percentageInSeconds = player.getDuration() * (percentage/100)
    //updatePercentageX((percentage / 100))
      
      console.log("percentageInSeconds", percentageInSeconds)
      updateCurrentTime(percentageInSeconds)
      setCurrentTimeProgressBar(percentageInSeconds)
  }

  useEffect(() => {
    console.log(getCurrentTime())
    //console.log(currentTimeProgressBar, 
      // videoRefs, 
      // !videoSync, 
      // markers, selectedMarker, dataX, getCurrentTime, getDuration)
    setTimeout(()=>{
      if (progressEl && progressEl.current) {
        const timeNow = getCurrentTime()
        setCurrentTimeProgressBar(timeNow)

        if(selectedMarker !== undefined && (((timeNow - 1) > selectedMarker.time) || (selectedMarker.time > (timeNow+1)))) setSelectedMarker(undefined)
          
        markers.map((marker: Marker) => { 
            if(((timeNow - 1) < marker.time) && (marker.time < (timeNow+1)))
              {
                setSelectedMarker(marker)
          }})
        let percentage = (timeNow / getDuration()) * 100
        if(percentage === Infinity || Number.isNaN(percentage)) percentage = 0
        progressEl.current.value = percentage;
        progressEl.current.innerHTML = percentage + "% played";
      }
    }, 500)
  
  },[currentTimeProgressBar, videoSync, getCurrentTime, getDuration, markers, selectedMarker]) 
  // markers, currentTimeProgressBar, videoSync, videoRefs && videoRefs[0]?.videoRef.current?.getCurrentTime()
  //, videoRefs, markers, selectedMarker, dataX, getCurrentTime, getDuration, videoSync])
// videoRefs[0]?.videoRef.current?.getCurrentTime(),
  return (
    <div className="w-[95vw] min-w-[70vw] my-8 ">
      <div className="flex flex-row bg-gray-200 dark:bg-gray-700 rounded-t-lg">
         <div className="mt-1 h-12 mx-2 text-white">{getTimeCode(currentTimeProgressBar)}</div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 mt-1">
          <progress
            ref={progressEl}
            max="100"
            onClick={handleProgressClick}
            
            className="bg-red-900 w-full text-xs font-medium text-red-100 text-center "
          >
           
          </progress>
          <div className="flex relative bg-gray-200 dark:bg-gray-700 mt-1">
          {markers &&
          markers.map((marker, index) => {
            return (
              <MarkerView
                key={index}
                marker={marker}
                duration={getDuration()}
                onMarkerClick={handleMarkerClick}
                selectedMarker={selectedMarker}
                configuration={markerConfiguration}
              />
            );
          })}
          </div>
          </div>
   
        <div className="mt-1 mx-2 text-white">{getTimeCode(getDuration())}</div> 
      </div>

      <div className="diplay flex flex row pt-1 bg-black min-w-fi bg-opacity-15 rounded-b-lg">
        <button className="last-frame" onClick={onLastFrameClick}>
          <div className="w-10 h-8 ">
            <IoIosArrowBack size={24} />
          </div>
        </button>
     
        <button onClick={videoSync ? onPauseClick : onPlayClick} className="play-pause">
          {videoSync ? (
            <div className="w-10 h-8 ">
              <BsPauseFill size={24} />
            </div>
          ) : (
            <div className="w-10 h-8">
              <BsFillPlayFill size={24} />
            </div>
          )}
        </button>

        <button className="next-frame" onClick={onNextFrameClick}>
          <div className="w-10 h-8">
            <IoIosArrowForward size={24} />
          </div>
        </button>

        <button className="synchronize" onClick={onClickSynchronize}>
          <div className="w-10 h-8">
            <IoSyncOutline  size={24} />
          </div>
        </button>

        <div className="flex flex-row mx-auto mt-2 space-x-1">
          <button className="add-marker" onClick={onAddMarkerClick}>
            <div className="w-10 h-8">
              <IoMdAdd size={24} />
            </div>
          </button>
          <button className="delete-marker" onClick={onDeleteMarkerClick}>
            <div className="w-10 h-8">
              <TiDeleteOutline size={24} />
            </div>
          </button>

          <button className="delete-all-markers" onClick={onDeleteAllMarkersClick}>
            <div className="w-10 h-8">
              <MdDeleteForever size={24} />
            </div>
          </button>
          <button className="download-markers" onClick={onExportMarkersClick}>
            <div className="w-10 h-8">
              <FaFileDownload size={22} />
            </div>
          </button>
          <div className="w-10 h-8">
          <IoCloudUpload size={24} />
          </div>
          <div className="import-markers h-8 w-14">
            <label htmlFor="input_json"> Import </label>
          <input  type="file"
                id="input_json"
                accept=".json"
                style={{ visibility: 'hidden',
                 
                 }}
                onChange={onChangeFile}
                onClick={(event) => {
                  event.currentTarget.value = null
                }}
                />
          </div>
          <div className="import-markers h-8 w-20">
            <label htmlFor="input_json"> markers </label>
          </div>

        </div>

        <div className="w-30 h-8 mx-2 mt-1 flex flex-row">
        <input
						type='range'
            ref={volumeEl}
						className='w-40 h-4.5 bg-gray-600 rounded-full mr-2'
						min={0}
						max={1}
						step={0.05}
						value={volume}
						onChange={onVolumeClick}
					/>

          <div className="w-22 h-8 mt-1 mx-1">
          {/* {Math.round(Math.max((parseFloat(volume.toFixed(2))) * 100 ,0))}  */}
          
          {(volume * 100).toFixed(0)} % volume
          </div>
        </div>
        <button
          className={muted ? "no-volume" : "volume"}
          onClick={onMuteClick}
        >
          <div className="w-10 h-8">
          {muted ?
            <FaVolumeMute size={24} />
            :
            <FaVolumeUp size={24}/>
          }
          </div>
        </button>

        </div>


        </div>
  );
}
