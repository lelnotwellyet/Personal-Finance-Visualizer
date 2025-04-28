import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Budget from '@/models/Budget';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    
   
    if (!body.category || !body.budgetAmount || !body.monthYear) {
      return NextResponse.json(
        { error: "All fields are required: category, amount, month" },
        { status: 400 }
      );
    }

    if (typeof body.budgetAmount !== 'number' || body.budgetAmount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

   
    if (!/^(0[1-9]|1[0-2])-\d{4}$/.test(body.monthYear)) {
      return NextResponse.json(
        { error: "Invalid date format. Use MM-YYYY (e.g., 04-2025)" },
        { status: 400 }
      );
    }

    const newBudget = await Budget.create(body);
    return NextResponse.json(newBudget, { status: 201 });

  } catch (error) {
    console.error('Budget API Error:', error);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  try {
    const budgets = await Budget.find();
    return NextResponse.json(budgets);
  } catch  {
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}