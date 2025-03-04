import React from 'react'
import { motion } from 'framer-motion';
function Subscription() {
  return (
    <>
     <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Subscription Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Never run out of your essentials. Subscribe and save with our convenient delivery options.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 border-t-4 border-green-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Weekly Essentials</h3>
              <p className="text-gray-600 mb-6">
                Get your everyday essentials delivered weekly. Customize your box with fruits, vegetables, dairy, and more.
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  Weekly delivery
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  Customizable box
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  10% discount on all items
                </li>
              </ul>
              <div className="text-center">
                <span className="block text-3xl font-bold text-gray-800 mb-2">$29.99<span className="text-base font-normal">/week</span></span>
                <motion.button 
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe Now
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 border-t-4 border-green-600 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-semibold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Family Meal Plan</h3>
              <p className="text-gray-600 mb-6">
                Complete meal kits with recipes for the whole family. Save time on meal planning and grocery shopping.
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  3-5 meals per week
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  Recipe cards included
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  Portions for 4-6 people
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  15% discount on all items
                </li>
              </ul>
              <div className="text-center">
                <span className="block text-3xl font-bold text-gray-800 mb-2">$89.99<span className="text-base font-normal">/week</span></span>
                <motion.button 
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe Now
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 border-t-4 border-green-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Organic Monthly Box</h3>
              <p className="text-gray-600 mb-6">
                Premium organic products delivered monthly. Perfect for health-conscious individuals.
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  Monthly delivery
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  100% certified organic
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  Seasonal specialty items
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  20% discount on all items
                </li>
              </ul>
              <div className="text-center">
                <span className="block text-3xl font-bold text-gray-800 mb-2">$119.99<span className="text-base font-normal">/month</span></span>
                <motion.button 
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default Subscription
