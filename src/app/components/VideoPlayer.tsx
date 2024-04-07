"use client";
import { useRef, useState, useEffect, use, useContext } from "react";
import ControlsVideo from "./ControlsVideo";
import { Marker, MarkerConfiguration } from "../models/Market";
import { DashboardGraphsContext } from "../providers/DashboardProvider";
import MarkerView from "./MakerView";

interface Props {
  url: string;
  id: string;
  height: number;
  width: number;
  videoSync: boolean;
  fps: number;
  selectedMarker?: Marker;
  markers: Marker[];
  timeStart?: number;
  markerConfiguration?: MarkerConfiguration;
  timeNow: number;
  setAllMarkers: (markers: Marker[]) => void;
  onMarkerClick?: (marker: Marker) => void
  setTimeNow: (timeNow: number) => void
  setVideoSync: (videoSync: boolean) => void
}

export default function VideoPlayer(props: Props) {
  const {percentajeX} = useContext(DashboardGraphsContext)

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressEl = useRef<HTMLProgressElement>(null)
  const volumeEl = useRef<HTMLInputElement>(null)

  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setVideoDuration] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [volume, setVolume] = useState<number>(0.5)
  const [muted, setMuted] = useState<boolean>(false)

  const {
    url,
    id,
    height,
    width,
    videoSync,
    fps,
    selectedMarker,
    markers,
    timeStart = 0,
    markerConfiguration,
    timeNow,
    setAllMarkers,
    onMarkerClick = () => {} ,
    setTimeNow = () => {},
    setVideoSync = () => {}
  } = props;

  //const [allMarkers, setAllMarkers] = useState<Marker[]>(markers)

  const onPlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
    setVideoSync(true)
  };

  const onPause = () => {
    setIsPlaying(false);
    videoRef.current?.pause();
    setVideoSync(false)
  };

  const handlePlayerClick = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const onHandleVideoEnded = () => {
    // const progressProps: ProgressProps = {
    //   currentTime,
    //   duration: videoDuration,
    //   percentage: 100,
    // }
    // if (onVideoPlayingComplete) {
    //   onVideoPlayingComplete(progressProps)
    // } else {
    //   console.warn(`No onVideoPlayingComplete function is implemented`)
    // }
    setIsPlaying(false);
    
  };

  const onLastFrameClick = () => {
    const frameTime = 1 / fps;
    if (videoRef.current){
      setTimeNow(Math.max(0,videoRef.current.currentTime - frameTime))
      console.log(videoRef.current?.currentTime);
    }
  };

  const onNextFrameClick = () => {
    const frameTime = 1 / fps;
    if (videoRef.current)
    {
      setTimeNow(Math.min(videoRef.current.duration,videoRef.current.currentTime + frameTime))
      console.log(videoRef.current?.currentTime);
    }
      
  };

  const getMarker = (currentTime: number): Marker => {
    return {
      id: Math.random(),
      time: currentTime,
      title: `Marker ${markers.length + 1}`,
    };
  };

  const onAddMarkerClick = () => {
    if (!videoRef.current) return;

    const newMarker: Marker = getMarker(videoRef.current.currentTime);
    markers.push(newMarker);
    setAllMarkers(markers);
    console.log({ markers: markers });
  };

  const onDeleteMarker = (markerToDelete: Marker) => {
    const remainingMarkers = markers.filter(
      (m) => m.id !== markerToDelete.id //&& m.time !== markerToDelete.time
    );
    setAllMarkers(remainingMarkers);
    console.log({ remainingMarkers: remainingMarkers });
  };

  const onDeleteMarkerClick = () => {
    if (selectedMarker) {
      onDeleteMarker(selectedMarker);
    } else {
      //const newErrors = this.state.errors.concat('No Marker is selected')
      //this.setState({ errors: newErrors })
      console.log("No Marker is selected");
    }
  };

  const onDeleteAllMarkersClick = () => {
    setAllMarkers([]);
  };

  const handleProgress = (e: any) => {
    const { currentTarget } = e;
    // tslint:disable-next-line: no-shadowed-variable
    const currentTime = currentTarget["currentTime"];
    const duration = currentTarget["duration"];
    let percentage = 0;
    if (duration) {
      setCurrentTime(currentTime);
      percentage = (100 / duration) * currentTime;
      if (progressEl && progressEl.current) {
        progressEl.current.value = percentage;
        progressEl.current.innerHTML = percentage + "% played";
      } else {
        console.warn(`Progress bar element is not available in DOM`);
      }
      if (currentTime === duration) {
        onPause();
      }
    //   if (onContinuousMarkerReceived) {
    //     handleContinuousMarker(currentTime);
    //   }
    // }
    // const progressProps: ProgressProps = {
    //   currentTime,
    //   duration,
    //   percentage,
     };
    // onProgress(e, progressProps);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    if(!progressEl.current || !videoRef.current) return
    const x =
      e['clientX'] - progressEl.current.getBoundingClientRect().left + document.body.scrollLeft
    const percentage = (x * progressEl.current.max) / progressEl.current.offsetWidth
    setTimeNow((percentage / 100) * videoRef.current.duration)
  }

  const onDuration = (duration: number) => {
    console.log({ duration });
  }

  const handleDurationLoaded = (e: any) => {
    let duration = e.currentTarget['duration']
    if (duration === Infinity) {
      duration = 0
    }
    setVideoDuration(duration)
    onDuration(duration)
  }

  const seekToPlayer = () => {
    if (timeStart && videoRef.current) {
      videoRef.current.currentTime = timeStart
    }
  }

  const handleMarkerClick = (marker: Marker) => {
    if (!videoRef.current) return
    setTimeNow(marker['time'])
    onMarkerClick(marker)
  }


  const handleVolumeClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if(!volumeEl.current || !videoRef.current) return
    // const x =(e['clientX'] - volumeEl.current.getBoundingClientRect().left)  + document.body.scrollLeft

    // const percentage = (x * volumeEl.current.max) / volumeEl.current.offsetWidth

    if(!volumeEl.current || !videoRef.current) return

    const volumeX = e.target.value
    console.log({volumeX})
    

    if(volumeX === '0') {
      setMuted(true)
    } else {
      setMuted(false)
    }
    
    setVolume(volumeX)
  }

  const handleMuteClick = () => {
    if(!videoRef.current) return

    if (muted) {
      videoRef.current.muted = false
      setVolume(volume)
      setMuted(false)
    } else {
      videoRef.current.muted = true
      setVolume(0)
      setMuted(true)
    }
  }


  useEffect(() => {
    const instance = videoRef.current

    if(!instance) return
    instance.addEventListener('timeupdate', handleProgress)
    instance.addEventListener('durationchange', handleDurationLoaded)

    // document.addEventListener('fullscreenchange', () => {
    //   if (isFullScreen && document.fullscreenElement === null) {
    //     handleFullScreenClick()
    //   }
    // })

    if (timeStart) {
      seekToPlayer()
    }
    if (isPlaying) {
      instance.play()
    }

    return () => {
      if (instance) {
        instance.removeEventListener('timeupdate', handleProgress)
        instance.removeEventListener('durationchange', handleDurationLoaded)
      }
    }
  }, [url])//isFullScreen])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeNow
    }

  }, [timeNow])

  useEffect(() => {
    if (percentajeX && videoRef.current) {
      setTimeNow(videoRef.current.duration * percentajeX)
    }
  }, [percentajeX])

  useEffect(() => {
    videoSync ? onPlay() : onPause();
  }, [videoSync]);

  useEffect(() => {
    
  }, [markers]);

  useEffect(() => {
    if (videoRef.current) {
      //videoRef.current.volume = Math.max(volume, 0);
      videoRef.current.volume = volume;
    }
  }, [volume])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted])

  return (
    <div className="flex flex-row" >
    <div className="m-6 w-auto h-auto" style={{ height, width }}>
      <video
        ref={videoRef}
        key={id}
        className="react-video-player"
        
        onClick={handlePlayerClick}
        onEnded={onHandleVideoEnded}
      >
        <source src={url} type="video/mp4" />
      </video>
      <ControlsVideo
        isPlaying={isPlaying}
        progressEl={progressEl as any}
        currentTime={currentTime}
        duration={duration}
        markers={markers}
        selectedMarker={selectedMarker}
        markerConfiguration={markerConfiguration}
        volumeEl={volumeEl as any}
        volume={volume}
        muted={muted}
        onPlayClick={onPlay}
        onPauseClick={onPause}
        onLastFrameClick={onLastFrameClick}
        onNextFrameClick={onNextFrameClick}
        onAddMarkerClick={onAddMarkerClick}
        onDeleteMarkerClick={onDeleteMarkerClick}
        onDeleteAllMarkersClick={onDeleteAllMarkersClick}
        onProgressClick={handleProgressClick}
        onMarkerClick={handleMarkerClick}
        onVolumeClick={handleVolumeClick}
        onMuteClick={handleMuteClick}
      />
      </div>
      <div className="flex flex-col overflow-y-auto py-4 mt-6 {}`max-h-[${videoRef.current.height}`}]" >  {/* style={{maxHeight: parent.height, maxWidth: parent.width }} */}
      {markers &&
          markers.map((marker, index) => {
            return (
              <MarkerView
                key={index}
                marker={marker}
                duration={duration}
                onMarkerClick={handleMarkerClick}
                selectedMarker={selectedMarker}
                configuration={markerConfiguration}
              />
            );
          })}
    </div>
    </div>
  );
}
