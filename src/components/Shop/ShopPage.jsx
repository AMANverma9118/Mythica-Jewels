import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../Cart/AuthContext';
import { useCart } from '../Cart/CartContext';
import { apiCall } from '../Cart/AuthContext';

function productMatchesSearch(product, rawQuery) {
  const q = (rawQuery || '').trim().toLowerCase();
  if (!q) return true;
  const name = (product.name || '').toLowerCase();
  const desc = (product.description || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  return name.includes(q) || desc.includes(q) || cat.includes(q);
}

export default function ShopPage({ onNavigate, textSearchFilter = '', onClearTextSearch }) {
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

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mj-canvas dark:bg-slate-950 pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-2 border-amber-800/30 border-t-amber-800 dark:border-amber-600/30 dark:border-t-amber-500"></div>
          <p className="mt-5 text-stone-800 dark:text-stone-400 text-[11px] uppercase tracking-[0.28em] font-medium">Loading collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-mj-canvas dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Breadcrumb + header */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-10 md:mb-14"
        >
          <nav className="text-[11px] uppercase tracking-[0.2em] text-stone-700 dark:text-stone-500 mb-6 font-medium">
            {onNavigate ? (
              <>
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-amber-900 dark:hover:text-amber-400 transition-colors">
                  Home
                </button>
                <span className="mx-2 text-stone-500 dark:text-stone-600">/</span>
                <span className="text-stone-800 dark:text-stone-300">Collection</span>
              </>
            ) : (
              <span className="text-stone-800 dark:text-stone-300">Collection</span>
            )}
          </nav>
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-900 dark:text-amber-500 mb-3 font-semibold">All jewelry</p>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 dark:text-white tracking-tight mb-3">
            The collection
          </h1>
          <p className="mj-body-muted max-w-xl text-base">
            Filter by category, sort by price or name — every design is crafted to the same standard.
          </p>
          <p className="mt-4 text-sm text-stone-700 dark:text-stone-500">
            <span className="font-semibold text-stone-900 dark:text-stone-300">{sortedProducts.length}</span>
            {' '}design{sortedProducts.length !== 1 ? 's' : ''} shown
            {textSearchFilter.trim() ? (
              <span className="block mt-2 text-[11px] uppercase tracking-[0.18em] text-amber-900 dark:text-amber-500 font-semibold">
                Filtered by search
              </span>
            ) : null}
          </p>
        </motion.div>

        {textSearchFilter.trim() ? (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 px-4 py-2 text-sm text-stone-800 dark:text-stone-200 ring-1 ring-stone-200 dark:ring-slate-700">
              <span className="text-stone-700 dark:text-stone-500 text-xs uppercase tracking-wider font-medium">Search</span>
              <span className="font-medium">&ldquo;{textSearchFilter.trim()}&rdquo;</span>
              {onClearTextSearch ? (
                <button
                  type="button"
                  onClick={onClearTextSearch}
                  className="ml-1 text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 hover:underline"
                >
                  Clear
                </button>
              ) : null}
            </span>
          </div>
        ) : null}

        {/* Filters & sort — toolbar */}
        <div className="sticky top-[4.5rem] z-30 -mx-1 px-1 py-3 mb-10 bg-mj-canvas/95 dark:bg-slate-950/95 backdrop-blur-md border-y border-stone-200/90 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] font-medium transition-all rounded-full ${
                  filter === cat
                    ? 'bg-stone-900 text-white dark:bg-amber-700 dark:text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 ring-1 ring-stone-200/90 dark:ring-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
            </div>

            <div className="flex justify-center lg:justify-end">
              <label className="sr-only" htmlFor="shop-sort">Sort</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="min-w-[200px] px-5 py-2.5 bg-white dark:bg-slate-900 ring-1 ring-stone-200 dark:ring-slate-700 text-stone-800 dark:text-stone-200 text-[11px] uppercase tracking-[0.12em] outline-none rounded-full cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Sort: Price low → high</option>
                <option value="price-high">Sort: Price high → low</option>
                <option value="name">Sort: Name A–Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
              className="group relative bg-white dark:bg-slate-900 overflow-hidden h-full flex flex-col rounded-lg ring-1 ring-stone-200/90 dark:ring-slate-800 shadow-sm hover:shadow-xl hover:ring-stone-300/80 dark:hover:ring-slate-600 transition-all duration-500"
            >
              <div className="relative aspect-[3/4] max-h-[28rem] shrink-0 overflow-hidden bg-stone-100 dark:bg-slate-800">
                <img 
                  src={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {product.category && (
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-950/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-800 dark:text-stone-100 ring-1 ring-stone-200/80 dark:ring-slate-700">
                    {product.category}
                  </div>
                )}

                {user && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-stone-900 text-white py-3 text-[11px] uppercase tracking-[0.18em] font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-800"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </motion.button>
                )}
              </div>
              
              <div className="p-5 md:p-6 text-center flex flex-col flex-grow min-h-0">
                <h3 className="text-base font-serif font-medium text-stone-900 dark:text-white mb-2 tracking-wide line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-stone-700 dark:text-stone-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-amber-900 dark:text-amber-400 text-lg font-semibold mt-auto tracking-wide">
                  ₹{product.price?.toLocaleString('en-IN')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-24 mj-panel px-6">
            <p className="text-xl font-serif text-stone-800 dark:text-stone-200 mb-2">
              {textSearchFilter.trim() ? 'No matches for your search' : 'No pieces in this category'}
            </p>
            <p className="text-stone-700 dark:text-stone-500 text-sm mb-4">
              {textSearchFilter.trim()
                ? 'Try different words or clear the search bar above.'
                : 'Try another filter or view the full collection.'}
            </p>
            {textSearchFilter.trim() && onClearTextSearch ? (
              <button
                type="button"
                onClick={onClearTextSearch}
                className="mj-btn-primary text-xs uppercase px-6 py-2.5 rounded-full"
              >
                Clear search
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}