// ─────────────────────────────────────────────
//  ExpenseForm.js
//  Controlled form — every input is tracked in state
//  onSubmit passes data up to Dashboard
// ─────────────────────────────────────────────

import React, { useState } from 'react';
import './ExpenseForm.css';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Education', 'Rent', 'Other'];

const ExpenseForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0], // today's date
    note: '',
  });
  const [loading, setLoading] = useState(false);

  // Single handler for all inputs
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ ...form, amount: Number(form.amount) });
    setLoading(false);
    // Reset form
    setForm({ description: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], note: '' });
  };

  return (
    <div className="expense-form-wrap slide-in">
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="field">
            <label>Title</label>
            <input
              name="description"
              type="text"
              placeholder="e.g. Lunch at CCD"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field field-sm">
            <label>Amount (₹)</label>
            <input
              name="amount"
              type="number"
              placeholder="250"
              value={form.amount}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label>Note (optional)</label>
          <input
            name="note"
            type="text"
            placeholder="Any extra detail..."
            value={form.note}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
//done