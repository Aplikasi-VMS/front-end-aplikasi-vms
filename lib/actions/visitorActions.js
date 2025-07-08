'use server'

import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateVisitor = async (id, body) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await axios.put(`${API_URL}/visitors/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('PUT /api/visitors/[id] error:', error);
    throw error;
  }
};

export const deleteVisitor = async (id) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await axios.delete(`${API_URL}/visitors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('DELETE /api/visitors/[id] error:', error);
    throw error;
  }
};

export const getVisitors = async (search = '', page = 1, limit = 10) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log('token from cookies:', token);

  try {
    const response = await axios.get(`${API_URL}/visitors`, {
      params: { search, page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('GET /api/visitors error:', error);
    throw error;
  }
};

export const createVisitor = async (body) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await axios.post(`${API_URL}/visitors`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('POST /api/visitors error:', error);
    throw error;
  }
};

export const getVisitorById = async (id) => {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log('token from cookies:', token);

  try {
    const response = await axios.get(`${API_URL}/visitors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('GET /api/visitors/id error:', error);
    throw error;
  }
};

