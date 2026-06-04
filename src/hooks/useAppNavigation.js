import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PAGE_PATHS = {
  home: '/',
  shop: '/shop',
  about: '/about',
  contact: '/contact',
  auth: '/auth',
  admin: '/admin',
};

export function pathnameToPage(pathname) {
  if (pathname.startsWith('/product')) return 'shop';
  if (pathname === '/shop') return 'shop';
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/auth') return 'auth';
  if (pathname === '/admin') return 'admin';
  return 'home';
}

export function useAppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = useMemo(
    () => pathnameToPage(location.pathname),
    [location.pathname]
  );

  const navigateTo = useCallback(
    (page) => {
      navigate(PAGE_PATHS[page] || '/');
    },
    [navigate]
  );

  const viewProduct = useCallback(
    (id) => {
      if (!id) return;
      navigate(`/product/${id}`);
    },
    [navigate]
  );

  const searchAndGoToShop = useCallback(
    (query) => {
      const q = (query || '').trim();
      navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    },
    [navigate]
  );

  return {
    currentPage,
    navigateTo,
    viewProduct,
    searchAndGoToShop,
    location,
  };
}
