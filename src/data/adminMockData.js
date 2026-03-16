/**
 * Mock data for the Admin Dashboard
 */

export const STATS_DATA = [
    {
        title: 'Total Revenue',
        amount: '₹12,45,600',
        change: '+12.5%',
        trend: 'up',
        color: '#10B981', // emerald
    },
    {
        title: 'Total Orders',
        amount: '1,240',
        change: '+8.2%',
        trend: 'up',
        color: '#D4AF37', // luxury-gold
    },
    {
        title: 'Total Products',
        amount: '485',
        change: '+2',
        trend: 'up',
        color: '#334155', // slate-700
    },
    {
        title: 'Low Stock Products',
        amount: '12',
        change: 'Requires Action',
        trend: 'down',
        color: '#EF4444', // red
    }
];

export const REVENUE_CHART_DATA = [
    { name: 'Jan', revenue: 450000, users: 1200 },
    { name: 'Feb', revenue: 520000, users: 1500 },
    { name: 'Mar', revenue: 480000, users: 1300 },
    { name: 'Apr', revenue: 610000, users: 1800 },
    { name: 'May', revenue: 590000, users: 1700 },
    { name: 'Jun', revenue: 750000, users: 2200 },
    { name: 'Jul', revenue: 820000, users: 2500 },
];

export const PRODUCT_SALES_DATA = [
    { name: 'Sherwani', sales: 450, stock: 20 },
    { name: 'Lehenga', sales: 380, stock: 15 },
    { name: 'Kurta Set', sales: 520, stock: 45 },
    { name: 'Saree', sales: 310, stock: 10 },
    { name: 'Tuxedo', sales: 240, stock: 8 },
];

export const CATEGORY_DATA = [
    { name: 'Men', value: 45, color: '#10B981' },
    { name: 'Women', value: 35, color: '#3B82F6' },
    { name: 'Accessories', value: 15, color: '#F59E0B' },
    { name: 'Tailoring', value: 5, color: '#8B5CF6' },
];

export const RECENT_ORDERS = [
    {
        id: '#ORD-7521',
        product: 'Royal Velvet Sherwani',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=200&auto=format&fit=crop',
        customer: 'Arjun Mehta',
        quantity: 1,
        price: '₹85,000',
        time: '2 hours ago',
        status: 'Delivered',
        statusColor: 'emerald'
    },
    {
        id: '#ORD-7522',
        product: 'Silk Banarasi Saree',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=200&auto=format&fit=crop',
        customer: 'Priya Sharma',
        quantity: 1,
        price: '₹45,000',
        time: '5 hours ago',
        status: 'Pending',
        statusColor: 'amber'
    },
    {
        id: '#ORD-7523',
        product: 'Embroidered Kurta Set',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop',
        customer: 'Rahul Singh',
        quantity: 2,
        price: '₹24,000',
        time: '8 hours ago',
        status: 'In Transit',
        statusColor: 'blue'
    },
    {
        id: '#ORD-7524',
        product: 'Tailored Tuxedo',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=200&auto=format&fit=crop',
        customer: 'Vikram Malhotra',
        quantity: 1,
        price: '₹62,000',
        time: '12 hours ago',
        status: 'Delivered',
        statusColor: 'emerald'
    }
];

export const INVENTORY_DATA = [
    { name: 'Royal Velvet Sherwani', category: 'Men', stock: 5, sold: 45, status: 'Low Stock' },
    { name: 'Silk Banarasi Saree', category: 'Women', stock: 15, sold: 38, status: 'In Stock' },
    { name: 'Embroidered Kurta Set', category: 'Men', stock: 45, sold: 52, status: 'In Stock' },
    { name: 'Tailored Tuxedo', category: 'Men', stock: 0, sold: 24, status: 'Out of Stock' },
    { name: 'Designer Accessories', category: 'Accessories', stock: 2, sold: 15, status: 'Low Stock' },
];

export const STOCK_DISTRIBUTION = [
    { name: 'Sold Products', value: 174, color: '#10B981' },
    { name: 'Remaining Stock', value: 67, color: '#F1F5F9' },
];
