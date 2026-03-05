import * as adminService from '../services/adminService.js';

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
    try {
        const analyticsData = await adminService.fetchDashboardAnalytics();
        res.json(analyticsData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics', error: error.message });
    }
};

export { getAnalytics };
