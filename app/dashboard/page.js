'use client'

import { useState, useEffect } from "react";
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
  const [role, setRole] = useState(null);
  const [counts, setCounts] = useState({
    devices: 0,
    visitors: 0,
    users: 0
  });
  const [charts, setCharts] = useState({
    visitor: [],
    device: [],
    user: []
  });
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(null);


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const roleRes = await fetch('/api/user-role');
        const { role: userRole } = await roleRes.json();
        setRole(userRole);

        const fetchPromises = [];
        const newCounts = { devices: 0, visitors: 0, users: 0 };
        const newCharts = { visitor: [], device: [], user: [] };

        if (userRole === "SUPERUSER" || userRole === "ADMIN") {
          fetchPromises.push(
            getDevices('', 1, 1).then(res => {
              newCounts.devices = res.total || 0;
            })
          );
        }

        if (userRole === "SUPERUSER" || userRole === "RECEPTIONIST") {
          fetchPromises.push(
            getVisitors('', 1, 1).then(res => {
              newCounts.visitors = res.total || 0;
            })
          );
        }

        if (userRole === "SUPERUSER") {
          fetchPromises.push(
            getUsers('', 1, 1).then(res => {
              newCounts.users = res.total || 0;
            })
          );
        }

        if (userRole === "SUPERUSER" || userRole === "RECEPTIONIST") {
          fetchPromises.push(
            getVisitorStats().then(data => {
              newCharts.visitor = data;
            })
          );
        }

        if (userRole === "SUPERUSER" || userRole === "ADMIN") {
          fetchPromises.push(
            getDeviceUsage().then(data => {
              newCharts.device = data;
            })
          );
        }

        if (userRole === "SUPERUSER") {
          fetchPromises.push(
            getUserRoles().then(data => {
              newCharts.user = data;
            })
          );
        }

        await Promise.all(fetchPromises);
        setCounts(newCounts);
        setCharts(newCharts);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    setNow(new Date());

    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const visibleCards = [
    (role === "SUPERUSER" || role === "ADMIN") && 'devices',
    (role === "SUPERUSER" || role === "RECEPTIONIST") && 'visitors',
    role === "SUPERUSER" && 'users'
  ].filter(Boolean).length;

  const visibleCharts = [
    (role === "SUPERUSER" || role === "RECEPTIONIST") && 'visitor',
    (role === "SUPERUSER" || role === "ADMIN") && 'device',
    role === "SUPERUSER" && 'user'
  ].filter(Boolean).length;

  const cardsGridClass = visibleCards === 1 ? 'grid-cols-1 max-w-md mx-auto' :
    visibleCards === 2 ? 'grid-cols-1 sm:grid-cols-2' :
      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const chartsGridClass = visibleCharts === 1 ? 'grid-cols-1 max-w-md mx-auto' :
    visibleCharts === 2 ? 'grid-cols-1 md:grid-cols-2' :
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, <span className="text-blue-500">{loading ? '...' : (role || 'User')}</span>!
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

      <div className={`grid ${cardsGridClass} gap-6`}>
        {loading ? (
          Array.from({ length: visibleCards || 3 }).map((_, i) => (
            <SkeletonCard key={`card-skeleton-${i}`} />
          ))
        ) : (
          <>
            {(role === "SUPERUSER" || role === "ADMIN") && (
              <SummaryCard
                title="Devices"
                value={counts.devices}
                icon={<FiTablet size={20} className="text-blue-500" />}
                color="from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/10"
                href="/dashboard/devices"
              />
            )}

            {(role === "SUPERUSER" || role === "RECEPTIONIST") && (
              <SummaryCard
                title="Visitors"
                value={counts.visitors}
                icon={<FiUser size={20} className="text-green-500" />}
                color="from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-900/10"
                href="/dashboard/visitors"
              />
            )}

            {role === "SUPERUSER" && (
              <SummaryCard
                title="Users"
                value={counts.users}
                icon={<FiUsers size={20} className="text-purple-500" />}
                color="from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-900/10"
                href="/dashboard/users"
              />
            )}
          </>
        )}
      </div>

      <div className={`grid ${chartsGridClass} gap-6`}>
        {loading ? (
          Array.from({ length: visibleCharts || 3 }).map((_, i) => (
            <SkeletonChart key={`chart-skeleton-${i}`} />
          ))
        ) : (
          <>
            {(role === "SUPERUSER" || role === "RECEPTIONIST") && (
              <ChartCard title="Visitor Trends">
                <VisitorChart data={charts.visitor} />
              </ChartCard>
            )}

            {(role === "SUPERUSER" || role === "ADMIN") && (
              <ChartCard title="Device Usage">
                <DeviceUsageChart data={charts.device} />
              </ChartCard>
            )}

            {role === "SUPERUSER" && (
              <ChartCard title="User Roles">
                <UserRoleChart data={charts.user} />
              </ChartCard>
            )}
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

function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-[300px] animate-pulse"
    >
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-[200px] w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </motion.div>
  );
}