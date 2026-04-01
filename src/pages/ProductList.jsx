import React, { useState } from 'react';
import { 
  Filter, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Search,
  Pencil,
  Trash2
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import AddProductModal from '../components/AddProductModal';

const initialProducts = [
  { id: 1, name: 'T-Shirt', category: 'Women Cloths', price: 79.80, stock: 79, status: 'Scheduled', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop' },
  { id: 2, name: 'Shirt', category: 'Man Clots', price: 76.89, stock: 86, status: 'Active', image: 'https://images.unsplash.com/photo-1596755094514-f87034a264c6?w=80&h=80&fit=crop' },
  { id: 3, name: 'Pant', category: 'Kid Cloths', price: 86.65, stock: 74, status: 'Draft', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=80&h=80&fit=crop' },
  { id: 4, name: 'Sweater', category: 'Man Cloths', price: 56.07, stock: 69, status: 'Active', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&h=80&fit=crop' },
  { id: 5, name: 'Sweater', category: 'Man Cloths', price: 56.07, stock: 69, status: 'Scheduled', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=80&h=80&fit=crop' },
  { id: 6, name: 'Light Jacket', category: 'Women Cloths', price: 36.00, stock: 65, status: 'Draft', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80&h=80&fit=crop' },
  { id: 7, name: 'Half Shirt', category: 'Man Clots', price: 46.78, stock: 58, status: 'Active', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=80&h=80&fit=crop' },
  { id: 8, name: 'Half Shirt', category: 'Sweater', price: 46.78, stock: 58, status: 'Active', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=80&h=80&fit=crop' },
  { id: 9, name: 'Half Shirt', category: 'Man Cloths', price: 46.78, stock: 58, status: 'Scheduled', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop' },
  { id: 10, name: 'Half Shirt', category: 'Kid', price: 46.78, stock: 58, status: 'Active', image: 'https://images.unsplash.com/photo-1519273085735-3f3765518bf3?w=80&h=80&fit=crop' },
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [editingProduct, setEditingProduct] = useState(null);

  const toggleSelectItem = (id) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === products.length && products.length > 0) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(products.map(p => p.id)));
    }
  };

  const handleDeleteSingle = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      const newSelection = new Set(selectedItems);
      newSelection.delete(id);
      setSelectedItems(newSelection);
    }
  };

  const handleDeleteMultiple = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedItems.size} products?`)) {
      setProducts(products.filter(p => !selectedItems.has(p.id)));
      setSelectedItems(new Set());
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, price: parseFloat(productData.price) || 0, stock: parseInt(productData.stock) || 0 }
          : p
      ));
    } else {
      // Add new
      const newProduct = {
        ...productData,
        id: Math.max(0, ...products.map(p => p.id)) + 1,
        price: parseFloat(productData.price) || 0,
        stock: parseInt(productData.stock) || 0,
        image: productData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
        images: productData.images?.length > 0 ? productData.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop']
      };
      setProducts([newProduct, ...products]);
    }
  };

  const isAllSelected = products.length > 0 && selectedItems.size === products.length;

  return (
    <AdminLayout title="Products">
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        {/* Table Header Controls */}
        <div className="p-6 flex items-center justify-between border-b border-stone-100">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold text-stone-900">Products list</h2>
            {selectedItems.size > 0 && (
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                  {selectedItems.size} Selected
                </span>
                <button 
                  onClick={handleDeleteMultiple}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full text-xs font-bold transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors">
              <Filter size={18} />
              <span className="text-sm font-medium">Filter</span>
            </button>
            <button className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors text-sm font-medium">
              See All
            </button>
            <button 
              onClick={() => {
                setEditingProduct(null);
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span className="text-sm font-medium">Add Product</span>
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/50 text-stone-400 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-stone-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                  />
                </th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => {
                const isSelected = selectedItems.has(product.id);
                return (
                  <tr 
                    key={product.id} 
                    className={`transition-colors group ${isSelected ? 'bg-indigo-50/30' : 'hover:bg-stone-50/30'}`}
                  >
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => toggleSelectItem(product.id)}
                        className="rounded border-stone-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-stone-900 font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-stone-500 text-sm">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-stone-900 font-semibold">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-stone-500 text-sm">{product.stock}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex items-center justify-end space-x-3 ${isSelected ? '' : 'opacity-40 group-hover:opacity-100 transition-all'}`}>
                        <button 
                          onClick={() => {
                            setEditingProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-indigo-100 transition-all"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteSingle(product.id)}
                          className="p-2 text-stone-400 hover:text-red-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-red-100 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-stone-100 font-jost">
          <button className="flex items-center space-x-2 px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors">
            <ChevronLeft size={18} />
            <span className="text-sm font-medium">Previous</span>
          </button>
          
          <div className="flex items-center space-x-2">
            {[1, 2, 3, '...', 8, 9, 10].map((page, idx) => (
              <button 
                key={idx}
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                  page === 1 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                    : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <div className="w-[100px]"></div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }} 
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </AdminLayout>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-green-50 text-green-600 border-green-100',
    Scheduled: 'bg-blue-50 text-blue-600 border-blue-100',
    Draft: 'bg-orange-50 text-orange-600 border-orange-100',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default ProductList;
