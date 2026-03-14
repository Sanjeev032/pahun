import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Search, Filter, Loader2 } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import LuxuryImage from '../../components/common/LuxuryImage';
import productService from '../../services/productService';
import { formatCurrency } from '../../utils/formatters';
import { COMPANY_NAME } from '../../utils/constants';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const data = await productService.getProducts();
                setProducts(data.products || []);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch admin products:', err);
                setError('Failed to load inventory.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-light tracking-extra uppercase mb-2">Inventory Management</h1>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage your {COMPANY_NAME.toLowerCase()} designer collections</p>
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

            {error && (
                <div className="p-12 bg-red-50 text-center border border-red-100">
                    <p className="text-[10px] uppercase tracking-widest text-red-500 font-bold">{error}</p>
                </div>
            )}

            {/* Product Table */}
            <AdminTable
                columns={[
                    { label: 'Inventory Item' },
                    { label: 'Category' },
                    { label: 'Stock Status' },
                    { label: 'Price' },
                    { label: 'Actions' }
                ]}
                data={products}
                renderRow={(item) => (
                    <tr key={item._id} className="border-b border-gray-50 hover:bg-luxury-ivory/20 transition-colors group">
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-16 bg-gray-50 overflow-hidden border border-gray-100">
                                    <LuxuryImage src={item.image} alt={item.name} className="w-full h-full" />
                                </div>
                                <div className="">
                                    <h4 className="text-[11px] font-bold tracking-widest uppercase mb-1">{item.name}</h4>
                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">ID: {item._id.slice(-6).toUpperCase()}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-[10px] uppercase tracking-widest text-luxury-gold font-bold">{item.category}</td>
                        <td className="px-8 py-6">
                            <div className="flex flex-col gap-1.5">
                                <span className={`text-[8px] uppercase tracking-widest font-bold ${item.countInStock < 5 ? (item.countInStock === 0 ? 'text-red-500' : 'text-orange-500') : 'text-green-600'
                                    }`}>
                                    {item.countInStock === 0 ? 'Out of Stock' : (item.countInStock < 5 ? 'Low Stock' : 'In Stock')} ({item.countInStock})
                                </span>
                                <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${item.countInStock < 5 ? 'bg-orange-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${Math.min((item.countInStock / 20) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold tracking-tight">{formatCurrency(item.price)}</td>
                        <td className="px-8 py-6">
                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-gray-400 hover:text-luxury-black transition-colors"><Edit2 size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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

export default ProductManagement;

