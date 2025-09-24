const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

// Simple wrapper around fetch with JSON handling and auth header support
async function request(path, method = "GET", body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      msg = data?.detail || data?.message || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path, token) => request(path, "GET", undefined, token),
  post: (path, body, token) => request(path, "POST", body, token),
  put: (path, body, token) => request(path, "PUT", body, token),
  del: (path, token) => request(path, "DELETE", undefined, token),
};

export const endpoints = {
  me: "/auth/me",
  channels: "/channels",
  channelMessages: (channelId) => `/channels/${channelId}/messages`,
  sendMessage: (channelId) => `/channels/${channelId}/messages`,
};
