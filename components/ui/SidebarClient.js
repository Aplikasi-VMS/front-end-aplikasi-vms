'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiHome,
  FiMonitor,
  FiUsers,
  FiClipboard,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { logoutAction } from '@/lib/actions/authActions';

const NavItem = ({ href, icon, text, collapsed, active }) => (
  <div className={`mb-2 group ${active ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg transition-colors duration-200`}>
    <Link href={href} className={`flex items-center p-3 ${collapsed ? 'justify-center' : 'space-x-3'}`}>
      <span className={`${active ? 'text-blue-400' : 'text-gray-300'} group-hover:text-white text-lg`}>
        {icon}
      </span>
      {!collapsed && (
        <span className={`${active ? 'text-white' : 'text-gray-300'} group-hover:text-white`}>
          {text}
        </span>
      )}
    </Link>
  </div>
);

export default function SidebarClient({ activePage = "Home", role }) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      href: "/dashboard",
      icon: <FiHome />,
      text: "Dashboard",
      active: activePage === "Dashboard",
      visible: true
    },
    {
      href: "/dashboard/devices",
      icon: <FiMonitor />,
      text: "Devices",
      active: activePage === "Devices",
      visible: (role === 'ADMIN' || role === 'SUPERUSER')
    },
    {
      href: "/dashboard/users",
      icon: <FiUsers />,
      text: "Users",
      active: activePage === "Users",
      visible: role === 'SUPERUSER'
    },
    {
      href: "/dashboard/visitors",
      icon: <FiClipboard />,
      text: "Visitors",
      active: activePage === "Visitors",
      visible: (role === 'RECEPTIONIST' || role === 'SUPERUSER')
    },
    {
      href: "/dashboard/settings",
      icon: <FiSettings />,
      text: "Settings",
      active: activePage === "Settings",
      visible: true
    }
  ];

  return (
    <div className={`flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">VMS</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-700"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8 px-2">
        {navItems.map((item) =>
          item.visible && (
            <NavItem
              key={item.text}
              href={item.href}
              icon={item.icon}
              text={item.text}
              collapsed={collapsed}
              active={item.active}
            />
          )
        )}
      </nav>

      {/* Logout */}
      <div className={`p-4 border-t border-gray-700 ${collapsed ? 'flex justify-center' : ''}`}>
        <form action={logoutAction}>
          <button
            className={`flex items-center space-x-2 text-gray-300 hover:text-white ${collapsed ? 'justify-center w-full' : ''}`}
          >
            <FiLogOut className="text-lg" />
            {!collapsed && <span>Logout</span>}
          </button>
        </form>
      </div>
    </div>
  );
}