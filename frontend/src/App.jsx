import React, { useContext, useEffect } from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Aboutus from './pages/Aboutus';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Components/Navbar';
import { context } from './main';
import axios from 'axios';
import Footer from './Components/Footer';


const App = () => {

  const {isAuthenticated, setisAuthenticated, setuser} = useContext(context);
  useEffect(() => {
   const fetchUser = async () => {
    try {
      const response = await axios.get("https://hospital-managment-backend-knzo.onrender.com/user/patient/me",{withCredentials:true});
      setisAuthenticated(true);
      setuser(response.data.user);
      
    } catch (error) {
      console.log("error");
      
      setisAuthenticated(false);
      setuser({});
    }
   }

   fetchUser();
  }, [isAuthenticated])
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/appointment' element={<Appointment/>}/>
            <Route path='/about' element={<Aboutus/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login />}/>

        </Routes>
        <Footer/>
        <ToastContainer position='top-center'/>
      </Router>

    </>
  )
}

export default App