import React, { useEffect, useState } from 'react'
import "../Styles/SetProfile.css"
import { ToastContainer } from 'react-toastify'
import { Avatar,Button } from '@mui/material'
import {storage} from '../firebase'
import {ref,uploadBytes,getDownloadURL,deleteObject } from 'firebase/storage'
import axios from '../axios'
import { ClassSharp } from '@mui/icons-material'
function SetProfile() {
    const [bio,setBio]=useState('')
    const [image,setImage]=useState(null)
    const [progress,setProgress]=useState(0)
    const [url, setUrl] = useState("");
    const [isUploadButtonClicked, setIsUploadButtonClicked] = useState(false);
    // Retrieve the auth token from the localStorage
    const authToken = localStorage.getItem("authToken");
   

    const handleUpload = async () => {
        const imageRef = ref(storage,`images/${image.name}`)
            uploadBytes(imageRef,image).then(()=>{
                console.log(image.name)
                getDownloadURL(imageRef)
                .then((url) => {
                    setUrl(url);
                })
                .catch((error) => {
                    // Handle any errors that might occur during the download URL retrieval
                    console.error("Error getting download URL:", error);
                });
            })
        await axios.post('/upload',{
            image:url,
            bio:bio
        } , {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
        })
        .then((response) => {
            
            console.log("Profile updated successfully:", response.data);
        })
            
        .catch((error) => {
          console.error("Error uploading image:", error);
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
                <button className='setProf_uploadInp' onClick={handleUpload} >Upload</button>
            </div>
         
        </div>
    </div>
  )
}

export default SetProfile
