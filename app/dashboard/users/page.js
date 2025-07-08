'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DataTable from "@/components/DataTable";
import { getUsers, deleteUser } from '@/lib/actions/userActions';
import SearchInput from "@/components/ui/SearchInput";
import { debounce } from "lodash";
import { FiTrash2, FiLoader, FiPlus, FiEdit } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { useRouter } from 'next/navigation';
import MessageModal from '@/components/ui/MessageModal';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const fetchUsers = async (searchVal = search, pageVal = page, limitVal = limit) => {
    setLoading(true);
    setError('');
    try {
      const res = await getUsers(searchVal, pageVal, limitVal);
      setUsers(res.data);
      setTotalItems(res.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchUsers(search, 1, limit);
      setPage(1);
    }, 500);

    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [search, limit]);

  useEffect(() => {
    fetchUsers(search, page, limit);
  }, [page, limit]);

  const handleSearch = (value) => {
    setSearch(value);
  };


  const columns = useMemo(() => [
    {
      header: 'No.',
      cell: ({ row }) => (
        <span className="text-gray-500 dark:text-gray-400">
          {(page - 1) * limit + row.index + 1}
        </span>
      ),
    },
    {
      header: 'User Name',
      accessorKey: 'name',
      cell: ({ getValue }) => (
        <span className="font-medium dark:text-white">{getValue()}</span>
      ),
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ getValue }) => (
        <span className="text-gray-600 dark:text-gray-300">{getValue()}</span>
      ),
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: ({ getValue }) => (
        <span className="text-gray-600 dark:text-gray-300">{getValue() || '-'}</span>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        return (
          <span className="text-gray-600 dark:text-gray-300">
            {date.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdate(row.original.id)}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <FiEdit className="w-4 h-4" />
            <span>Update</span>
          </button>

          <button
            onClick={() => handleDelete(row.original.id)}
            className="flex items-center gap-1 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      ),
    },
  ], [page, limit]);


  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this device?')) return;

    try {
      await deleteUser(id);
      setMessage(`Users berhasil dihapus`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete device');
    }
  };

  const handleCloseModal = () => {
    setMessage('');
    fetchUsers(search, page, limit);
  };


  const handleAddDevice = () => {
    router.push('users/create');
  };

  const handleUpdate = (id) => {

    router.push(`users/edit/${id}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage all your users</p>
        </div>
        <Button onClick={handleAddDevice} className="flex items-center gap-2">
          <FiPlus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search by user name or role"
            className="flex-grow max-w-md"
          />
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="text-red-500 dark:text-red-300">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FiLoader className="animate-spin text-blue-500 text-2xl" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading users...</span>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={users}
            page={page}
            pageSize={limit}
            totalItems={totalItems}
            onPageChange={setPage}
          />
        )}
      </div>
      <MessageModal message={message} onClose={handleCloseModal} />
    </div>
  );
}