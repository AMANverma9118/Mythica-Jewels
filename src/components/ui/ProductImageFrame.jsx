import React from 'react';

/**
 * Boutique product frame — full piece visible (object-contain), never cropped.
 */
export default function ProductImageFrame({
  src,
  alt,
  badge,
  className = '',
  size = 'large',
}) {
  const heightClass =
    size === 'large'
      ? 'min-h-[420px] max-h-[min(78vh,820px)]'
      : 'min-h-[200px] max-h-[320px]';

  const paddingClass = size === 'large' ? 'p-8 sm:p-10 md:p-14' : 'p-5 sm:p-6';

  return (
    <div
      className={`relative overflow-hidden rounded-xl ring-1 ring-stone-200/90 dark:ring-stone-800/90 bg-gradient-to-b from-stone-50 via-white to-stone-100/90 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 ${className}`}
    >
      <div
        className={`flex items-center justify-center w-full ${heightClass} ${paddingClass}`}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full w-auto h-auto object-contain select-none"
          draggable={false}
        />
      </div>
      {badge ? (
        <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold bg-white/95 dark:bg-neutral-950/90 text-stone-900 dark:text-stone-200 rounded-sm ring-1 ring-stone-200/80 dark:ring-stone-700">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
