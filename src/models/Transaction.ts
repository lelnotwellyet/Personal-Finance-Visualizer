import { Schema, model, models } from 'mongoose';

export interface Transaction {
  _id: string; // Mongoose adds an _id field
  amount: number;
  date: Date;
  description: string;
  createdAt: Date;
}

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Transaction || model('Transaction', TransactionSchema);