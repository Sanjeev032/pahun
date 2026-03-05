import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, [isAuthenticated, navigate]);

    const orders = [
        { id: '#PH-10293', date: '24 Jan 2026', total: '₹42,500', status: 'In Transit' },
        { id: '#PH-09821', date: '12 Dec 2025', total: '₹18,900', status: 'Delivered' },
    ];

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pt-32 pb-24 bg-white">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Sidebar */}
                    <div className="w-full lg:w-80">
                        <div className="mb-12">
                            <h2 className="text-xs uppercase tracking-extra font-bold text-luxury-gold mb-4">The Member</h2>
                            <h1 className="text-3xl font-light tracking-tight uppercase">{user.name}</h1>
                            <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium mt-2">Member since 2024</p>
                        </div>

                        <nav className="space-y-4">
                            <button className="flex items-center justify-between w-full py-4 border-b border-luxury-gray-light text-[10px] uppercase tracking-extra font-semibold text-luxury-black">
                                <span className="flex items-center gap-4"><Package size={16} strokeWidth={1.5} /> Order History</span>
                                <ChevronRight size={14} />
                            </button>
                            <button className="flex items-center justify-between w-full py-4 border-b border-luxury-gray-light text-[10px] uppercase tracking-extra font-semibold text-luxury-gray-medium hover:text-luxury-black transition-colors">
                                <span className="flex items-center gap-4"><Heart size={16} strokeWidth={1.5} /> My Wishlist</span>
                                <ChevronRight size={14} />
                            </button>
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

                        <div className="space-y-8">
                            {orders.map((order) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={order.id}
                                    className="bg-luxury-ivory/50 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-transparent hover:border-luxury-gold/20 transition-all duration-700"
                                >
                                    <div className="flex gap-12">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-luxury-gray-medium mb-1">Order #</p>
                                            <p className="text-xs font-bold tracking-widest">{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-luxury-gray-medium mb-1">Placed</p>
                                            <p className="text-xs font-medium tracking-tight uppercase">{order.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-12 items-center">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-luxury-gray-medium mb-1">Total</p>
                                            <p className="text-xs font-bold tracking-tight">{order.total}</p>
                                        </div>
                                        <div>
                                            <span className={`text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border ${order.status === 'Delivered' ? 'border-green-100 text-green-600 bg-green-50' : 'border-luxury-gold/20 text-luxury-gold bg-luxury-gold/5'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <button className="text-[10px] uppercase tracking-widest font-bold border-b border-luxury-black pb-1 ml-4 hover:border-luxury-gold hover:text-luxury-gold transition-all">
                                            View Details
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-20 p-20 bg-luxury-ivory border border-luxury-gray-light text-center">
                            <h4 className="text-sm font-light uppercase tracking-widest mb-4">Personal Stylist</h4>
                            <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium mb-10 leading-relaxed">
                                As a member of the House, you have access to <br /> bespoke styling services.
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
