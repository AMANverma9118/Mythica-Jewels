import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext'; // Adjust path if needed

export default function CartSidebar() {
    const { isCartOpen, toggleCart, cartItems } = useCart();
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-[98]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 z-[99] shadow-2xl flex flex-col"
                    >
                        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700"><h2 className="text-2xl font-serif font-bold dark:text-white">Your Cart</h2><button onClick={toggleCart} className="text-2xl dark:text-white">&times;</button></div>
                        {cartItems.length > 0 ? (<div className="flex-grow overflow-y-auto p-6 space-y-4">{cartItems.map(item => (<div key={item.id} className="flex items-center space-x-4"><img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md"/><div className="flex-grow"><h3 className="font-semibold dark:text-white">{item.name}</h3><p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p></div><p className="font-semibold dark:text-white">${(item.price * item.quantity).toLocaleString()}</p></div>))}</div>) : (<div className="flex-grow flex items-center justify-center"><p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p></div>)}
                        <div className="p-6 border-t dark:border-gray-700 mt-auto"><div className="flex justify-between font-bold text-lg mb-4 dark:text-white"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div><button className="w-full bg-yellow-400 text-gray-800 font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors">Checkout</button></div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}