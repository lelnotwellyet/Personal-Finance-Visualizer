import { Schema, model, models } from 'mongoose';

export interface Transaction {
  _id: string;
  amount: number;
  date: Date;
  description: string;
  category: string; // New field
  createdAt: Date;
}

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  category: { 
    type: String,
    required: true,
    enum: ["Food", "Rent", "Transport", "Entertainment", "Utilities"]
  },
  createdAt: { type: Date, default: Date.now }
});

export default models.Transaction || model('Transaction', TransactionSchema);