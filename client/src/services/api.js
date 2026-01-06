/**
 * API helper using fetch with base URL from env
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5003';

export const apiGet = async (path, opts = {}) => {
  const url = `${BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;
  console.log('[API] GET:', url);

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });

  console.log('[API] GET response status:', res.status);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
};

export const apiPut = async (path, body = {}, opts = {}) => {
  const url = `${BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;
  console.log('[API] PUT:', url);

  const res = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    body: JSON.stringify(body),
  });

  console.log('[API] PUT response status:', res.status);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
};

export const apiPost = async (path, body = {}, opts = {}) => {
  const url = `${BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;
  console.log('[API] POST:', url);

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    body: JSON.stringify(body),
  });

  console.log('[API] POST response status:', res.status);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
};

export const apiDelete = async (path, opts = {}) => {
  const url = `${BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;
  console.log('[API] DELETE:', url);

  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });

  console.log('[API] DELETE response status:', res.status);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
};

export default { apiGet, apiPut, apiPost, apiDelete };
