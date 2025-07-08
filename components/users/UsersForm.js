'use client';

import { useState } from "react";
import { createUser, updateUser } from "@/lib/actions/userActions";
import MessageModal from "../ui/MessageModal";
import { redirect } from "next/navigation";
import { FiSave, FiLoader } from "react-icons/fi";

export default function UserForm({ mode = 'create', user = {} }) {
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(user.role || 'RECEPTIONIST');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const isEdit = mode === 'edit';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            if (isEdit) {
                await updateUser(user.id, { name, email, password, role });
                setMessage(`User berhasil diperbarui!`);
            } else {
                await createUser({ name, email, password, role });
                setMessage(`User berhasil dibuat!`);
            }
            setTimeout(handleSuccess, 500);
        } catch (error) {
            console.error("Submit failed:", error);
            setMessage("Gagal menyimpan user. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    const handleSuccess = () => {
        redirect('/dashboard/users')
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 w-full">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-[50vw] border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                    {isEdit ? "Edit User" : "Tambah User Baru"}
                </h2>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nama Lengkap
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Masukkan email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={isEdit ? "Kosongkan jika tidak diubah" : "Masukkan password"}
                            required={!isEdit}
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            required
                        >
                            <option value="SUPERUSER">SUPERUSER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="RECEPTIONIST">RECEPTIONIST</option>
                        </select>
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
                            <span>{isEdit ? "Perbarui User" : "Buat User"}</span>
                        </>
                    )}
                </button>
            </form>

            <MessageModal message={message} onClose={() => setMessage('')} />
        </div>
    );
}