import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { slugify } from '@/lib/utils';

export async function GET() {
  const user = await getSession();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await db.select().from(categories).orderBy(asc(categories.name));
  return Response.json({ categories: result });
}

export async function POST(request: Request) {
  const user = await getSession();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, icon } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return Response.json({ error: 'Category name is required' }, { status: 400 });
    }

    const slug = slugify(name);
    if (!slug) {
      return Response.json({ error: 'Category name must contain letters or numbers' }, { status: 400 });
    }

    const [existing] = await db.select({ id: categories.id }).from(categories).where(eq(categories.slug, slug)).limit(1);
    if (existing) {
      return Response.json({ error: 'A category with this name already exists' }, { status: 409 });
    }

    const id = uuid();
    await db.insert(categories).values({
      id,
      name: name.trim(),
      slug,
      icon: icon && typeof icon === 'string' && icon.trim() ? icon.trim() : '🏆',
    });

    return Response.json({ id, slug }, { status: 201 });
  } catch (error) {
    console.error('Create category error:', error);
    return Response.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
