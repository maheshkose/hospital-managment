import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const Doctors = () => {
  const {isAuthenticated, doctors, setdoctors} = useContext(AppContext);
  
  useEffect(() => {
   
    const fetchDoctors = async (params) => {
      try {
        const {data} = await axios.get("response?.data?https://hospital-managment-backend-knzo.onrender.com/api/v1/user/doctors",{withCredentials:true});
        console.log("data",data);
        
      setdoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
    fetchDoctors();
  }, [])
  
  if (!isAuthenticated) {
    return <Navigate to={'/login'}/>
  }
  return (
    <>
    <section className='page doctors'>

      <h1>Doctors</h1>
      <div className="banner">
      {
        
        doctors && doctors.length > 0 ? (
          doctors.map((doctor,index)=>(
            <div key={index} className='card'>
              <img src={doctor.docAvatar?.url} alt="" />
              <h4>{ `${doctor.firstName} ${doctor.lastName}`}</h4>
              <div className="details">
                <p> Email: <span>{doctor.email}</span></p>
                <p> phone: <span>{doctor.phone}</span></p>
                <p> nic: <span>{doctor.nic}</span></p>
                <p> gender: <span>{doctor.gender}</span></p>
                <p>Department: <span>{doctor.deparment}</span></p>
                
              </div>
            </div>
          ))
        ) : <h1> no registerd doctors found </h1>  
      }
      </div>  
    </section>
    </>
  )
}

export default Doctors 