import React, { useState, useContext, createContext, useEffect } from 'react';
import { apiCall } from './AuthContext';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch cart when user logs in or component mounts
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]); // Clear cart when user logs out
    }
  }, [user]);

  // Listen for login/logout events
  useEffect(() => {
    const handleLogin = () => {
      fetchCart();
    };

    const handleLogout = () => {
      setCartItems([]);
      setCartOpen(false);
    };

    window.addEventListener('userLoggedIn', handleLogin);
    window.addEventListener('userLoggedOut', handleLogout);

    return () => {
      window.removeEventListener('userLoggedIn', handleLogin);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, []);

  const fetchCart = async () => {
    if (!user) {
      console.log('No user logged in, skipping cart fetch');
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching cart...');
      const data = await apiCall('/cart');
      console.log('Cart data received:', data);
      setCartItems(data.cart || data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // If unauthorized, clear cart
      if (error.message.includes('Authentication') || error.message.includes('401')) {
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    try {
      console.log('Adding to cart:', { productId, quantity });
      await apiCall('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
      await fetchCart();
      setCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message || 'Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      console.log('Removing from cart:', productId);
      await apiCall('/cart/remove', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
      });
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert(error.message || 'Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user || quantity < 1) return;

    try {
      console.log('Updating quantity:', { productId, quantity });
      await apiCall('/cart/update', {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity }),
      });
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert(error.message || 'Failed to update quantity');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await apiCall('/cart/clear', {
        method: 'DELETE',
      });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const toggleCart = () => setCartOpen(!isCartOpen);
  
  const cartCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product?.price || item.price || 0;
    const quantity = item.quantity || 0;
    return total + (price * quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen, 
      toggleCart, 
      fetchCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};