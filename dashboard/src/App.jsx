import React, { useContext, useEffect } from 'react'
import AppContext from '../Context/AppContext'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import AddNewAdmin from './Components/AddNewAdmin';
import Login from './Components/Login';
import AddNewDoctor from './Components/AddNewDoctor';
import Messages from './Components/Messages';
import Doctors from './Components/Doctors';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Sidebar from './Components/Sidebar';
import "./App.css"

const App = () => {
 const {isAuthenticated, setisAuthenticated, user, setuser} = useContext(AppContext);
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get("https://hospital-managment-backend-knzo.onrender.com/user/admin/me",{withCredentials:true, headers:{"Content-Type":"application/json"}});
      setisAuthenticated(true);
      setuser(response?.data?.user);
      // toast.success(response?.data?.message);
    } catch (error) {
      setisAuthenticated(false);
      setuser(error.response?.data?.user);
      // toast.error(error.response?.data?.message);
    }
    
  }
  fetchUser();
 }, [isAuthenticated]);
 
  return (
    <>

      <Router>
        <Sidebar/>
        <Routes>
          
          <Route path='/' element={<Dashboard />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/doctor/addnew' element={<AddNewDoctor />}/>
          <Route path='/admin/addnew' element={<AddNewAdmin />}/>
          <Route path='/messages' element={<Messages />}/>
          <Route path='/doctors' element={<Doctors />}/>

        </Routes>
         <ToastContainer position='top-center'/>
      </Router>

      
    </>
  )
}

export default App