import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../Styles/Login.css'
import axios from '../axios'
import OtpVerify from './OtpVerify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [loading,setLoading]=useState(false)
  const [msg,setMsg]=useState(false)
  

  const navigate= useNavigate()
 
  const handleClick=async(e)=>{
    e.preventDefault();
    
    try {
      const response=await axios.post('/signup',{
        name:name,
        email:email,
        phone:phone
      })

      if(response.data.success){
        setLoading(true)
        setMsg(true)
        toast.success(' Registered Sucessfully!', {
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
            navigate("/OtpVerify")
          }, 3000);
          
      }else{
        setMsg(true)
        toast.error(' User Already Exists! Please Log In ', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        }
      
      
    } catch (error) {
      setMsg(true)
      toast.error(' error!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    setInterval(() => {
      setMsg(false)
    }, 6000);

  
  }

  const handleLogin= (e)=>{
    e.preventDefault();
    navigate("/OtpVerify")
    
  }

  return (
    <div className='login' >
      <div className='login_box'>
        <ToastContainer/>
       
          <img className='login_img' src='https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Emblem.png'/>
          <div className='login_adjuster' >
          <form className='login_form'>
                <input type='text' name="name" placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name} />
                <input type='email'name="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <input type="tel" name="phone"  placeholder='Phone no.' onChange={(e)=>setPhone(e.target.value)} value={phone} />
                <button disabled={msg?true:false}  type='submit' className='login_button' onClick={handleClick}  >{loading ? 'Signing In...' : 'Sign Up'}</button>
                <button type='submit' className='login_button' onClick={handleLogin}  >Log In</button>
          </form>
        </div>
        

      </div>
    </div>
  )
}

export default Login
