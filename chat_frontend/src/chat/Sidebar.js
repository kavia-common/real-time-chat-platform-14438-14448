import React from "react";

export default function Sidebar({ user, channels, currentChannelId, onSelectChannel }) {
  return (
    <aside className="sidebar">
      <div className="card" style={{ padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, rgba(37,99,235,.2), rgba(245,158,11,.2))",
            display: "grid", placeItems: "center", fontWeight: 700, color: "var(--color-primary)"
          }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{user?.name || "User"}</div>
            <div className="text-subtle" style={{ fontSize: 12 }}>{user?.email}</div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div className="text-subtle" style={{ fontWeight: 700, letterSpacing: .3 }}>Channels</div>
        </div>
        <div className="list">
          {channels.map(ch => (
            <div
              key={ch.id}
              className="list-item"
              onClick={() => onSelectChannel(ch.id)}
              style={{
                background: ch.id === currentChannelId ? "rgba(37,99,235,.08)" : undefined,
                border: ch.id === currentChannelId ? "1px solid rgba(37,99,235,.25)" : "1px solid transparent"
              }}
            >
              <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>#</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: 600 }}>{ch.name}</span>
                {ch.description ? <span className="text-subtle" style={{ fontSize: 12 }}>{ch.description}</span> : null}
              </div>
            </div>
          ))}
          {channels.length === 0 ? (
            <div className="text-subtle" style={{ fontSize: 14, padding: 10 }}>No channels</div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
