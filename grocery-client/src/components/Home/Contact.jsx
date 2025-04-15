import React from 'react'
import { motion } from 'framer-motion';
function Contact() {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
              <p className="text-gray-600 mb-8">
                Have questions or need assistance? Our customer service team is here to help.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">support@GrocKart.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">123 Green Street, Cityville, State 12345</p>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <motion.button 
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-8">
                Find answers to our most commonly asked questions.
              </p>
              <div className="space-y-4">
                <motion.div 
                  className="border border-gray-200 rounded-md overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer p-4 bg-white">
                      <span>How do I place an order?</span>
                      <span className="transition group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600">
                        You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. 
                        You'll need to create an account or log in to complete your purchase.
                      </p>
                    </div>
                  </details>
                </motion.div>
                
                <motion.div 
                  className="border border-gray-200 rounded-md overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer p-4 bg-white">
                      <span>What are your delivery hours?</span>
                      <span className="transition group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600">
                        We deliver Monday through Friday from 8am to 8pm, Saturday from 9am to 6pm, and Sunday from 10am to 4pm.
                      </p>
                    </div>
                  </details>
                </motion.div>
                
                <motion.div 
                  className="border border-gray-200 rounded-md overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer p-4 bg-white">
                      <span>How do I cancel or modify my order?</span>
                      <span className="transition group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600">
                        You can cancel or modify your order within 2 hours of placing it by contacting our customer service team. 
                        After that, we may not be able to make changes as your order may already be in processing.
                      </p>
                    </div>
                  </details>
                </motion.div>
                
                <motion.div 
                  className="border border-gray-200 rounded-md overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer p-4 bg-white">
                      <span>How do subscription services work?</span>
                      <span className="transition group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600">
                        Our subscription services allow you to receive regular deliveries of your favorite products. 
                        You can choose the frequency (weekly, bi-weekly, or monthly) and customize your box contents. 
                        You can pause, skip, or cancel your subscription at any time.
                      </p>
                    </div>
                  </details>
                </motion.div>
                
                <motion.div 
                  className="border border-gray-200 rounded-md overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer p-4 bg-white">
                      <span>What is your return policy?</span>
                      <span className="transition group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600">
                        If you're not satisfied with the quality of your products, please contact us within 24 hours of delivery. 
                        We'll either replace the items or provide a refund, depending on your preference.
                      </p>
                    </div>
                  </details>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default Contact
