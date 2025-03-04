import React from 'react'
import { motion } from 'framer-motion';
function Delivery() {
  return (
    <> <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Delivery Information</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fast, reliable delivery to your doorstep. Check our delivery options and coverage areas.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center">Delivery Times</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">Monday - Friday:</span>
              <span className="font-semibold">8am - 8pm</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Saturday:</span>
              <span className="font-semibold">9am - 6pm</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Sunday:</span>
              <span className="font-semibold">10am - 4pm</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center">Delivery Areas</h3>
          <p className="text-gray-600 mb-4 text-center">
            We currently deliver to the following areas:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="bg-green-100 p-1 rounded-full mr-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Downtown
            </li>
            <li className="flex items-center">
              <div className="bg-green-100 p-1 rounded-full mr-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              North Side
            </li>
            <li className="flex items-center">
              <div className="bg-green-100 p-1 rounded-full mr-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              West End
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center">Delivery Fees</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">Orders under $50:</span>
              <span className="font-semibold">$5.99</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Orders $50-$100:</span>
              <span className="font-semibold">$3.99</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Orders over $100:</span>
              <span className="font-semibold text-green-600">FREE</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Subscription orders:</span>
              <span className="font-semibold text-green-600">FREE</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  </section>

      
    </>
  )
}

export default Delivery
