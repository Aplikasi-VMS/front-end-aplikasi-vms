'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function VisitorChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Visitors Per Month</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
