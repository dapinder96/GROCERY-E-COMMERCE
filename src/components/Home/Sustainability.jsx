import React from 'react'
import { motion } from 'framer-motion';
import a6 from '../../assets/images/a6.jpg'
function Sustainability() {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full mb-4">Our Commitment</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Sustainability Practices</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At GreenStore, we're committed to sustainable practices that protect our planet. 
                We work with local farmers who use environmentally friendly farming methods, 
                and we're constantly looking for ways to reduce our carbon footprint.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Eco-Friendly Packaging</h4>
                    <p className="text-gray-600">We use biodegradable and recyclable packaging materials.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Local Sourcing</h4>
                    <p className="text-gray-600">We prioritize local farmers to reduce transportation emissions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Food Waste Reduction</h4>
                    <p className="text-gray-600">We donate unsold but still good food to local food banks.</p>
                  </div>
                </li>
              </ul>
              <motion.button 
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Our Practices
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src={a6} 
                alt="Sustainability" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default Sustainability
