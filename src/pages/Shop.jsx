import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../api/products';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { useDispatch } from 'react-redux';
import SEO from '../components/common/SEO';
import { CardSkeleton } from '../components/common/Skeletons';
import ProductCard from '../components/common/ProductCard';

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Simulate loading for smooth transition
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);
    const dispatch = useDispatch();

    const categories = ['All', 'Couture', 'Tailoring', 'Accessories'];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);


    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <SEO
                title="The Collections"
                description="Explore Pahunn's curated collections of couture, tailoring, and artisanal accessories. Modern luxury redefined."
            />
            <div className="container-custom">
                {/* Header */}
                <header className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-light mb-8 tracking-tight"
                    >
                        COLLECTIONS
                    </motion.h1>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-8">
                        <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[.25em] font-semibold text-luxury-gray-medium">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`transition-all duration-500 hover:text-luxury-black relative py-2 ${activeCategory === cat ? 'text-luxury-black' : ''
                                        }`}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="cat-underline"
                                            className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-10 text-[10px] uppercase tracking-widest font-semibold">
                            <button
                                className="flex items-center gap-3 group"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <Filter size={14} className="group-hover:text-luxury-gold transition-colors" />
                                Refine
                            </button>
                            <button className="flex items-center gap-3">
                                Sort By <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6, 7, 8].map(n => <CardSkeleton key={n} />)
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
