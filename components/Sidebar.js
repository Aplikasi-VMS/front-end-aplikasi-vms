
'use client';

import { useEffect, useState } from 'react';
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
import NavItem from './ui/NavItem';

export default function Sidebar({ activePage = "Home" }) {

  const [role, setRole] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    async function fetchRole() {
      const response = await fetch('/api/user-role');
      const data = await response.json();
      const fetchedRoleValue = data.role;

      console.log("Fetched Role Value:", fetchedRoleValue);
      setRole(fetchedRoleValue);
    }
    fetchRole();
  }, [])

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