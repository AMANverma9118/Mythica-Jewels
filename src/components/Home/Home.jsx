import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../Cart/CartContext'; // Adjust path if needed

const featuredProducts = [
  { id: 1, name: 'Solitaire Bliss', price: 1250, image: 'https://th.bing.com/th/id/OIP.Yxxc74oZbKCC5UB4vtl94gHaE8?w=276&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  { id: 2, name: 'Ethereal Pendant', price: 850, image: 'src/assets/182886edd7215788148725463c66766e.jpg' },
  { id: 3, name: 'Golden Weave', price: 1500, image: 'src/assets/MA-313-2-600x600.jpg' },
  { id: 4, name: 'Diamond Droplets', price: 1975, image: 'src/assets/Diamond Ring.webp' },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

export default function Home() {
  const { addToCart } = useCart();
  return (
    <div className="bg-[#FDFBF8] dark:bg-gray-900 transition-colors duration-500">
      <section className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden"><div className="absolute inset-0 bg-black opacity-40 z-10"></div><motion.img initial={{ scale: 1 }} animate={{ scale: 1.1 }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} src="src\assets\62729-Brunette-Indian-Jewelry-Earrings-Necklace-Woman.jpg" alt="Elegant diamond necklace" className="absolute inset-0 w-full h-full object-cover" /><motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-20 px-4"><motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold mb-4 tracking-wide">Timeless Elegance</motion.h1><motion.p variants={fadeUp} className="text-lg md:text-xl max-w-2xl mx-auto mb-8">Discover exquisite jewelry, crafted with passion and precision to celebrate your most precious moments.</motion.p><motion.div variants={fadeUp}><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link to="/about" className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform inline-block shadow-lg">Explore Collections</Link></motion.div></motion.div></motion.div></section>
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-serif mb-2 text-gray-800 dark:text-white">Featured Products</h2><p className="text-gray-600 dark:text-gray-300">Handpicked selections for the discerning eye.</p></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp} className="group relative overflow-hidden rounded-lg shadow-lg text-center bg-gray-50 dark:bg-gray-800">
                <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" /></motion.div>
                <div className="p-6"><h3 className="text-xl font-serif font-semibold text-gray-800 dark:text-white">{product.name}</h3><p className="text-gray-600 dark:text-gray-300 mt-2">${product.price.toLocaleString()}</p><motion.button onClick={() => addToCart(product)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="mt-4 bg-gray-800 text-white font-bold py-2 px-6 rounded-full hover:bg-yellow-500 transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">Add to Cart</motion.button></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}