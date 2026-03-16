import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-ivory">
            {/* Background Visual - Using a gradient placeholder with high-end feel */}
            <div className="absolute inset-0 bg-[#E8E4DF]">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full bg-[url('https://images.unsplash.com/photo-1490481651871-ab68ec25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="container h-full flex flex-col justify-center relative z-10">
                <div className="max-w-2xl">
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xs md:text-sm uppercase tracking-[.4em] mb-6 font-medium"
                    >
                        Spring / Summer 2026
                    </motion.p>

                    <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="text-6xl md:text-8xl lg:text-[120px] leading-[0.9] mb-12 font-light tracking-tighter"
                    >
                        MODERN <br />
                        <span className="italic serif ml-12 md:ml-24">LEGACY_</span>
                    </motion.h2>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <a href="#" className="luxury-button">
                            Explore Collection
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Floating Elements for Premium Feel */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 2 }}
                className="absolute bottom-12 right-12 hidden md:block"
            >
                <p className="text-[10px] tracking-[.5em] uppercase vertical-text transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    Crafted in India / Worldwide Shipping
                </p>
            </motion.div>
        </section>
    );
};

export default Hero;
