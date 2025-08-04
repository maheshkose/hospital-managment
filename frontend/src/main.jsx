import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

export const context = createContext({  isAuthenticated: false,
  setisAuthenticated: () => {},
  user: {},
  setuser: () => {},});

const AppWrapper = ()=>{
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState({});

  return(
    <context.Provider value={{isAuthenticated, setisAuthenticated, user, setuser}}>
      <App/>
    </context.Provider>
  )
  
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
