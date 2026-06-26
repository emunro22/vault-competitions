import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { users, orders, tickets } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET() {
  const user = await getSession();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        phone: users.phone,
        createdAt: users.createdAt,
        totalEntries: sql<number>`coalesce((select count(*) from tickets where tickets.user_id = users.id), 0)::int`,
        totalSpent: sql<number>`coalesce((select sum(total_pence) from orders where orders.user_id = users.id and orders.status = 'paid'), 0)::int`,
      })
      .from(users)
      .orderBy(sql`${users.createdAt} desc`);

    return Response.json({ users: allUsers });
  } catch (error) {
    console.error('Admin users error:', error);
    return Response.json({ error: 'Failed to load users' }, { status: 500 });
  }
}
