'use server'

import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Utility: get token header
const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return {
    Authorization: `Bearer ${token}`,
  };
};

const handleAxiosError = (error, route) => {
  console.error(`${route} error:`, error);

  if (error.response && error.response.data && error.response.data.error) {
    const err = new Error(error.response.data.error);
    err.response = error.response;
    throw err;
  }

  throw new Error('Terjadi kesalahan koneksi ke server.');
};

export const getDevices = async (search = '', page = 1, limit = 10) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.get(`${API_URL}/devices`, {
      params: { search, page, limit },
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'GET /api/devices');
  }
};

export const getDeviceById = async (id) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.get(`${API_URL}/devices/${id}`, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'GET /api/devices/[id]');
  }
};

export const createDevice = async (body) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.post(`${API_URL}/devices`, body, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'POST /api/devices');
  }
};

export const updateDevice = async (id, body) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.put(`${API_URL}/devices/${id}`, body, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'PUT /api/devices/[id]');
  }
};

export const deleteDevice = async (id) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.delete(`${API_URL}/devices/${id}`, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'DELETE /api/devices/[id]');
  }
};
