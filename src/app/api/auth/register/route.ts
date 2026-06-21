export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return Response.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // In production, this would hash the password and insert into Neon DB
    // const hashedPassword = await bcrypt.hash(password, 12);
    // const user = await db.insert(users).values({ ... });

    return Response.json(
      {
        message: 'Registration endpoint ready. Connect Neon database to enable.',
        user: { email, name },
      },
      { status: 201 }
    );
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
