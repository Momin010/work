
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChartData } from '../../types';

interface LineChartWidgetProps {
  data: LineChartData[];
  dataKeys: string[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f'];

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ data, dataKeys }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
        <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} fontSize={12} />
        <YAxis tick={{ fill: '#94a3b8' }} fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            borderColor: '#334155',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#f1f5f9' }}
          itemStyle={{ fontWeight: 'bold' }}
        />
        <Legend wrapperStyle={{fontSize: "12px"}}/>
        {dataKeys.map((key, index) => (
          <Line key={key} type="monotone" dataKey={key} stroke={COLORS[index % COLORS.length]} strokeWidth={2} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartWidget;
