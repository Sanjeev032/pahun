import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const cartQuantity = useSelector((state) => state.cart.totalQuantity);
    const wishlistCount = useSelector((state) => state.wishlist.items.length);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'New Arrivals', href: '/shop?category=new' },
        { name: 'Collections', href: '/shop?category=collections' },
        { name: 'Men', href: '/shop?category=men' },
        { name: 'Women', href: '/shop?category=women' },
        { name: 'Editorial', href: '/editorial' },
    ];

    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
            }`}>
            <div className="container-custom flex items-center justify-between">
                {/* Left: Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-8 text-[10px] font-semibold uppercase tracking-widest">
                    {navLinks.slice(0, 3).map((link) => (
                        <li key={link.name}>
                            <Link to={link.href} className="hover:text-luxury-gold transition-colors duration-300">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Center: Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-luxury-black"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={22} strokeWidth={1.5} />
                </button>

                {/* Center: Logo */}
                <Link to="/" className="absolute left-1/2 -translate-x-1/2 group">
                    <h1 className={`text-2xl md:text-3xl tracking-extra font-light transition-all duration-700 ${isScrolled ? 'scale-90' : 'scale-100'
                        }`}>
                        PAHUNN
                    </h1>
                    <div className="h-[1px] w-0 group-hover:w-full bg-luxury-gold transition-all duration-700 mx-auto mt-1" />
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 md:gap-4">
                    <ul className="hidden lg:flex items-center gap-8 text-[10px] font-semibold uppercase tracking-widest mr-4">
                        {navLinks.slice(3).map((link) => (
                            <li key={link.name}>
                                <Link to={link.href} className="hover:text-luxury-gold transition-colors duration-300">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-1 md:gap-2">
                        <button className="p-2 hover:text-luxury-gold transition-all">
                            <Search size={18} strokeWidth={1.2} />
                        </button>

                        <Link to="/wishlist" className="p-2 hover:text-luxury-gold transition-all relative">
                            <Heart size={18} strokeWidth={1.2} />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                            )}
                        </Link>

                        <Link to="/profile" className="p-2 hover:text-luxury-gold transition-all">
                            <User size={18} strokeWidth={1.2} />
                        </Link>

                        <Link to="/cart" className="p-2 hover:text-luxury-gold transition-all relative">
                            <ShoppingBag size={18} strokeWidth={1.2} />
                            {cartQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 bg-luxury-black text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartQuantity}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-white z-[60] flex flex-col pt-24"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 left-8 p-2"
                        >
                            <X size={24} strokeWidth={1} />
                        </button>

                        <ul className="flex flex-col items-center gap-10">
                            {navLinks.map((link, idx) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        to={link.href}
                                        className="text-4xl font-light tracking-widest uppercase serif"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-auto border-t border-gray-100 p-12 text-center">
                            <div className="flex justify-center gap-12 text-sm uppercase tracking-widest text-gray-400">
                                <Link to="/login" className="hover:text-black">Sign In</Link>
                                <Link to="/wishlist" className="hover:text-black">Wishlist</Link>
                                <Link to="/support" className="hover:text-black">Support</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
