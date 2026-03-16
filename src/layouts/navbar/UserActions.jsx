import React from 'react';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserActions = React.memo(({ user, loading, logout, wishlistCount, cartQuantity, onSearchToggle }) => {
    return (
        <div className="flex items-center gap-1 md:gap-4">
            {/* Mobile Search Toggle */}
            <button 
                className="lg:hidden p-2 text-gray-600 hover:text-luxury-gold transition-all"
                onClick={onSearchToggle}
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
                {loading ? (
                    <div className="w-8 h-8 rounded-full bg-gray-50 animate-pulse" />
                ) : (
                    <>
                        {user ? (
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-700 hover:text-luxury-gold transition-colors"
                            >
                                <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
                                    {user.displayName?.[0] || user.email?.[0] || 'U'}
                                </span>
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        ) : (
                            <Link to="/login" className="p-1 text-gray-600 hover:text-luxury-gold transition-all">
                                <User size={22} strokeWidth={1.5} />
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    );
});

export default UserActions;
