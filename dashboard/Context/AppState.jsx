import React, { useState } from 'react'
import AppContext from './AppContext'

const AppState = ({children}) => {
   const [isAuthenticated, setisAuthenticated] = useState(false);
   const [user, setuser] = useState({});
   const [doctors, setdoctors] = useState([]);
  return (
    <AppContext.Provider value={{isAuthenticated, setisAuthenticated, user, setuser, doctors, setdoctors}}>{children}</AppContext.Provider>
  )
}

export default AppState