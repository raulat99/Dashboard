'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function UploadDataButton(props?: any) {
    const {hrefDirection} = props
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
                  console.log(hrefDirection)
                  hrefDirection === undefined ? location.reload() : router.push(hrefDirection) 
                  router.refresh()
                  //router.push('/dashboards');
                  //router.refresh()
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
        <label htmlFor="newdata" className="bg-indigo-600 text-white m-2  p-4 font-bold rounded-md cursor-pointer">
  Upload new session data
</label>


          <input type="file" id="newdata" accept=".json" onChange={updateUploadedData} hidden />
          {/* <p className="pt-4">File uploaded</p> */}
          {uploadedData && <p className="pt-4 text-white text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">File uploaded</p>}
       </div>
        
    );
    }