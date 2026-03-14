import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import SEO from '../components/common/SEO';
import { CardSkeleton } from '../components/common/Skeletons';
import ProductCard from '../components/common/ProductCard';
import productService from '../services/productService';
import { COMPANY_NAME, PRODUCT_CATEGORIES } from '../utils/constants';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryCategory = searchParams.get('category') || 'All';
    
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(PRODUCT_CATEGORIES);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                // Fetch products based on category
                const params = queryCategory !== 'All' 
                    ? { category: queryCategory.toLowerCase() } 
                    : {};
                const data = await productService.getProducts(params);
                setProducts(data.products || []);
                
                setError(null);
            } catch (err) {
                setError('Failed to load collections. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [queryCategory]);

    const handleCategoryChange = (cat) => {
        if (cat === 'All') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', cat); // Keep Uppercase in URL for aesthetics, but lowercase for API
        }
        setSearchParams(searchParams);
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <SEO
                title={`The Collections | ${COMPANY_NAME}`}
                description={`Explore ${COMPANY_NAME}'s curated collections of couture, tailoring, and artisanal accessories. Modern luxury redefined.`}
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
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`transition-all duration-500 hover:text-luxury-black relative py-2 ${queryCategory === cat ? 'text-luxury-black' : ''
                                        }`}
                                >
                                    {cat}
                                    {queryCategory === cat && (
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

                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-500 uppercase tracking-widest text-xs">{error}</p>
                    </div>
                )}

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6, 7, 8].map(n => <CardSkeleton key={n} />)
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20">
                                    <p className="text-luxury-gray-medium uppercase tracking-[.3em] text-[10px]">No pieces found in this collection.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;

