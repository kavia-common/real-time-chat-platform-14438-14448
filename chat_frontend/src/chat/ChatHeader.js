import React from "react";

export default function ChatHeader({ channel, onLogout }) {
  return (
    <header className="header">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className="badge">Workspace</span>
        <div style={{ width: 6, height: 6, background: "var(--color-secondary)", borderRadius: 999 }} />
        <div style={{ fontWeight: 800 }}>#{channel?.name || "select-a-channel"}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button style={{ background: "rgba(245,158,11,1)", boxShadow: "0 6px 16px rgba(245,158,11,.25)" }} onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
