import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from '../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Heart, Settings, LogOut, ChevronRight, Loader2 } from 'lucide-react';
import orderService from '../services/orderService';
import { formatCurrency, formatDate } from '../utils/formatters';
import { COMPANY_NAME } from '../utils/constants';

const Profile = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const data = await orderService.getMyOrders();
                setOrders(data.data || []);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setError('Could not retrieve your order history.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!user) return null;

    const memberSince = user.createdAt ? formatDate(user.createdAt) : '2026';

    return (
        <div className="min-h-screen pt-32 pb-24 bg-white">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Sidebar */}
                    <div className="w-full lg:w-80">
                        <div className="mb-12">
                            <h2 className="text-xs uppercase tracking-extra font-bold text-luxury-gold mb-4">The Member</h2>
                            <h1 className="text-3xl font-light tracking-tight uppercase">{user.name}</h1>
                            <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium mt-2">Member since {memberSince}</p>
                        </div>

                        <nav className="space-y-4">
                            <button className="flex items-center justify-between w-full py-4 border-b border-luxury-gray-light text-[10px] uppercase tracking-extra font-semibold text-luxury-black">
                                <span className="flex items-center gap-4"><Package size={16} strokeWidth={1.5} /> Order History</span>
                                <ChevronRight size={14} />
                            </button>
                            <Link to="/wishlist" className="flex items-center justify-between w-full py-4 border-b border-luxury-gray-light text-[10px] uppercase tracking-extra font-semibold text-luxury-gray-medium hover:text-luxury-black transition-colors">
                                <span className="flex items-center gap-4"><Heart size={16} strokeWidth={1.5} /> My Wishlist</span>
                                <ChevronRight size={14} />
                            </Link>
                            <button className="flex items-center justify-between w-full py-4 border-b border-luxury-gray-light text-[10px] uppercase tracking-extra font-semibold text-luxury-gray-medium hover:text-luxury-black transition-colors">
                                <span className="flex items-center gap-4"><Settings size={16} strokeWidth={1.5} /> Account Settings</span>
                                <ChevronRight size={14} />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 w-full py-8 text-[10px] uppercase tracking-extra font-bold text-red-400 hover:text-red-700 transition-colors"
                            >
                                <LogOut size={16} strokeWidth={1.5} /> Log Out
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <h3 className="text-[11px] uppercase tracking-extra font-bold mb-12 border-b border-luxury-black pb-4 inline-block">Order History</h3>

                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 size={32} className="animate-spin text-luxury-gold" strokeWidth={1} />
                            </div>
                        ) : error ? (
                            <div className="p-12 bg-luxury-ivory text-center">
                                <p className="text-[10px] uppercase tracking-widest text-red-500">{error}</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="p-12 bg-luxury-ivory text-center">
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium">No previous orders found.</p>
                                <Link to="/shop" className="inline-block mt-8 text-[11px] font-bold uppercase tracking-extra border-b border-luxury-black">Discover Collections</Link>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {orders.map((order) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={order._id}
                                        className="bg-luxury-ivory/50 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-transparent hover:border-luxury-gold/20 transition-all duration-700"
                                    >
                                        <div className="flex gap-12">
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-luxury-gray-medium mb-1">Order #</p>
                                                <p className="text-xs font-bold tracking-widest">{order._id.slice(-8).toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-luxury-gray-medium mb-1">Placed</p>
                                                <p className="text-xs font-medium tracking-tight uppercase">{formatDate(order.createdAt)}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-12 items-center">
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-luxury-gray-medium mb-1">Total</p>
                                                <p className="text-xs font-bold tracking-tight">{formatCurrency(order.totalPrice)}</p>
                                            </div>
                                            <div>
                                                <span className={`text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border ${order.isDelivered ? 'border-green-100 text-green-600 bg-green-50' : 'border-luxury-gold/20 text-luxury-gold bg-luxury-gold/5'
                                                    }`}>
                                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                                </span>
                                            </div>
                                            <button className="text-[10px] uppercase tracking-widest font-bold border-b border-luxury-black pb-1 ml-4 hover:border-luxury-gold hover:text-luxury-gold transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <div className="mt-20 p-20 bg-luxury-ivory border border-luxury-gray-light text-center">
                            <h4 className="text-sm font-light uppercase tracking-widest mb-4">Personal Stylist</h4>
                            <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium mb-10 leading-relaxed">
                                As a member of the {COMPANY_NAME.toLowerCase()} circle, you have access to <br /> bespoke styling services.
                            </p>
                            <button className="luxury-button-outline">Contact Atelier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

