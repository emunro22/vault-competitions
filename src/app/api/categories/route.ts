import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db.select().from(categories).orderBy(asc(categories.name));
    return Response.json({ categories: result });
  } catch (error) {
    console.error('Categories fetch error:', error);
    return Response.json({ categories: [] });
  }
}
