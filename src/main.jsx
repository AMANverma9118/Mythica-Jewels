import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './components/Cart/AuthContext.jsx';
import { CartProvider } from './components/Cart/CartContext.jsx';
import { ThemeProvider } from './components/Cart/ThemeContext.jsx';

// Simple main.jsx - App.jsx handles all routing internally
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);