import React from 'react';
import { MoreHorizontal, ExternalLink } from 'lucide-react';

const OrdersTable = ({ orders }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'in transit':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
      <div className="p-6 lg:p-8 flex justify-between items-center border-b border-gray-50">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Orders</h3>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Latest transactions from customers</p>
        </div>
        <button className="text-xs font-bold text-luxury-gold hover:underline uppercase tracking-widest flex items-center gap-2">
          View All <ExternalLink size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Qty</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Time</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img 
                      src={order.image} 
                      alt={order.product}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm bg-gray-100"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-luxury-gold transition-colors">{order.product}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{order.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-gray-700">{order.customer}</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="text-sm text-gray-500">{order.quantity}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-bold text-gray-900">{order.price}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs text-gray-400 font-medium">{order.time}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
