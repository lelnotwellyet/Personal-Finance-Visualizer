import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } } 
) {
  await dbConnect();
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(params.id);

    if (!deletedTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedTransaction);
  } catch  {
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}