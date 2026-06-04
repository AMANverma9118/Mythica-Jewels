import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Cart/AuthContext';
import { useCart } from '../Cart/CartContext';
import { apiCall } from '../Cart/AuthContext';

export default function Home({ onNavigate, onViewProduct }) {
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
      const data = await apiCall('/products');
      setFeaturedProducts((data.products || []).slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const categoryTiles = [
    {
      title: 'Rings',
      subtitle: 'Engagement & wedding',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop',
    },
    {
      title: 'Necklaces',
      subtitle: 'Chains & pendants',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
    },
    {
      title: 'Earrings',
      subtitle: 'Studs & drops',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop',
    },
    {
      title: 'Bracelets',
      subtitle: 'Everyday luxury',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop',
    },
  ];

  return (
    <div className="mj-page">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-black/25" />
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
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] uppercase tracking-[0.35em] text-amber-200/90 mb-5"
                >
                  Fine jewelry · Since 1990
                </motion.p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  className="h-px bg-amber-400/90 mb-8"
                />
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-semibold text-white mb-6 tracking-tight leading-[1.08]">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-lg md:text-xl text-stone-200/95 mb-10 font-light tracking-wide max-w-md">
                  {slides[currentSlide].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button 
                    onClick={() => onNavigate('shop')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-amber-800 hover:bg-amber-900 text-white px-10 py-3.5 text-[11px] uppercase tracking-[0.22em] transition-colors shadow-lg shadow-black/20"
                  >
                    Shop collection
                  </motion.button>
                  <motion.button 
                    onClick={() => onNavigate('about')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="border border-white/70 text-white hover:bg-white hover:text-stone-900 px-10 py-3.5 text-[11px] uppercase tracking-[0.22em] transition-colors"
                  >
                    Our heritage
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide indicators — horizontal, editorial */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, i) => (
            <button 
              key={i} 
              type="button"
              onClick={() => setCurrentSlide(i)} 
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentSlide === i ? 'w-10 bg-amber-400' : 'w-2 bg-white/35 hover:bg-white/55'
              }`} 
            />
          ))}
        </div>
      </section>

      {/* Trust strip — parity with major jewelry retailers */}
      <section className="border-y border-stone-300/90 bg-white dark:bg-slate-900/90 dark:border-slate-800 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 md:gap-x-16 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-stone-800 dark:text-stone-400 font-medium">
            <span className="flex items-center gap-2">✓ Hallmark certified</span>
            <span className="flex items-center gap-2">✓ Secure checkout</span>
            <span className="flex items-center gap-2">✓ Insured delivery</span>
            <span className="flex items-center gap-2">✓ Easy exchanges</span>
          </div>
        </div>
      </section>

      {/* Shop by category — discovery, like Tanishq-style entry points */}
      <section className="py-20 md:py-28 bg-stone-100/80 dark:bg-slate-900/40">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14 md:mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-900 dark:text-amber-400 mb-3 font-semibold">Curated for you</p>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 dark:text-white tracking-tight">
              Shop by category
            </h2>
            <p className="mt-4 mj-body-muted max-w-lg mx-auto">
              Explore handcrafted pieces for every occasion — from daily elegance to celebration.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryTiles.map((cat, i) => (
              <motion.button
                key={cat.title}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onClick={() => onNavigate('shop')}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-200 dark:bg-slate-800 text-left ring-1 ring-stone-200/80 dark:ring-slate-700 shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                <img
                  src={cat.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/95 mb-1">{cat.subtitle}</p>
                  <p className="font-serif text-xl md:text-2xl text-white font-medium">{cat.title}</p>
                  <span className="mt-3 inline-block text-[10px] uppercase tracking-[0.25em] text-white/80 border-b border-white/40 pb-0.5 group-hover:border-amber-300 group-hover:text-amber-200 transition-colors">
                    View pieces
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Signature pieces — editorial cards, readable in light & dark */}
      <section
        id="signature-pieces"
        className="scroll-mt-32 pt-28 pb-24 md:pt-32 md:pb-28 bg-gradient-to-b from-stone-200/70 via-stone-100 to-mj-canvas dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-t border-stone-300/80 dark:border-slate-800"
      >
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 md:mb-16 max-w-2xl mx-auto pt-2"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-900 dark:text-amber-400 mb-4 font-semibold">
              New & notable
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              className="h-0.5 bg-amber-900 dark:bg-amber-500 mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-semibold text-stone-950 dark:text-white mb-5 tracking-tight leading-[1.15]">
              Signature pieces
            </h2>
            <p className="mj-body-muted text-base md:text-lg leading-relaxed">
              A hand-picked edit — the same quality you&apos;d expect from a boutique counter. Names and prices stay readable on every photo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 items-stretch">
            {featuredProducts.map((product, index) => (
              <motion.article
                key={product._id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                role="button"
                tabIndex={0}
                onClick={() => onViewProduct?.(product._id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onViewProduct?.(product._id);
                  }
                }}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 ring-1 ring-stone-300/90 dark:ring-slate-700 shadow-[0_12px_40px_-12px_rgba(28,25,23,0.18)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-12px_rgba(28,25,23,0.22)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-[#e5e0d8] dark:bg-slate-800">
                  <img
                    src={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop'}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                  {product.category ? (
                    <span className="absolute top-4 left-4 z-10 inline-block px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-white/95 text-stone-900 dark:bg-slate-950/90 dark:text-white rounded shadow-sm">
                      {product.category}
                    </span>
                  ) : null}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-left">
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-white leading-snug drop-shadow-md line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-lg font-semibold text-amber-200 tracking-wide drop-shadow-md">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </p>
                  </div>
                  {user ? (
                    <motion.button
                      type="button"
                      initial={false}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                      }}
                      className="absolute bottom-[5.5rem] left-4 right-4 z-20 py-3 mj-btn-primary text-[11px] uppercase rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                    >
                      Add to cart
                    </motion.button>
                  ) : null}
                </div>

                <div className="flex flex-col flex-grow min-h-0 px-5 py-5 border-t border-stone-200 dark:border-slate-800 bg-stone-50/90 dark:bg-slate-950/50">
                  {product.description ? (
                    <p className="text-sm text-stone-800 dark:text-stone-300 line-clamp-2 leading-relaxed font-normal">
                      {product.description}
                    </p>
                  ) : (
                    <p className="text-sm text-stone-700 dark:text-stone-500 italic">Fine jewelry — view full details in the collection.</p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-base font-semibold text-amber-900 dark:text-amber-400 tabular-nums">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewProduct?.(product._id);
                      }}
                      className="text-[11px] uppercase tracking-[0.2em] font-semibold text-stone-900 dark:text-white border-b-2 border-amber-800 dark:border-amber-500 pb-0.5 hover:text-amber-900 dark:hover:text-amber-400 transition-colors"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 md:mt-20"
          >
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="mj-btn-primary px-12 py-4 rounded-full text-[11px] uppercase shadow-lg"
            >
              View full collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-stone-100/70 dark:bg-slate-900/80 border-t border-stone-200/80 dark:border-slate-800">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center rounded-xl bg-white/80 dark:bg-slate-950/60 ring-1 ring-stone-200/70 dark:ring-slate-800 px-8 py-10"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-amber-800/40 dark:border-amber-500/40 rounded-full">
                <svg className="w-8 h-8 text-amber-800 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-white mb-3 tracking-[0.12em]">
                CERTIFIED AUTHENTIC
              </h3>
              <p className="mj-body-muted leading-relaxed text-sm">
                Every piece certified with complete authenticity documentation
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center rounded-xl bg-white/80 dark:bg-slate-950/60 ring-1 ring-stone-200/70 dark:ring-slate-800 px-8 py-10"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-amber-800/40 dark:border-amber-500/40 rounded-full">
                <svg className="w-8 h-8 text-amber-800 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-white mb-3 tracking-[0.12em]">
                LIFETIME WARRANTY
              </h3>
              <p className="mj-body-muted leading-relaxed text-sm">
                Comprehensive lifetime coverage on all craftsmanship
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center rounded-xl bg-white/80 dark:bg-slate-950/60 ring-1 ring-stone-200/70 dark:ring-slate-800 px-8 py-10"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-amber-800/40 dark:border-amber-500/40 rounded-full">
                <svg className="w-8 h-8 text-amber-800 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-white mb-3 tracking-[0.12em]">
                ETHICAL SOURCING
              </h3>
              <p className="mj-body-muted leading-relaxed text-sm">
                Responsibly sourced materials with full transparency
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}