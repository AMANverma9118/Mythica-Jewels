import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../Cart/AuthContext';
import { useCart } from '../Cart/CartContext';
import { apiCall } from '../Cart/AuthContext';

export default function ShopPage() {
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
      const data = await apiCall('/admin/products');
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === filter.toLowerCase());

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg font-light tracking-wider">LOADING COLLECTION...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            className="h-1 bg-amber-600 mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            OUR COLLECTION
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light tracking-wide">
            Discover pieces that define elegance
          </p>
        </motion.div>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm uppercase tracking-wider font-medium transition-all ${
                  filter === cat
                    ? 'bg-amber-700 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider font-medium outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="group relative bg-white dark:bg-slate-800 overflow-hidden"
            >
              <div className="relative h-96 overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img 
                  src={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {product.category && (
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 px-3 py-1 text-xs uppercase tracking-wider font-medium text-slate-900 dark:text-white">
                    {product.category}
                  </div>
                )}

                {user && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-white text-slate-900 py-3 text-sm uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-700 hover:text-white"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </motion.button>
                )}
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white mb-2 tracking-wide">
                  {product.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2 font-light">
                  {product.description}
                </p>
                <p className="text-amber-700 dark:text-amber-500 text-2xl font-light">
                  ${product.price?.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-light tracking-wide">
              No pieces found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}