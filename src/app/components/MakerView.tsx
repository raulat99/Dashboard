import { Marker, MarkerConfiguration } from "../models/Market"



interface Props {
    marker: Marker
    duration: number
    onMarkerClick: (marker: Marker) => void
    selectedMarker?: Marker
    configuration?: MarkerConfiguration
  }
  
  export default function MarkerView (props: Props) {
      const getPosition = () => {
          const { marker, duration } = props
          const { time } = marker
          if (duration) {
              const percent = time <= duration ? time / duration : 1
              return `calc(${percent * 100}% - 2px)`
          }
          return '-9999px'
      }
  
          const { marker, configuration, onMarkerClick } = props
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
            <div>
                <p>{title}</p>
                <i
                  id={id}
                  className="react-video-marker"
                  title={title}
                style={{ 
                    backgroundColor: "#666666",
                    cursor: "pointer",
                    display: "block",
                    height: "8px",
                    width: "4px",
                    //position: "absolute",
                    top: "9px",
                    left: "50%",
                    background: selectedColor,
                    transform: `translateX(-50%)`,
                }}
                  onClick={() => onMarkerClick(marker)}
              />

            </div>
              
          )
      }