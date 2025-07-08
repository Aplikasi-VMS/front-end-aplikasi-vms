"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  const email = formData.get("email") ;
  const password = formData.get("password");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Login failed");

  const { token, user } = data.data;
  if (!token) throw new Error("No token returned");
  if (!user?.role) throw new Error("No user role returned");


  cookies().set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 86400,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().delete("token");
  redirect("/login");
}