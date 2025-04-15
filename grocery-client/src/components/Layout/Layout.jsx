import React from 'react'
import Navbar from '../Basic/Navbar'
import Footer from '../Basic/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
      
    </>
  )
}

export default Layout
