import { clearAuthCookie } from '@/lib/auth';

export async function POST() {
  const cookie = clearAuthCookie();

  const response = Response.json({ success: true });
  response.headers.set(
    'Set-Cookie',
    `${cookie.name}=${cookie.value}; Path=${cookie.options.path}; Max-Age=${cookie.options.maxAge}; HttpOnly; SameSite=${cookie.options.sameSite}${cookie.options.secure ? '; Secure' : ''}`
  );

  return response;
}
