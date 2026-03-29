import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import ShopPage from './components/Shop/ShopPage';
import AuthPage from './components/Auth/AuthPage';
import AdminPanel from './components/Admin/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [shopSearchQuery, setShopSearchQuery] = useState('');

  const handleNavigate = useCallback((page) => {
    if (page === 'shop') {
      setShopSearchQuery('');
    }
    setCurrentPage(page);
  }, []);

  const handleSearchSelect = useCallback((query) => {
    setShopSearchQuery((query || '').trim());
    setCurrentPage('shop');
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'shop':
        return (
          <ShopPage
            onNavigate={handleNavigate}
            textSearchFilter={shopSearchQuery}
            onClearTextSearch={() => setShopSearchQuery('')}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-mj-canvas text-mj-ink dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500">
      <Navbar
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onSearchSelect={handleSearchSelect}
      />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
      <CartSidebar />
    </div>
  );
}