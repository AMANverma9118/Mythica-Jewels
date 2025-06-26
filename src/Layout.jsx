import React from 'react'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

//We made this because we need to make the header nad fotter contant ande dynamically chnages the between object
//For using outlet we have to give a syntax in index

function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout
