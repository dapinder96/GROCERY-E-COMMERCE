

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import a1 from '../../assets/images/a1.jpg';
import a2 from '../../assets/images/a2.jpg';
import a3 from '../../assets/images/a3.jpg';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: a1,
      title: "Fresh Organic Produce",
      description: "Delivered straight to your doorstep",
      buttonText: "Shop Now"
    },
    {
      image: a2,
      title: "Weekly Special Offers",
      description: "Save up to 30% on selected items",
      buttonText: "View Deals"
    },
    {
      image: a3,
      title: "Meal Kits & Recipes",
      description: "Cook like a chef with our premium ingredients",
      buttonText: "Explore Kits"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/50">
            <div className="h-full flex flex-col items-center justify-center">
              <div className="container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto bg-black/40 p-8 rounded-lg backdrop-blur-sm">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-lg"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-lg shadow-xl hover:shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slides[currentSlide].buttonText}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? "bg-white shadow-lg" 
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all z-10 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all z-10 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default Hero;