import React from 'react';
import Hero from './Home/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LuxuryImage from '../components/common/LuxuryImage';
import { COMPANY_NAME } from '../utils/constants';
import CategorySection from '../components/home/CategorySection';
import TailoringService from '../components/home/TailoringService';

const Home = () => {
    return (
        <div className="bg-white">
            <Hero />

            <CategorySection title="MEN SELECTION" category="men" />
            
            <CategorySection title="WOMEN SELECTION" category="women" />
            
            <CategorySection title="ACCESSORIES" category="accessories" />

            <CategorySection title="TAILORING" category="tailoring" />

            {/* Keeping TailoringService for descriptive value, or we can move it below */}
            <TailoringService />

            {/* Featured Grid */}
            <section className="py-32 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                            className="aspect-[3/4] overflow-hidden bg-luxury-ivory"
                        >
                            <LuxuryImage
                                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                                className="w-full h-full transition-transform duration-[2s] hover:scale-110"
                                alt="Editorial"
                            />
                        </motion.div>

                        <div className="max-w-md">
                            <h3 className="text-[10px] uppercase tracking-widest text-luxury-gold mb-6 font-semibold">Series 01 / The Origin</h3>
                            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight uppercase tracking-tight">
                                Modern <br /> <span className="serif italic">Ancestry</span>
                            </h2>
                            <p className="text-luxury-gray-medium font-light text-sm leading-loose mb-12 tracking-wide">
                                Bridging the gap between traditional Indian craftsmanship and contemporary silhouette. Our debut collection explores the tactile beauty of hand-spun silks.
                            </p>
                            <Link to="/shop" className="luxury-button">
                                Explore Series
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Ethos Full Width */}
            <section className="py-40 bg-luxury-black text-white overflow-hidden relative">
                <div className="container-custom relative z-10 flex justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="max-w-4xl"
                    >
                        <h4 className="text-[10px] uppercase tracking-extra text-luxury-gold mb-12">The Ethos</h4>
                        <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-snug tracking-tighter serif italic">
                            "We don't just dress the body, <br /> we adorn the spirit with stories <br /> told in thread."
                        </p>
                        <div className="mt-20 h-[1px] w-24 bg-luxury-gold/50 mx-auto" />
                        <p className="mt-12 text-[9px] uppercase tracking-[.8em] font-light text-white/40">Established MMXXIV / New Delhi</p>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <span className="text-[150px] font-light tracking-extra serif">{COMPANY_NAME.charAt(0)}</span>
                </div>
            </section>
        </div>
    );
};

export default Home;

