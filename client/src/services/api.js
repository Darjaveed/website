/**
 * API helper using fetch with base URL from env
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiGet = async (path, opts = {}) => {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
};

export const apiPut = async (path, body = {}, opts = {}) => {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
};

export const apiPost = async (path, body = {}, opts = {}) => {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
};

export const apiDelete = async (path, opts = {}) => {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
};

export default { apiGet, apiPut, apiPost, apiDelete };
