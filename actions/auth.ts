'use server';

import { cookies } from 'next/headers';

export async function setCookies(data: { [key: string]: string }) {
  const cookieStore = await cookies();
  Object.entries(data).forEach(([key, value]) => {
    cookieStore.set(key, value, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
  });
}

export async function clearCookies() {
  const cookieStore = await cookies();
  ['username', 'email', 'role', 'token', 'id'].forEach((key) => {
    cookieStore.delete(key);
  });
}

export async function getCookies() {
  const cookieStore = await cookies();
  return {
    username: cookieStore.get('username')?.value || null,
    email: cookieStore.get('email')?.value || null,
    role: cookieStore.get('role')?.value || null,
    token: cookieStore.get('token')?.value || null,
    id: cookieStore.get('id')?.value || null
  };
}
