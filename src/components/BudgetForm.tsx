'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface BudgetFormProps {
  onSuccess: () => void;
}

const categories = ["Food", "Rent", "Transport", "Entertainment", "Utilities"];

export default function BudgetForm({ onSuccess }: BudgetFormProps) {
  const [formData, setFormData] = useState({
    category: '',
    budgetAmount: '',
    monthYear: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert month input (YYYY-MM) to MM-YYYY format
      const [year, month] = formData.monthYear.split('-');
      const formattedMonthYear = `${month}-${year}`;

      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: formData.category,
          budgetAmount: Number(formData.budgetAmount),
          monthYear: formattedMonthYear
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        alert(result.error || "Failed to set budget");
        return;
      }

      setFormData({ category: '', budgetAmount: '', monthYear: '' });
      onSuccess();
      alert("Budget set successfully!");

    } catch (error) {
      console.error('Submission error:', error);
      alert("Failed to connect to server");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Category</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Amount ($)</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={formData.budgetAmount}
            onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Month Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Month</label>
          <Input
            type="month"
            value={formData.monthYear}
            onChange={(e) => setFormData({ ...formData, monthYear: e.target.value })}
            placeholder="Month-year example(April 2025)"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full md:w-auto">
        Set Budget
      </Button>
    </form>
  );
}