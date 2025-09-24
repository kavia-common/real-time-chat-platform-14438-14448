import React, { useState } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText("");
  };

  return (
    <form onSubmit={submit} className="card" style={{ display: "flex", gap: 8, padding: 10, marginTop: 12 }}>
      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Message #channel"
        disabled={disabled}
        style={{ flex: 1 }}
      />
      <button type="submit" disabled={disabled || !text.trim()}>Send</button>
    </form>
  );
}
