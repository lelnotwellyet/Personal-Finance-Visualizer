import { Schema, model, models } from 'mongoose';

export interface Budget {
  category: string;
  budgetAmount: number;
  monthYear: string; 
}

const BudgetSchema = new Schema({
  category: { 
    type: String, 
    required: true,
    enum: ["Food", "Rent", "Transport", "Entertainment", "Utilities"]
  },
  budgetAmount: { type: Number, required: true, min: 0 },
  monthYear: { type: String, required: true }
});

export default models.Budget || model('Budget', BudgetSchema);