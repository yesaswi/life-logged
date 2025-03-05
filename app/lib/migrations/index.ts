import { createPostsTable } from './001-create-posts-table';

export async function runMigrations() {
  console.log('Running database migrations...');
  
  // Run migrations in sequence
  await createPostsTable();
  
  // Add more migrations here as they are created
  
  console.log('✅ All migrations completed successfully');
} 