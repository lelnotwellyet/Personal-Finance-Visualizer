'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BudgetChart({ data }: { 
  data: Array<{
    category: string;
    budget: number;
    actual: number;
  }> 
}) {
  if (data.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-500">
        Set budgets to see comparison
      </div>
    );
  }

  return (
    <div className="h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Budget vs Actual Spending</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#6366f1" name="Budget" />
          <Bar dataKey="actual" fill="#10b981" name="Actual Spending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}