import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../Cart/CartContext';
import { useTheme } from '../Cart/ThemeContext';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function Navbar() {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMobileMenu] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const onHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = isSticky 
    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md text-gray-800 dark:text-white' 
    : onHomePage 
      ? 'bg-transparent text-white' 
      : 'bg-transparent text-gray-800 dark:text-white';

  const NavLink = ({ to, children }) => (
    <Link to={to} className="relative group transition-colors duration-300 hover:text-amber-500">
      {children}
      <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" style={{ originX: 0 }}/>
    </Link>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${navClasses}`}>
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="flex items-center space-x-2"><motion.svg className="h-8 w-8 text-amber-500" viewBox="0 0 100 100" fill="currentColor" whileHover={{ scale: 1.1, rotate: 10 }}><path d="M50 0L61.8 18.2H81L66.6 30.9L72.4 50L50 38.2L27.6 50L33.4 30.9L19 18.2H38.2L50 0Z" /><path d="M50 55L19 75H81L50 55Z" /></motion.svg><span className="text-xl font-serif font-bold tracking-wider">Mythica Jewels</span></Link>
          <ul className="hidden md:flex items-center space-x-8 font-semibold"><li><NavLink to="/">Home</NavLink></li><li><NavLink to="/about">About</NavLink></li><li><NavLink to="/contact">Contact</NavLink></li></ul>
          <div className="flex items-center space-x-4">
            <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Toggle Theme" className="hover:text-amber-500 transition-colors">{theme === 'light' ? <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> : <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>}</motion.button>
            <motion.button onClick={() => setSearchOpen(true)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Search" className="hover:text-amber-500 transition-colors"><svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></motion.button>
            <motion.button onClick={toggleCart} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Shopping Cart" className="hover:text-amber-500 transition-colors relative"><svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>{cartCount > 0 && <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-800 text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}</motion.button>
            <button className="md:hidden" onClick={() => setMobileMenu(!isMenuOpen)} aria-label="Open Menu"><svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg></button>
          </div>
        </div>
        <AnimatePresence>{isMenuOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden bg-gray-800/90 backdrop-blur-sm text-white md:hidden"><motion.ul variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center space-y-6 py-8"><motion.li variants={fadeUp}><Link to="/" onClick={() => setMobileMenu(false)} className="text-lg font-semibold hover:text-amber-500">Home</Link></motion.li><motion.li variants={fadeUp}><Link to="/about" onClick={() => setMobileMenu(false)} className="text-lg font-semibold hover:text-amber-500">About</Link></motion.li><motion.li variants={fadeUp}><Link to="/contact" onClick={() => setMobileMenu(false)} className="text-lg font-semibold hover:text-amber-500">Contact</Link></motion.li></motion.ul></motion.div>}</AnimatePresence>
      </header>
      <AnimatePresence>{isSearchOpen && <motion.div initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ duration: 0.5, ease: 'easeInOut' }} className="fixed top-0 left-0 w-full h-screen bg-black/50 z-[100] flex items-start justify-center pt-20"><div className="relative w-full max-w-xl"><input type="search" placeholder="Search for treasures..." className="w-full p-4 text-lg rounded-lg border-2 border-amber-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white outline-none" /><button onClick={() => setSearchOpen(false)} className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-gray-500 hover:text-gray-800">&times;</button></div></motion.div>}</AnimatePresence>
    </>
  );
}