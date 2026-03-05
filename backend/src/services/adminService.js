import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

/**
 * @desc    Fetch comprehensive dashboard analytics
 * @returns {Promise<Object>} Analytics summary
 */
export const fetchDashboardAnalytics = async () => {
    const totalSales = await Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ isAdmin: false });
    const totalProducts = await Product.countDocuments();

    const lowStockProducts = await Product.find({ countInStock: { $lt: 5 } }).limit(5);

    // Sales by month (last 6 months)
    const salesByMonth = await Order.aggregate([
        { $match: { isPaid: true } },
        {
            $group: {
                _id: { $month: '$paidAt' },
                revenue: { $sum: '$totalPrice' },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    return {
        summary: {
            revenue: totalSales[0]?.total || 0,
            orders: totalOrders,
            customers: totalCustomers,
            products: totalProducts,
        },
        lowStock: lowStockProducts,
        salesHistory: salesByMonth,
    };
};
