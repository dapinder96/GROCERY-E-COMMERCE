import React from 'react'
import { motion } from 'framer-motion';
import a4 from '../../assets/images/a4.jpg'
import a5 from '../../assets/images/a8.jpg'
function About() {
  return (
    <>
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">About Our <span className="text-green-600">Groc</span>Kart</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We're passionate about bringing the freshest, highest-quality groceries directly to your doorstep. 
                Our mission is to make healthy eating accessible, convenient, and sustainable for everyone.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Founded in 2015, we've built relationships with local farmers and producers to ensure that 
                you receive the best products while supporting your local community and reducing environmental impact.
              </p>
              <motion.button 
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Us
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] w-full">
                <img 
                  src={a4} 
                  alt="Fresh produce" 
                  className="absolute z-10 top-0 left-0 w-3/4 h-3/4 object-cover rounded-lg shadow-xl"
                />
                <img 
                  src={a5} 
                  alt="Organic farming" 
                  className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full opacity-20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default About
