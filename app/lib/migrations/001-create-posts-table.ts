import { sql } from "@vercel/postgres";

export async function createPostsTable() {
  try {
    console.log('Creating posts table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        summary TEXT,
        published BOOLEAN DEFAULT false,
        published_at TIMESTAMP WITH TIME ZONE,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log('✅ Posts table created successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to create posts table:', error);
    return { success: false, error };
  }
} 