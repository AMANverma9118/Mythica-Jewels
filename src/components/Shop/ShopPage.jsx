import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../Cart/AuthContext';
import { useCart } from '../Cart/CartContext';
import { apiCall } from '../Cart/AuthContext';
import ProductImage from '../ui/ProductImage';

function productMatchesSearch(product, rawQuery) {
  const q = (rawQuery || '').trim().toLowerCase();
  if (!q) return true;
  const name = (product.name || '').toLowerCase();
  const desc = (product.description || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  return name.includes(q) || desc.includes(q) || cat.includes(q);
}

function formatCategory(cat) {
  if (!cat || cat === 'all') return 'All';
  return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
}

function LuxuryProductCard({ product, index, user, onViewProduct, onAddToCart }) {
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e) => {
    e.stopPropagation();
    if (adding) return;
    setAdding(true);
    try {
      await onAddToCart(product._id);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col h-full bg-white dark:bg-neutral-900 ring-1 ring-stone-200/80 dark:ring-stone-800 overflow-hidden hover:ring-amber-800/30 dark:hover:ring-amber-600/40 hover:shadow-[0_12px_40px_-16px_rgba(28,25,23,0.18)] dark:hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)] transition-all duration-300"
    >
      {/* Compact image — jewelry framed, not full-bleed */}
      <button
        type="button"
        onClick={() => onViewProduct?.(product._id)}
        className="relative w-full aspect-[5/6] max-h-[240px] sm:max-h-[260px] overflow-hidden bg-gradient-to-b from-stone-100 to-stone-50 dark:from-neutral-800 dark:to-neutral-900 cursor-pointer"
      >
        <ProductImage
          product={product}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
        />
        {product.category ? (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] font-medium text-stone-600 dark:text-stone-400 bg-white/90 dark:bg-neutral-950/80">
            {product.category}
          </span>
        ) : null}
      </button>

      {/* Info + actions */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <button
          type="button"
          onClick={() => onViewProduct?.(product._id)}
          className="text-left w-full group/title"
        >
          <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-50 leading-snug line-clamp-1 group-hover/title:text-amber-900 dark:group-hover/title:text-amber-400 transition-colors">
            {product.name}
          </h3>
        </button>

        {product.description ? (
          <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-500 font-light leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
        ) : (
          <p className="mt-1.5 text-xs text-stone-400 dark:text-stone-600 italic min-h-[2.5rem]">
            Handcrafted fine jewelry
          </p>
        )}

        <p className="mt-3 font-serif text-base text-stone-800 dark:text-stone-200 tabular-nums">
          ₹{product.price?.toLocaleString('en-IN')}
        </p>

        <div className="mt-auto pt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onViewProduct?.(product._id)}
            className="w-full py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white bg-stone-900 hover:bg-amber-900 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-amber-400 transition-colors duration-300"
          >
            View details
          </button>

          {user ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={adding}
              className="w-full py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-700 dark:text-stone-300 ring-1 ring-stone-300 dark:ring-stone-600 hover:ring-stone-900 hover:text-stone-900 dark:hover:ring-stone-300 dark:hover:text-white transition-colors duration-300 disabled:opacity-50"
            >
              {adding ? 'Adding…' : 'Add to bag'}
            </button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function ShopPage({ onNavigate, onViewProduct, textSearchFilter = '', onClearTextSearch }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await apiCall('/products');
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryFiltered =
    filter === 'all'
      ? products
      : products.filter((p) => p.category?.toLowerCase() === filter.toLowerCase());

  const filteredProducts = categoryFiltered.filter((p) =>
    productMatchesSearch(p, textSearchFilter)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const categories = ['all', ...new Set(products.map((p) => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f2] dark:bg-neutral-950 pt-20">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border border-stone-300 dark:border-stone-700 border-t-amber-900 dark:border-t-amber-500 rounded-full animate-spin" />
          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-stone-500 dark:text-stone-500 font-medium">
            Curating collection
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] dark:bg-neutral-950">
      {/* Editorial hero — compact */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <nav className="text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-4 font-medium">
                <Link to="/" className="hover:text-stone-800 dark:hover:text-stone-300 transition-colors">Home</Link>
                <span className="mx-2 text-stone-300">/</span>
                <span className="text-stone-700 dark:text-stone-400">Collection</span>
              </nav>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-stone-900 dark:text-white tracking-tight">
                The collection
              </h1>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-500 font-light md:text-right max-w-sm">
              <span className="font-medium text-stone-800 dark:text-stone-300">{sortedProducts.length}</span>
              {' '}piece{sortedProducts.length !== 1 ? 's' : ''} — tap <span className="italic">View details</span> to explore each design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search chip */}
      {textSearchFilter.trim() ? (
        <div className="container mx-auto max-w-7xl px-6 pt-8">
          <div className="inline-flex items-center gap-3 text-sm text-stone-600 dark:text-stone-400">
            <span className="text-[10px] uppercase tracking-[0.25em]">Results for</span>
            <span className="font-serif text-lg text-stone-900 dark:text-stone-100">&ldquo;{textSearchFilter.trim()}&rdquo;</span>
            {onClearTextSearch ? (
              <button
                type="button"
                onClick={onClearTextSearch}
                className="mj-link-underline ml-2"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Filters — understated luxury tabs */}
      <div className="sticky top-[4.5rem] z-30 bg-[#f7f5f2]/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60">
        <div className="container mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`mj-shop-filter ${filter === cat ? 'mj-shop-filter--active' : ''}`}
                >
                  {formatCategory(cat)}
                </button>
              ))}
            </div>

            <div className="flex justify-center md:justify-end">
              <label className="sr-only" htmlFor="shop-sort">
                Sort collection
              </label>
              <div className="relative">
                <select
                  id="shop-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pl-0 pr-8 py-1 text-[11px] uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400 font-medium cursor-pointer outline-none border-b border-stone-300 dark:border-stone-700 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price — ascending</option>
                  <option value="price-high">Price — descending</option>
                  <option value="name">Name A–Z</option>
                </select>
                <svg
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid — compact 4-column layout */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-7xl px-6">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {sortedProducts.map((product, index) => (
                <LuxuryProductCard
                  key={product._id}
                  product={product}
                  index={index}
                  user={user}
                  onViewProduct={onViewProduct}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 md:py-32"
            >
              <p className="font-serif text-2xl md:text-3xl text-stone-800 dark:text-stone-200 mb-4">
                {textSearchFilter.trim() ? 'No pieces match your search' : 'This category is empty'}
              </p>
              <p className="text-stone-500 dark:text-stone-500 font-light text-sm mb-8 max-w-md mx-auto leading-relaxed">
                {textSearchFilter.trim()
                  ? 'Try a different term, or explore the full collection.'
                  : 'Browse all categories to discover our complete edit.'}
              </p>
              {textSearchFilter.trim() && onClearTextSearch ? (
                <button type="button" onClick={onClearTextSearch} className="mj-link-underline">
                  View all pieces
                </button>
              ) : (
                <button type="button" onClick={() => setFilter('all')} className="mj-link-underline">
                  View all pieces
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA — boutique invitation */}
      {sortedProducts.length > 0 ? (
        <section className="border-t border-stone-200/80 dark:border-stone-800/80 py-16 md:py-20">
          <div className="container mx-auto max-w-7xl px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-900 dark:text-amber-500 mb-4 font-medium">
              Bespoke service
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-white mb-4 tracking-tight">
              Cannot find what you seek?
            </h2>
            <p className="text-stone-500 dark:text-stone-500 font-light text-sm mb-8 max-w-md mx-auto">
              Our artisans welcome private consultations for custom commissions and heirloom restorations.
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.('contact')}
              className="mj-link-underline"
            >
              Request consultation
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
