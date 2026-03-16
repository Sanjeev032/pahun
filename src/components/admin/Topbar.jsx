import React from 'react';
import { Search, Bell, Menu, User, ChevronDown } from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="max-w-md w-full relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search analytics, orders..."
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold/40 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all relative">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

        <button className="flex items-center gap-3 p-1.5 hover:bg-gray-100 rounded-xl transition-all group border border-transparent hover:border-gray-200">
          <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-black/10">
            AD
          </div>
          <div className="hidden sm:block text-left pr-2">
            <p className="text-xs font-bold text-gray-900 group-hover:text-luxury-gold transition-colors">Admin Deputy</p>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Director</p>
          </div>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
