import React, { useState, useEffect, useCallback } from 'react';
import { X, Upload, Plus, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AddProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Women Cloths',
    stock: '',
    status: 'Active',
    description: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || 'Women Cloths',
        stock: product.stock || '',
        status: product.status || 'Active',
        description: product.description || ''
      });
      setImages(product.images || (product.image ? [product.image] : []));
      setImageFiles([]);
    } else {
      setFormData({
        name: '',
        price: '',
        category: 'Women Cloths',
        stock: '',
        status: 'Active',
        description: ''
      });
      setImages([]);
      setImageFiles([]);
    }
    setError('');
  }, [product, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.stock || !formData.description || !formData.category) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Prepare data as JSON
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        status: formData.status,
        description: formData.description.trim()
      };

      console.log('Sending Product Data:', productData);

      // Define URL and method based on whether we are editing or creating
      const url = product ? `http://localhost:5000/api/products/${product._id || product.id}` : 'http://localhost:5000/api/products';
      const method = product ? 'PUT' : 'POST';

      // Get token from local storage
      const token = localStorage.getItem('token');

      // Send to backend with JSON
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      const result = await response.json();
      console.log('Product Created:', result);
      
      // Call onSave callback if provided
      if (onSave) {
        onSave(result);
      }

      // Show success message and close modal
      toast.success(product ? 'Product updated successfully!' : 'Product created successfully!');
      
      setFormData({
        name: '',
        price: '',
        category: 'Women Cloths',
        stock: '',
        status: 'Active',
        description: ''
      });
      setImages([]);
      setImageFiles([]);
      onClose();
    } catch (err) {
      setError(err.message || 'Error creating product. Please try again.');
      toast.error(err.message || 'Error creating product. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).slice(0, 5 - images.length);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newPreviews].slice(0, 5));
      setImageFiles(prev => [...prev, ...files].slice(0, 5));
    }
  }, [images.length]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).slice(0, 5 - images.length);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newPreviews].slice(0, 5));
      setImageFiles(prev => [...prev, ...files].slice(0, 5));
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
    setImageFiles(imageFiles.filter((_, idx) => idx !== indexToRemove));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-900">{product ? 'Update Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Minimalist T-Shirt"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-stone-300"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Category</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all appearance-none bg-white cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Women Cloths</option>
                  <option>Man Cloths</option>
                  <option>Kid Cloths</option>
                  <option>Accessories</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              {/* Stock Availability */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Stock Availability</label>
                <input 
                  type="number" 
                  placeholder="e.g. 100"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Status</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all appearance-none bg-white cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option>Active</option>
                <option>Scheduled</option>
                <option>Draft</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Description</label>
              <textarea 
                rows="4"
                placeholder="Product description goes here..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-stone-700">Product Images</label>
                <span className="text-xs text-stone-500 font-medium">{images.length}/5 Images</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-stone-200 shadow-sm group">
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm shadow-sm rounded-lg text-red-500 hover:text-red-700 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                    {idx === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-indigo-600/90 text-white text-[10px] font-bold text-center py-1 backdrop-blur-sm">
                        Primary
                      </div>
                    )}
                  </div>
                ))}
                
                {images.length < 5 && (
                  <div 
                    className={`relative aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      dragActive ? 'border-indigo-500 bg-indigo-50/30' : 'border-stone-200 hover:border-indigo-300 hover:bg-stone-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="p-3 bg-indigo-50 rounded-xl text-indigo-500 mb-2">
                      <Plus size={24} />
                    </div>
                    <p className="text-xs font-bold text-stone-600 text-center px-2">Add Image</p>
                    <input 
                      type="file" 
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex items-center justify-end space-x-4">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl font-bold text-stone-500 hover:bg-stone-200 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="product-form"
            disabled={isLoading}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : (product ? 'Save Changes' : 'Add Product')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
