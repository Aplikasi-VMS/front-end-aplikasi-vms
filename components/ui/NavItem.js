'use client';

import Link from 'next/link';


export default function NavItem({ href, icon, text, collapsed, active }) {
  return (
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
}

