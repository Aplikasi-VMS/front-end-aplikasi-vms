'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DeviceUsageChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Device Usage</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="device" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
