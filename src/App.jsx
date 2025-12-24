import React, { useState } from 'react';
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

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'shop':
        return <ShopPage />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'auth':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      <Footer />
      <CartSidebar />
    </div>
  );
}