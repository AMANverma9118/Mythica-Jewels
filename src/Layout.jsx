import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/Cart/CartSidebar';

// This Layout is for React Router if you decide to use it later
// Currently App.jsx handles routing with state
export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
      <Navbar />
      <Outlet />
      <Footer />
      <CartSidebar />
    </div>
  );
}