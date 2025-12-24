import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
            >
              About Mythica Jewels
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Crafting timeless elegance since 1990
            </motion.p>
          </div>

          {/* Main Content Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
                  A Legacy of Excellence
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  At Mythica Jewels, every piece tells a story. For over three decades, our master artisans have been crafting exquisite jewelry that celebrates life's most precious moments.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  From ethically sourced diamonds to handcrafted gold, each creation is a testament to our commitment to quality, sustainability, and timeless beauty.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-purple-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 dark:text-amber-400">30+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Years of Excellence</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-4xl font-bold text-pink-600 dark:text-amber-400">10k+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Happy Customers</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800" 
                  alt="Jewelry Craftsmanship" 
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Only the finest materials and gemstones make it into our collections
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Ethical Sourcing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to sustainable and responsible sourcing practices
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Master Artisans</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Each piece is handcrafted by skilled artisans with decades of experience
              </p>
            </div>
          </motion.div>

          {/* Story Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Promise</h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              We don't just create jewelry – we craft heirlooms that will be cherished for generations. 
              Every piece from Mythica Jewels carries our promise of unparalleled quality, timeless design, 
              and the magic of celebrating life's most beautiful moments.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}