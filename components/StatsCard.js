// components/MainContent/StatsCard.jsx
import { FiDollarSign, FiUsers, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function StatsCard({ title, value, change, icon }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />} 
        {Math.abs(change)}% vs last month
      </div>
    </div>
  );
}