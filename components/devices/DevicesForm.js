'use client';

import { useState } from "react";
import { createDevice, updateDevice } from "@/lib/actions/deviceActions";
import MessageModal from "../ui/MessageModal";
import { redirect } from "next/navigation";
import { FiSave, FiLoader } from "react-icons/fi";

export default function DeviceForm({ mode = 'create', device = {} }) {
  const [name, setName] = useState(device.name || '');
  const [deviceKey, setDeviceKey] = useState(device.deviceKey || '');
  const [location, setLocation] = useState(device.location || '');
  const [groupId, setGroupId] = useState(device.groupId || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const isEdit = mode === 'edit';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isEdit) {
        await updateDevice(device.id, { name, deviceKey, location, groupId });
        setMessage(`Device berhasil diperbarui!`);
      } else {
        await createDevice({ name, deviceKey, location, groupId });
        setMessage(`Device berhasil dibuat!`);
      }
      setTimeout(handleSuccess, 500);
    } catch (error) {
      setMessage(error.message || 'Gagal menyimpan visitor. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    redirect('/dashboard/devices')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 w-full">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-[50vw] border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isEdit ? "Edit Device" : "Tambah Perangkat Baru"}
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama Perangkat
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Masukkan nama perangkat"
            />
          </div>

          <div>
            <label htmlFor="deviceKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kunci Perangkat
            </label>
            <input
              id="deviceKey"
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              value={deviceKey}
              onChange={(e) => setDeviceKey(e.target.value)}
              required
              placeholder="Masukkan kunci perangkat unik"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lokasi
            </label>
            <input
              id="location"
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Masukkan lokasi perangkat"
            />
          </div>

          <div>
            <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Group ID
            </label>
            <input
              id="groupId"
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              required
              placeholder="Masukkan device groupId"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <FiSave />
              <span>{isEdit ? "Perbarui Perangkat" : "Buat Perangkat"}</span>
            </>
          )}
        </button>
      </form>

      <MessageModal message={message} onClose={() => setMessage('')} />
    </div>
  );
}