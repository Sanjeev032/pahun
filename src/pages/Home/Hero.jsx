import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LuxuryImage from '../../components/common/LuxuryImage';

const Hero = () => {
    return (
        <section className="relative h-[90vh] md:h-screen w-full overflow-hidden">
            {/* Cinematic Background */}
            <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
            >
                <LuxuryImage
                    src="https://images.unsplash.com/photo-1490481651871-ab68ec25d43d?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Pahun Couture"
                    priority="true"
                />
                {/* Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
            </motion.div>

            <div className="container-custom h-full flex items-center relative z-10">
                <div className="max-w-4xl pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/80 mb-6 block font-medium">
                            The Winter Atelier / Series II
                        </span>
                        <h2 className="text-6xl md:text-8xl lg:text-[160px] leading-[0.8] mb-10 font-light tracking-tighter text-white">
                            POETRY <br />
                            <span className="serif italic md:ml-24 text-luxury-gold drop-shadow-sm">_IN_SILK</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="text-white/70 max-w-md text-sm md:text-lg font-light leading-relaxed mb-12 tracking-wide"
                    >
                        Discover timeless craftsmanship and the tactile beauty of hand-spun silhouettes.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Link to="/shop" className="luxury-button bg-white text-luxury-black border-white hover:bg-transparent hover:text-white px-12 py-5 text-xs">
                            Shop Collection
                        </Link>
                        <Link to="/shop?category=tailoring" className="luxury-button-outline border-white/30 text-white hover:bg-white hover:text-luxury-black px-12 py-5 text-xs backdrop-blur-sm">
                            Explore Tailoring
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
