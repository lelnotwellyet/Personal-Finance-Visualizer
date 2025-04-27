import { NextResponse } from 'next/server';
import {dbConnect } from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const transaction = await Transaction.create(body);
  return NextResponse.json(transaction, { status: 201 });
}