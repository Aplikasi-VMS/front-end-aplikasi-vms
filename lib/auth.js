import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function getUserRoleServer() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.role || null;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}
