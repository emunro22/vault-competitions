import { db } from '@/lib/db';
import { competitions } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const featured = searchParams.get('featured');

  try {
    const conditions = [];

    if (category && category !== 'all') {
      conditions.push(eq(competitions.category, category));
    }
    if (status) {
      conditions.push(eq(competitions.status, status as 'live' | 'draft' | 'coming_soon' | 'sold_out' | 'drawn'));
    }
    if (featured === 'true') {
      conditions.push(eq(competitions.featured, true));
    }

    const result = await db
      .select()
      .from(competitions)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(sql`${competitions.createdAt} desc`);

    return Response.json({
      competitions: result.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        imageUrl: c.imageUrl || 'https://images.unsplash.com/photo-1642961597907-fc6fbff01720?w=800&h=600&fit=crop&q=80',
        prizeValue: c.prizeValue,
        cashAlternative: c.cashAlternative,
        ticketPrice: c.ticketPrice,
        totalTickets: c.totalTickets,
        ticketsSold: c.ticketsSold,
        drawDate: c.drawDate.toISOString(),
        category: c.category,
        status: c.status,
        featured: c.featured,
        maxPerPerson: c.maxPerPerson,
        minimumSoldPercentage: c.minimumSoldPercentage,
      })),
      total: result.length,
    });
  } catch (error) {
    console.error('Competitions fetch error:', error);
    return Response.json({ competitions: [], total: 0 });
  }
}
