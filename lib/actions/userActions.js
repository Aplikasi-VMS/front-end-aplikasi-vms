'use server'

import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export const getUsers = async (search = '', page = 1, limit = 10) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { search, page, limit },
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'GET /api/users');
  }
};

export const getUserById = async (id) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'GET /api/users/[id]');
  }
};

export const createUser = async (body) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.post(`${API_URL}/users`, body, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'POST /api/users');
  }
};

export const updateUser = async (id, body) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.put(`${API_URL}/users/${id}`, body, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'PUT /api/users/[id]');
  }
};

export const deleteUser = async (id) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'DELETE /api/users/[id]');
  }
};
