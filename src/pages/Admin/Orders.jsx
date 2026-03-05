import React from 'react';
import { Search, Filter, Eye, MoreVertical } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';

const OrderManagement = () => {
    const orders = [
        { id: '#PH-10291', customer: 'Arjun Singh', date: '24 Jan 2026', items: 3, total: '₹1,25,000', status: 'Processing', method: 'Visa **4242' },
        { id: '#PH-10292', customer: 'Meera Kapoor', date: '23 Jan 2026', items: 1, total: '₹42,500', status: 'Shipped', method: 'MasterCard **8890' },
        { id: '#PH-10293', customer: 'Vikram Malhotra', date: '22 Jan 2026', items: 2, total: '₹85,000', status: 'Delivered', method: 'UPI' },
        { id: '#PH-10294', customer: 'Priya Sharma', date: '22 Jan 2026', items: 5, total: '₹2,10,000', status: 'Pending', method: 'Amex **1001' },
    ];

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-3xl font-light tracking-extra uppercase mb-2">Order Fulfillment</h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Centralized control for all boutique transactions</p>
            </header>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-4 text-[9px] uppercase tracking-widest font-bold">
                {['All Orders', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab, i) => (
                    <button
                        key={tab}
                        className={`px-6 py-2 border ${i === 0 ? 'bg-luxury-black text-white border-luxury-black' : 'border-gray-100 text-gray-400 bg-white hover:text-black'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <AdminTable
                columns={[
                    { label: 'Order Ref' },
                    { label: 'Customer' },
                    { label: 'Fulfillment' },
                    { label: 'Total' },
                    { label: 'Method' },
                    { label: '' }
                ]}
                data={orders}
                renderRow={(order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-luxury-ivory/20 transition-colors">
                        <td className="px-8 py-6">
                            <span className="text-[11px] font-bold tracking-widest">{order.id}</span>
                            <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">{order.date}</p>
                        </td>
                        <td className="px-8 py-6">
                            <span className="text-[11px] font-medium text-gray-700">{order.customer}</span>
                        </td>
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' :
                                    order.status === 'Shipped' ? 'bg-blue-500' : 'bg-luxury-gold animate-pulse'
                                    }`} />
                                <span className="text-[9px] uppercase font-bold tracking-widest">{order.status}</span>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold tracking-tight">{order.total}</td>
                        <td className="px-8 py-6 text-[9px] uppercase tracking-widest text-gray-400">{order.method}</td>
                        <td className="px-8 py-6">
                            <div className="flex justify-end gap-6">
                                <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-luxury-gold hover:text-black transition-colors">
                                    <Eye size={14} /> Full Record
                                </button>
                                <button className="text-gray-400"><MoreVertical size={16} /></button>
                            </div>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

export default OrderManagement;
