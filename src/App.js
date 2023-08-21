
import './App.css';
import { useEffect, useState,} from 'react';
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom';
import OtpVerify from './components/OtpVerify';
import { BrowserRouter} from 'react-router-dom';
import Application from './components/Application';
import SetProfile from './components/SetProfile';
import Home from './components/Home'
import { useNavigate } from "react-router-dom";

function App() {




  

  

  return (
    <div className="app">
      <div className='app_body' >
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path="/OtpVerify" element={<OtpVerify />} />
        <Route exact path="/SetProfile" element={<SetProfile />} />
        <Route exact path="/Application" element={<Application />} />
      </Routes>
      </BrowserRouter>
        
      </div>
    </div>
  );
}

export default App;
