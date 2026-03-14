import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setError('');

        try {
            const data = await authService.forgotPassword(email);

            if (data.success) {
                setMessage(data.message || 'A password reset link has been dispatched to your email.');
            } else {
                setError(data.message || 'Unable to process your request.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'A network error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-luxury-ivory/30 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-xl p-10 md:p-16 shadow-sm border border-luxury-gray-light"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-light tracking-extra uppercase mb-4">
                        Reset Password
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium">
                        Enter your email to receive recovery instructions.
                    </p>
                </div>

                {message && (
                    <div className="p-4 mb-8 bg-green-50 border border-green-200 text-green-700 text-xs tracking-widest uppercase text-center">
                        {message}
                    </div>
                )}
                
                {error && (
                    <div className="p-4 mb-8 bg-red-50 border border-red-200 text-red-700 text-xs tracking-widest uppercase text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold transition-all uppercase"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="luxury-button w-full flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing...' : 'Send Recovery Link'}
                            {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />}
                        </button>
                    </div>
                </form>

                <div className="mt-12 flex items-center justify-center">
                    <Link
                        to="/login"
                        className="text-[11px] font-bold uppercase tracking-extra text-luxury-gold hover:text-luxury-black transition-colors flex items-center gap-2 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
