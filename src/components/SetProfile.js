import React, { useEffect, useState } from 'react'
import "../Styles/SetProfile.css"
import { ToastContainer, toast } from 'react-toastify';
import { Avatar,Button } from '@mui/material'
import {storage} from '../firebase'
import {ref,uploadBytes,getDownloadURL,deleteObject } from 'firebase/storage'
import axios from '../axios'
import { useNavigate } from 'react-router-dom';

function SetProfile() {
    const [bio,setBio]=useState('')
    const [image,setImage]=useState(null)
    const [progress,setProgress]=useState(0)
    const [url, setUrl] = useState("");
    const [loading,setLoading]=useState(false)
    const [isUploadButtonClicked, setIsUploadButtonClicked] = useState(false);
    // Retrieve the auth token from the localStorage
    const authToken = localStorage.getItem("authToken");
    const navigate= useNavigate();
   
    useEffect(() => {
        if(url){
            axios.post('/upload',{
                image:url,
                bio:bio
            } , {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json"
              },
            })
            .then((response) => {
                if(response.data.success){
                    toast.success(' Profile updated successfully!', {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      });
                      setTimeout(() => {
                        navigate("/Application")
                      }, 3000);
                      
                  }else{
                    toast.error(`Failed to upload profile!`, {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      });
                      setLoading(false)
                    }
              
            })
                
            .catch((error) => {
              console.error("Error uploading image:", error);
              setLoading(false)
              
            })
        }
    }, [url]);

        

    const handleUpload = async () => {
        setLoading(true)
        const imageRef = ref(storage,`images/${image.name}`)
            uploadBytes(imageRef,image).then(()=>{
                getDownloadURL(imageRef)
                .then((url) => {
                    setUrl(url);
                })
                .catch((error) => {
                    // Handle any errors that might occur during the download URL retrieval
                    console.error("Error getting download URL:", error);
                    setLoading(false)
                });
            })
    
        
      };
       
    

  return (
    <div className='setProf' >
        <div className='setProf_box'>
            <ToastContainer/>
            <div className='setProf_data' >
                <h2> Set Your Profile</h2>
                <Avatar src={url} sx={{ width: 70, height: 70 ,border:"2px solid white"}} />
                <div  >
                    <form className='setProf_imageupload' >
                        <input  className='setProf_position' type='file' onChange={(event)=>{setImage(event.target.files[0])}} />
                        <input className='setProf_caption' type='text' placeholder='Enter Bio here' onChange={(e)=> setBio(e.target.value)} value={bio} />
                    </form>
                </div>
                <button disabled={loading} className='setProf_uploadInp' onClick={handleUpload} >Upload</button>
            </div>
         
        </div>
    </div>
  )
}

export default SetProfile
