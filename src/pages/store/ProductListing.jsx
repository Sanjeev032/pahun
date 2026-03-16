import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import productService from '../../../services/productService';
import { CURRENCY } from '../../utils/constants';

const ProductListing = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ['All', 'Couture', 'Tailoring', 'Accessories', 'Bespoke'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getProducts();
                // Depending on the backend response structure { success, data: { products, ... } }
                setProducts(data.data.products || data.data || []);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-luxury-gold" size={48} />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="container">
                    <header className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight uppercase">Shop the Collection</h1>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-8">
                            <div className="flex flex-wrap gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-gray-400">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`transition-colors hover:text-black ${activeCategory === cat ? 'text-black border-b border-black pb-1' : ''}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
                                <button className="flex items-center gap-2">
                                    Sort By <ChevronDown size={14} />
                                </button>
                                <button className="flex items-center gap-2">
                                    Filter <Filter size={14} />
                                </button>
                            </div>
                        </div>
                        <p className="mt-8 text-xs text-gray-400 tracking-widest uppercase">Showing {filteredProducts.length} Results</p>
                    </header>

                    {error && (
                        <div className="text-center py-10">
                            <p className="text-red-500 text-sm uppercase tracking-widest">Error: {error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        {filteredProducts.map((product, index) => (
                            <Link to={`/product/${product._id}`} key={product._id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-[3/4] overflow-hidden mb-6 bg-ivory relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        {product.countInStock === 0 && (
                                            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1">
                                                <span className="text-[10px] uppercase tracking-widest font-bold">Sold Out</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">{product.category}</p>
                                            <h4 className="text-lg font-light tracking-wide group-hover:text-gold transition-colors">{product.name}</h4>
                                        </div>
                                        <p className="text-sm font-medium">{CURRENCY}{product.price.toLocaleString()}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 uppercase tracking-widest text-xs">No pieces found in this category.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductListing;

