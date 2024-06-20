import { Marker } from "../models/Marker"
import { MdArrowDropUp } from "react-icons/md";



interface Props {
    marker: Marker
    duration: number
    onMarkerClick: (marker: Marker) => void
    selectedMarker?: Marker
  }
  
  export default function MarkerView (props: Props) {
      const getPosition = () => {
          const { marker, duration } = props
          const { time } = marker
          if (duration) {
              ////console.log("time", time)
              ////console.log("duration", duration)
              const percent = (time <= duration ? time/duration : 1) * 100
              ////console.log("time/duration",time/duration)
              ////console.log("percent", percent*100)
              ////console.log("calculation", `calc(${percent * 100}% - 2px)` )
              //return `${percent * 100}`
              //return `${percent * 100}%`
              return `calc(${percent}% - 14px)`;
              //return `calc(${percent * 100}% - 2px)`
          }
          return '0%'
      }
      const configuration = undefined
  
          const { marker, onMarkerClick } = props
          const { title } = marker
          const id = String(marker.id)
  
          const selectedColor =
              props.selectedMarker !== undefined && props.selectedMarker.id === marker.id
                  ? configuration !== undefined
                      ? configuration.selectionColor
                      : '#4CAF50'
                  : configuration !== undefined
                  ? configuration.color
                  : '#F44336'
  
          return ( 
           
                <button 
                    id={id}
                  className="react-video-marker"
                  title={title}
                  onClick={() => onMarkerClick(marker)}>

                   {/* <div style={{ 
                    
                    display: "block",
                    height: "8px",
                    width: "8px",
                    left: getPosition(),
                    position: "absolute",
                    background: selectedColor,
                }}
                > */}
                     <MdArrowDropUp style={{cursor: "pointer", height: "28px", width:"28px", color: selectedColor || "white", fontSize: "20px", position: "absolute", top: "-20px", left: getPosition(), }}/>
                   {/* </div> */}
               </button>
                 

          )
      }