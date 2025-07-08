import Link from "next/link";

export default function SummaryCard({ title, value, icon, color, href }) {
  return (
    <Link href={href} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
      </div>
    </Link>
  );
}
