'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

interface ChartData {
  month: string;
  total: number;
}

export default function MonthlyExpensesChart({ refreshKey }: { refreshKey: number }) {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/transactions');
        const transactions: Transaction[] = await response.json();
        
        const monthlyData = transactions.reduce((acc: Record<string, number>, transaction) => {
          const date = new Date(transaction.date);
          const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
          acc[monthYear] = (acc[monthYear] || 0) + transaction.amount;
          return acc;
        }, {});

        const chartData = Object.entries(monthlyData).map(([month, total]) => ({
          month,
          total: Number(total.toFixed(2))
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, [refreshKey]);

  return (
    <div className="h-[400px] bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Expenses Overview</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6b7280' }}
            tickLine={{ stroke: '#d1d5db' }}
            angle={-45}
            textAnchor="end"
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
            tick={{ fill: '#6b7280' }}
            tickLine={{ stroke: '#d1d5db' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            formatter={(value) => [`$${value}`, 'Total']}
          />
          <Bar 
            dataKey="total" 
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            barSize={30}
            name="Monthly Total"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}