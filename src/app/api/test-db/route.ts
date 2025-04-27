import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';

export async function GET() {
  try {
    const conn = await dbConnect();
    
    // Proper way to access the database name
    return NextResponse.json({
      status: 'Connected',
      dbName: conn.connection.name // Changed from conn.db.databaseName
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Connection failed' },
      { status: 500 }
    );
  }
}