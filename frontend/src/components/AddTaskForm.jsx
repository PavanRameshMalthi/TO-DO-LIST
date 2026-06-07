import { useState } from "react";

const PRIORITIES = ["High", "Medium", "Low"];

export default function AddTaskForm({ dark, onAdd, loading }) {
  const [input,    setInput]    = useState("");
  const [priority, setPriority] = useState("Medium");

  const th = {
    card:    dark ? "#161b26" : "#ffffff",
    border:  dark ? "#2a3149" : "#d1d5e4",
    text:    dark ? "#e8ecf4" : "#1a1d2e",
    accent:  "#6c5ce7",
  };

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim(), priority);
    setInput("");
    setPriority("Medium");
  };

  return (
    <div style={{ display: "flex", gap: 10, maxWidth: 1100, margin: "18px auto 0", padding: "0 20px", alignItems: "center" }}>
      <input
        style={{ flex: 1, background: th.card, border: `1.5px solid ${th.border}`, borderRadius: 10, padding: "12px 18px", color: th.text, fontSize: 15, outline: "none", boxSizing: "border-box" }}
        placeholder="Enter task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <select
        style={{ background: th.card, border: `1.5px solid ${th.border}`, borderRadius: 10, padding: "12px 16px", color: th.text, fontSize: 14, outline: "none", cursor: "pointer", minWidth: 130 }}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
      </select>
      <button
        onClick={handleAdd}
        disabled={loading}
        style={{ background: th.accent, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", opacity: loading ? 0.7 : 1, whiteSpace: "nowrap" }}
      >
        {loading ? "Adding…" : "+ Add Task"}
      </button>
    </div>
  );
}
