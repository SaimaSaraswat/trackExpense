// ─────────────────────────────────────────────
//  api.js  —  All backend calls live here
//  Base URL points to your Express backend
// ─────────────────────────────────────────────

const BASE_URL = 'http://localhost:5000';

// Helper: attach JWT token to every request
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// ── AUTH ──────────────────────────────────────

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// ── EXPENSES ──────────────────────────────────

export const getExpenses = async () => {
  const res = await fetch(`${BASE_URL}/api/expenses`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const addExpense = async (data) => {
  const res = await fetch(`${BASE_URL}/api/expenses`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(`${BASE_URL}/api/expenses/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
};