import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { INVENTORY_DATA } from '../../data/adminMockData';
import AdminTable from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-gray-900">Product Collection</h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.5em] mt-2">Inventory Management</p>
        </div>
        <Button variant="luxury" size="sm" className="gap-2">
          <Plus size={14} />
          Add Piece
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="SEARCH PIECES..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-[10px] uppercase tracking-widest outline-none focus:bg-white focus:ring-1 focus:ring-black/5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <AdminTable 
          columns={['Piece', 'Category', 'Stock', 'Sold', 'Status', 'Actions']}
          data={INVENTORY_DATA}
          renderRow={(item, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
              <td className="px-8 py-5 text-[10px] font-bold text-gray-900 uppercase tracking-wide">{item.name}</td>
              <td className="px-8 py-5 text-[10px] text-gray-500 font-medium">{item.category}</td>
              <td className="px-8 py-5 text-[10px] text-gray-900 font-bold">{item.stock}</td>
              <td className="px-8 py-5 text-[10px] text-gray-500">{item.sold}</td>
              <td className="px-8 py-5">
                <span className={`px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                  item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 
                  item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-8 py-5">
                <div className="flex gap-4">
                  <button className="text-gray-400 hover:text-black transition-colors"><Edit2 size={14} /></button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default Products;
