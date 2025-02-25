import { useState } from 'react'
import "./components/Signin"
import Navbar from './components/Navbar'
import './App.css'
import Card from './components/card'
import LowerNavbar from './components/LowerNavbar'
import Signin from './components/Signin'

export default function App() {
  return (
    <>
    <Navbar/>
    <LowerNavbar/>
    <Card/>
    {/* <Signin/> */}
    
    
    </>
  );
}

