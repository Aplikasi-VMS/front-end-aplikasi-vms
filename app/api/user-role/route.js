import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;


export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return null;
        const {role} = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({  role  });
    } catch (error) {
        console.error('API Error fetching user role:', error);
        return NextResponse.json({ error: 'Failed to fetch user role' }, { status: 500 });
    }
}