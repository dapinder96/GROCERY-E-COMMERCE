// import React from 'react'
// import { motion } from 'framer-motion';
// import { ShoppingCart, Menu, X, ChevronLeft, ChevronRight, Star, Search } from 'lucide-react';

// function Testimonials() {
//     const testimonials = [
//         { id: 1, name: "Sarah Johnson", text: "The quality of produce is exceptional. I've never had fresher vegetables delivered to my door!", rating: 5 },
//         { id: 2, name: "Michael Chen", text: "Their subscription service has made meal planning so much easier for my family. Highly recommend!", rating: 5 },
//         { id: 3, name: "Emma Williams", text: "Great selection and the delivery is always on time. Customer service is excellent too!", rating: 4 },
//       ];
//   return (
//     <>
//     <section className="py-20">
//         <div className="container mx-auto px-4">
//           <motion.div 
//             className="text-center mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">What Our Customers Say</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Don't just take our word for it. Here's what our happy customers have to say about our service.
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div 
//                 key={testimonial.id}
//                 className="bg-white p-6 rounded-lg shadow-md"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">
//                     {testimonial.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="font-bold">{testimonial.name}</h4>
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star 
//                           key={i} 
//                           size={16} 
//                           className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 italic">"{testimonial.text}"</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//     </>
//   )
// }

// export default Testimonials

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function Testimonials() {
  const { user, isAuthenticated } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [userRating, setUserRating] = useState(5);
  const [userMessage, setUserMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/testimonials/all');
      setTestimonials(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials');
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please login to submit a testimonial');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');

      const response = await axios.post('/api/testimonials/add', {
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        message: userMessage,
        rating: userRating
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setTestimonials(prev => [response.data, ...prev]);
      setUserMessage('');
      setUserRating(5);
      setSuccess('Thank you for your feedback!');
    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setError('');
      setSuccess('');
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Customer Reviews
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We value your feedback! See what our customers have to say about their experience with us.
          </p>

          {/* Write Review Button */}
          {isAuthenticated && (
            <button
              onClick={toggleForm}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <Star className="w-5 h-5" />
              {isFormVisible ? 'Hide Review Form' : 'Write a Review'}
            </button>
          )}
        </div>

        {/* Review Form */}
        {isAuthenticated && isFormVisible && (
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
              
              {/* Rating Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= userRating 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
                  rows="4"
                  required
                  minLength={10}
                  maxLength={500}
                  placeholder="Tell us about your experience..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  {userMessage.length}/500 characters
                </p>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || userMessage.length < 10}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading reviews...</p>
          </div>
        ) : (
          <>
            {/* Testimonials Grid */}
            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={testimonial.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-4">
                        {testimonial.user_name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {testimonial.user_name || 'Anonymous'}
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.message}</p>
                    <p className="text-sm text-gray-400 mt-4">
                      {new Date(testimonial.created_at).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </>
        )}

        {/* Login Prompt */}
        {!isAuthenticated && (
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Want to share your experience?{' '}
              <a href="/login" className="text-primary font-semibold hover:underline">
                Log in to write a review
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;