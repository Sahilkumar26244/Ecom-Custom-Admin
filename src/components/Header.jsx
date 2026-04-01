import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Settings, LogOut, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const notifications = [
    { id: 1, text: "New order #1234 received", time: "5 min ago", isNew: true },
    { id: 2, text: "Payment successful for #1233", time: "1 hour ago", isNew: false },
    { id: 3, text: "Product stock running low", time: "2 hours ago", isNew: false },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-stone-200 sticky top-0 z-10">
      <h1 className="text-xl font-bold text-stone-900">{title}</h1>
      
      <div className="flex items-center space-x-4" ref={headerRef}>
        
        {/* Search Dropdown */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('search')}
            className={`p-2 text-stone-500 hover:bg-stone-50 rounded-full transition-colors ${activeDropdown === 'search' ? 'bg-stone-100' : ''}`}
          >
            <Search size={20} />
          </button>
          
          {activeDropdown === 'search' && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-stone-200 p-3 animate-in fade-in slide-in-from-top-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search products, orders..."
                  className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('notifications')}
            className={`p-2 text-stone-500 hover:bg-stone-50 rounded-full transition-colors relative ${activeDropdown === 'notifications' ? 'bg-stone-100' : ''}`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {activeDropdown === 'notifications' && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h3 className="font-bold text-stone-900">Notifications</h3>
                <span className="text-xs text-indigo-600 font-bold cursor-pointer hover:underline flex items-center">
                  <Check size={14} className="mr-1" /> Mark all read
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 border-b border-stone-50 hover:bg-stone-50 transition-colors cursor-pointer ${notif.isNew ? 'bg-indigo-50/30' : ''}`}>
                    <p className={`text-sm ${notif.isNew ? 'text-stone-900 font-bold' : 'text-stone-600 font-medium'}`}>{notif.text}</p>
                    <p className="text-xs text-stone-400 mt-1 font-medium">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-stone-100 bg-stone-50/50">
                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div 
            onClick={() => toggleDropdown('profile')}
            className={`h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center border transition-all overflow-hidden cursor-pointer ${activeDropdown === 'profile' ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-indigo-200 hover:border-indigo-300'}`}
          >
            <User size={20} />
          </div>

          {activeDropdown === 'profile' && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-top-2 py-2">
              <div className="px-4 py-3 border-b border-stone-100 mb-2">
                <p className="font-bold text-stone-900">Admin User</p>
                <p className="text-xs text-stone-500 font-medium truncate">admin@spodut.com</p>
              </div>
              
              <Link 
                to="/settings" 
                onClick={() => setActiveDropdown(null)}
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Settings size={16} className="text-stone-400" />
                <span>Profile Settings</span>
              </Link>
              
              <div className="border-t border-stone-100 my-2"></div>
              
              <button 
                onClick={() => setActiveDropdown(null)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} className="text-red-500" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
