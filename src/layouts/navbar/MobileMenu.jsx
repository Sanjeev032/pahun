import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';

const MobileMenu = React.memo(({ isOpen, onClose, isSearchOpen, isAdmin, logo }) => {
    return (
        <>
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden overflow-hidden pb-4"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-luxury-gold/30 text-sm pl-11"
                                autoFocus
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={onClose}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-50">
                                <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                                    <img src={logo} alt="Pahun" className="h-8 object-contain" />
                                    <span className="font-bold tracking-tight uppercase">Pahun</span>
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <ul className="flex flex-col p-6 gap-6">
                                {NAV_LINKS.map((link, idx) => (
                                    <motion.li
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link
                                            to={link.href}
                                            className="text-lg font-medium text-gray-900 flex items-center justify-between group"
                                            onClick={onClose}
                                        >
                                            {link.name}
                                            <span className="text-gray-300 group-hover:text-luxury-gold transition-colors">→</span>
                                        </Link>
                                    </motion.li>
                                ))}
                                {isAdmin && (
                                    <motion.li
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: NAV_LINKS.length * 0.05 }}
                                    >
                                        <Link
                                            to="/admin"
                                            className="text-lg font-bold text-luxury-gold flex items-center justify-between"
                                            onClick={onClose}
                                        >
                                            Admin Dashboard
                                            <span>⚡</span>
                                        </Link>
                                    </motion.li>
                                )}
                            </ul>

                            <div className="mt-auto p-8 bg-gray-50">
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Connect with us</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                                        <Link to="/about" onClick={onClose}>About Us</Link>
                                        <Link to="/contact" onClick={onClose}>Contact</Link>
                                        <Link to="/shipping" onClick={onClose}>Shipping</Link>
                                        <Link to="/support" onClick={onClose}>Help Center</Link>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">
                                        &copy; {new Date().getFullYear()} Pahun Couture. All Rights Reserved.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
});

export default MobileMenu;
