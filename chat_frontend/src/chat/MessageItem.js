import React from "react";

export default function MessageItem({ message, isOwn }) {
  const time = new Date(message.createdAt || message.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: "rgba(37,99,235,.1)",
        color: "var(--color-primary)",
        fontWeight: 700, display: "grid", placeItems: "center",
        flex: "0 0 auto"
      }}>
        {message.user?.name?.[0]?.toUpperCase() || "U"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <div style={{ fontWeight: 700 }}>{message.user?.name || "User"}</div>
          <div className="text-subtle" style={{ fontSize: 12 }}>{time}</div>
          {isOwn ? <span className="badge" style={{ padding: "2px 8px", fontSize: 10 }}>you</span> : null}
        </div>
        <div style={{
          background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: 10, padding: 10, marginTop: 6
        }}>
          {message.content}
        </div>
      </div>
    </div>
  );
}
