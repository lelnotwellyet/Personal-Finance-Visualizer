import { NextResponse } from 'next/server';
import{dbConnect }from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    
    if (!updatedTransaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedTransaction);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(params.id);
    
    if (!deletedTransaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Transaction deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}