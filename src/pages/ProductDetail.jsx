import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../api/products';
import { Heart, Share2, Ruler, ChevronRight, Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import SEO from '../components/common/SEO';
import { DetailSkeleton } from '../components/common/Skeletons';
import LuxuryImage from '../components/common/LuxuryImage';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const wishlistItems = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        const found = products.find(p => p.id === parseInt(id));
        if (found) {
            setProduct(found);
            if (found.sizes) setSelectedSize(found.sizes[0]);
        }
        // Simulate network delay for premium feel
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, [id]);

    if (isLoading) return <DetailSkeleton />;
    if (!product) return <div className="h-screen flex items-center justify-center tracking-widest uppercase text-xs">Product Not Found</div>;

    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setError('Please select a size');
            return;
        }
        dispatch(addItemToCart({ ...product, size: selectedSize }));
        setError('');
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <SEO
                title={product.name}
                description={product.description}
                image={product.images[0]}
            />
            <div className="container-custom">
                {/* Breadcrumbs */}
                <div className="mb-12 flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-gray-medium">
                    <Link to="/" className="hover:text-luxury-black transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <Link to="/shop" className="hover:text-luxury-black transition-colors">Collections</Link>
                    <ChevronRight size={10} />
                    <span className="text-luxury-black">{product.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-20 xl:gap-32">
                    {/* Gallery */}
                    <div className="w-full lg:w-3/5 flex flex-col md:flex-row gap-6">
                        <div className="hidden md:flex flex-col gap-4 w-24">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`aspect-[3/4] overflow-hidden border transition-all duration-500 ${activeImage === i ? 'border-luxury-gold' : 'border-transparent'
                                        }`}
                                >
                                    <LuxuryImage src={img} alt="" className="w-full h-full" />
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 aspect-[3/4] overflow-hidden bg-luxury-ivory relative group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full"
                                >
                                    <LuxuryImage
                                        src={product.images[activeImage]}
                                        alt={product.name}
                                        className="w-full h-full cursor-zoom-in"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="w-full lg:w-2/5 pt-6">
                        <div className="mb-12">
                            <p className="text-[11px] uppercase tracking-[.3em] text-luxury-gold mb-6 font-medium">
                                {product.category}
                            </p>
                            <h1 className="text-4xl md:text-5xl font-light tracking-tight uppercase leading-tight mb-6">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-light tracking-tight">₹{product.price.toLocaleString()}</p>
                        </div>

                        <div className="mb-12">
                            <p className="text-luxury-gray-medium font-light leading-relaxed mb-10 text-sm">
                                {product.description}
                            </p>

                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-[10px] uppercase tracking-widest font-semibold">Select Size</h4>
                                <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-gold hover:text-luxury-black transition-colors">
                                    <Ruler size={14} /> Size Guide
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-4 mb-4">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 flex items-center justify-center text-xs tracking-widest border transition-all duration-500 ${selectedSize === size
                                            ? 'border-luxury-black bg-luxury-black text-white'
                                            : 'border-luxury-gray-light hover:border-luxury-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {error && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-2">{error}</p>}
                        </div>

                        <div className="flex flex-col gap-4 mb-16">
                            <button
                                onClick={handleAddToCart}
                                className="luxury-button w-full flex items-center justify-center gap-4 group"
                            >
                                Add to Bag
                                <div className="h-[1px] w-4 bg-white/50 group-hover:w-8 transition-all duration-500" />
                            </button>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => dispatch(toggleWishlist(product))}
                                    className="flex-1 flex items-center justify-center gap-3 border border-luxury-black py-4 text-[10px] uppercase tracking-widest hover:bg-luxury-ivory transition-all duration-500"
                                >
                                    <Heart
                                        size={16}
                                        fill={isInWishlist ? "black" : "none"}
                                        className={isInWishlist ? "text-luxury-black" : ""}
                                    />
                                    Wishlist
                                </button>
                                <button className="w-16 flex items-center justify-center border border-luxury-black py-4 hover:bg-luxury-ivory transition-all duration-500 group">
                                    <Share2 size={16} className="group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-luxury-gray-light pt-12 space-y-2">
                            <details className="group">
                                <summary className="flex justify-between items-center py-4 cursor-pointer list-none">
                                    <span className="text-[10px] uppercase tracking-widest font-semibold">Craftsmanship</span>
                                    <Plus size={14} className="group-open:hidden" />
                                    <Minus size={14} className="hidden group-open:block" />
                                </summary>
                                <div className="pb-6 text-xs text-luxury-gray-medium font-light leading-loose uppercase tracking-widest">
                                    Each garment is meticulously hand-finished in our atelier. We use only the finest natural fibers and traditional artisanal techniques passed down through generations.
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex justify-between items-center py-4 cursor-pointer list-none">
                                    <span className="text-[10px] uppercase tracking-widest font-semibold">Shipping & Returns</span>
                                    <Plus size={14} className="group-open:hidden" />
                                    <Minus size={14} className="hidden group-open:block" />
                                </summary>
                                <div className="pb-6 text-xs text-luxury-gray-medium font-light leading-loose uppercase tracking-widest">
                                    Complementary worldwide shipping on orders above ₹50,000. Returns accepted within 14 days of delivery in original condition.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
