import { NextResponse } from 'next/server';
import { runMigrations } from '../../lib/migrations';
import { auth } from '../../lib/auth';

export async function GET() {
  try {
    // Check environment to ensure migrations aren't run inadvertently
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // In production or staging, require authentication
    if (!isDevelopment) {
      const session = await auth();
      
      // If no session, return unauthorized
      if (!session) {
        return NextResponse.json({ 
          message: 'Unauthorized access' 
        }, { status: 401 });
      }
      
      // Optional: Check for admin rights using email or role
      // This assumes you have an ADMIN_EMAIL env variable or similar
      const isAdmin = session.user.email === process.env.ALLOWED_EMAIL;
      
      if (!isAdmin) {
        return NextResponse.json({ 
          message: 'Admin access required' 
        }, { status: 403 });
      }
    }
    
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