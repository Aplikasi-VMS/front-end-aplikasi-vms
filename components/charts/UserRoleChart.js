'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

export default function UserRoleChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Users Per Role</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="role"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
