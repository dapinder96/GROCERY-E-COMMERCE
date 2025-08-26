import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import a4 from '../../assets/images/a4.jpg';
import a5 from '../../assets/images/a5.jpg';
import a6 from '../../assets/images/a6.jpg';
import a7 from '../../assets/images/a7.jpg';
import team1 from '../../assets/images/team1.jpg'; 
import team2 from '../../assets/images/team2.jpg';
import team3 from '../../assets/images/team3.jpg';
import team4 from '../../assets/images/team4.jpg';

const About = () => {
  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "200+", label: "Local Farmers" },
    { number: "1500+", label: "Products" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  const teamMembers = [
    {
      name: "Dapinder Singh",
      role: "Founder & CEO",
      image: team1,
      bio: "Visionary leader with 15+ years in sustainable agriculture",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      name: "Arshaan Singh",
      role: "Operations Director",
      image: team2,
      bio: "Expert in supply chain management and logistics",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "Arshdeep Singh",
      role: "Head of Technology",
      image: team3,
      bio: "Tech innovator focusing on digital transformation",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Harkirat Singh",
      role: "Customer Relations",
      image: team4,
      bio: "Dedicated to creating exceptional customer experiences",
      social: {
        instagram: "#",
        linkedin: "#",
        facebook: "#"
      }
    }
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={a7}
            alt="About Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Our Story of Growth & Sustainability
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Building a healthier community through fresh, organic produce and sustainable practices.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Learn More <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src={a4}
                  alt="Mission"
                  className="rounded-lg shadow-xl"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-10 -right-10 w-48 h-48 bg-green-600 rounded-full opacity-20"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                We're on a mission to revolutionize the way people access fresh, organic produce. 
                Through partnerships with local farmers and sustainable practices, we're building 
                a healthier future for our community and planet.
              </p>
              <div className="space-y-4">
                {['Local Sourcing', 'Sustainable Practices', 'Community Focus'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-white/90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of professionals working together to bring you the best quality products and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      {Object.keys(member.social).map((platform) => (
                        <motion.a
                          key={platform}
                          href={member.social[platform]}
                          whileHover={{ scale: 1.2 }}
                          className="text-white hover:text-green-400"
                        >
                          {platform === 'twitter' && <Twitter size={20} />}
                          {platform === 'linkedin' && <Linkedin size={20} />}
                          {platform === 'facebook' && <Facebook size={20} />}
                          {platform === 'instagram' && <Instagram size={20} />}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-green-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality", icon: "🌟", description: "We ensure only the finest products reach your doorstep" },
              { title: "Sustainability", icon: "🌱", description: "Committed to environmental responsibility" },
              { title: "Community", icon: "🤝", description: "Building stronger connections with local farmers" }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;