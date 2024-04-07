"use client";

import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { Marker, MarkerConfiguration } from "../models/Market";
import MarkerView from "./MakerView";
import { IoIosArrowBack, IoIosArrowForward, IoMdAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface Props {
  isPlaying: boolean;
  progressEl: React.MutableRefObject<HTMLProgressElement>;
  duration: number;
  currentTime: number;
  markers: Marker[];
  selectedMarker?: Marker;
  markerConfiguration?: MarkerConfiguration;
  volumeEl: React.MutableRefObject<HTMLProgressElement>;
  volume: number;
  muted: boolean;
  onPlayClick: () => void;
  onPauseClick: () => void;
  onLastFrameClick: () => void;
  onNextFrameClick: () => void;
  onAddMarkerClick: () => void;
  onDeleteMarkerClick: () => void;
  onDeleteAllMarkersClick: () => void;
  onProgressClick: (
    event: React.MouseEvent<HTMLProgressElement, MouseEvent>
  ) => void;
  onMarkerClick: (marker: Marker) => void;
  onVolumeClick: (
    event: React.MouseEvent<HTMLProgressElement, MouseEvent>
  ) => void;
  onMuteClick: () => void;
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
    volumeEl,
    volume,
    muted,
    onPauseClick,
    onPlayClick,
    onLastFrameClick,
    onNextFrameClick,
    onAddMarkerClick,
    onDeleteMarkerClick,
    onDeleteAllMarkersClick,
    onProgressClick,
    onMarkerClick,
    onVolumeClick,
    onMuteClick,
  } = props;

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
  const currentTimeCode =
    currentTime !== duration ? getTimeCode(currentTime) : durationTimeCode;

  const handleOnMarkerSelection = (selectedMarker: Marker): void => {
    onMarkerClick(selectedMarker);
  };

  //https://www.svgrepo.com/collection/xnix-circular-interface-icons/11

  return (
    <div>
      <div className="flex flex-row bg-gray-200 dark:bg-gray-700 ">
        <div className="mt-1 mx-2 text-white">{currentTimeCode}</div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 mt-1">
          <progress
            ref={progressEl}
            max="100"
            onClick={onProgressClick}
            className="bg-blue-600 w-full text-xs font-medium text-blue-100 text-center "
          >
            0% played
          </progress>
        </div>

        <div className="mt-1 mx-2 text-white">{durationTimeCode}</div>
      </div>

      <div className="diplay flex flex row w-full pt-1 bg-black bg-opacity-15">
        <button className="last-frame" onClick={onLastFrameClick}>
          <div className="w-10 h-8 ">
            <IoIosArrowBack size={24} />
          </div>
        </button>

        <button
          onClick={isPlaying ? onPauseClick : onPlayClick}
          className="play-pause"
        >
          {isPlaying ? (
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

        <div className="mx-48 mt-2">
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

          <button
            className="delete-all-markers"
            onClick={onDeleteAllMarkersClick}
          >
            <div className="w-10 h-8">
              <MdDeleteForever size={24} />
            </div>
          </button>
        </div>

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
*/}
{/* 
<div className="w-full bg-gray-200 dark:bg-gray-700 mt-1">
          <progress
            ref={progressEl}
            max="100"
            onClick={onProgressClick}
            className="bg-blue-600 w-full text-xs font-medium text-blue-100 text-center "
          >
            0% played
          </progress>
        </div> */}

        <div className="w-30 h-8 mx-2 mt-2 flex flex-row">
          <progress
            ref={volumeEl}
            max="100"
            value={volume}
            onClick={onVolumeClick}

          >
          </progress>
          <div className="w-22 h-8 mx-1">
          {Math.round(Math.max((parseFloat(volume.toFixed(2))) * 100 ,0))} % volume
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
        {/*}
            <button className="full-screen" onClick={onFullScreenClick}>
              FullScreen
            </button> */}
      </div>
    </div>
  );
}
