import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { signToken, setAuthCookie } from '@/lib/auth';
import { sendSignupNotification } from '@/lib/email';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phone } = body;

    if (!email || !password || !firstName || !lastName) {
      return Response.json(
        { error: 'First name, last name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      return Response.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const id = uuid();
    const name = `${firstName} ${lastName}`;
    const passwordHash = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      id,
      email: email.toLowerCase(),
      passwordHash,
      name,
      phone: phone || null,
      role: 'user',
    });

    // Send signup notification emails (non-blocking)
    sendSignupNotification({
      customerName: name,
      customerEmail: email.toLowerCase(),
      phone: phone || undefined,
    }).catch((err) => console.error('Signup notification email failed:', err));

    const token = signToken({ userId: id, email: email.toLowerCase(), role: 'user' });
    const cookie = setAuthCookie(token);

    const response = Response.json(
      { user: { id, email: email.toLowerCase(), name, role: 'user' } },
      { status: 201 }
    );

    response.headers.set(
      'Set-Cookie',
      `${cookie.name}=${cookie.value}; Path=${cookie.options.path}; Max-Age=${cookie.options.maxAge}; HttpOnly; SameSite=${cookie.options.sameSite}${cookie.options.secure ? '; Secure' : ''}`
    );

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
