import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-black text-white border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 border-2 border-amber-600 flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-amber-600 tracking-wide">
                MYTHICA JEWELS
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              Crafting timeless elegance and celebrating life's precious moments since 1990.
            </p>
            <div className="flex space-x-3">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="#" 
                className="w-10 h-10 border border-slate-700 hover:border-amber-600 flex items-center justify-center transition-colors"
              >
                📘
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="#" 
                className="w-10 h-10 border border-slate-700 hover:border-amber-600 flex items-center justify-center transition-colors"
              >
                📷
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="#" 
                className="w-10 h-10 border border-slate-700 hover:border-amber-600 flex items-center justify-center transition-colors"
              >
                🐦
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="#" 
                className="w-10 h-10 border border-slate-700 hover:border-amber-600 flex items-center justify-center transition-colors"
              >
                📺
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-serif font-bold mb-6 text-white uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-serif font-bold mb-6 text-white uppercase tracking-widest">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-serif font-bold mb-6 text-white uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3 text-sm font-light">
                <span className="text-amber-600">📍</span>
                <span>Laxmi Market,<br />Ballia, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-light">
                <span className="text-amber-600">📞</span>
                <span>+91 911-835-9330</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-light">
                <span className="text-amber-600">✉️</span>
                <a href="mailto:aman.verma3497924@gmail.com" className="hover:text-amber-600 transition-colors">
                  aman.verma3497924@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm text-center md:text-left font-light">
              © {currentYear} <span className="text-white font-normal">MYTHICA JEWELS™</span>. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors font-light">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors font-light">
                Terms & Conditions
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors font-light">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <div className="border border-slate-800 px-6 py-3 text-xs uppercase tracking-wider font-light">
            🔒 Secure Payment
          </div>
          <div className="border border-slate-800 px-6 py-3 text-xs uppercase tracking-wider font-light">
            ✓ Certified Authentic
          </div>
          <div className="border border-slate-800 px-6 py-3 text-xs uppercase tracking-wider font-light">
            🚚 Free Shipping
          </div>
          <div className="border border-slate-800 px-6 py-3 text-xs uppercase tracking-wider font-light">
            ↩️ Easy Returns
          </div>
        </div>
      </div>
    </footer>
  );
}