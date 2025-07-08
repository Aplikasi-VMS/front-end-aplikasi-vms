"use client";

import { FiSearch, FiBell, FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const UserDropdown = () => (
  <div className="relative group">
    <button className="flex items-center space-x-2 focus:outline-none">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
        A
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
      <FiChevronDown className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors" />
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 hidden group-hover:block border border-gray-200 dark:border-gray-700 z-20">
      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <FiUser className="mr-2 w-4 h-4" />
        Profile
      </a>
      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <FiSettings className="mr-2 w-4 h-4" />
        Settings
      </a>
      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <FiLogOut className="mr-2 w-4 h-4" />
        Logout
      </a>
    </div>
  </div>
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Overview</h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-label="Search"
          >
            <FiSearch className="w-5 h-5" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors relative"
            aria-label="Notifications"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}