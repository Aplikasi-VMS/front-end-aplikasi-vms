'use client';

import { useEffect, useState } from "react";
import { getDevices } from "@/lib/actions/deviceActions";
import { getVisitors } from "@/lib/actions/visitorActions";
import { getUsers } from "@/lib/actions/userActions";
import { getVisitorStats, getDeviceUsage, getUserRoles } from "@/lib/actions/statsActions";
import { FiTablet, FiUsers, FiUser, FiClock, FiCalendar } from "react-icons/fi";
import VisitorChart from "@/components/charts/VisitorChart";
import DeviceUsageChart from "@/components/charts/DeviceUsageChart";
import UserRoleChart from "@/components/charts/UserRoleChart";
import SummaryCard from "@/components/SummaryCard";

export default function DashboardPage() {
  const [counts, setCounts] = useState({ devices: 0, visitors: 0, users: 0 });
  const [charts, setCharts] = useState({ visitor: [], device: [], user: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [devicesRes, visitorsRes, usersRes, visitorStats, deviceUsage, userRoles] = await Promise.all([
          getDevices('', 1, 1),
          getVisitors('', 1, 1),
          getUsers('', 1, 1),
          getVisitorStats(),
          getDeviceUsage(),
          getUserRoles()
        ]);

        setCounts({
          devices: devicesRes.total || devicesRes.data?.length || 0,
          visitors: visitorsRes.total || visitorsRes.data?.length || 0,
          users: usersRes.total || usersRes.data?.length || 0,
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
  }, []);

  const now = new Date();

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, <span className="text-blue-500">Admin</span>!
        </h1>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <FiCalendar className="mr-2" size={16} />
          <span>{now.toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <FiClock className="mr-2" size={16} />
          <span>{now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          title="Devices"
          value={counts.devices}
          icon={<FiTablet size={20} className="text-blue-500" />}
          color="bg-blue-100 dark:bg-blue-900/20"
          href="/dashboard/devices"
        />
        <SummaryCard
          title="Visitors"
          value={counts.visitors}
          icon={<FiUser size={20} className="text-green-500" />}
          color="bg-green-100 dark:bg-green-900/20"
          href="/dashboard/visitors"
        />
        <SummaryCard
          title="Users"
          value={counts.users}
          icon={<FiUsers size={20} className="text-purple-500" />}
          color="bg-purple-100 dark:bg-purple-900/20"
          href="/dashboard/users"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VisitorChart data={charts.visitor} />
        <DeviceUsageChart data={charts.device} />
        <UserRoleChart data={charts.user} />
      </div>
    </div>
  );
}

