import React from 'react';

const MinimalTable = ({ title, columns, data, renderRow }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-gray-50">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, idx) => renderRow(item, idx))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MinimalTable;
