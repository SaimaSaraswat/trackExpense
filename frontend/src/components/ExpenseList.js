// ─────────────────────────────────────────────
//  ExpenseList.js
//  Renders a list of expense cards
//  If empty, shows an empty state
// ─────────────────────────────────────────────

import React from 'react';
import './ExpenseList.css';

// Map category → emoji for visual flair
const CATEGORY_ICON = {
  Food: '🍜', Transport: '🚗', Shopping: '🛍️',
  Entertainment: '🎬', Health: '💊', Education: '📚',
  Rent: '🏠', Other: '📌',
};

const fmt = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const ExpenseList = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">💸</div>
        <p>No expenses yet</p>
        <span>Add your first one above</span>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense, i) => (
        <div
          key={expense._id}
          className="expense-card"
          style={{ animationDelay: `${i * 0.04}s` }}
        >
          <div className="expense-icon">
            {CATEGORY_ICON[expense.category] || '📌'}
          </div>

          <div className="expense-info">
            <span className="expense-title">{expense.title}</span>
            <span className="expense-meta">
              <span className="expense-category">{expense.category}</span>
              {expense.date || expense.createdAt
                ? <span>· {formatDate(expense.date || expense.createdAt)}</span>
                : null}
              {expense.note && <span>· {expense.note}</span>}
            </span>
          </div>

          <div className="expense-right">
            <span className="expense-amount">{fmt(expense.amount)}</span>
            <button
              className="btn-delete"
              onClick={() => onDelete(expense._id)}
              title="Delete"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
//done