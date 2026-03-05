import React from 'react';
import {
    Users,
    ShoppingBag,
    CreditCard,
    TrendingUp,
    AlertTriangle
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import StatsCard from '../../components/admin/StatsCard';
import AdminTable from '../../components/admin/AdminTable';

const data = [
    { month: 'Sep', revenue: 45000 },
    { month: 'Oct', revenue: 52000 },
    { month: 'Nov', revenue: 48000 },
    { month: 'Dec', revenue: 61000 },
    { month: 'Jan', revenue: 55000 },
    { month: 'Feb', revenue: 67000 },
];

const AdminDashboard = () => {
    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-3xl font-light tracking-extra uppercase mb-2">MEMBER ATELIER ARCHIVE</h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Operational Intelligence & Sales Analytics</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Revenue" value="₹2,45,000" icon={CreditCard} change="+12.5%" isPositive={true} />
                <StatsCard title="Total Orders" value="1,240" icon={ShoppingBag} change="+8.2%" isPositive={true} />
                <StatsCard title="Active Customers" value="892" icon={Users} change="+5.1%" isPositive={true} />
                <StatsCard title="Average Order" value="₹12,400" icon={TrendingUp} change="-2.4%" isPositive={false} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 border border-gray-100 shadow-sm">
                    <h4 className="text-xs uppercase tracking-extra font-bold mb-8">Revenue Performance</h4>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C5A039" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#C5A039" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#A0A0A0' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#A0A0A0' }} />
                                <Tooltip
                                    contentStyle={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '0' }}
                                    labelStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#C5A039" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-luxury-black text-white p-8 overflow-hidden relative">
                    <AlertTriangle className="absolute -top-10 -right-10 text-white/5" size={200} />
                    <h4 className="text-xs uppercase tracking-extra font-bold mb-8 text-luxury-gold">Stock Alerts</h4>
                    <div className="space-y-6 relative z-10">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4 items-center pb-6 border-b border-white/10 last:border-0 last:pb-0">
                                <div className="w-12 h-12 bg-white/5 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=100&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h5 className="text-[10px] uppercase font-bold tracking-widest mb-1">Silk Drape Gown</h5>
                                    <p className="text-[9px] text-white/40 uppercase tracking-widest">Only 2 units remaining</p>
                                </div>
                                <button className="ml-auto text-[9px] uppercase tracking-widest text-luxury-gold hover:text-white transition-colors underline">Restock</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <AdminTable
                title="Recent Fulfillment Orders"
                actionLabel="View Archive"
                columns={[
                    { label: 'Order ID' },
                    { label: 'Member' },
                    { label: 'Total Price' },
                    { label: 'Status' },
                    { label: 'Actions' }
                ]}
                data={[1, 2, 3, 4]}
                renderRow={(item) => (
                    <tr key={item} className="border-b border-gray-50 hover:bg-luxury-ivory/30 transition-colors">
                        <td className="px-8 py-6 text-[10px] font-bold tracking-widest">#PH-1029{item}</td>
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] uppercase font-bold text-luxury-gold">AS</div>
                                <span className="text-[11px] font-medium text-gray-700">Arjun Singh</span>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold tracking-tight text-gray-900">₹45,000</td>
                        <td className="px-8 py-6">
                            <span className="text-[8px] uppercase tracking-widest px-3 py-1 rounded-full bg-luxury-gold/10 text-luxury-gold font-bold">In Transit</span>
                        </td>
                        <td className="px-8 py-6">
                            <button className="text-[9px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors">Details</button>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

export default AdminDashboard;
