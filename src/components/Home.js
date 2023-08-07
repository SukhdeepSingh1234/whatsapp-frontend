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
      <img src='https://ugtechmag.com/wp-content/uploads/2018/08/whatsapp-promo-696x365.png' />
    </div>
  )
}

export default Home
