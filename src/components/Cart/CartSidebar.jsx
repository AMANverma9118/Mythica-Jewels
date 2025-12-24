import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { apiCall, generateRecaptchaToken } from './AuthContext';

export default function CartSidebar() {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, fetchCart, loading: cartLoading } = useCart();
  const { user } = useAuth();
  const [checkoutMode, setCheckoutMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: ''
  });

  // Fetch cart when sidebar opens and user is logged in
  useEffect(() => {
    if (isCartOpen && user) {
      console.log('Cart sidebar opened, fetching cart...');
      fetchCart();
    }
  }, [isCartOpen, user]);

  const subtotal = cartItems.reduce((sum, item) => {
    // Handle different data structures
    const product = item.product || item.productId || item;
    const price = product.price || item.price || 0;
    const quantity = item.quantity || 1;
    
    console.log('Calculating subtotal for item:', { price, quantity, itemTotal: price * quantity });
    return sum + (price * quantity);
  }, 0);

  const handleCheckout = async (mode) => {
    if (!user) {
      alert('Please sign in to checkout');
      return;
    }

    try {
      // Validate address
      if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || 
          !shippingAddress.zipCode || !shippingAddress.phoneNumber) {
        alert('Please fill in all address fields');
        return;
      }

      setLoading(true);

      // Generate reCAPTCHA token
      const recaptchaToken = await generateRecaptchaToken(mode === 'cod' ? 'checkout_cod' : 'checkout_online');
      
      const endpoint = mode === 'cod' ? '/orders/cod' : '/orders/online';
      
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify({ recaptchaToken, shippingAddress }),
      });
      
      alert(`Order placed successfully! Order ID: ${response.orderId || 'Confirmed'}`);
      toggleCart();
      setCheckoutMode(null);
      setShippingAddress({ street: '', city: '', state: '', zipCode: '', phoneNumber: '' });
      fetchCart();
    } catch (error) {
      alert(error.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[98]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-[99] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-wide">
                {checkoutMode ? 'CHECKOUT' : `YOUR CART ${cartItems.length > 0 ? `(${cartItems.length})` : ''}`}
              </h2>
              <button 
                onClick={toggleCart} 
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {!checkoutMode ? (
              <>
                {/* Loading State */}
                {cartLoading ? (
                  <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Loading cart...</p>
                    </div>
                  </div>
                ) : !user ? (
                  /* Not Logged In */
                  <div className="flex-grow flex items-center justify-center p-6">
                    <div className="text-center">
                      <svg className="w-20 h-20 mx-auto text-slate-300 dark:text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p className="text-slate-600 dark:text-slate-400 text-lg font-light mb-2">Please sign in</p>
                      <p className="text-slate-500 dark:text-slate-500 text-sm">Sign in to view your cart and checkout</p>
                    </div>
                  </div>
                ) : (
                  /* Cart Items */
                  <>
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                      {cartItems.length > 0 ? (
                        cartItems.map(item => {
                          // Handle different data structures from backend
                          const product = item.product || item.productId || item;
                          const productId = product._id || item._id;
                          const price = product.price || item.price || 0;
                          const quantity = item.quantity || 1;
                          const name = product.name || item.name || 'Unknown Product';
                          // Handle both 'image' and 'imageUrl' fields
                          const image = product.image || product.imageUrl || item.image || item.imageUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop';
                          
                          // Debug log to see what data we're getting
                          console.log('Cart item:', { 
                            productId,
                            product, 
                            price, 
                            quantity, 
                            name,
                            image,
                            rawItem: item 
                          });
                          
                          return (
                            <motion.div 
                              key={item._id || productId}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              className="flex items-center space-x-4 pb-4 border-b border-slate-200 dark:border-slate-800"
                            >
                              <img 
                                src={image} 
                                alt={name} 
                                className="w-24 h-24 object-cover rounded-lg" 
                                onError={(e) => {
                                  console.error('Image load failed for:', image);
                                  e.target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop';
                                }}
                              />
                              <div className="flex-grow">
                                <h3 className="font-serif font-semibold text-slate-900 dark:text-white">
                                  {name}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                  Quantity: {quantity}
                                </p>
                                <p className="text-amber-700 dark:text-amber-500 font-medium mt-1">
                                  ${(price * quantity).toLocaleString()} 
                                  {price === 0 && <span className="text-xs text-red-500 ml-2">(Price not available)</span>}
                                </p>
                              </div>
                              <button 
                                onClick={() => {
                                  console.log('Removing item:', productId);
                                  removeFromCart(productId);
                                }} 
                                className="text-slate-400 hover:text-red-600 transition-colors p-2"
                                title="Remove from cart"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="text-center py-20">
                          <svg className="w-20 h-20 mx-auto text-slate-300 dark:text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <p className="text-slate-500 dark:text-slate-400 text-lg font-light">Your cart is empty</p>
                          <p className="text-slate-400 dark:text-slate-600 text-sm mt-2">Add some beautiful jewelry to get started</p>
                        </div>
                      )}
                    </div>

                    {/* Cart Footer */}
                    {cartItems.length > 0 && (
                      <div className="p-6 border-t border-slate-200 dark:border-slate-800 space-y-4 bg-slate-50 dark:bg-slate-800">
                        <div className="flex justify-between text-lg font-serif font-bold text-slate-900 dark:text-white">
                          <span>SUBTOTAL</span>
                          <span className="text-amber-700 dark:text-amber-500">${subtotal.toLocaleString()}</span>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setCheckoutMode('address')} 
                          className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium py-4 uppercase tracking-wider transition-all"
                        >
                          Proceed to Checkout
                        </motion.button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              /* Checkout Form */
              <div className="flex-grow overflow-y-auto p-6">
                <h3 className="text-xl font-serif font-bold mb-6 text-slate-900 dark:text-white tracking-wide">
                  SHIPPING ADDRESS
                </h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Street Address *" 
                    value={shippingAddress.street} 
                    onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})} 
                    className="w-full p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-amber-700 transition-colors rounded-lg" 
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="City *" 
                      value={shippingAddress.city} 
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-amber-700 transition-colors rounded-lg" 
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="State *" 
                      value={shippingAddress.state} 
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-amber-700 transition-colors rounded-lg" 
                      required
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Zip Code *" 
                    value={shippingAddress.zipCode} 
                    onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})} 
                    className="w-full p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-amber-700 transition-colors rounded-lg" 
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number *" 
                    value={shippingAddress.phoneNumber} 
                    onChange={(e) => setShippingAddress({...shippingAddress, phoneNumber: e.target.value})} 
                    className="w-full p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-amber-700 transition-colors rounded-lg" 
                    required
                  />
                  
                  <div className="pt-6 space-y-3">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">
                      Select Payment Method:
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCheckout('cod')} 
                      disabled={loading}
                      className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 uppercase tracking-wider font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Cash on Delivery
                        </>
                      )}
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCheckout('online')} 
                      disabled={loading}
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 uppercase tracking-wider font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          Pay Online
                        </>
                      )}
                    </motion.button>
                    <button 
                      onClick={() => setCheckoutMode(null)} 
                      className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 uppercase tracking-wider text-sm transition-colors"
                      disabled={loading}
                    >
                      ← Back to Cart
                    </button>
                  </div>

                  {/* reCAPTCHA Notice */}
                  <div className="pt-4 text-xs text-center text-slate-500 dark:text-slate-400">
                    <p>Protected by reCAPTCHA</p>
                    <p className="mt-1">
                      <a href="https://policies.google.com/privacy" className="hover:underline" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </a>
                      {' | '}
                      <a href="https://policies.google.com/terms" className="hover:underline" target="_blank" rel="noopener noreferrer">
                        Terms of Service
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}