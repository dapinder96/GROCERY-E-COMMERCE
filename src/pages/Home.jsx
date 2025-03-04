import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, ChevronLeft, ChevronRight, Star, Search } from 'lucide-react';

import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Stats from "../components/Home/Stats";
import Featured from "../components/Home/Featured";
import Subscription from "../components/Home/Subscription";
// import Testimonials from "../components/Home/Testimonials";
import Sustainability from "../components/Home/Sustainability";
import Delivery from "../components/Home/Delivery";
import Contact from "../components/Home/Contact";



const Home = () => {

  return (
    <div className="relative overflow-x-hidden">
      
      
      
      
      <Hero/>
      
    
      <About/>
      <Stats/>
      
      <Featured/>
      
      <Subscription/>
      {/* <Testimonials/> */}
      
      
      <Sustainability/>

      
      <Delivery/>
      
      
      
      <Contact/>
      
     
      
    </div>
  );
};

export default Home;