import React from 'react';
import { motion } from 'framer-motion';

export function BrandMarkIcon({ className = 'w-10 h-10 text-amber-800 dark:text-amber-500' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M50 10 L30 30 L20 30 L20 50 L10 60 L50 90 L90 60 L80 50 L80 30 L70 30 Z" />
      <path d="M50 30 L40 40 L40 50 L50 60 L60 50 L60 40 Z" fill="white" opacity="0.3" />
    </svg>
  );
}

const VARIANTS = {
  default: {
    icon: 'w-8 h-8 sm:w-10 sm:h-10 text-amber-800 dark:text-amber-500',
    mythica: 'text-xl sm:text-2xl font-serif font-semibold tracking-[0.12em] text-stone-950 dark:text-white',
    jewels: 'text-[0.6rem] sm:text-[0.65rem] tracking-[0.42em] font-medium text-amber-900 dark:text-amber-400',
  },
  hero: {
    icon: 'w-8 h-8 sm:w-10 sm:h-10 text-amber-400',
    mythica: 'text-xl sm:text-2xl font-serif font-semibold tracking-[0.12em] text-white',
    jewels: 'text-[0.6rem] sm:text-[0.65rem] tracking-[0.42em] font-medium text-amber-200/90',
  },
  footer: {
    icon: 'w-10 h-10 text-amber-500',
    mythica: 'text-xl font-serif font-semibold tracking-[0.12em] text-stone-100',
    jewels: 'text-[0.65rem] tracking-[0.42em] font-medium text-amber-400/90',
  },
};

export default function BrandLogo({ variant = 'default', className = '', onClick }) {
  const styles = VARIANTS[variant] || VARIANTS.default;
  const content = (
    <>
      <BrandMarkIcon className={styles.icon} />
      <div className="flex flex-col">
        <span className={styles.mythica}>MYTHICA</span>
        <span className={styles.jewels}>JEWELS</span>
      </div>
    </>
  );

  if (onClick) {
    return (
      <motion.div
        onClick={onClick}
        className={`flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-shrink-0 ${className}`}
        whileHover={{ scale: 1.02 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ${className}`}>
      {content}
    </div>
  );
}
