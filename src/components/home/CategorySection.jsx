import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import productService from '../../services/productService';

const CategorySection = ({ title, category }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const data = await productService.getProductsByCategory(category, { limit: 4 });
                // Robust extraction based on successResponse { success: true, data: { products: [...] } }
                const fetchedProducts = data?.data?.products || data?.data || [];
                setProducts(fetchedProducts);
            } catch (err) {
                console.error(`Failed to fetch ${category} products:`, err);
                // Extract message if it's an error object, or use as is if it's a string
                const errorMsg = err.message || (typeof err === 'string' ? err : 'Unknown Error');
                setError(`Failed to load ${category} collection: ${errorMsg}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [category]);

    const isEmpty = !isLoading && products.length === 0 && !error;

    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-extra text-luxury-gold mb-4">Collection</h3>
                        <h2 className="text-3xl font-light uppercase tracking-tight">{title}</h2>
                    </div>
                    <Link 
                        to={`/shop?category=${category}`}
                        className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-luxury-gold transition-colors"
                    >
                        View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loader2 className="animate-spin text-luxury-gold" size={32} />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 uppercase tracking-widest text-xs">{error}</p>
                    </div>
                ) : isEmpty ? (
                    <div className="text-center flex flex-col justify-center items-center min-h-[400px] border border-dashed border-gray-100">
                        <p className="text-luxury-gray-medium uppercase tracking-[.3em] text-[10px]">
                            No products available in this collection yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategorySection;
