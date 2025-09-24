import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, currentUserId }) {
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollerRef} className="card" style={{ height: "100%", overflowY: "auto", padding: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map(m => (
          <MessageItem key={m.id || m._id || Math.random()} message={m} isOwn={m.userId === currentUserId || m.user?.id === currentUserId} />
        ))}
        {messages.length === 0 ? (
          <div className="text-subtle" style={{ textAlign: "center", padding: 20 }}>No messages in this channel yet.</div>
        ) : null}
      </div>
    </div>
  );
}
