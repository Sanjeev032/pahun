import React, { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo.jpeg';

// Sub-components
import NavLinks from './navbar/NavLinks';
import SearchBar from './navbar/SearchBar';
import UserActions from './navbar/UserActions';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
    const { user, loading, isAdmin, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();
    
    const cartQuantity = useSelector((state) => state.cart.totalQuantity);
    const wishlistCount = useSelector((state) => state.wishlist.items.length);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [location]);

    const handleSearchToggle = useCallback(() => {
        setIsSearchOpen(prev => !prev);
    }, []);

    const handleMobileMenuClose = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleMobileMenuOpen = useCallback(() => {
        setIsMobileMenuOpen(true);
    }, []);

    return (
        <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20 gap-4 md:gap-8">
                    
                    {/* LEFT SECTION: Logo & Brand */}
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-1 -ml-1 text-gray-600"
                            onClick={handleMobileMenuOpen}
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
                        <NavLinks isAdmin={isAdmin} />
                        <SearchBar />
                    </div>

                    {/* RIGHT SECTION: User Actions */}
                    <UserActions 
                        user={user}
                        loading={loading}
                        logout={logout}
                        wishlistCount={wishlistCount}
                        cartQuantity={cartQuantity}
                        onSearchToggle={handleSearchToggle}
                    />
                </div>

                {/* MOBILE COMPONENTS */}
                <MobileMenu 
                    isOpen={isMobileMenuOpen}
                    onClose={handleMobileMenuClose}
                    isSearchOpen={isSearchOpen}
                    isAdmin={isAdmin}
                    logo={logo}
                />
            </div>
        </header>
    );
};

export default Navbar;
