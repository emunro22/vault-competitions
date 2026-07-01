import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { categories, competitions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSession();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const [category] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    if (!category) {
      return Response.json({ error: 'Category not found' }, { status: 404 });
    }

    const [inUse] = await db
      .select({ id: competitions.id })
      .from(competitions)
      .where(eq(competitions.category, category.slug))
      .limit(1);

    if (inUse) {
      return Response.json(
        { error: `This category is used by existing competitions and can't be deleted. Reassign those competitions first.` },
        { status: 409 }
      );
    }

    await db.delete(categories).where(eq(categories.id, id));
    return Response.json({ success: true });
  } catch (error) {
    console.error('Delete category error:', error);
    return Response.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
