'use server'

import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateDevice = async (id, body) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await axios.put(`${API_URL}/devices/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('PUT /api/devices/[id] error:', error);
    throw error;
  }
};

export const deleteDevice = async (id) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await axios.delete(`${API_URL}/devices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('DELETE /api/devices/[id] error:', error);
    throw error;
  }
};

export const getDevices = async (search = '', page = 1, limit = 10) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log('token from cookies:', token);

  try {
    const response = await axios.get(`${API_URL}/devices`, {
      params: { search, page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('GET /api/devices error:', error);
    throw error;
  }
};

export const createDevice = async (body) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await axios.post(`${API_URL}/devices`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('POST /api/devices error:', error);
    throw error;
  }
};

export const getDeviceById = async (id) => {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log('token from cookies:', token);

  try {
    const response = await axios.get(`${API_URL}/devices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('GET /api/devices/id error:', error);
    throw error;
  }
};