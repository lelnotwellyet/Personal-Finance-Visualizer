// components/DashboardCards.tsx
import { Transaction } from '@/models/Transaction'; // Add this import

export default function DashboardCards({ transactions }: { transactions: Transaction[] }) {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  // Add type annotation to the accumulator
  const categoryTotals = transactions.reduce((acc: Record<string, number>, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals)
  .sort((a, b) => b[1] - a[1])[0]?.[0] 
  || "No categories yet"; // Fallback text

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
        <p className="text-2xl font-semibold">${totalExpenses.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Top Category</h3>
        <p className="text-2xl font-semibold">{topCategory}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Recent Transactions</h3>
        <p className="text-lg">
          {transactions.slice(0, 3).map(t => t.description).join(', ') || 'No recent transactions'}
        </p>
      </div>
    </div>
  );
}