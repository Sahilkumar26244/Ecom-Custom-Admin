import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ChevronDown, 
  ChevronUp, 
  ShoppingCart, 
  Users, 
  BarChart2, 
  Bell, 
  Settings,
  Infinity,
  LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { 
      name: 'Products', 
      icon: <Package size={20} />, 
      path: '/products',
      hasSubmenu: true,
      isOpen: isProductsOpen,
      toggle: () => setIsProductsOpen(!isProductsOpen),
      submenu: [
        { name: 'Product List', path: '/products' },
        { name: 'Categories', path: '/categories' }
      ]
    },
    { name: 'Sales', icon: <ShoppingCart size={20} />, path: '/sales' },
    { name: 'Customers', icon: <Users size={20} />, path: '/customers' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-stone-200 flex flex-col py-6">
      {/* Logo */}
      <div className="px-6 mb-10 flex items-center space-x-2">
        <div className="text-indigo-600 flex items-center">
          <Infinity size={32} strokeWidth={2.5} />
        </div>
        <span className="text-2xl font-bold text-[#1F1F1F]">Spodut</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <div key={item.name}>
            {item.hasSubmenu ? (
              <div>
                <button
                  onClick={item.toggle}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                    location.pathname.startsWith(item.path) 
                      ? 'text-indigo-600 bg-indigo-50/50' 
                      : 'text-stone-500 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {item.isOpen && (
                  <div className="mt-1 ml-9 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          location.pathname === subItem.path
                            ? 'text-indigo-600 bg-indigo-50'
                            : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors ${
                  location.pathname === item.path
                    ? 'text-indigo-600 bg-indigo-50/50'
                    : 'text-stone-500 hover:bg-stone-50'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 mt-auto border-t border-stone-200 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
