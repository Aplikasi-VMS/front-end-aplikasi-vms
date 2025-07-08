'use server'

import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateUser = async (id, body) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const response = await axios.put(`${API_URL}/users/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('PUT /api/users/[id] error:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const response = await axios.delete(`${API_URL}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('DELETE /api/users/[id] error:', error);
        throw error;
    }
};

export const getUsers = async (search = '', page = 1, limit = 10) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    console.log('token from cookies:', token);

    try {
        const response = await axios.get(`${API_URL}/users`, {
            params: { search, page, limit },
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('GET /api/users error:', error);
        throw error;
    }
};

export const createUser = async (body) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const response = await axios.post(`${API_URL}/users`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('POST /api/users error:', error);
        throw error;
    }
};

export const getUserById = async (id) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    console.log('token from cookies:', token);

    try {
        const response = await axios.get(`${API_URL}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('GET /api/users/[id] error:', error);
        throw error;
    }
};
