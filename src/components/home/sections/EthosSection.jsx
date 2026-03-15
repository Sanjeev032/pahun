import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY_NAME } from '../../../utils/constants';

const EthosSection = () => {
    return (
        <section className="py-40 bg-luxury-black text-white overflow-hidden relative">
            <div className="container-custom relative z-10 flex justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl"
                >
                    <h4 className="text-[10px] uppercase tracking-extra text-luxury-gold mb-12 font-medium">The Ethos</h4>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tighter serif italic">
                        "We don't just dress the body, <br /> we adorn the spirit with stories <br /> told in thread."
                    </p>
                    <div className="mt-20 h-[1px] w-24 bg-luxury-gold/50 mx-auto" />
                    <p className="mt-12 text-[9px] uppercase tracking-[0.8em] font-light text-white/40">
                        Established MMXXIV / New Delhi
                    </p>
                </motion.div>
            </div>

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[200px] font-light tracking-extra serif select-none">{COMPANY_NAME.charAt(0)}</span>
            </div>
        </section>
    );
};

export default EthosSection;
