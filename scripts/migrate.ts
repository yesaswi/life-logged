import { config } from 'dotenv';
import * as path from 'path';
import { runMigrations } from '../app/lib/migrations';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  try {
    await runMigrations();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main(); 