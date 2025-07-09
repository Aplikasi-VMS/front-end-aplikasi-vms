'use client';

import { useState } from "react";
import { createVisitor, updateVisitor } from "@/lib/actions/visitorActions";
import MessageModal from "../ui/MessageModal";
import { redirect } from "next/navigation";
import { FiSave, FiLoader } from "react-icons/fi";

export default function VisitorForm({ mode = 'create', visitor = {} }) {
  const [name, setName] = useState(visitor.name || '');
  const [idcardNum, setIdcardNum] = useState(visitor.idcardNum || '');
  const [imgBase64, setImgBase64] = useState(visitor.imgBase64 || '');
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [type, setType] = useState(visitor.type || 1);
  const [passtime, setPassTime] = useState(visitor.passtime || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const isEdit = mode === 'edit';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setImgBase64(base64String);
      setNewImageSelected(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = { name, idcardNum, imgBase64, type: Number(type), passtime };

      if (isEdit) {
        await updateVisitor(visitor.id, payload);
        setMessage(`Visitor berhasil diperbarui!`);
      } else {
        await createVisitor(payload);
        setMessage(`Visitor berhasil dibuat!`);
      }

      setTimeout(handleSuccess, 500);
    } catch (error) {
       setMessage(error.message || 'Gagal menyimpan visitor. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    redirect('/dashboard/visitors');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 w-full">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-[50vw] border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isEdit ? "Edit Visitor" : "Tambah Visitor Baru"}
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama Visitor
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Masukkan nama visitor"
            />
          </div>

          <div>
            <label htmlFor="idcardNum" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nomor ID Card (Unik)
            </label>
            <input
              id="idcardNum"
              type="text"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={idcardNum}
              onChange={(e) => setIdcardNum(e.target.value)}
              required
              placeholder="Masukkan nomor ID Card unik"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type Visitor
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            >
              <option value={1}>Wajah</option>
              <option value={2}>Kartu IC</option>
              <option value={3}>Wajah dan Kartu IC</option>
            </select>
          </div>

          <div>
            <label htmlFor="passtime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pass Time
            </label>
            <input
              id="passtime"
              type="text"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={passtime}
              onChange={(e) => setPassTime(e.target.value)}
              placeholder="Contoh 09:00:00,11:00:00 "
            />
          </div>

          <div>
            <label htmlFor="imgBase64" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Foto Visitor
            </label>

            {imgBase64 && !newImageSelected && (
              <div className="mb-2">
                <img
                  src={`data:image/jpeg;base64,${imgBase64}`}
                  alt="Preview"
                  className="h-24 rounded"
                />
              </div>
            )}

            <input
              id="imgBase64"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required={!isEdit}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <FiSave />
              <span>{isEdit ? "Perbarui Visitor" : "Buat Visitor"}</span>
            </>
          )}
        </button>
      </form>

      <MessageModal message={message} onClose={() => setMessage('')} />
    </div>
  );
}
