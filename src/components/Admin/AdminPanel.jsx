import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiCall } from '../Cart/AuthContext';
import { useAuth } from '../Cart/AuthContext';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    imageUrl: '',  // Changed from 'image' to 'imageUrl'
    category: '',
    stock: '10'    // Added stock field
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role !== 'admin') {
      alert('Access denied. Admin only.');
      return;
    }
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const data = await apiCall('/admin/products');
      console.log('Fetched products:', data);
      setProducts(data.products || data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,  // Backend expects 'imageUrl'
        category: formData.category,
        stock: parseInt(formData.stock) || 10
      };

      console.log('Submitting product:', productData);

      if (editingId) {
        const response = await apiCall(`/admin/products/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
        console.log('Update response:', response);
        alert('Product updated successfully!');
      } else {
        const response = await apiCall('/admin/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        });
        console.log('Create response:', response);
        alert('Product added successfully!');
      }
      
      setFormData({ name: '', description: '', price: '', imageUrl: '', category: '', stock: '10' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await apiCall(`/admin/products/${id}`, { method: 'DELETE' });
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl || product.image || '',  // Handle both field names
      category: product.category || '',
      stock: product.stock?.toString() || '10'
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">This page is for administrators only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Admin Dashboard
        </motion.h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                {editingId ? '✏️ Edit Product' : '➕ Add Product'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., Diamond Ring" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full p-3 border-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:border-purple-600 outline-none transition-colors" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea 
                    placeholder="Product description..." 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    className="w-full p-3 border-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:border-purple-600 outline-none transition-colors" 
                    rows="3" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price ($) *
                  </label>
                  <input 
                    type="number" 
                    placeholder="999.99" 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: e.target.value})} 
                    className="w-full p-3 border-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:border-purple-600 outline-none transition-colors" 
                    step="0.01"
                    min="0"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stock Quantity *
                  </label>
                  <input 
                    type="number" 
                    placeholder="10" 
                    value={formData.stock} 
                    onChange={(e) => setFormData({...formData, stock: e.target.value})} 
                    className="w-full p-3 border-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:border-purple-600 outline-none transition-colors" 
                    min="0"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL *
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/image.jpg" 
                    value={formData.imageUrl} 
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} 
                    className="w-full p-3 border-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:border-purple-600 outline-none transition-colors" 
                    required 
                  />
                  {formData.imageUrl && (
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="mt-2 w-full h-32 object-cover rounded-lg" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.error('Invalid image URL');
                      }} 
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., Rings, Necklaces, Earrings" 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})} 
                    className="w-full p-3 border-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:border-purple-600 outline-none transition-colors"
                    required 
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Saving...' : (editingId ? 'Update Product' : 'Add Product')}
                  </motion.button>
                  {editingId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingId(null); 
                        setFormData({ name: '', description: '', price: '', imageUrl: '', category: '', stock: '10' });
                      }} 
                      className="px-6 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Products List */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center justify-between">
                <span>📦 Product Inventory</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {products.length} products
                </span>
              </h2>
              
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No products yet. Add your first product!</p>
                  </div>
                ) : (
                  products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 border-2 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-purple-400 dark:hover:border-purple-600 transition-all"
                    >
                      <img 
                        src={product.imageUrl || product.image} 
                        alt={product.name} 
                        className="w-24 h-24 object-cover rounded-lg shadow-md" 
                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop'}
                      />
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg dark:text-white">{product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-1">{product.description}</p>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-purple-600 dark:text-amber-400 text-lg">
                            ${product.price?.toLocaleString()}
                          </span>
                          {product.category && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                              {product.category}
                            </span>
                          )}
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                            Stock: {product.stock || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(product)} 
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          ✏️ Edit
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(product._id)} 
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          🗑️ Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}