'use client';
import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import BudgetForm from '@/components/BudgetForm'; // Added
import TransactionList from '@/components/TransactionList';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import DashboardCards from '@/components/DashBoardCards';
import CategoryPieChart from '@/components/CategoryPieChart';
import BudgetChart from '@/components/BudgetChart'; // Added
import { Transaction } from '@/models/Transaction';
import { Budget } from '@/models/Budget';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, budgetsRes] = await Promise.all([
          fetch('/api/transactions'),
          fetch('/api/budgets')
        ]);
        
        if (!transactionsRes.ok || !budgetsRes.ok) throw new Error('Fetch error');
        
        setTransactions(await transactionsRes.json());
        setBudgets(await budgetsRes.json());
      } catch (error) {
        console.error('Fetch error:', error);
        setTransactions([]);
        setBudgets([]);
      }
    };
    fetchData();
  }, [refreshKey]);

  const categoryData = Object.entries(
    transactions.reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {})
  ).map(([category, total]) => ({ category, total }));

  // Prepare budget chart data
  const budgetChartData = budgets.map(budget => ({
    category: budget.category,
    budget: budget.budgetAmount,
    actual: categoryData.find(c => c.category === budget.category)?.total || 0
  }));

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Personal Finance Dashboard</h1>
      
      <DashboardCards transactions={transactions} budgets={budgets} />

      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Set Budgets</h2>
            <BudgetForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionList refreshKey={refreshKey} />
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Budget Analysis</h2>
            <BudgetChart data={budgetChartData} />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Spending Breakdown</h2>
            <CategoryPieChart data={categoryData} />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
            <MonthlyExpensesChart refreshKey={refreshKey} />
          </div>
        </section>
      </div>
    </div>
  );
}