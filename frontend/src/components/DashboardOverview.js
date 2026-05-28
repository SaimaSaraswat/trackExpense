import React from 'react';
import './DashboardOverview.css';

const fmt = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const DashboardOverview = ({ data, loading }) => {
  if (loading) return <div className="loading-state">Loading overview...</div>;
  if (!data) return <div className="loading-state">No data available.</div>;

  const { monthlyIncome=0, monthlyExpense=0, savings=0, savingsRate=0, recentTransactions=[], expenseDistribution=[] } = data;

  return (
    <div className="overview">
      <div className="overview-grid">
        <div className="stat-card"><span className="stat-label">Monthly Income</span><span className="stat-value income">{fmt(monthlyIncome)}</span></div>
        <div className="stat-card"><span className="stat-label">Monthly Expense</span><span className="stat-value expense">{fmt(monthlyExpense)}</span></div>
        <div className="stat-card"><span className="stat-label">Savings</span><span className="stat-value savings">{fmt(savings)}</span></div>
        <div className="stat-card"><span className="stat-label">Savings Rate</span><span className="stat-value rate">{savingsRate}%</span></div>
      </div>

      <div className="section-box">
        <h3>Expense by Category</h3>
        {expenseDistribution.length === 0 ? <p className="empty-text">No expense data this month.</p> : (
          <div className="category-list">
            {expenseDistribution.map((item) => (
              <div key={item.category} className="category-row">
                <span className="cat-name">{item.category}</span>
                <div className="cat-bar-wrap"><div className="cat-bar" style={{ width: `${item.percent}%` }} /></div>
                <span className="cat-amount">{fmt(item.amount)}</span>
                <span className="cat-percent">{item.percent}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section-box">
        <h3>Recent Transactions</h3>
        {recentTransactions.length === 0 ? <p className="empty-text">No transactions this month.</p> : (
          <div className="txn-list">
            {recentTransactions.slice(0, 8).map((txn) => (
              <div key={txn._id} className="txn-row">
                <div className="txn-left">
                  <span className={`txn-type-dot ${txn.type}`} />
                  <div>
                    <p className="txn-desc">{txn.description}</p>
                    <p className="txn-meta">{txn.category} · {formatDate(txn.date)}</p>
                  </div>
                </div>
                <span className={`txn-amount ${txn.type}`}>{txn.type === 'income' ? '+' : '-'}{fmt(txn.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;