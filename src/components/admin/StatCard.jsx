import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, amount, change, trend, color }) => {
  const isUp = trend === 'up';
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:border-gray-200">
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">{title}</p>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{amount}</h3>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
          isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
        }`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
        <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: color }}></div>
        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Active Metric</span>
      </div>
    </div>
  );
};

export default StatCard;
