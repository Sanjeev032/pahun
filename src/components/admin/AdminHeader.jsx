import React from 'react';
import { Bell } from 'lucide-react';
import { ADMIN_INFO } from '../../utils/constants';

const AdminHeader = () => {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-50 px-12 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                <span>{ADMIN_INFO.BRANCH}</span>
                <span className="text-gray-200">/</span>
                <span className="text-luxury-black">Operational View</span>
            </div>
            <div className="flex items-center gap-8">
                <div className="relative cursor-pointer group">
                    <Bell size={18} strokeWidth={1.5} />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-luxury-gold rounded-full border-2 border-white" />
                </div>
                <div className="h-8 w-[1px] bg-gray-100" />
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="text-right">
                        <p className="text-[10px] font-bold tracking-widest uppercase">{ADMIN_INFO.NAME}</p>
                        <p className="text-[8px] text-luxury-gold tracking-widest uppercase font-bold">{ADMIN_INFO.ROLE}</p>
                    </div>
                    <div className="w-10 h-10 border border-gray-200 p-0.5 group-hover:border-luxury-gold transition-colors">
                        <div className="w-full h-full bg-gray-100" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
