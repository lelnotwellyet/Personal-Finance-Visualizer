'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

export default function TransactionList({ refreshKey }: { refreshKey: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
        console.error('Fetch error:', error);
        toast.error('Failed to load transactions');
        setTransactions([]); // Reset to empty array
      }
    };

    fetchTransactions();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Deletion failed');
      
      toast.success('Transaction deleted successfully');
      // Refresh the list
      const newData = transactions.filter(t => t._id !== id);
      setTransactions(newData);
    } catch {
      toast.error('Failed to delete transaction. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction._id} className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
