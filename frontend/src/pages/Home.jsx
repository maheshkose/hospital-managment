import React from 'react'
import Hero from '../Components/Hero'
import Biography from '../Components/Biography'
import Department from '../Components/Department'
import Messageform from '../Components/Messageform'
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <>
      
        <Hero tittle={'Welcome to zeeccare medical institute | Your trusted healthcare provider'} imgUrl={'/image/hero.png'}/>
        <Biography imgUrl={'/image/about.png'} />
        <Department/>
        <Messageform/>
    </>
  )
}

export default Home