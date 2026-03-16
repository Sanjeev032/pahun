import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  Legend
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-xs font-bold text-gray-900">
        {payload[0].name}: {payload[0].value}
      </div>
    );
  }
  return null;
};

export const StockOverviewChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={10}
        dataKey="value"
        animationDuration={1000}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        verticalAlign="middle" 
        align="right"
        layout="vertical"
        iconType="circle"
        iconSize={8}
        wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '20px' }}
      />
    </PieChart>
  </ResponsiveContainer>
);
