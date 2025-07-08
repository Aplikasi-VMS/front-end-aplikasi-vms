'use server'

import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getVisitorStats = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const res = await axios.get(`${API_URL}/stats/visitors`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return res.data.data;
    } catch (error) {
        console.error('GET /stats/visitors error:', error);
        throw error;
    }
};

export const getDeviceUsage = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const res = await axios.get(`${API_URL}/stats/devices`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return res.data.data;
    } catch (error) {
        console.error('GET /stats/devices error:', error);
        throw error;
    }
};

export const getUserRoles = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const res = await axios.get(`${API_URL}/stats/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return res.data.data;
    } catch (error) {
        console.error('GET /stats/users error:', error);
        throw error;
    }
};