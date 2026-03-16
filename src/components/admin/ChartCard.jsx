import React from 'react';

const ChartCard = ({ title, subtitle, children, extra }) => {
  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col h-full">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{subtitle}</p>}
        </div>
        {extra && <div>{extra}</div>}
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
