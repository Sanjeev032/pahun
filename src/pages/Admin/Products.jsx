import React from 'react';
import { Edit2, Trash2, Plus, Search, Filter } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import LuxuryImage from '../../components/common/LuxuryImage';

const ProductManagement = () => {
    const stockData = [
        { id: 1, name: 'Silk Drape Gown', sku: 'PHN-2024-SD01', price: '₹85,000', stock: 2, category: 'Couture', status: 'Low Stock' },
        { id: 2, name: 'Satin Blazer', sku: 'PHN-2024-SB05', price: '₹42,500', stock: 15, category: 'Tailoring', status: 'In Stock' },
        { id: 3, name: 'Velvet Clutch', sku: 'PHN-2024-VC12', price: '₹18,900', stock: 8, category: 'Accessories', status: 'In Stock' },
        { id: 4, name: 'Ivory Silk Shirt', sku: 'PHN-2024-IS02', price: '₹15,000', stock: 0, category: 'Tailoring', status: 'Out of Stock' },
    ];

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-light tracking-extra uppercase mb-2">Inventory Management</h1>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage your designer collections and stock levels</p>
                </div>
                <button className="luxury-button flex items-center gap-3">
                    <Plus size={16} /> Add New Piece
                </button>
            </header>

            {/* Filters */}
            <div className="bg-white p-6 border border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search by SKU, Name or Category..."
                        className="w-full pl-12 pr-4 py-3 text-[10px] uppercase tracking-widest border border-gray-100 focus:outline-none focus:border-luxury-gold bg-gray-50/30"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center gap-3 px-6 py-3 border border-gray-100 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black hover:border-black transition-all">
                        <Filter size={14} /> Filter
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-3 border border-gray-100 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Product Table */}
            <AdminTable
                columns={[
                    { label: 'Inventory Item' },
                    { label: 'SKU Number' },
                    { label: 'Stock Status' },
                    { label: 'Price' },
                    { label: 'Actions' }
                ]}
                data={stockData}
                renderRow={(item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-luxury-ivory/20 transition-colors group">
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-16 bg-gray-50 overflow-hidden border border-gray-100">
                                    <LuxuryImage src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=100&auto=format&fit=crop" alt="" className="w-full h-full" />
                                </div>
                                <div className="">
                                    <h4 className="text-[11px] font-bold tracking-widest uppercase mb-1">{item.name}</h4>
                                    <p className="text-[9px] text-luxury-gold uppercase tracking-widest font-semibold">{item.category}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-[10px] font-mono tracking-widest text-gray-500">{item.sku}</td>
                        <td className="px-8 py-6">
                            <div className="flex flex-col gap-1.5">
                                <span className={`text-[8px] uppercase tracking-widest font-bold ${item.status === 'Low Stock' ? 'text-orange-500' :
                                    item.status === 'Out of Stock' ? 'text-red-500' : 'text-green-600'
                                    }`}>
                                    {item.status} ({item.stock})
                                </span>
                                <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${item.stock < 5 ? 'bg-orange-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${Math.min((item.stock / 20) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold tracking-tight">{item.price}</td>
                        <td className="px-8 py-6">
                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-gray-400 hover:text-luxury-black transition-colors"><Edit2 size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

export default ProductManagement;
