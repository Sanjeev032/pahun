import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    Settings,
    LogOut
} from 'lucide-react';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { title: 'Overview', icon: LayoutDashboard, path: '/admin' },
        { title: 'Products', icon: Package, path: '/admin/products' },
        { title: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
        { title: 'Customers', icon: Users, path: '/admin/customers' },
        { title: 'Management', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0">
            <div className="p-10 border-b border-gray-50">
                <Link to="/" className="group">
                    <h1 className="text-2xl tracking-[0.3em] font-light">PAHUNN</h1>
                    <p className="text-[8px] tracking-[.5em] text-luxury-gold uppercase mt-2 font-bold">Headquarters</p>
                </Link>
            </div>

            <nav className="flex-1 p-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.title}
                            to={item.path}
                            className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 group ${isActive
                                ? 'bg-luxury-black text-white shadow-lg shadow-black/5'
                                : 'text-gray-400 hover:text-luxury-black hover:bg-gray-50'
                                }`}
                        >
                            <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{item.title}</span>
                            {isActive && <div className="ml-auto w-1 h-1 bg-luxury-gold rounded-full" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-8 border-t border-gray-50">
                <button className="flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-red-500 transition-colors w-full uppercase tracking-widest text-[9px] font-bold">
                    <LogOut size={18} strokeWidth={1.5} />
                    System Exit
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
