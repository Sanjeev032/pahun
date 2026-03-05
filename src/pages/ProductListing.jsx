import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductListing = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Couture', 'Tailoring', 'Accessories', 'Bespoke'];

    const products = [
        {
            id: 1,
            name: "The Silk Drape Gown",
            price: "₹85,000",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
            category: "Couture"
        },
        {
            id: 2,
            name: "Structured Satin Blazer",
            price: "₹42,500",
            image: "https://images.unsplash.com/photo-1539109132381-31a1bc9a721d?q=80&w=1974&auto=format&fit=crop",
            category: "Tailoring"
        },
        {
            id: 3,
            name: "Velvet Embellished Clutch",
            price: "₹18,900",
            image: "https://images.unsplash.com/photo-1549439602-43bbcb45f581?q=80&w=2070&auto=format&fit=crop",
            category: "Accessories"
        },
        {
            id: 4,
            name: "Ivory Silk Shirt",
            price: "₹15,000",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop",
            category: "Tailoring"
        },
        {
            id: 5,
            name: "Embroidered Cape",
            price: "₹1,20,000",
            image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=2070&auto=format&fit=crop",
            category: "Couture"
        },
        {
            id: 6,
            name: "Gold Thread Sandals",
            price: "₹24,500",
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop",
            category: "Accessories"
        }
    ];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="container">
                    <header className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">SHOP THE COLLECTION</h1>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        {filteredProducts.map((product, index) => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-[3/4] overflow-hidden mb-6 bg-ivory">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">{product.category}</p>
                                            <h4 className="text-lg font-light tracking-wide group-hover:text-gold transition-colors">{product.name}</h4>
                                        </div>
                                        <p className="text-sm font-medium">{product.price}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductListing;
