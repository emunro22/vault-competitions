import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { tickets, orders, competitions } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function GET() {
  const user = await getSession();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userTickets = await db
      .select({
        ticketId: tickets.id,
        ticketNumber: tickets.ticketNumber,
        orderId: tickets.orderId,
        competitionId: competitions.id,
        competitionTitle: competitions.title,
        competitionSlug: competitions.slug,
        drawDate: competitions.drawDate,
        competitionStatus: competitions.status,
      })
      .from(tickets)
      .innerJoin(competitions, eq(tickets.competitionId, competitions.id))
      .innerJoin(orders, eq(tickets.orderId, orders.id))
      .where(and(eq(tickets.userId, user.id), eq(orders.status, 'paid')))
      .orderBy(sql`${competitions.drawDate} desc`);

    // Group by competition
    const grouped: Record<string, {
      competitionId: string;
      competition: string;
      slug: string;
      drawDate: string;
      status: string;
      ticketNumbers: number[];
    }> = {};

    for (const t of userTickets) {
      if (!grouped[t.competitionId]) {
        grouped[t.competitionId] = {
          competitionId: t.competitionId,
          competition: t.competitionTitle,
          slug: t.competitionSlug,
          drawDate: t.drawDate.toISOString(),
          status: t.competitionStatus === 'drawn' ? 'drawn' : 'active',
          ticketNumbers: [],
        };
      }
      grouped[t.competitionId].ticketNumbers.push(t.ticketNumber);
    }

    return Response.json({
      entries: Object.values(grouped),
    });
  } catch (error) {
    console.error('Tickets fetch error:', error);
    return Response.json({ error: 'Failed to load tickets' }, { status: 500 });
  }
}
