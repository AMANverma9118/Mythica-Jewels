import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiCall } from '../Cart/AuthContext';
import { useAuth } from '../Cart/AuthContext';
import { useCart } from '../Cart/CartContext';
import ProductImageFrame from '../ui/ProductImageFrame';
import { PDP_TRUST } from '../ui/JewelryIcons';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&h=1200&fit=crop';

function productImage(product) {
  return product?.imageUrl || product?.image || FALLBACK_IMAGE;
}

function formatPrice(price) {
  if (price == null || Number.isNaN(Number(price))) return '—';
  return `₹${Number(price).toLocaleString('en-IN')}`;
}

export default function ProductDetailPage({ productId, onNavigate, onViewProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedFlash, setAddedFlash] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const data = await apiCall('/products');
        if (!cancelled) setProducts(data.products || []);
      } catch (err) {
        console.error('Error loading product:', err);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  useEffect(() => {
    setQuantity(1);
    setAddedFlash(false);
  }, [productId]);

  const product = useMemo(
    () => products.find((p) => p._id === productId),
    [products, productId]
  );

  const related = useMemo(() => {
    if (!product) return [];
    const cat = (product.category || '').toLowerCase();
    return products
      .filter(
        (p) =>
          p._id !== product._id &&
          (cat ? (p.category || '').toLowerCase() === cat : true)
      )
      .slice(0, 4);
  }, [products, product]);

  const inStock = (product?.stock ?? 1) > 0;
  const maxQty = Math.min(10, Math.max(1, product?.stock ?? 10));

  const handleAddToCart = async () => {
    if (!user) {
      onNavigate?.('auth');
      return;
    }
    if (!product?._id) return;
    await addToCart(product._id, quantity);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 2200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mj-canvas dark:bg-neutral-950 pt-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-2 border-stone-400/30 border-t-stone-800 dark:border-stone-600/30 dark:border-t-stone-300" />
          <p className="mt-5 text-stone-800 dark:text-stone-400 text-[11px] uppercase tracking-[0.28em] font-medium">
            Loading piece
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-mj-canvas dark:bg-neutral-950">
        <div className="container mx-auto max-w-lg px-6 text-center">
          <div className="mj-panel p-10">
            <h1 className="text-2xl mj-section-title mb-3">Piece not found</h1>
            <p className="mj-body-muted text-sm mb-8">
              This design may have been removed or the link is incorrect.
            </p>
            <Link
              to="/shop"
              className="mj-btn-primary inline-flex px-8 py-3.5 rounded-sm text-[11px] uppercase"
            >
              Back to collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const img = productImage(product);

  return (
    <div className="min-h-screen bg-mj-canvas dark:bg-neutral-950 pt-24 pb-28 md:pb-24">
      <div className="container mx-auto max-w-7xl px-6">
        <nav className="text-[11px] uppercase tracking-[0.2em] text-stone-600 dark:text-stone-500 mb-8 md:mb-10 font-medium">
          <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-stone-400 dark:text-stone-600">/</span>
          <Link to="/shop" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
            Collection
          </Link>
          <span className="mx-2 text-stone-400 dark:text-stone-600">/</span>
          <span className="text-stone-900 dark:text-stone-300">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:sticky lg:top-28"
          >
            <ProductImageFrame
              src={img}
              alt={product.name}
              badge={product.category}
              size="large"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="flex flex-col"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500 dark:text-stone-500 mb-3">
              Mythica Jewels
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-medium text-stone-950 dark:text-stone-50 tracking-tight leading-[1.15] mb-5">
              {product.name}
            </h1>

            <p className="text-2xl md:text-3xl font-sans font-medium text-stone-900 dark:text-stone-200 tabular-nums mb-6 tracking-tight">
              {formatPrice(product.price)}
            </p>

            <p className="mj-body-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              {product.description}
            </p>

            <ul className="grid grid-cols-2 gap-3 mb-10">
              {PDP_TRUST.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-sm bg-white/80 dark:bg-neutral-900/60 ring-1 ring-stone-200/90 dark:ring-stone-800"
                >
                  <span className="flex shrink-0 items-center justify-center w-9 h-9 rounded-full bg-stone-100 dark:bg-neutral-800 text-stone-700 dark:text-stone-300">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-stone-700 dark:text-stone-400 leading-snug">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-sm bg-white dark:bg-neutral-900 ring-1 ring-stone-200 dark:ring-stone-800 p-6 md:p-8 mb-8 space-y-6">
              <div className="flex items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-600 dark:text-stone-500">
                  Availability
                </span>
                <span
                  className={`text-sm font-medium ${
                    inStock
                      ? 'text-stone-700 dark:text-stone-300'
                      : 'text-red-800 dark:text-red-300'
                  }`}
                >
                  {inStock
                    ? product.stock != null
                      ? `${product.stock} in stock`
                      : 'In stock'
                    : 'Out of stock'}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-600 dark:text-stone-500">
                  Quantity
                </span>
                <div className="inline-flex items-center ring-1 ring-stone-300 dark:ring-stone-700">
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-neutral-800 disabled:opacity-40 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-medium text-stone-950 dark:text-stone-100 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={quantity >= maxQty}
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-neutral-800 disabled:opacity-40 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  disabled={!inStock}
                  onClick={handleAddToCart}
                  className="flex-1 mj-btn-primary py-4 rounded-sm text-[11px] uppercase disabled:opacity-50"
                >
                  {addedFlash
                    ? 'Added to bag'
                    : user
                      ? 'Add to bag'
                      : 'Sign in to purchase'}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.('contact')}
                  className="flex-1 py-4 rounded-sm text-[11px] uppercase tracking-[0.2em] font-medium border border-stone-800 dark:border-stone-500 text-stone-800 dark:text-stone-200 hover:bg-stone-800 hover:text-white dark:hover:bg-stone-200 dark:hover:text-stone-900 transition-colors"
                >
                  Book consultation
                </button>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-6 text-sm border-t border-stone-200 dark:border-stone-800 pt-8">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-500 mb-1.5">
                  Category
                </dt>
                <dd className="font-medium text-stone-900 dark:text-stone-200">
                  {product.category || 'Jewelry'}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-500 mb-1.5">
                  Reference
                </dt>
                <dd className="font-mono text-xs text-stone-700 dark:text-stone-400">
                  MJ-{String(product._id).slice(-8).toUpperCase()}
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>

        {related.length > 0 ? (
          <section className="mt-24 pt-16 border-t border-stone-200 dark:border-stone-800">
            <div className="mb-12">
              <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500 dark:text-stone-500 mb-2">
                Curated for you
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-stone-950 dark:text-stone-50">
                You may also like
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((item, index) => (
                <motion.button
                  key={item._id}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => onViewProduct?.(item._id)}
                  className="group text-left rounded-sm overflow-hidden bg-white dark:bg-neutral-900 ring-1 ring-stone-200 dark:ring-stone-800 hover:ring-stone-400 dark:hover:ring-stone-600 transition-all"
                >
                  <ProductImageFrame
                    src={productImage(item)}
                    alt={item.name}
                    size="small"
                    className="rounded-none ring-0"
                  />
                  <div className="p-4 border-t border-stone-100 dark:border-stone-800">
                    <h3 className="font-serif font-medium text-stone-900 dark:text-stone-100 line-clamp-1 text-sm">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-stone-800 dark:text-stone-300 font-medium text-sm tabular-nums">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 truncate">
              {product.name}
            </p>
            <p className="text-lg font-medium text-stone-900 dark:text-stone-200 tabular-nums">
              {formatPrice(product.price)}
            </p>
          </div>
          <button
            type="button"
            disabled={!inStock}
            onClick={handleAddToCart}
            className="shrink-0 mj-btn-primary px-6 py-3.5 rounded-sm text-[10px] uppercase"
          >
            {user ? 'Add to bag' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
