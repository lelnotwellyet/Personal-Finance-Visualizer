import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Transaction from '@/models/Transaction';


export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const body = await request.json();
    const validCategories = ["Food", "Rent", "Transport", "Entertainment", "Utilities"];

    
    if (!validCategories.includes(body.category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
    if (typeof body.amount !== 'number' || body.amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const newTransaction = await Transaction.create(body);
    return NextResponse.json(newTransaction, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}


export async function GET() {
  await dbConnect();
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch  {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}