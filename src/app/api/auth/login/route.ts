export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In production, this would verify against Neon DB
    // const user = await db.select().from(users).where(eq(users.email, email));
    // const valid = await bcrypt.compare(password, user.passwordHash);
    // const token = jwt.sign({ userId: user.id }, process.env.NEXTAUTH_SECRET);

    return Response.json(
      {
        message: 'Login endpoint ready. Connect Neon database to enable.',
      },
      { status: 200 }
    );
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
