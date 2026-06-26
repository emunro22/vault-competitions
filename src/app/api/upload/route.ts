import { put } from '@vercel/blob';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const user = await getSession();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get('file') as File | null;

  if (!file) {
    return Response.json({ error: 'No file provided' }, { status: 400 });
  }

  const blob = await put(`competitions/${Date.now()}-${file.name}`, file, {
    access: 'public',
  });

  return Response.json({ url: blob.url });
}
