import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="mj-page min-h-screen pt-24 pb-20">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-14 md:mb-16">
            <p className="mj-eyebrow mb-4">Our story</p>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl mj-section-title mb-4"
            >
              About Mythica Jewels
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg mj-body-muted max-w-xl mx-auto"
            >
              Crafting timeless elegance since 1990
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mj-panel overflow-hidden mb-12 md:mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl mj-section-title">A legacy of excellence</h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-light">
                  At Mythica Jewels, every piece tells a story. For over three decades, our master artisans have been crafting exquisite jewelry that celebrates life&apos;s most precious moments.
                </p>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-light">
                  From ethically sourced diamonds to handcrafted gold, each creation is a testament to our commitment to quality, sustainability, and timeless beauty.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-stone-100 dark:bg-slate-800/80 ring-1 ring-stone-200/80 dark:ring-slate-700">
                    <div className="text-3xl md:text-4xl font-serif font-semibold text-amber-800 dark:text-amber-400">30+</div>
                    <div className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 mt-2">Years</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-stone-100 dark:bg-slate-800/80 ring-1 ring-stone-200/80 dark:ring-slate-700">
                    <div className="text-3xl md:text-4xl font-serif font-semibold text-amber-800 dark:text-amber-400">10k+</div>
                    <div className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 mt-2">Clients</div>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[280px] md:min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
                  alt="Jewelry craftsmanship"
                  className="w-full h-full min-h-[280px] object-cover rounded-lg ring-1 ring-stone-200/80 dark:ring-slate-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent rounded-lg pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { emoji: '💎', title: 'Premium quality', copy: 'Only the finest materials and gemstones make it into our collections.' },
              { emoji: '🌿', title: 'Ethical sourcing', copy: 'Sustainable and responsible sourcing practices you can trust.' },
              { emoji: '✨', title: 'Master artisans', copy: 'Each piece is handcrafted by skilled artisans with decades of experience.' },
            ].map((item) => (
              <div key={item.title} className="mj-panel p-8 text-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg mj-section-title mb-3">{item.title}</h3>
                <p className="mj-body-muted text-sm leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-12 md:mt-16 rounded-xl p-8 md:p-12 text-center border border-stone-200/80 dark:border-slate-800 bg-gradient-to-br from-stone-100 via-amber-50/40 to-stone-50 text-stone-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:text-white"
          >
            <p className="mj-eyebrow mb-3 dark:text-amber-400">Our promise</p>
            <h2 className="text-2xl md:text-3xl mj-section-title mb-6 dark:text-white">Heirlooms for generations</h2>
            <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-stone-700 dark:text-stone-300 font-light">
              We don&apos;t just create jewelry – we craft heirlooms that will be cherished for generations. Every piece from Mythica Jewels carries our promise of unparalleled quality, timeless design, and the magic of celebrating life&apos;s most beautiful moments.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
