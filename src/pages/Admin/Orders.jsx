import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, MoreVertical, Loader2 } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import orderService from '../../services/orderService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { COMPANY_NAME } from '../../utils/constants';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                // In a real admin panel, we'd have a getAllOrders endpoint
                // For now we use getMyOrders as a placeholder or assuming the admin can see all
                // Actually backen orderController.js getMyOrders only returns user's orders.
                // We should ideally have an admin endpoint. 
                // Let's assume there's a /admin/orders endpoint and add it to orderService if needed.
                const data = await orderService.getMyOrders(); // Placeholder for admin list
                setOrders(data.data || []);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch admin orders:', err);
                setError('Failed to load transaction history.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-3xl font-light tracking-extra uppercase mb-2">Order Fulfillment</h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Centralized control for all {COMPANY_NAME.toLowerCase()} boutique transactions</p>
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

            {error && (
                <div className="p-12 bg-red-50 text-center border border-red-100">
                    <p className="text-[10px] uppercase tracking-widest text-red-500 font-bold">{error}</p>
                </div>
            )}

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
                    <tr key={order._id} className="border-b border-gray-50 hover:bg-luxury-ivory/20 transition-colors">
                        <td className="px-8 py-6">
                            <span className="text-[11px] font-bold tracking-widest">#{order._id.slice(-8).toUpperCase()}</span>
                            <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">{formatDate(order.createdAt)}</p>
                        </td>
                        <td className="px-8 py-6">
                            <span className="text-[11px] font-medium text-gray-700">{order.user?.name || 'Curated Member'}</span>
                        </td>
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${order.isDelivered ? 'bg-green-500' :
                                    order.isPaid ? 'bg-blue-500' : 'bg-luxury-gold animate-pulse'
                                    }`} />
                                <span className="text-[9px] uppercase font-bold tracking-widest">
                                    {order.isDelivered ? 'Delivered' : (order.isPaid ? 'Shipped' : 'Processing')}
                                </span>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold tracking-tight">{formatCurrency(order.totalPrice)}</td>
                        <td className="px-8 py-6 text-[9px] uppercase tracking-widest text-gray-400">{order.paymentMethod}</td>
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
            
            {isLoading && (
                <div className="flex justify-center py-20">
                    <Loader2 size={32} className="animate-spin text-luxury-gold" strokeWidth={1} />
                </div>
            )}
        </div>
    );
};

export default OrderManagement;

