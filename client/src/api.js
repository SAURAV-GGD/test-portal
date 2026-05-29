const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchFaq() {
  const res = await fetch(`${API_BASE}/api/faq`);
  return res.json();
}

export async function fetchDoubts(role = 'intern') {
  const res = await fetch(`${API_BASE}/api/doubts?role=${encodeURIComponent(role)}`);
  return res.json();
}

export async function submitDoubt(payload) {
  const res = await fetch(`${API_BASE}/api/doubts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function approveDoubt(id) {
  const res = await fetch(`${API_BASE}/api/doubts/${id}/approve`, { method: 'POST' });
  return res.json();
}

export async function rejectDoubt(id) {
  const res = await fetch(`${API_BASE}/api/doubts/${id}/reject`, { method: 'POST' });
  return res.json();
}

export async function answerDoubt(id, payload) {
  const res = await fetch(`${API_BASE}/api/doubts/${id}/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
