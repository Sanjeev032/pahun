import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LuxuryImage from '../../components/common/LuxuryImage';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-luxury-ivory">
            {/* Background with Zoom Effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4, ease: "easeOut" }}
                className="absolute inset-0"
            >
                <LuxuryImage
                    src="https://images.unsplash.com/photo-1490481651871-ab68ec25d43d?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full"
                    alt="Hero Collection"
                />
                <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            <div className="container-custom h-full flex flex-col justify-center relative z-10">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-[10px] md:text-xs uppercase tracking-extra mb-8 font-semibold text-white/90"
                    >
                        Haute Couture / Winter 2026
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-6xl md:text-8xl lg:text-[140px] leading-[0.85] mb-12 font-light tracking-tighter text-white">
                            POETRY<br />
                            <span className="italic serif ml-12 md:ml-32 text-luxury-gold">_IN_SILK</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Link to="/shop" className="luxury-button bg-white text-luxury-black border-white hover:bg-transparent hover:text-white">
                            The Collection
                        </Link>
                        <Link to="/atelier" className="luxury-button-outline border-white text-white hover:bg-white hover:text-luxury-black">
                            Inside the Atelier
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Side Label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 right-12 hidden md:block"
            >
                <p className="text-[9px] tracking-[.8em] uppercase text-white/50" style={{ writingMode: 'vertical-rl' }}>
                    Crafted in India / Shipping Worldwide
                </p>
            </motion.div>
        </section>
    );
};

export default Hero;
