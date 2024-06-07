
import './App.css';
import Login from './components/Login'
import { Navigate, Route, Routes } from 'react-router-dom';
import OtpVerify from './components/OtpVerify';
import { BrowserRouter} from 'react-router-dom';
import Application from './components/Application';
import SetProfile from './components/SetProfile';



function App() {

  const authToken = localStorage.getItem('authToken');

  return (
    <div className="app">
      <div className='app_body' >
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/OtpVerify" element={authToken? <Navigate to="/Application"/> : <OtpVerify />} />
        <Route exact path="/SetProfile" element={ authToken? <Navigate to="/Application"/> : <SetProfile />} />
        <Route exact path="/Application" element={<Application />} />
      </Routes>
      </BrowserRouter>
      
      </div>
    </div>
  );
}

export default App;
