'use client';

import { TransactionForm } from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import { useState } from 'react';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Personal Finance Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <TransactionForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionList refreshKey={refreshKey} />
        </section>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
        <MonthlyExpensesChart refreshKey={refreshKey} />
      </section>
    </div>
  );
}