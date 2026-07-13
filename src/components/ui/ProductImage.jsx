import React, { useState, useEffect, useMemo } from 'react';
import { getProductImages, getPrimaryProductImage, sortImagesWithUploadsFirst } from '../../utils/productImages';

const FALLBACK =
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop';

/**
 * Renders a product image. When `src` is passed, that exact URL is shown.
 * When only `product` is passed, uses the gallery with error fallback.
 */
export default function ProductImage({
  product,
  src,
  alt = '',
  className = '',
  fallback = FALLBACK,
}) {
  const gallery = useMemo(() => {
    if (!product) return [];
    return sortImagesWithUploadsFirst(getProductImages(product));
  }, [product]);

  const resolvedSrc = src ? String(src).trim() : '';

  const initial = resolvedSrc || gallery[0] || getPrimaryProductImage(product, fallback) || fallback;

  const [index, setIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(initial);

  useEffect(() => {
    setIndex(0);
    setCurrentSrc(resolvedSrc || gallery[0] || getPrimaryProductImage(product, fallback) || fallback);
  }, [product?._id, resolvedSrc, gallery, fallback, product]);

  const handleError = () => {
    if (resolvedSrc && gallery.length > 1) {
      const startAt = gallery.indexOf(resolvedSrc);
      const next = startAt >= 0 ? startAt + 1 : index + 1;
      if (next < gallery.length) {
        setIndex(next);
        setCurrentSrc(gallery[next]);
        return;
      }
    }
    const next = index + 1;
    if (next < gallery.length) {
      setIndex(next);
      setCurrentSrc(gallery[next]);
    } else {
      setCurrentSrc(fallback);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      draggable={false}
    />
  );
}
