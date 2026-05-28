// ─────────────────────────────────────────────
//  StatsBar.js
//  Shows total spent, this month, and count
//  Pure display component — receives data as props
// ─────────────────────────────────────────────

import React from 'react';
import './StatsBar.css';

const fmt = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const StatsBar = ({ total, monthlyTotal, count }) => (
  <div className="stats-bar">
    <div className="stat-card">
      <span className="stat-label">Total Spent</span>
      <span className="stat-value">{fmt(total)}</span>
    </div>
    <div className="stat-card highlight">
      <span className="stat-label">This Month</span>
      <span className="stat-value accent">{fmt(monthlyTotal)}</span>
    </div>
    <div className="stat-card">
      <span className="stat-label">Transactions</span>
      <span className="stat-value">{count}</span>
    </div>
  </div>
);

export default StatsBar;
//done