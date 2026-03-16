import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Products', icon: Package, href: '/admin/products' },
  { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
  { name: 'Users', icon: Users, href: '/admin/users' },
  { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-72 bg-[#111827] text-gray-300 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-gray-800
      `}>
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center justify-between px-8 border-b border-gray-800">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-luxury-gold rounded-lg flex items-center justify-center font-bold text-black font-serif">P</div>
              <span className="text-xl font-bold tracking-wider text-white uppercase font-serif">Pahun Admin</span>
            </Link>
            <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-8">
            <ul className="space-y-2 px-4">
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                        ${isActive 
                          ? 'bg-luxury-gold text-black font-bold shadow-lg shadow-luxury-gold/20' 
                          : 'hover:bg-gray-800/50 hover:text-white'}
                      `}
                    >
                      <item.icon size={20} className={isActive ? 'text-black' : 'text-gray-400 group-hover:text-luxury-gold transition-colors'} />
                      <span className="text-sm tracking-wide">{item.name}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-black"></div>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-6 border-t border-gray-800">
            <div className="bg-gray-800/40 rounded-2xl p-4 border border-gray-700/50">
              <p className="text-xs text-gray-500 font-medium mb-1">PRO PLAN</p>
              <p className="text-sm text-white font-semibold mb-3">Pahun Enterprise</p>
              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-luxury-gold w-[75%] h-full rounded-full shadow-[0_0_8px_rgba(212,175,55,0.4)]"></div>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">75% of resources used</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
