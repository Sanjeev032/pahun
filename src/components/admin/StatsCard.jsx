import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, change, isPositive }) => (
    <div className="bg-white p-6 border border-gray-100 shadow-sm flex items-start justify-between hover:border-luxury-gold transition-colors duration-500">
        <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">{title}</p>
            <h3 className="text-2xl font-light tracking-tight">{value}</h3>
            {change && (
                <div className={`mt-4 flex items-center gap-1 text-[10px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {change}
                </div>
            )}
        </div>
        <div className="p-3 bg-luxury-ivory text-luxury-gold">
            <Icon size={20} strokeWidth={1.5} />
        </div>
    </div>
);

export default StatsCard;
