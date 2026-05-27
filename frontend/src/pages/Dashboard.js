// ─────────────────────────────────────────────
//  Dashboard.js
//
//  Concepts used here:
//  - useEffect: fetch expenses when page loads
//  - useState: store expenses list + form state
//  - Derived state: calculate totals from expenses array
//  - Conditional rendering: show empty state vs list
// ─────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getExpenses, addExpense, deleteExpense } from '../utils/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import StatsBar from '../components/StatsBar';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');

  // Fetch all expenses when dashboard loads
  useEffect(() => {
    fetchExpenses();
  }, []); // Empty array = run once on mount

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      // data could be an array directly or { expenses: [...] }
      setExpenses(Array.isArray(data) ? data : data.expenses || []);
    } catch (err) {
      setError('Failed to load expenses.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      const newExpense = await addExpense(formData);
      // Add to top of list without refetching
      setExpenses((prev) => [newExpense, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add expense.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      // Remove from local state immediately
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError('Failed to delete expense.');
    }
  };

  // Derived: filter expenses by category
  const categories = ['All', ...new Set(expenses.map((e) => e.category))];
  const filtered = filter === 'All' ? expenses : expenses.filter((e) => e.category === filter);

  // Derived: total amount
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const monthlyTotal = expenses
    .filter((e) => {
      const d = new Date(e.date || e.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="dashboard">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-logo">₹ Tracker</div>
        <div className="nav-right">
          <span className="nav-user">Hey, {user?.name?.split(' ')[0] || 'there'} 👋</span>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </nav>

      <main className="main-content fade-in">
        {/* ── Stats ── */}
        <StatsBar total={total} monthlyTotal={monthlyTotal} count={expenses.length} />

        {/* ── Header row ── */}
        <div className="section-header">
          <h2>Expenses</h2>
          <button className="btn-add" onClick={() => setShowForm((v) => !v)}>
            {showForm ? '✕ Cancel' : '+ Add Expense'}
          </button>
        </div>

        {/* ── Add Expense Form ── */}
        {showForm && <ExpenseForm onSubmit={handleAdd} />}

        {/* ── Error ── */}
        {error && <div className="dash-error">{error}</div>}

        {/* ── Category Filter ── */}
        {categories.length > 1 && (
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Expense List ── */}
        {loading ? (
          <div className="loading-state">Loading your expenses...</div>
        ) : (
          <ExpenseList expenses={filtered} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;