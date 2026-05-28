import React from 'react';
import './ExpenseList.css';

const fmt = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const ICONS = { Salary:'💼', Freelance:'💻', Business:'🏢', Investment:'📈', Gift:'🎁', Rental:'🏠', Other:'💰' };

const IncomeList = ({ incomes, onDelete }) => {
  if (!incomes || incomes.length === 0) {
    return <div className="no-expenses"><p>No income yet</p><p>Add your first one above</p></div>;
  }
  return (
    <div className="expense-list">
      {incomes.map((inc) => (
        <div key={inc._id} className="expense-item">
          <div className="expense-left">
            <span style={{ fontSize: '1.4rem', marginRight: '0.5rem' }}>{ICONS[inc.category] || '💰'}</span>
            <div>
              <span className="expense-category">{inc.description}</span>
              <span className="expense-date">{inc.category} · {formatDate(inc.date || inc.createdAt)}</span>
            </div>
          </div>
          <div className="expense-right">
            <span className="expense-amount" style={{ color: '#4ade80' }}>{fmt(inc.amount)}</span>
            <button className="btn-delete" onClick={() => onDelete(inc._id)} title="Delete">✕</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncomeList;