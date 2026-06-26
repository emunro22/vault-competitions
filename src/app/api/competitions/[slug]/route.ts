import { db } from '@/lib/db';
import { competitions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const [competition] = await db
      .select()
      .from(competitions)
      .where(eq(competitions.slug, slug))
      .limit(1);

    if (!competition) {
      return Response.json({ error: 'Competition not found' }, { status: 404 });
    }

    return Response.json({
      competition: {
        id: competition.id,
        title: competition.title,
        slug: competition.slug,
        description: competition.description,
        imageUrl: competition.imageUrl || 'https://images.unsplash.com/photo-1642961597907-fc6fbff01720?w=800&h=600&fit=crop&q=80',
        prizeValue: competition.prizeValue,
        cashAlternative: competition.cashAlternative,
        ticketPrice: competition.ticketPrice,
        totalTickets: competition.totalTickets,
        ticketsSold: competition.ticketsSold,
        drawDate: competition.drawDate.toISOString(),
        category: competition.category,
        status: competition.status,
        featured: competition.featured,
        maxPerPerson: competition.maxPerPerson,
        minimumSoldPercentage: competition.minimumSoldPercentage,
      },
    });
  } catch (error) {
    console.error('Competition fetch error:', error);
    return Response.json({ error: 'Failed to load competition' }, { status: 500 });
  }
}
