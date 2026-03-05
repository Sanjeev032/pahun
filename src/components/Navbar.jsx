import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'New Arrivals', href: '#' },
        { name: 'Collections', href: '#' },
        { name: 'Men', href: '#' },
        { name: 'Women', href: '#' },
        { name: 'Editorial', href: '#' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
            <div className="container flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em]">
                    {navLinks.slice(0, 3).map((link) => (
                        <li key={link.name}>
                            <Link to="/shop" className="hover:text-gold transition-colors">{link.name}</Link>
                        </li>
                    ))}
                </ul>

                {/* Logo */}
                <Link to="/" className="absolute left-1/2 -translate-x-1/2">
                    <h1 className={`text-2xl md:text-3xl tracking-[0.3em] font-light transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                        PAHUNN
                    </h1>
                </Link>

                {/* Actions & Remaining Links */}
                <div className="flex items-center gap-6 lg:gap-8">
                    <ul className="hidden lg:flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em]">
                        {navLinks.slice(3).map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className="hover:text-gold transition-colors">{link.name}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:text-gold transition-colors">
                            <Search size={20} strokeWidth={1.5} />
                        </button>
                        <button className="p-2 hover:text-gold transition-colors relative">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-gold rounded-full"></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
                    >
                        <div className="flex justify-end">
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                                <X size={28} strokeWidth={1.5} />
                            </button>
                        </div>

                        <ul className="flex flex-col gap-8 mt-12">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-3xl font-light tracking-widest uppercase serif"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto border-t border-gray-100 pt-8">
                            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Account</p>
                            <div className="flex flex-col gap-4 text-lg font-light">
                                <a href="#">Sign In</a>
                                <a href="#">Wishlist</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
