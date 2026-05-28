import React, { useState } from 'react';
import './ExpenseForm.css';

const INCOME_CATEGORIES = ['Salary','Freelance','Business','Investment','Gift','Rental','Other'];

const IncomeForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    description: '', amount: '', category: 'Salary',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ ...form, amount: Number(form.amount) });
    setLoading(false);
    setForm({ description: '', amount: '', category: 'Salary', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="expense-form-wrap slide-in">
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="field">
            <label>Description</label>
            <input name="description" type="text" placeholder="e.g. Monthly salary" value={form.description} onChange={handleChange} required />
          </div>
          <div className="field field-sm">
            <label>Amount (₹)</label>
            <input name="amount" type="number" placeholder="5000" value={form.amount} onChange={handleChange} min="1" required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {INCOME_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Income'}
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
//done