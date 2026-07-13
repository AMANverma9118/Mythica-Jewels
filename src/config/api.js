/** Backend API — override with VITE_API_URL in .env for local backend */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://mythica-jewels-backend.onrender.com/api';

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');
