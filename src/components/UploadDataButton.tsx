'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function UploadDataButton() {
    const [uploadedData, setUploadedData] = useState<Boolean>(false)
    const { data: session } = useSession({ required: true });
    const router = useRouter()


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
                    setUploadedData(true)
                    postNewDashboardUploaded(result)
                    
                    
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

    const postNewDashboardUploaded = async (uploadedData : any) => {
            try {
                const response =  await fetch(`/api/users/${session?.user._id}/dashboards`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(uploadedData),
                });

                if (response.ok) {
                  router.push('/dashboards');
                 // router.refresh()
                //   router.push('/profile');
                //   router.refresh();
                } 
              } catch (error) {
                console.log(error);
              }
    
    }


    // useEffect(()=>{
    //     console.log(uploadedData)
    //     postNewDashboard}, [uploadedData])


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
          {/* <p className="pt-4">File uploaded</p> */}
          {uploadedData && <p className="pt-4">File uploaded</p>}
       </div>
        
    );
    }