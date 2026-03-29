import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="mj-page relative flex items-center justify-center min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto w-full px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="overflow-hidden"
        >
          <div className="text-center mb-12">
            <motion.p variants={fadeUp} className="mj-eyebrow mb-4">
              Concierge
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl mj-section-title mb-4">
              Get in touch
            </motion.h1>
            <motion.p variants={fadeUp} className="mj-body-muted text-lg">
              We&apos;d love to hear from you
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <motion.div variants={fadeUp} className="mj-panel p-8 md:p-10">
              <h2 className="text-2xl mj-section-title mb-8">Contact information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl" aria-hidden>📍</span>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-white mb-1 text-sm uppercase tracking-wider">Visit us</h3>
                    <p className="mj-body-muted text-sm leading-relaxed">
                      Laxmin Market<br />
                      Ballia, Uttar Pradesh 277001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl" aria-hidden>📞</span>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-white mb-1 text-sm uppercase tracking-wider">Call us</h3>
                    <p className="mj-body-muted text-sm">
                      +91 911-835-9330<br />
                      Mon–Sat: 10AM – 8PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl" aria-hidden>✉️</span>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-white mb-1 text-sm uppercase tracking-wider">Email us</h3>
                    <p className="mj-body-muted text-sm">
                      aman.verma3497924@gmail.com<br />
                      av3497924@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl" aria-hidden>🌐</span>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-white mb-1 text-sm uppercase tracking-wider">Follow us</h3>
                    <div className="flex gap-3 mt-2">
                      <a href="#" className="w-10 h-10 bg-stone-800 dark:bg-amber-800 rounded-full flex items-center justify-center text-white text-xs hover:opacity-90 transition-opacity" aria-label="Facebook">f</a>
                      <a href="#" className="w-10 h-10 bg-stone-700 dark:bg-amber-900 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Instagram">📷</a>
                      <a href="#" className="w-10 h-10 bg-stone-600 dark:bg-amber-950 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Social">in</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mj-panel p-8 md:p-10">
              <h2 className="text-2xl mj-section-title mb-8">Send us a message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl mj-section-title mb-2 text-amber-800 dark:text-amber-400">Thank you</h3>
                  <p className="text-stone-800 dark:text-stone-400 text-center text-sm font-light">
                    Your message has been sent.<br />
                    We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-800 dark:text-stone-400 mb-2">Full name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mj-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-800 dark:text-stone-400 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mj-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-800 dark:text-stone-400 mb-2">Your message *</label>
                    <textarea
                      name="message"
                      placeholder="Tell us how we can help you…"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mj-input resize-none min-h-[140px]"
                      rows="5"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full mj-btn-primary py-4 rounded-lg text-[11px] uppercase shadow-md"
                  >
                    Send message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-10 mj-panel p-8 text-center">
            <h3 className="text-xl mj-section-title mb-3">Visit our showroom</h3>
            <p className="text-stone-800 dark:text-stone-400 text-sm font-light mb-6 max-w-2xl mx-auto">
              Experience our collections in person. Our consultants can help you find the perfect piece.
            </p>
            <div className="bg-stone-100 dark:bg-slate-800/80 h-56 md:h-64 rounded-lg flex items-center justify-center ring-1 ring-stone-200/80 dark:ring-slate-700">
              <p className="text-stone-500 dark:text-stone-500 text-sm uppercase tracking-wider">Map placeholder</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
