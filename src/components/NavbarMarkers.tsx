'use client'
import { Marker } from "@/models/Marker";
import { useState } from "react";


interface NavbarMarkersProps {

    markers: Marker[];
    handleMarkerClick: (marker: Marker) => void;
    currentTime: number;

}

export default function NavbarMarkers(props: NavbarMarkersProps) {

    const { markers, handleMarkerClick, currentTime } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      };
    
    const sortedMarkers = markers.sort((a, b) => a.time - b.time);

    console.log(sortedMarkers)
    console.log(currentTime)

    return (
    <div>
        <div className='text-center mt-1'>
              <button
                className='rounded-lg bg-blue-700 px-5 py-1.5  text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                type='button'
                onClick={toggleModal}
              >
                { !isModalVisible ? "Show Markers" : "Hide Markers"}
              </button>
            </div>

        <div id="drawer-navigation"  className={` ${isModalVisible ? '' : 'hidden'} fixed top-16 left-64 z-50 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800`} tabIndex={-1} aria-labelledby="drawer-navigation-label">
          <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Makers</h5>
          <button type="button" onClick={toggleModal} data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {/* <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Update markers</span>
                </a>
              </li> */}

            {sortedMarkers && sortedMarkers.map((marker: Marker, i: number) => {
                return (
                    <li className={`border rounded-md ${currentTime - 0.1 < marker.time && marker.time < currentTime + 0.1 ? 'border-green-500' : 'border-white-500' } `}  key={i}>
                        <button onClick={() => handleMarkerClick(marker)} className="flex flex-col flex-start p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
                            <p className="text-white text-xl"> {marker.title} </p>
                            <p className="text-white text-sm"> at {marker.time.toFixed(2)}</p>
                            <p className="text-white text-md text-start"> {marker.description}</p>
                        </button>
                    </li>
                );
            })}
             
            </ul>
          </div>
        </div>
        </div>
    )

}
