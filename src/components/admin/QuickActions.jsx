import React from 'react';
import { Plus, RefreshCw, List } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { label: 'Add Product', icon: Plus, color: 'bg-black text-white' },
    { label: 'Update Inventory', icon: RefreshCw, color: 'bg-white text-gray-700 border border-gray-100 hover:border-gray-200 shadow-sm' },
    { label: 'View Orders', icon: List, color: 'bg-white text-gray-700 border border-gray-100 hover:border-gray-200 shadow-sm' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-[10px] font-bold text-gray-900 mb-6 uppercase tracking-[0.3em]">Quick Actions</h3>
      <div className="flex flex-col gap-4">
        {actions.map((action, index) => (
          <button 
            key={index} 
            className={`flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
              action.label === 'Add Product' 
                ? 'bg-luxury-black text-white hover:bg-gray-800 shadow-lg shadow-black/5' 
                : 'bg-white text-gray-700 border border-gray-100 hover:border-luxury-gold/50 hover:text-luxury-black'
            }`}
          >
            <action.icon size={16} strokeWidth={2} />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
