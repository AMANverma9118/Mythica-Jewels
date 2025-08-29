import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="py-24 bg-white dark:bg-gray-900 pt-32 transition-colors duration-500">
      <div className="container m-auto px-6 text-gray-600 dark:text-gray-300 md:px-12 xl:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.3 }} className="space-y-6 md:space-y-0 md:flex md:gap-12 lg:items-center">
          <motion.div variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }} className="md:w-5/12 lg:w-5/12"><img src="https://www.krishnajewellers.com/blog/wp-content/uploads/2021/12/Buy-Gold-Choker-Designs.jpg" alt="Jewelry model" className="rounded-lg shadow-xl"/></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }} className="md:w-7/12 lg:w-6/12"><h2 className="text-3xl text-gray-900 dark:text-white font-bold md:text-5xl font-serif">A Legacy of Passionate Craftsmanship</h2><p className="mt-6">At Mythica Jewels, every piece is a work of art. We source only the finest materials and our master artisans dedicate themselves to crafting jewelry that is not just beautiful, but will be cherished for generations.</p><p className="mt-4">Our cutting-edge curriculum is designed to empower students with the knowledge, skills, and experiences needed to excel in the dynamic field of education.</p></motion.div>
        </motion.div>
      </div>
    </div>
  );
}