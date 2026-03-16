import React from 'react';

const AdminTable = ({ title, actionLabel, onAction, columns, data, renderRow }) => {
    return (
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            {(title || actionLabel) && (
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white">
                    {title && <h4 className="text-xs uppercase tracking-extra font-bold">{title}</h4>}
                    {actionLabel && (
                        <button
                            onClick={onAction}
                            className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold hover:text-luxury-black transition-colors"
                        >
                            {actionLabel}
                        </button>
                    )}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50">
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className={`px-8 py-4 text-[9px] uppercase tracking-extra font-bold text-gray-400 ${col.className || ''}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => renderRow(item, idx))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTable;
