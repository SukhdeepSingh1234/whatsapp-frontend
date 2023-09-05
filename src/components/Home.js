import React, { useEffect } from 'react'
import '../Styles/Home.css'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate=useNavigate();
    useEffect(()=>{
        setInterval(() => {
            navigate("/Login")
        }, 2000);
    },[])
  return (
    <div className='home_background'>
      <div className='home_logobox' >
        <img className='home_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" alt=""/>
        <h1>WhatsApp</h1>
      </div>
    </div>
  )
}

export default Home
