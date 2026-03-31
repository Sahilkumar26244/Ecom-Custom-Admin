import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-stone-200 sticky top-0 z-10">
      <h1 className="text-xl font-bold text-stone-900">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-stone-500 hover:bg-stone-50 rounded-full transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 text-stone-500 hover:bg-stone-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center border border-indigo-200 overflow-hidden cursor-pointer">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
