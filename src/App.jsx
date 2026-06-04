import React from 'react';
import { BrowserRouter, Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import ShopPage from './components/Shop/ShopPage';
import ProductDetailPage from './components/Shop/ProductDetailPage';
import AuthPage from './components/Auth/AuthPage';
import AdminPanel from './components/Admin/AdminPanel';
import ScrollToTop from './components/ScrollToTop';
import { useAppNavigation } from './hooks/useAppNavigation';

function ShopRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateTo, viewProduct } = useAppNavigation();
  const q = searchParams.get('q') || '';

  return (
    <ShopPage
      onNavigate={navigateTo}
      onViewProduct={viewProduct}
      textSearchFilter={q}
      onClearTextSearch={() => setSearchParams({})}
    />
  );
}

function ProductRoute() {
  const { productId } = useParams();
  const { navigateTo, viewProduct } = useAppNavigation();

  return (
    <ProductDetailPage
      productId={productId}
      onNavigate={navigateTo}
      onViewProduct={viewProduct}
    />
  );
}

function AppShell() {
  const { currentPage, navigateTo, viewProduct, searchAndGoToShop } = useAppNavigation();

  return (
    <div className="min-h-screen bg-mj-canvas text-mj-ink dark:bg-neutral-950 dark:text-stone-100 transition-colors duration-500">
      <ScrollToTop />
      <Navbar
        onNavigate={navigateTo}
        currentPage={currentPage}
        onSearchSelect={searchAndGoToShop}
        onViewProduct={viewProduct}
      />
      <Routes>
        <Route
          path="/"
          element={<Home onNavigate={navigateTo} onViewProduct={viewProduct} />}
        />
        <Route path="/shop" element={<ShopRoute />} />
        <Route path="/product/:productId" element={<ProductRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPage onNavigate={navigateTo} />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
      <CartSidebar />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
