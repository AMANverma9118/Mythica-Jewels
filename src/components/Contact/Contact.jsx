import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
};

const staggerContainer = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } } 
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-16 transition-colors duration-500">
      <div className="max-w-6xl mx-auto w-full px-6">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={staggerContainer} 
          className="overflow-hidden"
        >
          <div className="text-center mb-12">
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              We'd love to hear from you
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div 
              variants={fadeUp} 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-3xl font-serif font-bold text-gray-800 dark:text-white mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white mb-1">Visit Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Laxmin Market<br />
                      Ballia, UttarPradesh 277001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white mb-1">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +91 911-835-9330<br />
                      Mon-Sat: 10AM - 8PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">✉️</div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white mb-1">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      aman.verma3497924@gmail.com<br />
                     av3497924@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">🌐</div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white mb-1">Follow Us</h3>
                    <div className="flex gap-3 mt-2">
                      <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        f
                      </a>
                      <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        📷
                      </a>
                      <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        🐦
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              variants={fadeUp}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-3xl font-serif font-bold text-gray-800 dark:text-white mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Your message has been sent successfully.<br />
                    We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-purple-600 outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-purple-600 outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-purple-600 outline-none transition-colors resize-none"
                      rows="5"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Map or Additional Info */}
          <motion.div 
            variants={fadeUp}
            className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Visit Our Showroom</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Experience the beauty of our collections in person. Our expert consultants are ready to help you find the perfect piece.
            </p>
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Map Placeholder</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}