import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { orders, tickets, competitions, winners } from '@/lib/db/schema';
import { eq, sql, and } from 'drizzle-orm';

export async function GET() {
  const user = await getSession();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [stats] = await db
      .select({
        totalEntries: sql<number>`coalesce((select count(*) from tickets where tickets.user_id = ${user.id}), 0)::int`,
        totalSpent: sql<number>`coalesce((select sum(total_pence) from orders where orders.user_id = ${user.id} and orders.status = 'paid'), 0)::int`,
        wins: sql<number>`coalesce((select count(*) from winners where winners.user_id = ${user.id}), 0)::int`,
      })
      .from(sql`(select 1) as _dummy`);

    const recentOrders = await db
      .select({
        id: orders.id,
        quantity: orders.quantity,
        createdAt: orders.createdAt,
        status: orders.status,
        competitionTitle: competitions.title,
        competitionStatus: competitions.status,
      })
      .from(orders)
      .innerJoin(competitions, eq(orders.competitionId, competitions.id))
      .where(and(eq(orders.userId, user.id), eq(orders.status, 'paid')))
      .orderBy(sql`${orders.createdAt} desc`)
      .limit(10);

    return Response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      stats: {
        totalEntries: stats.totalEntries,
        totalSpent: stats.totalSpent,
        wins: stats.wins,
      },
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        competition: o.competitionTitle,
        tickets: o.quantity,
        date: o.createdAt,
        status: o.competitionStatus === 'drawn' ? 'drawn' : 'active',
      })),
    });
  } catch (error) {
    console.error('Account data error:', error);
    return Response.json({ error: 'Failed to load account data' }, { status: 500 });
  }
}
