import React, { useState, useEffect } from 'react';

const LuxuryImage = ({ src, alt, className = "", ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Blur Placeholder */}
            {!isLoaded && !error && (
                <div className="absolute inset-0 bg-luxury-ivory animate-pulse flex items-center justify-center">
                    <span className="text-[8px] tracking-[.4em] text-luxury-gold uppercase opacity-20">Loading Art</span>
                </div>
            )}

            {error ? (
                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-300">
                    <span className="text-[10px] uppercase tracking-widest">Image Unavailable</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setError(true)}
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    loading="lazy"
                    {...props}
                />
            )}
        </div>
    );
};

export default LuxuryImage;
