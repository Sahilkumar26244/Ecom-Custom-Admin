import React, { useState, useCallback } from 'react';
import { X, Upload, Plus, Image as ImageIcon } from 'lucide-react';

const AddProductModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Women Cloths',
    description: ''
  });

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(URL.createObjectURL(file));
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-900">Add New Product</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 max-h-[80vh] overflow-y-auto">
          <form className="space-y-6">
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
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              {/* Placeholder for optional field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Stock Availability</label>
                <input 
                  type="number" 
                  placeholder="e.g. 100"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
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
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Product Image</label>
              <div 
                className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all ${
                  dragActive ? 'border-indigo-500 bg-indigo-50/30' : 'border-stone-200 hover:border-indigo-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {image ? (
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-stone-100 shadow-lg">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 p-1.5 bg-white shadow-md rounded-lg text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-500 mb-4">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-stone-900 font-bold">Drag and drop image here</p>
                      <p className="text-stone-400 text-sm mt-1">or click to browse from device</p>
                    </div>
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex items-center justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-2xl font-bold text-stone-500 hover:bg-stone-200 transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
