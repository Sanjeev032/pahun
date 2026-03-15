import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LuxuryImage from '../../common/LuxuryImage';

const FeaturedCollection = () => {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="aspect-[3/4] overflow-hidden bg-luxury-ivory shadow-2xl"
                    >
                        <LuxuryImage
                            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                            className="w-full h-full transition-transform duration-[2.5s] hover:scale-105"
                            alt="Editorial Collection"
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="max-w-md"
                    >
                        <h3 className="text-[10px] uppercase tracking-widest text-luxury-gold mb-6 font-bold">Series 01 / The Origin</h3>
                        <h2 className="text-4xl md:text-5xl font-light mb-8 leading-[1.1] uppercase tracking-tight">
                            MODERN <br /> <span className="serif italic">Ancestry</span>
                        </h2>
                        <p className="text-luxury-gray-medium font-light text-sm md:text-base leading-relaxed mb-12 tracking-wide">
                            Bridging the gap between traditional Indian craftsmanship and contemporary silhouette. Our debut collection explores the tactile beauty of hand-spun organic silks.
                        </p>
                        <Link to="/shop" className="luxury-button px-10">
                            Explore Series
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
