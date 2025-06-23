import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

//We made this because we need to make the header nad fotter contant ande dynamically chnages the between object
//For using outlet we have to give a syntax in index

function Layout() {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout
