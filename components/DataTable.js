'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function DataTable({
  columns,
  data,
  page,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const [jumpPage, setJumpPage] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  const handleJumpPage = (e) => {
    e.preventDefault();
    const targetPage = parseInt(jumpPage);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      onPageChange(targetPage);
      setJumpPage('');
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="bg-white dark:bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-0">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{' '}
          <span className="font-medium">{Math.min(page * pageSize, totalItems)}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded-md flex items-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-gray-300 dark:border-gray-600"
            >
              <FiChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-3 py-1 border rounded-md flex items-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-gray-300 dark:border-gray-600"
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Jump to page */}
          <form onSubmit={handleJumpPage} className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              className="w-20 px-2 py-1 border rounded-md text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Page"
            />
            <button
              type="submit"
              className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
