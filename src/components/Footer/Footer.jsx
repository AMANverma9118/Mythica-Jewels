import React from 'react';
import { motion } from 'framer-motion';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const go = (page) => {
    onNavigate?.(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 dark:bg-black text-white border-t border-stone-800/90">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 border-2 border-amber-600 flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <h2 className="text-xl font-serif font-semibold text-amber-500 tracking-[0.08em]">
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
            <h3 className="text-[11px] font-medium mb-6 text-stone-300 uppercase tracking-[0.25em]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => go('home')}
                  className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light text-left w-full bg-transparent border-0 p-0 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('shop')}
                  className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light text-left w-full bg-transparent border-0 p-0 cursor-pointer"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('about')}
                  className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light text-left w-full bg-transparent border-0 p-0 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('contact')}
                  className="text-slate-400 hover:text-amber-600 transition-colors text-sm font-light text-left w-full bg-transparent border-0 p-0 cursor-pointer"
                >
                  Contact
                </button>
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
          <div className="border border-slate-800 px-6 py-3 text-xs uppercase tracking-wider text-stone-200">
            🔒 Secure Payment
          </div>
          <div className="border border-slate-800 px-6 py-3 text-xs uppercase tracking-wider text-stone-200">
            ✓ Certified Authentic
          </div>
          <div className="border border-slate-800 px-6 py-3 text-xs uppercase tracking-wider text-stone-200">
            🚚 Free Shipping
          </div>
          <div className="border border-slate-800 px-6 py-3 text-xs uppercase tracking-wider text-stone-200">
            ↩️ Easy Returns
          </div>
        </div>
      </div>
    </footer>
  );
}