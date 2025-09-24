import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SignupPage() {
  const { signup, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signup(name, email, password);
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100%", display: "grid", placeItems: "center", padding: 24 }}>
      <div className="card" style={{ width: 460, maxWidth: "95%", padding: 24 }}>
        <div className="badge">Ocean Chat</div>
        <h2 style={{ margin: "8px 0 4px 0" }}>Create your account</h2>
        <p className="text-subtle" style={{ marginTop: 0 }}>Join the workspace</p>
        <div className="separator" />
        {error ? (
          <div style={{ background: "rgba(239, 68, 68, .08)", color: "#EF4444", padding: 10, borderRadius: 10, marginBottom: 12, border: "1px solid #FECACA" }}>
            {error}
          </div>
        ) : null}
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label className="text-subtle" style={{ display: "block", marginBottom: 6 }}>Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Jane Doe" required />
          </div>
          <div>
            <label className="text-subtle" style={{ display: "block", marginBottom: 6 }}>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="you@company.com" required />
          </div>
          <div>
            <label className="text-subtle" style={{ display: "block", marginBottom: 6 }}>Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="••••••••" required />
          </div>
          <button disabled={busy} type="submit">{busy ? "Creating..." : "Create account"}</button>
        </form>
        <p className="text-subtle" style={{ marginTop: 14 }}>
          Already have an account? <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
