import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { addItemToCart } from '../../redux/slices/cartSlice';
import LuxuryImage from '../../components/common/LuxuryImage';
import { formatCurrency } from '../../utils/formatters';

const Wishlist = () => {
    const items = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
                <div className="mb-8 p-12 bg-luxury-ivory rounded-full">
                    <Heart size={64} strokeWidth={1} className="text-luxury-gray-medium" />
                </div>
                <h2 className="text-3xl font-light mb-4 tracking-extra uppercase leading-snug">The Curated Archive <br /> <span className="serif italic lowercase tracking-tight">is empty</span></h2>
                <p className="text-luxury-gray-medium mb-12 text-[10px] tracking-[.3em] uppercase marker:font-light">
                    Mark your favorite pieces to save them for later.
                </p>
                <Link to="/shop" className="luxury-button">
                    Discover Collections
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-white">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight uppercase">Your Wishlist</h1>
                <p className="text-luxury-gray-medium mb-16 text-[10px] tracking-widest uppercase font-light">Saved Pieces & Limited Series</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
                    <AnimatePresence mode="popLayout">
                        {items.map((product) => (
                            <motion.div
                                layout
                                key={product._id || product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative"
                            >
                                <Link to={`/product/${product._id || product.id}`}>
                                    <div className="aspect-[3/4] overflow-hidden bg-luxury-ivory mb-6 relative">
                                        <LuxuryImage src={product.image} alt={product.name} className="w-full h-full transition-transform duration-[2s] group-hover:scale-110" />
                                    </div>
                                </Link>

                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-luxury-gray-medium mb-2">{product.category}</p>
                                        <h4 className="text-sm font-light tracking-wide uppercase group-hover:text-luxury-gold transition-colors">{product.name}</h4>
                                    </div>
                                    <p className="text-sm font-medium">{formatCurrency(product.price)}</p>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            dispatch(addItemToCart({ ...product, size: product.sizes?.[0] || 'M' }));
                                            dispatch(toggleWishlist(product));
                                        }}
                                        className="flex-1 border border-luxury-black py-4 text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-luxury-black hover:text-white transition-all duration-500"
                                    >
                                        <ShoppingBag size={14} /> Move to Bag
                                    </button>
                                    <button
                                        onClick={() => dispatch(toggleWishlist(product))}
                                        className="p-4 border border-luxury-gray-light hover:border-red-400 hover:text-red-400 transition-all duration-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;

