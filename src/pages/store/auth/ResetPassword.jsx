import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../redux/slices/authSlice';
import authService from '../../../services/authService';
import { COMPANY_NAME } from '../../../utils/constants';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        
        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setIsSubmitting(true);

        try {
            const data = await authService.resetPassword(token, password);

            if (data.success) {
                setSuccess(true);
                // Automatically log the user in with the returned token
                if (data.data?.token) {
                    dispatch(setCredentials({
                        user: data.data.user,
                        token: data.data.token
                    }));
                }
                setTimeout(() => navigate('/profile'), 3000);
            } else {
                setError(data.message || 'Invalid or expired token.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'A network error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-luxury-ivory/30 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white w-full max-w-lg p-12 text-center shadow-sm border border-luxury-gray-light"
                >
                    <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-light tracking-extra uppercase mb-4">Password Recovered</h2>
                    <p className="text-xs uppercase tracking-widest text-luxury-gray-medium">
                        Your password has been successfully reset. Redirecting to your atelier...
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-luxury-ivory/30 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-xl p-10 md:p-16 shadow-sm border border-luxury-gray-light"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-light tracking-extra uppercase mb-4">
                        Secure New Password
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium">
                        Choose a strong password to protect your {COMPANY_NAME.toLowerCase()} account.
                    </p>
                </div>

                {error && (
                    <div className="p-4 mb-8 bg-red-50 border border-red-200 text-red-700 text-xs tracking-widest uppercase text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2 relative">
                        <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">New Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            className="absolute right-0 bottom-3 text-luxury-gray-medium hover:text-luxury-gold transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isSubmitting}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold transition-all"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="luxury-button w-full flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Securing...' : 'Reset Password'}
                            {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;

