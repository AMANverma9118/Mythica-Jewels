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
      if (isSignup) {
        if (!formData.name.trim()) {
          throw new Error('Name is required');
        }
        await signup(formData.name, formData.email, formData.password);
      } else {
        await signin(formData.email, formData.password);
      }

      setTimeout(() => {
        onNavigate('home');
      }, 100);
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mj-page min-h-screen flex items-center justify-center p-4 pt-24 pb-16">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 mj-panel overflow-hidden shadow-xl">
        <div className="hidden md:block relative min-h-[520px]">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop"
            alt="Luxury jewelry"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <p className="mj-eyebrow text-amber-200/90 mb-3">Mythica Jewels</p>
            <h2 className="text-3xl font-serif font-semibold text-white mb-3 tracking-tight">Crafted for eternity</h2>
            <p className="text-white/85 font-light text-sm leading-relaxed">
              Experience handcrafted jewelry with the warmth of a boutique and the ease of shopping online.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-10 md:p-12 flex flex-col justify-center bg-mj-surface dark:bg-slate-900"
        >
          <div className="mb-8">
            <p className="mj-eyebrow mb-3">{isSignup ? 'Join us' : 'Welcome back'}</p>
            <h2 className="text-3xl md:text-4xl mj-section-title mb-2">
              {isSignup ? 'Create account' : 'Sign in'}
            </h2>
            <p className="mj-body-muted text-sm">
              {isSignup ? 'Join our community of collectors' : 'Continue your journey with Mythica'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 ring-1 ring-red-200 dark:ring-red-900/50 text-red-800 dark:text-red-300 text-sm rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">Full name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mj-input py-3.5"
                  required
                />
              </motion.div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mj-input py-3.5"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mj-input py-3.5"
                required
                minLength={6}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full mj-btn-primary py-4 rounded-lg text-[11px] uppercase justify-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              ) : isSignup ? (
                'Create account'
              ) : (
                'Sign in'
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center text-sm text-stone-600 dark:text-stone-400">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-amber-800 dark:text-amber-400 font-medium hover:underline"
            >
              {isSignup ? 'Sign in' : 'Create account'}
            </button>
          </div>

          <p className="mt-8 pt-8 border-t border-stone-200 dark:border-slate-800 text-[11px] text-center text-stone-500 dark:text-stone-500 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
