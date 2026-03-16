import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-gray-50 text-gray-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    luxury: "bg-black text-white ring-1 ring-inset ring-white/10"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default React.memo(Badge);
