import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

export default function Contact() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 sm:pt-0 pt-20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={fadeUp} className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg"><h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-white font-extrabold tracking-tight font-serif">Get in Touch</h1><p className="text-normal text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mt-2">Fill in the form to start a conversation</p></motion.div>
            <motion.form variants={fadeUp} className="p-6 flex flex-col justify-center">
              <motion.div className="flex flex-col"><input type="text" name="name" placeholder="Full Name" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-50 focus:border-yellow-500 focus:outline-none transition-all" /></motion.div>
              <motion.div className="flex flex-col mt-2"><input type="email" name="email" placeholder="Email" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-50 focus:border-yellow-500 focus:outline-none transition-all" /></motion.div>
              <motion.div className="flex flex-col mt-2"><textarea name="message" placeholder="Your Message" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-50 focus:border-yellow-500 focus:outline-none transition-all" rows="4"></textarea></motion.div>
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.95 }} type="submit" className="md:w-32 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg mt-3 transition-colors ease-in-out duration-300">Submit</motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}