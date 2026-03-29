import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, apiCall } from '../Cart/AuthContext';
import { useCart } from '../Cart/CartContext';
import { useTheme } from '../Cart/ThemeContext';

export default function Navbar({ onNavigate, currentPage, onSearchSelect }) {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchCatalog, setSearchCatalog] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    let cancelled = false;
    setSearchLoading(true);
    (async () => {
      try {
        const data = await apiCall('/products');
        if (!cancelled) setSearchCatalog(data.products || []);
      } catch {
        if (!cancelled) setSearchCatalog([]);
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) setSearchInput('');
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    const list = searchCatalog;
    if (!q) return list.slice(0, 8);
    return list
      .filter((p) => {
        const name = (p.name || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const cat = (p.category || '').toLowerCase();
        return name.includes(q) || desc.includes(q) || cat.includes(q);
      })
      .slice(0, 12);
  }, [searchCatalog, searchInput]);

  const handlePickProduct = (product) => {
    const q = searchInput.trim() || product.name || '';
    onSearchSelect?.(q);
    setSearchOpen(false);
  };

  const navClasses = isSticky 
    ? 'bg-stone-50/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 dark:border-slate-800' 
    : currentPage === 'home'
      ? 'bg-transparent backdrop-blur-[2px]'
      : 'bg-stone-50/98 dark:bg-slate-950 border-b border-stone-200/70 dark:border-slate-800';

  const onHero = currentPage === 'home' && !isSticky;

  const navLinkClass = (page) => {
    const active = currentPage === page;
    if (onHero) {
      return active
        ? 'text-amber-200'
        : 'text-white/88 hover:text-white';
    }
    return active
      ? 'text-amber-900 dark:text-amber-400 font-semibold'
      : 'text-stone-950 dark:text-stone-200 hover:text-amber-900 dark:hover:text-amber-400';
  };

  const indicatorClass = onHero ? 'bg-amber-300' : 'bg-amber-800 dark:bg-amber-500';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navClasses}`}>
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4 max-w-7xl">
          {/* Logo */}
          <motion.div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <svg className={`w-8 h-8 sm:w-10 sm:h-10 ${onHero ? 'text-amber-400' : 'text-amber-800 dark:text-amber-500'}`} viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 10 L30 30 L20 30 L20 50 L10 60 L50 90 L90 60 L80 50 L80 30 L70 30 Z" />
              <path d="M50 30 L40 40 L40 50 L50 60 L60 50 L60 40 Z" fill="white" opacity="0.3"/>
            </svg>
            <div className="flex flex-col">
              <span className={`text-xl sm:text-2xl font-serif font-semibold tracking-[0.12em] ${onHero ? 'text-white' : 'text-stone-950 dark:text-white'}`}>
                MYTHICA
              </span>
              <span className={`text-[0.6rem] sm:text-[0.65rem] tracking-[0.42em] font-medium ${onHero ? 'text-amber-200/90' : 'text-amber-900 dark:text-amber-400'}`}>
                JEWELS
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 font-medium">
            {['home', 'shop', 'about', 'contact'].map((page) => (
              <button 
                key={page}
                onClick={() => onNavigate(page)} 
                className={`relative text-[11px] uppercase tracking-[0.22em] transition-colors ${navLinkClass(page)}`}
              >
                {page}
                {currentPage === page && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className={`absolute -bottom-1.5 left-0 right-0 h-px ${indicatorClass}`}
                  />
                )}
              </button>
            ))}
            {user?.role === 'admin' && (
              <button 
                onClick={() => onNavigate('admin')} 
                className={`relative text-[11px] uppercase tracking-[0.22em] transition-colors ${navLinkClass('admin')}`}
              >
                Admin
                {currentPage === 'admin' && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className={`absolute -bottom-1.5 left-0 right-0 h-px ${indicatorClass}`}
                  />
                )}
              </button>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Theme Toggle — visible from md up (xs is not a default Tailwind breakpoint) */}
            <motion.button 
              onClick={toggleTheme} 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className={`hidden md:flex p-2 rounded-full transition-colors items-center justify-center ${
                onHero ? 'hover:bg-white/10' : 'hover:bg-stone-200/80 dark:hover:bg-slate-800'
              }`}
            >
              {theme === 'light' ? (
                <svg className={`w-5 h-5 ${onHero ? 'text-white' : 'text-stone-950 dark:text-stone-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.button>

            {/* Search — same breakpoint as theme toggle */}
            <motion.button 
              onClick={() => setSearchOpen(true)} 
              whileHover={{ scale: 1.1 }} 
              className={`hidden md:flex p-2 rounded-full transition-colors items-center justify-center ${
                onHero ? 'hover:bg-white/10' : 'hover:bg-stone-200/80 dark:hover:bg-slate-800'
              }`}
            >
              <svg className={`w-5 h-5 ${onHero ? 'text-white' : 'text-stone-950 dark:text-stone-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            
            {user ? (
              <>
                {/* Cart */}
                <motion.button 
                  onClick={toggleCart} 
                  whileHover={{ scale: 1.1 }} 
                  className={`relative p-2 rounded-full transition-colors ${
                    onHero ? 'hover:bg-white/10' : 'hover:bg-stone-200/80 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className={`w-5 h-5 ${onHero ? 'text-white' : 'text-stone-950 dark:text-stone-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  )}
                </motion.button>

                {/* User Menu */}
                <div className={`hidden lg:flex items-center space-x-3 pl-3 border-l ${onHero ? 'border-white/25' : 'border-stone-200 dark:border-slate-700'}`}>
                  <span className={`text-sm font-medium ${onHero ? 'text-white/90' : 'text-stone-950 dark:text-stone-200'}`}>{user.name}</span>
                  <button 
                    onClick={logout} 
                    className={`text-sm font-medium transition-colors ${onHero ? 'text-white/75 hover:text-white' : 'text-stone-800 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400'}`}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => onNavigate('auth')} 
                className={`hidden lg:block px-6 py-2 rounded-full font-medium text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  onHero
                    ? 'border border-white/80 text-white hover:bg-white hover:text-stone-900'
                    : 'bg-amber-800 hover:bg-amber-900 text-white dark:bg-amber-700 dark:hover:bg-amber-600'
                }`}
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
                <svg className={`w-6 h-6 ${onHero ? 'text-white' : 'text-stone-950 dark:text-stone-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className={`w-6 h-6 ${onHero ? 'text-white' : 'text-stone-950 dark:text-stone-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="lg:hidden bg-mj-surface dark:bg-slate-900 border-t border-stone-200 dark:border-slate-800"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {/* Mobile Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className="flex items-center justify-between w-full text-left text-sm uppercase tracking-wider text-stone-900 dark:text-slate-300 font-medium py-2"
                >
                  <span>Theme</span>
                  {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>

                {/* Mobile Search */}
                <button 
                  onClick={() => { setSearchOpen(true); setMenuOpen(false); }}
                  className="flex items-center justify-between w-full text-left text-sm uppercase tracking-wider text-stone-900 dark:text-slate-300 font-medium py-2"
                >
                  <span>Search</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <div className="border-t border-stone-200 dark:border-slate-800 pt-4">
                  {['home', 'shop', 'about', 'contact'].map((page) => (
                    <button 
                      key={page}
                      onClick={() => { onNavigate(page); setMenuOpen(false); }} 
                      className={`block w-full text-left text-sm uppercase tracking-wider py-2 transition-colors ${
                        currentPage === page 
                          ? 'text-amber-900 dark:text-amber-400 font-semibold' 
                          : 'text-stone-950 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-400'
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
                          ? 'text-amber-900 dark:text-amber-400 font-semibold' 
                          : 'text-stone-950 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-400'
                      }`}
                    >
                      Admin
                    </button>
                  )}
                </div>

                {user ? (
                  <div className="border-t border-stone-200 dark:border-slate-800 pt-4 space-y-2">
                    <div className="text-sm text-stone-900 dark:text-slate-300">
                      Signed in as <span className="font-semibold">{user.name}</span>
                    </div>
                    <button 
                      onClick={() => { logout(); setMenuOpen(false); }} 
                      className="block w-full text-left text-sm font-medium text-stone-800 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400 transition-colors py-2"
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

      {/* Search Modal — live product search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[100] flex items-start justify-center pt-24 md:pt-28 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              className="relative w-full max-w-xl mj-panel overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative border-b border-stone-200 dark:border-slate-800">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search rings, necklaces, diamonds…"
                  className="w-full py-4 pl-12 pr-4 text-base bg-transparent text-stone-900 dark:text-white placeholder:text-stone-400 outline-none"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchResults[0]) {
                      e.preventDefault();
                      handlePickProduct(searchResults[0]);
                    }
                  }}
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="max-h-[min(60vh,420px)] overflow-y-auto">
                {searchLoading ? (
                  <p className="py-10 text-center text-sm text-stone-700 dark:text-stone-400">Loading catalogue…</p>
                ) : searchResults.length === 0 ? (
                  <p className="py-10 text-center text-sm text-stone-700 dark:text-stone-400 px-4">
                    {searchInput.trim() ? 'No pieces match that search.' : 'No products available.'}
                  </p>
                ) : (
                  <ul className="py-2">
                    <li className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-700 dark:text-stone-500">
                      {searchInput.trim() ? 'Results' : 'Popular picks'}
                    </li>
                    {searchResults.map((p) => (
                      <li key={p._id}>
                        <button
                          type="button"
                          onClick={() => handlePickProduct(p)}
                          className="w-full flex gap-3 px-4 py-3 text-left hover:bg-stone-100 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <img
                            src={p.imageUrl || p.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop'}
                            alt=""
                            className="w-14 h-14 object-cover rounded-md ring-1 ring-stone-200/80 dark:ring-slate-700 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-serif text-sm text-stone-900 dark:text-white truncate">{p.name}</p>
                            {p.category ? (
                              <p className="text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-500 mt-0.5">{p.category}</p>
                            ) : null}
                            {p.price != null ? (
                              <p className="text-sm text-stone-800 dark:text-stone-400 mt-1 font-medium">₹{Number(p.price).toLocaleString('en-IN')}</p>
                            ) : null}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="border-t border-stone-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center gap-2 bg-stone-50/80 dark:bg-slate-950/50">
                <span className="text-[10px] text-stone-700 dark:text-stone-500 uppercase tracking-wider font-medium">Enter · open first result</span>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-xs uppercase tracking-wider font-medium text-stone-800 dark:text-stone-400 hover:text-amber-900 dark:hover:text-amber-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}