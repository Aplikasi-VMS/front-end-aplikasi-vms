'use client'

import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          Aplikasi <span className="text-blue-600 dark:text-blue-400">VMS</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Visitor Management System yang memudahkan pengelolaan tamu dan kunjungan
        </p>
      </div>

      <Link
        href="/login"
        className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-lg font-medium text-white rounded-lg shadow-2xl transition-all duration-300 ease-out bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
      >
        <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-out bg-white dark:bg-gray-900 rounded-lg opacity-10 group-hover:opacity-0"></span>
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
        <span className="relative flex items-center gap-2">
          <FiLogIn />
          Masuk
        </span>
      </Link>

      <footer className="absolute bottom-6 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Ibnu Topan Adib. All rights reserved.
      </footer>
    </div>
  );
}