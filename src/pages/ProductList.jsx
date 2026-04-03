import React, { useState, useEffect } from 'react';
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
import { toast } from 'react-hot-toast';
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        const fetchedArray = Array.isArray(data) ? data : data.products || [];
        const normalizedArray = fetchedArray.map(p => ({...p, id: p.id || p._id}));
        setProducts(normalizedArray.reverse());
      } catch (err) {
        setError(err.message || 'Failed to load products');
        // Optionally fall back to initial products
        setProducts([...initialProducts].reverse());
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleSelectItem = (id) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
  };

  // toggleSelectAll moved below

  const handleDeleteSingle = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        
        setProducts(prev => prev.filter(p => p.id !== id));
        const newSelection = new Set(selectedItems);
        newSelection.delete(id);
        setSelectedItems(newSelection);
        toast.success('Product deleted successfully');
      } catch (err) {
        setError(err.message || 'Failed to delete product');
        toast.error('Failed to delete product');
      }
    }
  };

  const handleDeleteMultiple = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedItems.size} products?`)) {
      try {
        const token = localStorage.getItem('token');
        const deletePromises = Array.from(selectedItems).map(id => 
          fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then(res => {
            if (!res.ok) throw new Error('Failed to delete a product');
          })
        );
        
        await Promise.all(deletePromises);
        
        setProducts(prev => prev.filter(p => !selectedItems.has(p.id)));
        setSelectedItems(new Set());
        toast.success(`${selectedItems.size} products deleted successfully`);
      } catch (err) {
        setError(err.message || 'Failed to delete some products');
        toast.error('Failed to delete some products');
      }
    }
  };

  const handleSaveProduct = (productData) => {
    const actualProduct = productData.product || productData.data || productData;
    if (editingProduct) {
      // Update existing
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...actualProduct, price: parseFloat(actualProduct.price) || 0, stock: parseInt(actualProduct.stock) || 0 }
          : p
      ));
    } else {
      // Add new
      const newId = actualProduct._id || actualProduct.id || (products.length > 0 ? Math.max(0, ...products.map(p => p.id || 0)) + 1 : 1);
      const newProduct = {
        ...actualProduct,
        id: newId,
        price: parseFloat(actualProduct.price) || 0,
        stock: parseInt(actualProduct.stock) || 0,
        image: actualProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
        images: actualProduct.images?.length > 0 ? actualProduct.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop']
      };
      setProducts([newProduct, ...products]);
    }
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [products.length, currentPage, totalPages]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const toggleSelectAll = () => {
    const currentProductIds = currentProducts.map(p => p.id);
    const allCurrentSelected = currentProductIds.every(id => selectedItems.has(id));
    
    const newSelection = new Set(selectedItems);
    if (allCurrentSelected && currentProductIds.length > 0) {
      currentProductIds.forEach(id => newSelection.delete(id));
    } else {
      currentProductIds.forEach(id => newSelection.add(id));
    }
    setSelectedItems(newSelection);
  };

  const isAllSelected = currentProducts.length > 0 && currentProducts.every(p => selectedItems.has(p.id));

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <AdminLayout title="Products">
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        {/* Error Alert */}
        {error && (
          <div className="p-6 bg-red-50 border-b border-red-200">
            <div className="flex items-center justify-between">
              <p className="text-red-700 font-medium">{error}</p>
              <button 
                onClick={() => setError('')}
                className="text-red-500 hover:text-red-700 text-lg"
              >
                ×
              </button>
            </div>
          </div>
        )}

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
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block">
                <div className="animate-spin mb-4">
                  <div className="h-8 w-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
                </div>
                <p className="text-stone-600 font-medium">Loading products...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-stone-400 font-medium">No products found</p>
            </div>
          ) : (
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
              {currentProducts.map((product) => {
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
          )}
        </div>

        {/* Pagination */}
        {products.length > itemsPerPage && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-stone-100 font-jost">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center space-x-2 px-4 py-2 border border-stone-200 rounded-xl transition-colors ${
                currentPage === 1 
                  ? 'text-stone-400 bg-stone-50 cursor-not-allowed' 
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <ChevronLeft size={18} />
              <span className="text-sm font-medium">Previous</span>
            </button>
            
            <div className="flex items-center space-x-2">
              {getPageNumbers().map((page, idx) => (
                <button 
                  key={idx}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                    page === currentPage 
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                      : page === '...'
                        ? 'text-stone-400 cursor-default'
                        : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-2 px-4 py-2 border border-stone-200 rounded-xl transition-colors ${
                currentPage === totalPages 
                  ? 'text-stone-400 bg-stone-50 cursor-not-allowed' 
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
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
