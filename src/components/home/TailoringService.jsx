import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, Sparkles, Shirt } from 'lucide-react';
import LuxuryImage from '../common/LuxuryImage';

const TailoringService = () => {
    const features = [
        { icon: <Ruler size={18} />, text: "Custom Measurements" },
        { icon: <Sparkles size={18} />, text: "Fabric Selection" },
        { icon: <Scissors size={18} />, text: "Personalized Styling" },
        { icon: <Shirt size={18} />, text: "Premium Tailoring" },
    ];

    return (
        <section className="py-32 bg-luxury-ivory/30">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative group"
                    >
                        <div className="aspect-[4/5] overflow-hidden">
                            <LuxuryImage
                                src="https://images.unsplash.com/photo-1594932224828-b4b057b99c15?q=80&w=2080&auto=format&fit=crop"
                                alt="Bespoke Tailoring"
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-luxury-black hidden md:flex items-center justify-center p-8 text-white">
                            <div className="text-center border border-white/20 w-full h-full flex flex-col items-center justify-center">
                                <span className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2">Since</span>
                                <span className="text-2xl font-serif italic">2024</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h3 className="text-[10px] uppercase tracking-extra text-luxury-gold mb-6 font-semibold">Atelier Services</h3>
                        <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight uppercase tracking-tight font-serif italic">
                            Personal <span className="not-italic">Tailored</span> Outfit
                        </h2>
                        <p className="text-luxury-gray-medium font-light text-sm leading-loose mb-12 tracking-wide max-w-lg">
                            Exclusively designed by our in-house designer and tailored according to your measurements.
                        </p>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-16">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-4 group">
                                    <div className="text-luxury-gold group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/70">
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Link to="/tailoring" className="luxury-button inline-flex items-center gap-4">
                            Book Tailoring Consultation
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TailoringService;
