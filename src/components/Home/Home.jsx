import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Cart/AuthContext';
import { useCart } from '../Cart/CartContext';
import { apiCall } from '../Cart/AuthContext';

export default function Home({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const slides = [
    { 
      title: "TIMELESS ELEGANCE", 
      subtitle: "Exquisite craftsmanship for the discerning collector",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop"
    },
    { 
      title: "HERITAGE COLLECTION", 
      subtitle: "Where tradition meets contemporary luxury",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&h=1080&fit=crop"
    },
    { 
      title: "BESPOKE CREATIONS", 
      subtitle: "Tailored to your unique vision of perfection",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1920&h=1080&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const data = await apiCall('/admin/products');
      setFeaturedProducts((data.products || []).slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  className="h-1 bg-amber-600 mb-8"
                />
                <h1 className="text-6xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl text-slate-200 mb-12 font-light tracking-wide">
                  {slides[currentSlide].subtitle}
                </p>
                <motion.button 
                  onClick={() => onNavigate('shop')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-none font-medium text-sm uppercase tracking-wider transition-all overflow-hidden"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-amber-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Collection
                  </span>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 right-12 z-20 flex flex-col space-y-4">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)} 
              className={`w-1 transition-all duration-300 ${
                currentSlide === i ? 'h-16 bg-amber-600' : 'h-8 bg-white/30 hover:bg-white/50'
              }`} 
            />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              className="h-1 bg-amber-600 mx-auto mb-6"
            />
            <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              SIGNATURE PIECES
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light tracking-wide">
              Curated selections from our master artisans
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product._id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-white dark:bg-slate-900 overflow-hidden"
              >
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop'} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {user && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      onClick={() => addToCart(product._id)}
                      className="absolute bottom-4 left-4 right-4 bg-white text-slate-900 py-3 text-sm uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Add to Cart
                    </motion.button>
                  )}
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white mb-2 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-amber-700 dark:text-amber-500 text-2xl font-light">
                    ${product.price?.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button
              onClick={() => onNavigate('shop')}
              className="border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 px-10 py-4 font-medium text-sm uppercase tracking-wider transition-all"
            >
              View Full Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-amber-600">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3 tracking-wide">
                CERTIFIED AUTHENTIC
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Every piece certified with complete authenticity documentation
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-amber-600">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3 tracking-wide">
                LIFETIME WARRANTY
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Comprehensive lifetime coverage on all craftsmanship
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-amber-600">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3 tracking-wide">
                ETHICAL SOURCING
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Responsibly sourced materials with full transparency
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}