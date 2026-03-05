import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const Auth = ({ type }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        dispatch(setCredentials({
            user: { name: formData.name || 'Arjun Singh', email: formData.email },
            token: 'mock-jwt-token'
        }));
        navigate('/profile');
    };

    const isLogin = type === 'login';

    return (
        <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-luxury-ivory/30 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-xl p-10 md:p-16 shadow-sm border border-luxury-gray-light"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-light tracking-extra uppercase mb-4">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium">
                        Access your curated world of Pahunn
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold transition-all uppercase"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold transition-all uppercase"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2 relative">
                        <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute right-0 bottom-3 text-luxury-gray-medium hover:text-luxury-gold transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="luxury-button w-full flex items-center justify-center gap-4 group">
                            {isLogin ? 'Enter Atelier' : 'Join the House'}
                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </button>
                    </div>
                </form>

                <div className="mt-12 pt-12 border-t border-luxury-gray-light text-center">
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium mb-4">
                        {isLogin ? "Don't have an account?" : "Already a member?"}
                    </p>
                    <Link
                        to={isLogin ? '/register' : '/login'}
                        className="text-[11px] font-bold uppercase tracking-extra text-luxury-gold hover:text-luxury-black transition-colors"
                    >
                        {isLogin ? 'Register Now' : 'Sign In Now'}
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
