'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm'; // Correct default import
import TransactionList from '@/components/TransactionList';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import DashboardCards from '@/components/DashBoardCards';
import CategoryPieChart from '@/components/CategoryPieChart';
import { Transaction } from '@/models/Transaction';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions with categories
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]); // Ensure fallback on error
      }
    };
    fetchTransactions();
  }, [refreshKey]);

  // Prepare data for charts
  const categoryData = Object.entries(
    transactions.reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {})
  ).map(([category, total]) => ({ category, total }));

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Personal Finance Dashboard</h1>
      
      <DashboardCards transactions={transactions} />

      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionList refreshKey={refreshKey} />
          </div>
        </section>

        <section className="space-y-6">
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
