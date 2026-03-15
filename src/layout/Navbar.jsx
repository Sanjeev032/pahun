import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NAV_LINKS, ADMIN_EMAIL } from '../utils/constants';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
    const { isLoaded: isAuthLoaded, user: clerkUser } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    const cartQuantity = useSelector((state) => state.cart.totalQuantity);
    const wishlistCount = useSelector((state) => state.wishlist.items.length);
    const { user: mongoUser } = useSelector((state) => state.auth);
    
    const userEmail = clerkUser?.primaryEmailAddress?.emailAddress || mongoUser?.email;
    const isAdmin = userEmail === ADMIN_EMAIL;

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [location]);

    return (
        <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20 gap-4 md:gap-8">
                    
                    {/* LEFT SECTION: Logo & Brand */}
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-1 -ml-1 text-gray-600"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} strokeWidth={1.5} />
                        </button>
                        
                        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
                            <img 
                                src={logo} 
                                alt="Pahun Logo" 
                                className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" 
                            />
                            <span className="text-lg md:text-xl font-bold tracking-wider text-black font-serif uppercase">
                                Pahun
                            </span>
                        </Link>
                    </div>

                    {/* CENTER SECTION: Nav Links & Search (Desktop Only) */}
                    <div className="hidden lg:flex items-center flex-1 max-w-3xl justify-center gap-8 xl:gap-12">
                        <ul className="flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-[0.1em] text-gray-700">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.href} 
                                        className="hover:text-luxury-gold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-luxury-gold hover:after:w-full after:transition-all"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            {isAdmin && (
                                <li>
                                    <Link 
                                        to="/admin" 
                                        className="text-luxury-gold font-black hover:text-luxury-gold/80 transition-all flex items-center gap-1.5"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                                        Admin
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {/* Search Bar (Desktop) */}
                        <div className="flex-1 max-w-md relative group">
                            <input
                                type="text"
                                placeholder="Search for premium fashion..."
                                className="w-full bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100 focus:bg-white focus:border-luxury-gold/30 focus:outline-none transition-all text-sm pl-12"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-luxury-gold transition-colors" size={18} />
                        </div>
                    </div>

                    {/* RIGHT SECTION: User Actions */}
                    <div className="flex items-center gap-1 md:gap-4">
                        {/* Mobile Search Toggle */}
                        <button 
                            className="lg:hidden p-2 text-gray-600 hover:text-luxury-gold transition-all"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search size={22} strokeWidth={1.5} />
                        </button>

                        <Link to="/wishlist" className="p-2 text-gray-600 hover:text-luxury-gold transition-all relative">
                            <Heart size={22} strokeWidth={1.5} />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-luxury-gold rounded-full border-2 border-white" />
                            )}
                        </Link>

                        <Link to="/cart" className="p-2 text-gray-600 hover:text-luxury-gold transition-all relative">
                            <ShoppingBag size={22} strokeWidth={1.5} />
                            {cartQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {cartQuantity}
                                </span>
                            )}
                        </Link>

                        <div className="flex items-center min-w-[40px] justify-center border-l border-gray-100 ml-1 pl-3 md:ml-2 md:pl-4">
                            {!isAuthLoaded ? (
                                <div className="w-8 h-8 rounded-full bg-gray-50 animate-pulse" />
                            ) : (
                                <>
                                    <SignedIn>
                                        <UserButton 
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-100 hover:border-luxury-gold transition-colors"
                                                }
                                            }}
                                        />
                                    </SignedIn>
                                    <SignedOut>
                                        <Link to="/sign-in" className="p-1 text-gray-600 hover:text-luxury-gold transition-all">
                                            <User size={22} strokeWidth={1.5} />
                                        </Link>
                                    </SignedOut>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* MOBILE SEARCH BAR (Visible when toggled) */}
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
            </div>

            {/* MOBILE SIDEBAR MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-50">
                                <Link to="/" className="flex items-center gap-2">
                                    <img src={logo} alt="Pahun" className="h-8 object-contain" />
                                    <span className="font-bold tracking-tight uppercase">Pahun</span>
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
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
                                            onClick={() => setIsMobileMenuOpen(false)}
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
                                            onClick={() => setIsMobileMenuOpen(false)}
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
                                        <Link to="/about">About Us</Link>
                                        <Link to="/contact">Contact</Link>
                                        <Link to="/shipping">Shipping</Link>
                                        <Link to="/support">Help Center</Link>
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
        </header>
    );
};

export default Navbar;
