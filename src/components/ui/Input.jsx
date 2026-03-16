import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm transition-all duration-300 focus:bg-white focus:border-black outline-none placeholder:text-gray-300 ${className} ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
          {error}
        </p>
      )}
    </div>
  );
};

export default React.memo(Input);
