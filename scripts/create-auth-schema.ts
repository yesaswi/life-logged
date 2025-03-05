import { config } from 'dotenv';
import * as path from 'path';
import { neon } from "@neondatabase/serverless";

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

async function main() {
  try {
    console.log('Connecting to database...');
    const sql = neon(process.env.DATABASE_URL!);

    console.log('Creating auth tables...');
    // Execute each SQL statement separately
    const statements = [
      // Create users table
      `CREATE TABLE IF NOT EXISTS "user" (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        "emailVerified" TIMESTAMP WITH TIME ZONE,
        image TEXT
      )`,

      // Create account table
      `CREATE TABLE IF NOT EXISTS account (
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        PRIMARY KEY (provider, "providerAccountId")
      )`,

      // Create session table
      `CREATE TABLE IF NOT EXISTS session (
        "sessionToken" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        expires TIMESTAMP WITH TIME ZONE NOT NULL
      )`,

      // Create verification token table
      `CREATE TABLE IF NOT EXISTS "verificationToken" (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires TIMESTAMP WITH TIME ZONE NOT NULL,
        PRIMARY KEY (identifier, token)
      )`
    ];

    console.log('Running auth schema migrations...');
    for (const statement of statements) {
      await sql(statement);
      console.log('✅ Executed statement successfully');
    }
    
    console.log('✅ Auth schema migrations completed successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main(); 