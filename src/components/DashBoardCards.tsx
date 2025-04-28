import { Transaction } from '@/models/Transaction';
import { Budget } from '@/models/Budget';

interface BudgetStatus {
  [category: string]: 'over' | 'under';
}

interface DashboardCardsProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function DashboardCards({ transactions, budgets }: DashboardCardsProps) {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  const categoryTotals = transactions.reduce((acc: Record<string, number>, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const budgetStatus: BudgetStatus = budgets.reduce((acc, budget) => {
    const actual = categoryTotals[budget.category] || 0;
    acc[budget.category] = actual > budget.budgetAmount ? 'over' : 'under';
    return acc;
  }, {} as BudgetStatus);

  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]?.[0] 
    || "No categories yet";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Budget Status</h3>
        {Object.entries(budgetStatus).map(([category, status]) => (
          <p 
            key={category} 
            className={`text-sm ${status === 'over' ? 'text-red-600' : 'text-green-600'}`}
          >
            {category}: {status.toUpperCase()}
          </p>
        ))}
        {Object.keys(budgetStatus).length === 0 && (
          <p className="text-sm text-gray-500">No budgets set</p>
        )}
      </div>
    </div>
  );
}