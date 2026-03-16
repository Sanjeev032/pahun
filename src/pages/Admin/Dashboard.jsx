import React from 'react';
import StatCard from '../../components/admin/StatCard';
import MinimalTable from '../../components/admin/MinimalTable';
import QuickActions from '../../components/admin/QuickActions';
import { StockOverviewChart } from '../../components/charts/DashboardCharts';
import { STATS_DATA, INVENTORY_DATA, RECENT_ORDERS, STOCK_DISTRIBUTION } from '../../data/adminMockData';

const Dashboard = () => {
  // Memoize data limits for high performance
  const displayInventory = React.useMemo(() => INVENTORY_DATA.slice(0, 5), []);
  const displayOrders = React.useMemo(() => RECENT_ORDERS.slice(0, 5), []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-gray-900">Workspace Overview</h1>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.5em] mt-2">Executive Dashboard</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Area (Left 8/12) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Inventory Table */}
          <MinimalTable 
            title="Operational Inventory"
            columns={['Product', 'Category', 'Stock', 'Sold', 'Status']}
            data={displayInventory}
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
              </tr>
            )}
          />

          {/* Recent Orders Table */}
          <MinimalTable 
            title="Latest Transactions"
            columns={['ID', 'Product', 'Qty', 'Price', 'Status']}
            data={displayOrders}
            renderRow={(order, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                <td className="px-8 py-5 text-[9px] font-mono text-gray-400">{order.id}</td>
                <td className="px-8 py-5 text-[10px] font-bold text-gray-900 uppercase tracking-wide">{order.product}</td>
                <td className="px-8 py-5 text-[10px] text-gray-500">{order.quantity}</td>
                <td className="px-8 py-5 text-[10px] font-bold text-gray-900">{order.price}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            )}
          />
        </div>

        {/* Sidebar Area (Right 4/12) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Pie Chart Section - Lazy loaded via DashboardCharts */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-bold text-gray-900 mb-8 uppercase tracking-[0.3em]">Stock Balance</h3>
            <div className="h-64">
              <StockOverviewChart data={STOCK_DISTRIBUTION} />
            </div>
          </div>

          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
