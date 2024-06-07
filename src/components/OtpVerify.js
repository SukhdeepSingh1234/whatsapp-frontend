import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/OtpVerify.css'
import axios from '../axios'
import { useNavigate } from 'react-router-dom';
function OtpVerify() {
  const [email,setEmail]=useState('')
  const [otp,setOtp]=useState('')
  const [resendOtp,setResendOtp]=useState(false)
  const initialSeconds = 10;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [counting, setCounting] = useState(true);
  const navigate= useNavigate();

  useEffect(() => {
    let interval;
    if (counting && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [counting, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setResendOtp(false)
    }
  }, [seconds]);

  const SendOtp = async (e)=>{
    e.preventDefault();
    setResendOtp(true)
    setSeconds(initialSeconds);
    setCounting(true);
    const response = await axios.post('/api/otp/sendOtp',{
      email:email
    })
    if(response.data.success){
      toast.success(' Otp sent Sucessfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        // setLoading(false)
        
    }else{
      toast.error(`User don't exists!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        // setLoading(false)
      }

  }
  const Verify= async(e)=>{
    e.preventDefault()
    const response= await axios.post('/api/otp/verify',{
      otp:otp
    })
    if(response.data.success){
      toast.success(' Verified Sucessfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        console.log(response.data.authToken)
        console.log(response.data.profile)
        const authToken =response.data.authToken ;
        const profile=response.data.profile;

        // Store the auth token in the localStorage
        localStorage.setItem("authToken", authToken);
        {
          if (profile) {
            navigate("/Application")
          }else{
            navigate("/SetProfile")
          }
        }
        
        
    }else{
      toast.error(`Invalid OTP!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        // setLoading(false)
      }
      setOtp('')
  }
  const SignUp =(e)=>{
    e.preventDefault();
    navigate("/")
  }

  return (
    <div className='otpverify' >
      <div className='otpverify_box' >
        <ToastContainer/>
        <div className='otpverify_data' >
            <h2 className='otpverify_heading' >Verify Yourself</h2>
            <form className='otpverify_form'>
                  <input className='otpverify_form_email' type='email'name="email" placeholder='Email( Entered Previously)' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                  <div className='otpverify_send' >
                    <input className='otpverify_form_otp' type="number" name="otp"  placeholder='6 Digit OTP' onChange={(e)=>setOtp(e.target.value)} value={otp} />
                    <button type='submit' disabled={resendOtp} className='otpverify_buttonOtp' onClick={SendOtp}  > {resendOtp?`Try in (${seconds})`:"Send OTP"} </button>
                  </div>
                  <button type='submit' className='otpverify_button' onClick={Verify}  > Verify </button>
                  <button type='submit' className='otpverify_button' onClick={SignUp}  > Sign Up </button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default OtpVerify
