import { NextResponse } from 'next/server';
import { runMigrations } from '../../lib/migrations';

export async function GET() {
  try {
    // This should only be run in development or by an authenticated admin
    // Add proper authentication in production
    
    await runMigrations();
    
    return NextResponse.json({ 
      message: 'Migrations completed successfully' 
    }, { status: 200 });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({ 
      message: 'Migration failed', 
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 