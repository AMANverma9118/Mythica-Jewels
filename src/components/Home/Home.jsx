import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../Cart/CartContext';

const featuredProducts = [
  { id: 1, name: 'Solitaire Bliss', price: 1250, image: 'https://th.bing.com/th/id/OIP.Yxxc74oZbKCC5UB4vtl94gHaE8?w=276&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  { id: 2, name: 'Ethereal Pendant', price: 850, image: 'https://th.bing.com/th/id/OIP.58ifQhaXdpPBGHe9kVEeBwHaHa?w=212&h=212&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  { id: 3, name: 'Golden Weave', price: 1500, image: 'https://th.bing.com/th/id/OIP.2pnn1DYJznSLsLSTE7bKCAHaIF?w=183&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  { id: 4, name: 'Diamond Droplets', price: 1975, image: 'https://th.bing.com/th/id/OIP.VI4yICG_BuSnfYmDxodhrwHaEJ?w=312&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
];

const sliderContent = [
  {
    videoUrl: "/videos/mixkit-portrait-of-a-happy-bride-in-the-garden-40602-hd-ready.mp4",
    title: "A Promise of Forever",
    subtitle: "Crafted to celebrate your most precious moments."
  },
  {
    videoUrl: "/videos/mixkit-wedding-rings-in-its-case-5181-hd-ready.mp4",
    title: "Elegance Redefined",
    subtitle: "Discover pieces that tell your unique story."
  },
  {
    videoUrl: "/videos/WhatsApp Video 2024-01-31 at 11.47.35_54e880ab.mp4",
    title: "The Art of Brilliance",
    subtitle: "Where timeless design meets flawless craftsmanship."
  }
];


const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

export default function Home() {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentSlide((prev) => (prev === sliderContent.length - 1 ? 0 : prev + 1));
      }, 7000);
      return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === sliderContent.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sliderContent.length - 1 : prev - 1));

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence>
            <motion.video
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                src={sliderContent[currentSlide].videoUrl}
                autoPlay loop muted playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center px-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold mb-4 tracking-wide">{sliderContent[currentSlide].title}</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">{sliderContent[currentSlide].subtitle}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/about" className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform inline-block shadow-lg">
                            Explore Collections
                        </Link>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
        <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
            {sliderContent.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}/>
            ))}
        </div>
        <button onClick={prevSlide} className="absolute z-30 top-1/2 left-4 -translate-y-1/2 text-white/70 hover:text-white transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
        <button onClick={nextSlide} className="absolute z-30 top-1/2 right-4 -translate-y-1/2 text-white/70 hover:text-white transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-serif mb-2 text-gray-800 dark:text-slate-100">Featured Products</h2><p className="text-gray-600 dark:text-slate-300">Handpicked selections for the discerning eye.</p></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp} className="group relative overflow-hidden rounded-lg shadow-lg text-center bg-slate-50 dark:bg-slate-800">
                <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" /></motion.div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-gray-800 dark:text-slate-100">{product.name}</h3>
                  <p className="text-gray-600 dark:text-slate-300 mt-2">${product.price.toLocaleString()}</p>
                  <motion.button onClick={() => addToCart(product)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4 bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition-colors duration-300">
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}