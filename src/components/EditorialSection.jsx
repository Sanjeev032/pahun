import React from 'react';
import { motion } from 'framer-motion';
import LuxuryImage from './common/LuxuryImage';

const EditorialSection = () => {
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
        }
    ];

    return (
        <section className="py-24 md:py-40 bg-white">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <h3 className="text-xs uppercase tracking-[.4em] text-gray-400 mb-6">Curated Selection</h3>
                        <h2 className="text-4xl md:text-5xl font-light leading-tight">THE ESSENTIALS <span className="serif italic">of</span> LUXURY</h2>
                    </div>
                    <a href="#" className="text-xs uppercase tracking-[.3em] border-b border-black pb-2 hover:text-gold hover:border-gold transition-colors">
                        View All Series
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[3/4] overflow-hidden mb-6 bg-ivory">
                                <LuxuryImage
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>
                            <p className="text-[10px] uppercase tracking-[.3em] text-gray-400 mb-3">{product.category}</p>
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-light tracking-wide group-hover:text-gold transition-colors">{product.name}</h4>
                                <p className="text-sm font-medium">{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EditorialSection;
