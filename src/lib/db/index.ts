import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

function createDb() {
  if (!process.env.DATABASE_URL) {
    // Return a proxy that throws a clear error at query time, not at import time.
    // This lets the app build without DATABASE_URL set.
    return new Proxy({} as ReturnType<typeof drizzle>, {
      get(_, prop) {
        if (prop === 'then') return undefined;
        return () => {
          throw new Error('DATABASE_URL is not set. Configure it in your environment variables.');
        };
      },
    });
  }
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
}

export const db = createDb();
