import React from 'react'
import Hero from '../Components/Hero'
import Biography from '../Components/Biography'

const Aboutus = () => {
  return (
    <>
       <Hero tittle={'Welcome to zeeccare medical institute | Your trusted healthcare provider'} imgUrl={'/image/hero.png'}/>
      <Biography imgUrl={'/image/whoweare.png'}/>
    </>
  )
}

export default Aboutus