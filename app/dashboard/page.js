'use client';

import { useEffect, useState } from "react";
import { getDevices } from "@/lib/actions/deviceActions";
import { getVisitors } from "@/lib/actions/visitorActions";
import { getUsers } from "@/lib/actions/userActions";
import { FiTablet, FiUsers, FiUser, FiClock, FiCalendar, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    devices: 0,
    visitors: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [devicesRes, visitorsRes, usersRes] = await Promise.all([
          getDevices('', 1, 1),
          getVisitors('', 1, 1),
          getUsers('', 1, 1)
        ]);

        setCounts({
          devices: devicesRes.total || devicesRes.data?.length || 0,
          visitors: visitorsRes.total || visitorsRes.data?.length || 0,
          users: usersRes.total || usersRes.data?.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
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

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow animate-pulse">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
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

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickLink
                href="/dashboard/devices"
                text="Manage Devices"
                icon={<FiTablet size={18} />}
              />
              <QuickLink
                href="/dashboard/visitors"
                text="Manage Visitors"
                icon={<FiUser size={18} />}
              />
              <QuickLink
                href="/dashboard/users"
                text="Manage Users"
                icon={<FiUsers size={18} />}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon, color, href }) {
  return (
    <Link href={href} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-lg ${color}`}>
            {icon}
          </div>
          <FiArrowRight size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
        <div className="mt-4">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
      </div>
    </Link>
  );
}

function QuickLink({ href, text, icon }) {
  return (
    <Link href={href} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 transition-all duration-200 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-blue-500">
              {icon}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">{text}</span>
          </div>
          <FiArrowRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>
    </Link>
  );
}