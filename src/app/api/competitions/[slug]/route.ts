import { competitions } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const competition = competitions.find((c) => c.slug === slug);

  if (!competition) {
    return Response.json({ error: 'Competition not found' }, { status: 404 });
  }

  return Response.json({ competition });
}
