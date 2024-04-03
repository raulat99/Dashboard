"use client";
import { useRef, useState, useEffect, use } from "react";
import ControlsVideo from "./ControlsVideo";
import { Marker, MarkerConfiguration } from "../models/Market";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const progressEl = useRef<HTMLProgressElement>(null)

  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setVideoDuration] = useState<number>(0)

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
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - frameTime
      );
      setTimeNow(videoRef.current.currentTime)
      console.log(videoRef.current?.currentTime);
    }
  };

  const onNextFrameClick = () => {
    const frameTime = 1 / fps;
    if (videoRef.current)
    {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + frameTime
      );
      setTimeNow(videoRef.current.currentTime)
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
    videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration
    setTimeNow(videoRef.current.currentTime)
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
    videoRef.current.currentTime = marker['time']
    setTimeNow(videoRef.current.currentTime)
    onMarkerClick(marker)
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
    videoSync ? onPlay() : onPause();
  }, [videoSync]);

  return (
    <div className="react-video-wrap m-6" style={{ height, width }}>
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

        onPlayClick={onPlay}
        onPauseClick={onPause}
        onLastFrameClick={onLastFrameClick}
        onNextFrameClick={onNextFrameClick}
        onAddMarkerClick={onAddMarkerClick}
        onDeleteMarkerClick={onDeleteMarkerClick}
        onDeleteAllMarkersClick={onDeleteAllMarkersClick}
        onProgressClick={handleProgressClick}
        onMarkerClick={handleMarkerClick}
      />
    </div>
  );
}
