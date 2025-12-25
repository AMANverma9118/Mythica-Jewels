import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Cart/AuthContext';
import { useCart } from '../Cart/CartContext';
import { useTheme } from '../Cart/ThemeContext';

export default function Navbar({ onNavigate, currentPage }) {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = isSticky 
    ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-amber-900/10 dark:border-amber-500/20' 
    : currentPage === 'home'
      ? 'bg-transparent backdrop-blur-sm'
      : 'bg-white dark:bg-slate-900 border-b border-amber-900/10 dark:border-amber-500/20';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navClasses}`}>
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          {/* Logo */}
          <motion.div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600 dark:text-amber-500" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 10 L30 30 L20 30 L20 50 L10 60 L50 90 L90 60 L80 50 L80 30 L70 30 Z" />
              <path d="M50 30 L40 40 L40 50 L50 60 L60 50 L60 40 Z" fill="white" opacity="0.3"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-slate-900 dark:text-white">
                MYTHICA
              </span>
              <span className="text-[0.65rem] sm:text-xs tracking-[0.3em] text-amber-700 dark:text-amber-500 font-light">
                JEWELS
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 font-medium">
            {['home', 'shop', 'about', 'contact'].map((page) => (
              <button 
                key={page}
                onClick={() => onNavigate(page)} 
                className={`relative text-sm uppercase tracking-wider transition-colors ${
                  currentPage === page 
                    ? 'text-amber-700 dark:text-amber-500' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500'
                }`}
              >
                {page}
                {currentPage === page && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-700 dark:bg-amber-500"
                  />
                )}
              </button>
            ))}
            {user?.role === 'admin' && (
              <button 
                onClick={() => onNavigate('admin')} 
                className={`relative text-sm uppercase tracking-wider transition-colors ${
                  currentPage === 'admin' 
                    ? 'text-amber-700 dark:text-amber-500' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500'
                }`}
              >
                Admin
                {currentPage === 'admin' && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-700 dark:bg-amber-500"
                  />
                )}
              </button>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Theme Toggle - Hidden on very small screens */}
            <motion.button 
              onClick={toggleTheme} 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="hidden xs:block p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.button>

            {/* Search - Hidden on very small screens */}
            <motion.button 
              onClick={() => setSearchOpen(true)} 
              whileHover={{ scale: 1.1 }} 
              className="hidden xs:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            
            {user ? (
              <>
                {/* Cart */}
                <motion.button 
                  onClick={toggleCart} 
                  whileHover={{ scale: 1.1 }} 
                  className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  )}
                </motion.button>

                {/* User Menu */}
                <div className="hidden lg:flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                  <span className="text-sm text-slate-700 dark:text-slate-300">{user.name}</span>
                  <button 
                    onClick={logout} 
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => onNavigate('auth')} 
                className="hidden lg:block bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Button - Always visible on mobile */}
            <button 
              className="lg:hidden p-2 -mr-2 flex items-center justify-center" 
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {/* Mobile Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className="flex items-center justify-between w-full text-left text-sm uppercase tracking-wider text-slate-700 dark:text-slate-300 py-2"
                >
                  <span>Theme</span>
                  {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>

                {/* Mobile Search */}
                <button 
                  onClick={() => { setSearchOpen(true); setMenuOpen(false); }}
                  className="flex items-center justify-between w-full text-left text-sm uppercase tracking-wider text-slate-700 dark:text-slate-300 py-2"
                >
                  <span>Search</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  {['home', 'shop', 'about', 'contact'].map((page) => (
                    <button 
                      key={page}
                      onClick={() => { onNavigate(page); setMenuOpen(false); }} 
                      className={`block w-full text-left text-sm uppercase tracking-wider py-2 transition-colors ${
                        currentPage === page 
                          ? 'text-amber-700 dark:text-amber-500 font-semibold' 
                          : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {user?.role === 'admin' && (
                    <button 
                      onClick={() => { onNavigate('admin'); setMenuOpen(false); }} 
                      className={`block w-full text-left text-sm uppercase tracking-wider py-2 transition-colors ${
                        currentPage === 'admin' 
                          ? 'text-amber-700 dark:text-amber-500 font-semibold' 
                          : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500'
                      }`}
                    >
                      Admin
                    </button>
                  )}
                </div>

                {user ? (
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      Signed in as <span className="font-semibold">{user.name}</span>
                    </div>
                    <button 
                      onClick={() => { logout(); setMenuOpen(false); }} 
                      className="block w-full text-left text-sm text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors py-2"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { onNavigate('auth'); setMenuOpen(false); }} 
                    className="block w-full bg-amber-700 text-white px-6 py-3 rounded-full font-medium text-sm mt-4"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-32"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="relative w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="search"
                placeholder="Search for exquisite jewelry..."
                className="w-full p-5 pl-12 text-lg rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-amber-700/20 focus:border-amber-700 outline-none"
                autoFocus
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}