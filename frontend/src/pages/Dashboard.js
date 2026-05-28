import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getExpenses, addExpense, deleteExpense, getIncomes, addIncome, deleteIncome, getDashboard } from '../utils/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';
import DashboardOverview from '../components/DashboardOverview';
import './Dashboard.css';

const TABS = ['Overview', 'Expenses', 'Income'];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [loadingExp, setLoadingExp] = useState(true);
  const [loadingInc, setLoadingInc] = useState(true);
  const [loadingDash, setLoadingDash] = useState(true);
  const [showExpForm, setShowExpForm] = useState(false);
  const [showIncForm, setShowIncForm] = useState(false);
  const [expFilter, setExpFilter] = useState('All');
  const [incFilter, setIncFilter] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = () => {
    fetchExpenses();
    fetchIncomes();
    fetchDashboard();
  };

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(Array.isArray(data) ? data : data.expenses || []);
    } catch { setError('Failed to load expenses.'); }
    finally { setLoadingExp(false); }
  };

  const fetchIncomes = async () => {
    try {
      const data = await getIncomes();
      setIncomes(Array.isArray(data) ? data : data.incomes || []);
    } catch { setError('Failed to load incomes.'); }
    finally { setLoadingInc(false); }
  };

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      if (data.success) setDashData(data.data);
    } catch { }
    finally { setLoadingDash(false); }
  };

  const handleAddExpense = async (formData) => {
    try {
      const result = await addExpense(formData);
      if (result.success) {
        setError('');
        await fetchExpenses();
        await fetchDashboard();
        setShowExpForm(false);
      } else { setError(result.message || 'Failed to add expense.'); }
    } catch { setError('Failed to add expense.'); }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      await fetchDashboard();
    } catch { setError('Failed to delete expense.'); }
  };

  const handleAddIncome = async (formData) => {
    try {
      const result = await addIncome(formData);
      if (result.success) {
        setError('');
        await fetchIncomes();
        await fetchDashboard();
        setShowIncForm(false);
      } else { setError(result.message || 'Failed to add income.'); }
    } catch { setError('Failed to add income.'); }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      setIncomes((prev) => prev.filter((i) => i._id !== id));
      await fetchDashboard();
    } catch { setError('Failed to delete income.'); }
  };

  const expCategories = ['All', ...new Set(expenses.map((e) => e.category))];
  const filteredExp = expFilter === 'All' ? expenses : expenses.filter((e) => e.category === expFilter);
  const incCategories = ['All', ...new Set(incomes.map((i) => i.category))];
  const filteredInc = incFilter === 'All' ? incomes : incomes.filter((i) => i.category === incFilter);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-logo">₹ Tracker</div>
        <div className="nav-right">
          <span className="nav-user">Hey, {user?.name?.split(' ')[0] || 'there'} 👋</span>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="tab-bar">
        {TABS.map((tab) => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <main className="main-content fade-in">
        {error && <div className="dash-error">{error}</div>}

        {activeTab === 'Overview' && (
          <DashboardOverview data={dashData} loading={loadingDash} />
        )}

        {activeTab === 'Expenses' && (
          <>
            <div className="section-header">
              <h2>Expenses</h2>
              <button className="btn-add" onClick={() => setShowExpForm((v) => !v)}>
                {showExpForm ? '✕ Cancel' : '+ Add Expense'}
              </button>
            </div>
            {showExpForm && <ExpenseForm onSubmit={handleAddExpense} />}
            {expCategories.length > 1 && (
              <div className="filter-bar">
                {expCategories.map((cat) => (
                  <button key={cat} className={`filter-btn ${expFilter === cat ? 'active' : ''}`} onClick={() => setExpFilter(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
            {loadingExp ? <div className="loading-state">Loading expenses...</div> : (
              <ExpenseList expenses={filteredExp} onDelete={handleDeleteExpense} />
            )}
          </>
        )}

        {activeTab === 'Income' && (
          <>
            <div className="section-header">
              <h2>Income</h2>
              <button className="btn-add income" onClick={() => setShowIncForm((v) => !v)}>
                {showIncForm ? '✕ Cancel' : '+ Add Income'}
              </button>
            </div>
            {showIncForm && <IncomeForm onSubmit={handleAddIncome} />}
            {incCategories.length > 1 && (
              <div className="filter-bar">
                {incCategories.map((cat) => (
                  <button key={cat} className={`filter-btn ${incFilter === cat ? 'active' : ''}`} onClick={() => setIncFilter(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
            {loadingInc ? <div className="loading-state">Loading income...</div> : (
              <IncomeList incomes={filteredInc} onDelete={handleDeleteIncome} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;