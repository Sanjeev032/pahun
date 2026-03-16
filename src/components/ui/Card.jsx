import React from 'react';

const Card = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: "bg-white border border-gray-100",
    glass: "bg-white/80 backdrop-blur-md border border-white/20",
    dark: "bg-black text-white"
  };

  return (
    <div className={`rounded-2xl p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default React.memo(Card);
