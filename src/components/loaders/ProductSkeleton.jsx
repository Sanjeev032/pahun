import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
    return (
        <div className="group relative w-full">
            {/* Image Placeholder */}
            <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-6 relative animate-pulse" />
            
            <div className="flex justify-between items-start w-full">
                <div className="flex-1">
                    {/* Category Placeholder */}
                    <div className="h-2 w-16 bg-gray-100 mb-3 animate-pulse" />
                    {/* Name Placeholder */}
                    <div className="h-4 w-3/4 bg-gray-100 mb-2 animate-pulse" />
                </div>
                {/* Price Placeholder */}
                <div className="h-4 w-12 bg-gray-100 animate-pulse" />
            </div>
            
            <div className="h-10 w-full bg-gray-100 mt-6 hidden group-hover:block animate-pulse" />
        </div>
    );
};

export default ProductSkeleton;
