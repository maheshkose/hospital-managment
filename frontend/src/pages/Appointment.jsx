import React from 'react'
import Hero from '../Components/Hero'
import Appointmentform from '../Components/Appointmentform'

const Appointment = () => {
  return (
    <>
    <Hero tittle={'Welcome to zeeccare medical institute | Your trusted healthcare provider'} imgUrl={'/image/signin.png'}/>
    <Appointmentform/>
    </>
  )
}

export default Appointment