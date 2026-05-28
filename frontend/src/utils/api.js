const BASE_URL = 'http://localhost:5000';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// ── AUTH ──────────────────────────────────────

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/api/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// ── EXPENSES ──────────────────────────────────

export const getExpenses = async () => {
  const res = await fetch(`${BASE_URL}/api/expense/get`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const addExpense = async (data) => {
  const res = await fetch(`${BASE_URL}/api/expense/add`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(`${BASE_URL}/api/expense/delete/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
};

export const updateExpense = async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/expense/update/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

// ── INCOME ──────────────────────────────────

export const getIncomes = async () => {
  const res = await fetch(`${BASE_URL}/api/income/get`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const addIncome = async (data) => {
  const res = await fetch(`${BASE_URL}/api/income/add`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteIncome = async (id) => {
  const res = await fetch(`${BASE_URL}/api/income/delete/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
};

// ── DASHBOARD ──────────────────────────────────

export const getDashboard = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/overview`, {
    headers: authHeaders(),
  });
  return res.json();
};