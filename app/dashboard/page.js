'use client';

import { useEffect, useState } from "react";
import { getDevices } from "@/lib/actions/deviceActions";
import { getVisitors } from "@/lib/actions/visitorActions";
import { getUsers } from "@/lib/actions/userActions";
import { getVisitorStats, getDeviceUsage, getUserRoles } from "@/lib/actions/statsActions";
import { FiTablet, FiUsers, FiUser, FiClock, FiCalendar, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import VisitorChart from "@/components/charts/VisitorChart";
import DeviceUsageChart from "@/components/charts/DeviceUsageChart";
import UserRoleChart from "@/components/charts/UserRoleChart";
import Link from "next/link";

export default function DashboardPage() {
  const [counts, setCounts] = useState({ devices: 0, visitors: 0, users: 0 });
  const [charts, setCharts] = useState({ visitor: [], device: [], user: [] });
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [
          devicesRes,
          visitorsRes,
          usersRes,
          visitorStats,
          deviceUsage,
          userRoles
        ] = await Promise.all([
          getDevices('', 1, 1),
          getVisitors('', 1, 1),
          getUsers('', 1, 1),
          getVisitorStats(),
          getDeviceUsage(),
          getUserRoles()
        ]);

        setCounts({
          devices: devicesRes.total || 0,
          visitors: visitorsRes.total || 0,
          users: usersRes.total || 0,
        });

        setCharts({
          visitor: visitorStats,
          device: deviceUsage,
          user: userRoles,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    setNow(new Date()); // set waktu di client
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, <span className="text-blue-500">Admin</span>!
        </h1>

        {now && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FiCalendar className="mr-2" size={16} />
            <span>{now.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="mx-2">•</span>
            <FiClock className="mr-2" size={16} />
            <span>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          <>
            <SummaryCard
              title="Devices"
              value={counts.devices}
              icon={<FiTablet size={20} className="text-blue-500" />}
              color="from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/10"
              href="/dashboard/devices"
            />
            <SummaryCard
              title="Visitors"
              value={counts.visitors}
              icon={<FiUser size={20} className="text-green-500" />}
              color="from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-900/10"
              href="/dashboard/visitors"
            />
            <SummaryCard
              title="Users"
              value={counts.users}
              icon={<FiUsers size={20} className="text-purple-500" />}
              color="from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-900/10"
              href="/dashboard/users"
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonChart key={i} />
          ))
        ) : (
          <>
            <ChartCard title="Visitor Trends">
              <VisitorChart data={charts.visitor} />
            </ChartCard>

            <ChartCard title="Device Usage">
              <DeviceUsageChart data={charts.device} />
            </ChartCard>

            <ChartCard title="User Roles">
              <UserRoleChart data={charts.user} />
            </ChartCard>
          </>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, color, href }) {
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Link href={href} className="block">
        <div className={`bg-gradient-to-r ${color} rounded-xl shadow p-6 h-full transition-all duration-200 hover:shadow-md`}>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white dark:bg-gray-700/50 rounded-lg backdrop-blur-sm">
              {icon}
            </div>
            <FiArrowRight size={18} className="text-gray-400" />
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-[120px] animate-pulse"
    >
      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </motion.div>
  );
}

function SkeletonChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-[300px] animate-pulse"
    >
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-[200px] w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </motion.div>
  );
}

function ChartCard({ title, children }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}
