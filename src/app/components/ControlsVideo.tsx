'use client'

import { Marker, MarkerConfiguration } from "../models/Market";
import MarkerView from "./MakerView";

interface Props {
    isPlaying: boolean,
    progressEl: React.MutableRefObject<HTMLProgressElement>,
    duration: number,
    currentTime: number,
    markers: Marker[],
    selectedMarker?: Marker,
    markerConfiguration?: MarkerConfiguration,
    onPlayClick: () => void,
    onPauseClick: () => void,
    onLastFrameClick: () => void,
    onNextFrameClick: () => void,
    onAddMarkerClick: () => void,
    onDeleteMarkerClick: () => void,
    onDeleteAllMarkersClick: () => void
    onProgressClick: (event: React.MouseEvent<HTMLProgressElement, MouseEvent>) => void
    onMarkerClick: (marker: Marker) => void

}


export default function ControlsVideo(props: Props) {
    const {
      isPlaying,
      progressEl,
      duration,
      currentTime,
      markers,
      selectedMarker,
      markerConfiguration,
      onPauseClick,
      onPlayClick,
      onLastFrameClick,
      onNextFrameClick,
      onAddMarkerClick,
      onDeleteMarkerClick,
      onDeleteAllMarkersClick,
      onProgressClick,
      onMarkerClick,
    } = props;

    const getTimeCode = (secs: number): string => {
        let secondsNumber = secs ? parseInt(String(secs), 10) : 0
        let hours = Math.floor(secondsNumber / 3600)
        let minutes = Math.floor((secondsNumber - hours * 3600) / 60)
        let seconds = secondsNumber - hours * 3600 - minutes * 60
        let hoursStr: string = String(hours)
        let minutesStr: string = String(minutes)
        let secondsStr: string = String(seconds)
    
        if (hours < 10) {
          hoursStr = '0' + hours
        }
        if (minutes < 10) {
          minutesStr = '0' + minutes
        }
        if (seconds < 10) {
          secondsStr = '0' + seconds
        }
    
        return `${hoursStr !== '00' ? hoursStr + ':' : ''}${minutesStr}:${secondsStr}`
      }

    const durationTimeCode = getTimeCode(Math.ceil(duration))
    const currentTimeCode =
      currentTime !== duration ? getTimeCode(currentTime) : durationTimeCode

    const handleOnMarkerSelection = (selectedMarker: Marker): void => {
        onMarkerClick(selectedMarker)
      }

    return (
        <div className = "diplay flex flex row">
            <button className="last-frame" onClick={onLastFrameClick}>
              Last Frame
            </button>

             <button className={isPlaying ? 'pause' : 'play'}
              onClick={isPlaying ? onPauseClick : onPlayClick}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button className="next-frame" onClick={onNextFrameClick}>
              Next Frame
            </button>

            <button className="add-marker" onClick={onAddMarkerClick}>
              Add Marker
            </button>

            <div className="time">
              {currentTimeCode}/{durationTimeCode}
            </div>

            <div className="progress-wrap">
              <progress ref={progressEl} max="100" onClick={onProgressClick}>
                0% played
              </progress>
              {markers &&
                markers.map((marker, index) => {
                  return (
                    <MarkerView
                      key={index}
                      marker={marker}
                      duration={duration}
                      onMarkerClick={handleOnMarkerSelection}
                      selectedMarker={selectedMarker}
                      configuration={markerConfiguration}
                    />
                  )
                })}
            </div>

            <button className="delete-marker" onClick={onDeleteMarkerClick}>
              Delete Marker
            </button>

            <button className="delete-all-markers" onClick={onDeleteAllMarkersClick}>
              Delete All Markers
            </button>

{/*}
            <button
              className="export-markers"
              onClick={() =>
                downloadAttachment(
                  JSON.stringify(markers, null, 2),
                  `Markers_${new Date().toISOString().substring(0, 10)}.json`,
                )
              }
            >
              Export
            </button>

            <div className="volume-wrap">
              <progress ref={volumeEl} max="100" value={volume * 100} onClick={onVolumeClick}>
                {volume * 100}% volume
              </progress>
              <button className={muted ? 'no-volume' : 'volume'} onClick={onMuteClick}>
                Volume
              </button>
            </div>

            <button className="full-screen" onClick={onFullScreenClick}>
              FullScreen
            </button> */}

        </div>
    )

}
