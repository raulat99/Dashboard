'use client'

import { set } from "mongoose"
import { useState } from "react"

export default function UploadDataButton() {
    const [uploadedData, setUploadedData] = useState(null)
    const updateUploadedData = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files && e.target.files[0]) {
            const updatedJSON = e.target.files[0]
            if (updatedJSON.type === 'application/json') {
              const fileReader = new FileReader()
              fileReader.readAsText(e.target.files[0])
              fileReader.onload = (ev: ProgressEvent<FileReader>) => {
                const target = ev.target
                if (target) {
                  const result = JSON.parse(target.result as any)
                    console.log(result)
                    setUploadedData(result)
                    // var auxCoordinatesXValue : number[] = []
                    // var auxCoordinatesYValue : number[] = []
                    // var auxTimeStamps : number[] = []
    
                    // result.session.signals[0].values.map((objectValue: any)=>{
                    //         auxCoordinatesXValue.push(objectValue.sample[0])
                    //         auxCoordinatesYValue.push(objectValue.sample[1])
                    //         var timefixed = objectValue.timestamp.toFixed(2)
                    //         auxTimeStamps.push(timefixed)
                    //     })
    
                    // setCoordinateXValues(auxCoordinatesXValue)
                    // setCoordinateYValues(auxCoordinatesYValue)
                    // setTimeStamps(auxTimeStamps)
                    // updateMarkersUploaded(result.session.markers)
                    // setVideosConfig(result.session.videos)
                    // setSignalsConfig(result.session.signals)
                    // setUploadedData(result)
                }
                 else {
                  console.warn(`Unable to read the uploaded file`)
                }
              }
            }
          }
    }

    return (
       <div className="my-8 mx-auto">
        <label htmlFor="newdata" style={{
            backgroundColor: "indigo",
            color: "white",
            padding: "0.5rem",
            fontFamily: "sans-serif",
            borderRadius: "0.3rem",
            cursor: "pointer",
            marginTop: "1rem",
          }} >Upload new data
          </label>

          <input type="file" id="newdata" accept=".json" onChange={updateUploadedData} hidden />
          {uploadedData && <p className="pt-4">File uploaded</p>}
       </div>
        
    );
    }