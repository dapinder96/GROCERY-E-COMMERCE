import React from 'react'
import { motion } from 'framer-motion';
import CountUp from "react-countup";    
import { useInView } from "react-intersection-observer";

function Stats() {
    const [statsRef, statsInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
      });
  return (
    <>
     <section className="py-16 bg-green-600 text-white" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">
                {statsInView ? <CountUp end={5000} duration={2.5} separator="," /> : "0"}+
              </h3>
              <p className="text-lg">Happy Customers</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">
                {statsInView ? <CountUp end={200} duration={2.5} /> : "0"}+
              </h3>
              <p className="text-lg">Local Farmers</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">
                {statsInView ? <CountUp end={1500} duration={2.5} /> : "0"}+
              </h3>
              <p className="text-lg">Products</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">
                {statsInView ? <CountUp end={98} duration={2.5} suffix="%" /> : "0%"}
              </h3>
              <p className="text-lg">Customer Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default Stats
