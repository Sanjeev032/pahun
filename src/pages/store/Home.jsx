import React from 'react';
import Hero from '../../components/store/Hero';
import CategorySection from '../../components/home/CategorySection';
import TailoringService from '../../components/home/TailoringService';
import FeaturedCollection from '../../components/home/sections/FeaturedCollection';
import EthosSection from '../../components/home/sections/EthosSection';

const Home = () => {
    return (
        <div className="bg-white">
            <Hero />

            {/* Discovery Sections */}
            <CategorySection title="MEN SELECTION" category="men" />
            <CategorySection title="WOMEN SELECTION" category="women" />
            
            <FeaturedCollection />
            
            <CategorySection title="ACCESSORIES" category="accessories" />
            <CategorySection title="TAILORING SERVICE" category="tailoring" />

            {/* Functional Service Highlight */}
            <TailoringService />

            <EthosSection />
        </div>
    );
};

export default Home;

