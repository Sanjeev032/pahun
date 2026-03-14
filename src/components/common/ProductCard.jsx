import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { addItemToCart } from '../../store/slices/cartSlice';
import LuxuryImage from './LuxuryImage';
import { formatCurrency } from '../../utils/formatters';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isInWishlist = (id) => wishlistItems.some(item => (item._id || item.id) === id);

    const productId = product._id || product.id;

    const handleAddToCart = () => {
        dispatch(addItemToCart({ 
            ...product, 
            id: productId, // Ensure it matches slice's expectation
            quantity: 1 
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
        >
            <div className="aspect-[3/4] overflow-hidden bg-luxury-ivory mb-6 relative">
                <Link to={`/product/${productId}`}>
                    <LuxuryImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                </Link>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
                
                {/* Hover Actions */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                    <button 
                        onClick={handleAddToCart}
                        className="luxury-button w-full py-4 text-[9px] flex items-center justify-center gap-3 backdrop-blur-md bg-white/90 text-black hover:bg-black hover:text-white border-none shadow-xl"
                    >
                        <ShoppingBag size={14} /> Add to Bag
                    </button>
                    <Link 
                        to={`/product/${productId}`}
                        className="luxury-button w-full py-4 text-[9px] flex items-center justify-center gap-3 backdrop-blur-md bg-black/80 text-white hover:bg-black border-none"
                    >
                        <Eye size={14} /> Quick View
                    </Link>
                </div>

                <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    className="absolute top-4 right-4 p-2 z-10 text-white/80 hover:text-luxury-gold transition-colors drop-shadow-md group-hover:text-black"
                >
                    <Heart
                        size={20}
                        strokeWidth={1.5}
                        fill={isInWishlist(productId) ? "currentColor" : "none"}
                        className={isInWishlist(productId) ? "text-luxury-gold" : ""}
                    />
                </button>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[9px] uppercase tracking-widest text-luxury-gold mb-2 font-bold">{product.category}</p>
                    <Link to={`/product/${productId}`}>
                        <h4 className="text-sm font-light tracking-wide uppercase group-hover:text-luxury-gold transition-colors duration-500">
                            {product.name}
                        </h4>
                    </Link>
                </div>
                <p className="text-sm font-medium tracking-tight">{formatCurrency(product.price)}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;

