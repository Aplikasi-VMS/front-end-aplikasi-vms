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

export const getVisitors = async (search = '', page = 1, limit = 10) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.get(`${API_URL}/visitors`, {
      params: { search, page, limit },
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'GET /api/visitors');
  }
};

export const getVisitorById = async (id) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.get(`${API_URL}/visitors/${id}`, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'GET /api/visitors/[id]');
  }
};

export const createVisitor = async (body) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.post(`${API_URL}/visitors`, body, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'POST /api/visitors');
  }
};

export const updateVisitor = async (id, body) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.put(`${API_URL}/visitors/${id}`, body, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'PUT /api/visitors/[id]');
  }
};

export const deleteVisitor = async (id) => {
  const headers = await getAuthHeader();

  try {
    const response = await axios.delete(`${API_URL}/visitors/${id}`, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'DELETE /api/visitors/[id]');
  }
};
