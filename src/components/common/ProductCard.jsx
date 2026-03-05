import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import LuxuryImage from './LuxuryImage';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isInWishlist = (id) => wishlistItems.some(item => item.id === id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
        >
            <Link to={`/product/${product.id}`}>
                <div className="aspect-[3/4] overflow-hidden bg-luxury-ivory mb-6 relative">
                    <LuxuryImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
                </div>
            </Link>

            <button
                onClick={() => dispatch(toggleWishlist(product))}
                className="absolute top-4 right-4 p-2 z-10 text-white/80 hover:text-luxury-gold transition-colors drop-shadow-md"
            >
                <Heart
                    size={20}
                    strokeWidth={1.5}
                    fill={isInWishlist(product.id) ? "currentColor" : "none"}
                    className={isInWishlist(product.id) ? "text-luxury-gold" : ""}
                />
            </button>

            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[9px] uppercase tracking-widest text-luxury-gray-medium mb-2">{product.category}</p>
                    <Link to={`/product/${product.id}`}>
                        <h4 className="text-sm font-light tracking-wide uppercase group-hover:text-luxury-gold transition-colors duration-500">
                            {product.name}
                        </h4>
                    </Link>
                </div>
                <p className="text-sm font-medium tracking-tight">₹{product.price.toLocaleString()}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
