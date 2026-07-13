import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { apiCall, apiUpload } from '../Cart/AuthContext';
import { useAuth } from '../Cart/AuthContext';
import { getPrimaryProductImage, getProductImages, sortImagesWithUploadsFirst, resolveImageUrl } from '../../utils/productImages';
import ProductImage from '../ui/ProductImage';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  images: [],
  category: '',
  stock: '10',
};

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (user?.role === 'admin') {
      fetchProducts();
    }
  }, [user, authLoading]);

  const fetchProducts = async () => {
    try {
      const data = await apiCall('/admin/products');
      setProducts(data.products || data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const body = new FormData();
      files.forEach((file) => body.append('images', file));
      const data = await apiUpload('/admin/upload-images', body);
      const newUrls = data.urls || [];
      setFormData((prev) => {
        const merged = sortImagesWithUploadsFirst([...newUrls, ...prev.images]);
        const unique = merged.filter((url, i, arr) => arr.indexOf(url) === i);
        return { ...prev, images: unique };
      });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images: ' + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const addImageFromUrl = () => {
    const url = formData.imageUrl.trim();
    if (!url) {
      alert('Enter an image URL first');
      return;
    }
    if (formData.images.includes(url)) {
      alert('This image is already added');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url],
      imageUrl: '',
    }));
  };

  const setAsCover = (index) => {
    if (index <= 0) return;
    setFormData((prev) => {
      const images = [...prev.images];
      const [picked] = images.splice(index, 1);
      images.unshift(picked);
      return { ...prev, images };
    });
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const images = prev.images.filter((_, i) => i !== index);
      return { ...prev, images, imageUrl: images[0] || '' };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.images.length) {
      alert('Please add at least one image (upload from PC or paste a URL).');
      return;
    }

    const images = sortImagesWithUploadsFirst(
      formData.images.filter((url, i, arr) => arr.indexOf(url) === i)
    );
    const imagePayloadSize = images.reduce((sum, url) => sum + (url?.length || 0), 0);
    if (imagePayloadSize > 14 * 1024 * 1024) {
      alert(
        'Images are too large to save. Use fewer photos or smaller files (under 2MB each).'
      );
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock, 10) || 10,
        images,
        imageUrl: images[0],
        image: images[0],
      };

      if (editingId) {
        await apiCall(`/admin/products/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
        alert('Product updated successfully!');
      } else {
        await apiCall('/admin/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        });
        alert('Product added successfully!');
      }

      resetForm();
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
    const images = sortImagesWithUploadsFirst(getProductImages(product));
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: '',
      images,
      category: product.category || '',
      stock: product.stock?.toString() || '10',
    });
    setEditingId(product._id);
    if (fileInputRef.current) fileInputRef.current.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (authLoading) {
    return (
      <div className="mj-page min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border border-stone-300 border-t-amber-800 rounded-full animate-spin" />
          <p className="mt-4 text-sm text-stone-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="mj-page min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="mj-panel max-w-md w-full p-10 text-center">
          <h1 className="text-2xl mj-section-title mb-3 text-red-800 dark:text-red-400">Access denied</h1>
          <p className="mj-body-muted text-sm">
            This page is for administrators only.
          </p>
        </div>
      </div>
    );
  }

  const labelClass = 'block text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-800 dark:text-stone-400 mb-2';

  return (
    <div className="mj-page min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="mj-eyebrow mb-3">Operations</p>
          <h1 className="text-4xl md:text-5xl mj-section-title">Admin dashboard</h1>
          <p className="mt-3 mj-body-muted text-sm max-w-lg mx-auto">
            Manage catalogue, pricing, and inventory — upload multiple photos from your computer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="mj-panel sticky top-24 max-h-[calc(100vh-7rem)] flex flex-col overflow-hidden p-6">
              <h2 className="text-xl mj-section-title mb-1 shrink-0">
                {editingId ? 'Edit product' : 'Add product'}
              </h2>
              <p className="text-xs text-stone-700 dark:text-stone-500 mb-5 shrink-0">
                {editingId ? 'Update details below, then save.' : 'Fill in all fields and add product images.'}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="space-y-4 overflow-y-auto overscroll-contain flex-1 min-h-0 pr-1 -mr-1">
                  <div>
                    <label className={labelClass}>Product name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Diamond ring"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mj-input py-3"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Description *</label>
                    <textarea
                      placeholder="Product description…"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mj-input py-3 min-h-[100px] resize-y"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Price (₹) *</label>
                    <input
                      type="number"
                      placeholder="999.99"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mj-input py-3"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Stock quantity *</label>
                    <input
                      type="number"
                      placeholder="10"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="mj-input py-3"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Product images *</label>
                    <p className="text-xs text-stone-600 dark:text-stone-500 mb-3 font-light">
                      Upload from your PC (JPEG, PNG, WebP, GIF — up to 8 images, 2MB each). Images are stored in the database and work after deploy.
                    </p>

                    {formData.images.some((u) => u.startsWith('/uploads/') || u.includes('localhost')) ? (
                      <p className="mb-3 text-xs text-amber-900 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 ring-1 ring-amber-200 dark:ring-amber-900/50 rounded-lg px-3 py-2 leading-relaxed">
                        Some images use old file links that break on the live site. Remove them (×), re-upload from your PC, then save.
                      </p>
                    ) : null}

                    <label className="flex flex-col items-center justify-center w-full py-8 px-4 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg cursor-pointer hover:border-amber-800 dark:hover:border-amber-500 hover:bg-stone-50 dark:hover:bg-slate-800/50 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                      <svg className="w-8 h-8 text-stone-400 dark:text-stone-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-stone-700 dark:text-stone-300">
                        {uploading ? 'Uploading…' : 'Choose images from computer'}
                      </span>
                    </label>

                    <div className="mt-3 flex gap-2">
                      <input
                        type="url"
                        placeholder="Or paste image URL…"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="mj-input py-2.5 flex-1 text-sm"
                      />
                      <button
                        type="button"
                        onClick={addImageFromUrl}
                        className="shrink-0 px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] font-medium ring-1 ring-stone-300 dark:ring-stone-600 hover:ring-stone-900 dark:hover:ring-stone-400 transition-colors"
                      >
                        Add URL
                      </button>
                    </div>

                    {formData.images.length > 0 ? (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {formData.images.map((url, index) => (
                          <div key={`${url}-${index}`} className="relative group">
                            <button
                              type="button"
                              onClick={() => setAsCover(index)}
                              className="w-full block text-left"
                              title={index === 0 ? 'Cover image' : 'Click to set as cover'}
                            >
                              <img
                                src={url.startsWith('data:') ? url : resolveImageUrl(url)}
                                alt={`Product ${index + 1}`}
                                className="w-full h-20 object-cover rounded-md ring-1 ring-stone-200 dark:ring-slate-700"
                                onError={(e) => {
                                  e.target.src =
                                    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop';
                                }}
                              />
                            </button>
                            {index === 0 ? (
                              <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[8px] uppercase tracking-wider bg-stone-900/90 text-white rounded">
                                Cover
                              </span>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Remove image"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-xs text-amber-900 dark:text-amber-500">
                        No images yet — upload at least one to save the product.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Category *</label>
                    <input
                      type="text"
                      placeholder="e.g., Ring, Necklace"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mj-input py-3"
                      required
                    />
                  </div>
                </div>

                <div className="shrink-0 pt-4 mt-2 border-t border-stone-200 dark:border-slate-700 bg-mj-surface dark:bg-slate-900">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={loading || uploading}
                      className="w-full sm:flex-1 mj-btn-primary py-3.5 rounded-lg text-[11px] uppercase justify-center disabled:opacity-50"
                    >
                      {loading ? 'Saving…' : editingId ? 'Update product' : 'Add product'}
                    </motion.button>
                    {editingId ? (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="w-full sm:w-auto sm:shrink-0 px-6 py-3.5 rounded-lg text-[11px] uppercase tracking-[0.15em] font-medium bg-stone-200 text-stone-800 hover:bg-stone-300 dark:bg-slate-800 dark:text-stone-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="mj-panel p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl mj-section-title">Product inventory</h2>
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-800 dark:text-stone-400">
                  {products.length} {products.length === 1 ? 'product' : 'products'}
                </span>
              </div>

              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
                {products.length === 0 ? (
                  <div className="text-center py-14 rounded-lg bg-stone-50 dark:bg-slate-800/50 ring-1 ring-stone-200/80 dark:ring-slate-700">
                    <p className="mj-body-muted text-sm">
                      No products yet. Add your first product using the form.
                    </p>
                  </div>
                ) : (
                  products.map((product, index) => {
                    const imageCount = getProductImages(product).length;
                    return (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg ring-1 ring-stone-200/90 dark:ring-slate-700 bg-mj-surface/50 dark:bg-slate-900/40 hover:ring-amber-800/25 dark:hover:ring-amber-600/30 transition-all"
                      >
                        <div className="relative shrink-0">
                          <ProductImage
                            product={product}
                            alt={product.name}
                            className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-md ring-1 ring-stone-200 dark:ring-slate-700"
                          />
                          {imageCount > 1 ? (
                            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[9px] uppercase tracking-wider bg-stone-900/85 text-white rounded">
                              +{imageCount - 1}
                            </span>
                          ) : null}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-serif font-semibold text-lg text-stone-900 dark:text-white truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-stone-700 dark:text-stone-400 line-clamp-2 mt-1">
                            {product.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <span className="font-semibold text-amber-900 dark:text-amber-400">
                              ₹{product.price?.toLocaleString('en-IN')}
                            </span>
                            {product.category ? (
                              <span className="px-2.5 py-0.5 bg-stone-200/90 dark:bg-slate-800 text-stone-800 dark:text-stone-300 text-[10px] uppercase tracking-wider rounded-full">
                                {product.category}
                              </span>
                            ) : null}
                            <span className="px-2.5 py-0.5 bg-emerald-100/90 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 text-[10px] uppercase tracking-wider rounded-full">
                              Stock {product.stock ?? 0}
                            </span>
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2 shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => handleEdit(product)}
                            className="flex-1 sm:flex-none px-4 py-2.5 mj-btn-primary rounded-lg text-[11px] uppercase justify-center"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => handleDelete(product._id)}
                            className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-[11px] uppercase font-medium bg-red-700 hover:bg-red-800 text-white transition-colors"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
