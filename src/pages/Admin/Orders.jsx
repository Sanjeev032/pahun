import React from 'react';
import { Filter, Download } from 'lucide-react';
import { RECENT_ORDERS } from '../../data/adminMockData';
import AdminTable from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';

const Orders = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-gray-900">Order Ledger</h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.5em] mt-2">Transaction History</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download size={14} />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-[9px]">All Orders</Button>
            <Button variant="ghost" size="sm" className="text-[9px] text-gray-400">Pending</Button>
            <Button variant="ghost" size="sm" className="text-[9px] text-gray-400">Completed</Button>
          </div>
          <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-600 hover:text-black">
            <Filter size={14} />
            Filter
          </button>
        </div>

        <AdminTable 
          columns={['Order ID', 'Piece', 'Quantity', 'Price', 'Status', 'Date']}
          data={RECENT_ORDERS}
          renderRow={(order, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
              <td className="px-8 py-5 text-[9px] font-mono text-gray-400">{order.id}</td>
              <td className="px-8 py-5 text-[10px] font-bold text-gray-900 uppercase tracking-wide">{order.product}</td>
              <td className="px-8 py-5 text-[10px] text-gray-500 font-medium">{order.quantity}</td>
              <td className="px-8 py-5 text-[10px] font-bold text-gray-900">{order.price}</td>
              <td className="px-8 py-5">
                <span className={`px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                  order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-8 py-5 text-[10px] text-gray-400 uppercase tracking-wide font-medium">{order.time}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default Orders;
