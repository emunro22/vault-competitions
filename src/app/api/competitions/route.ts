import { competitions } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const featured = searchParams.get('featured');

  let result = [...competitions];

  if (category && category !== 'all') {
    result = result.filter((c) => c.category === category);
  }
  if (status) {
    result = result.filter((c) => c.status === status);
  }
  if (featured === 'true') {
    result = result.filter((c) => c.featured);
  }

  return Response.json({ competitions: result, total: result.length });
}
