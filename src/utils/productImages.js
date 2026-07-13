import { API_ORIGIN } from '../config/api';

const FALLBACK =
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop';

/** Turn stored paths into full URLs the browser can load */
export function resolveImageUrl(url) {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  // Base64 images from PC upload — use as-is
  if (trimmed.startsWith('data:')) return trimmed;

  if (trimmed.startsWith('/uploads/')) {
    return `${API_ORIGIN}${trimmed}`;
  }

  const uploadsMatch = trimmed.match(/^(https?:\/\/[^/]+)(\/uploads\/.+)$/i);
  if (uploadsMatch) {
    return `${API_ORIGIN}${uploadsMatch[2]}`;
  }

  if (/^uploads\//i.test(trimmed)) {
    return `${API_ORIGIN}/${trimmed}`;
  }

  return trimmed;
}

export function getProductImages(product) {
  if (!product) return [];

  let images = [];
  if (Array.isArray(product.images) && product.images.length > 0) {
    images = product.images.filter(Boolean);
  } else {
    const single = product.imageUrl || product.image;
    if (single) images = [single];
  }

  return images.map(resolveImageUrl).filter(Boolean);
}

function prioritizeImages(images) {
  const embedded = images.filter((u) => u.startsWith('data:'));
  const uploaded = images.filter((u) => u.includes('/uploads/'));
  const other = images.filter((u) => !u.startsWith('data:') && !u.includes('/uploads/'));
  return [...embedded, ...uploaded, ...other];
}

/** Prefer PC-uploaded images (base64) over broken external links */
export function getPrimaryProductImage(product, fallback = FALLBACK) {
  const images = prioritizeImages(getProductImages(product));
  if (!images.length) return fallback;
  return images[0] || fallback;
}

export function sortImagesWithUploadsFirst(images) {
  return prioritizeImages((images || []).map(resolveImageUrl).filter(Boolean));
}
