import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../Cart/AuthContext';

export default function AuthPage({ onNavigate }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup, signin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let result;
      if (isSignup) {
        if (!formData.name.trim()) {
          throw new Error('Name is required');
        }
        result = await signup(formData.name, formData.email, formData.password);
      } else {
        result = await signin(formData.email, formData.password);
      }
      
      console.log('Auth successful:', result);
      
      // Small delay to ensure state updates
      setTimeout(() => {
        onNavigate('home');
      }, 100);
      
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 pt-24">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden rounded-2xl">
        {/* Left Side - Image */}
        <div className="hidden md:block relative">
          <img 
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop" 
            alt="Luxury Jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              CRAFTED FOR ETERNITY
            </h2>
            <p className="text-white/90 font-light leading-relaxed">
              Experience the pinnacle of luxury with our exclusive collection of handcrafted jewelry.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-12 flex flex-col justify-center"
        >
          <div className="mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              className="h-1 bg-amber-600 mb-6"
            />
            <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              {isSignup ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-light">
              {isSignup ? 'Join our exclusive community' : 'Sign in to continue your journey'}
            </p>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 text-sm rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-amber-700 transition-colors rounded-lg"
                  required
                />
              </motion.div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-amber-700 transition-colors rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-amber-700 transition-colors rounded-lg"
                required
                minLength="6"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 font-medium uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rounded-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                isSignup ? 'Create Account' : 'Sign In'
              )}
            </motion.button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                  setFormData({ name: '', email: '', password: '' });
                }} 
                className="text-amber-700 dark:text-amber-500 font-semibold hover:underline"
              >
                {isSignup ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}