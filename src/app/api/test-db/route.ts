import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';

export async function GET() {
  try {
    const conn = await dbConnect();
    
    
    return NextResponse.json({
      status: 'Connected',
      dbName: conn.connection.name 
    });
    
  } catch  {
    return NextResponse.json(
      { error: 'Connection failed' },
      { status: 500 }
    );
  }
}