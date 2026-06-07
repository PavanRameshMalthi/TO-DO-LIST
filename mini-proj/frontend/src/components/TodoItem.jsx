import { useState } from "react";

const PRIORITIES = ["High", "Medium", "Low"];
const PRIORITY_COLORS = {
  High:   { bg: "#e53e3e", text: "#fff" },
  Medium: { bg: "#d97706", text: "#fff" },
  Low:    { bg: "#16a34a", text: "#fff" },
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

export default function TodoItem({ task, dark, onToggle, onDelete, onSave }) {
  const [editing,      setEditing]      = useState(false);
  const [editText,     setEditText]     = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);

  const th = {
    text:     dark ? "#e8ecf4" : "#1a1d2e",
    subtext:  dark ? "#8892ab" : "#5a627a",
    border:   dark ? "#2a3149" : "#d1d5e4",
    inputBg:  dark ? "#1a2033" : "#f9fafc",
    card:     dark ? "#161b26" : "#ffffff",
    cardAlt:  dark ? "#1e2535" : "#eef0f7",
    accent:   "#6c5ce7",
  };

  const handleSave = () => {
    if (!editText.trim()) return;
    onSave(task._id, { text: editText.trim(), priority: editPriority });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditing(false);
  };

  if (editing) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px" }}>
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") handleCancel(); }}
          style={{ flex: 1, background: th.inputBg, border: `1.5px solid ${th.accent}`, borderRadius: 8, padding: "8px 12px", color: th.text, fontSize: 14, outline: "none" }}
        />
        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
          style={{ background: th.inputBg, border: `1.5px solid ${th.border}`, borderRadius: 8, padding: "8px 10px", color: th.text, fontSize: 13, outline: "none" }}
        >
          {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
        </select>
        <button onClick={handleSave}   style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Save</button>
        <button onClick={handleCancel} style={{ background: th.cardAlt, color: th.subtext, border: "none", borderRadius: 8, padding: "8px 12px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
        style={{ width: 20, height: 20, cursor: "pointer", accentColor: th.accent, flexShrink: 0 }}
      />
      <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: task.completed ? th.subtext : th.text, textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <span style={{ padding: "3px 12px", borderRadius: 20, background: PRIORITY_COLORS[task.priority].bg, color: PRIORITY_COLORS[task.priority].text, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
        {task.priority}
      </span>
      <span style={{ fontSize: 13, color: th.subtext, minWidth: 100, textAlign: "right" }}>
        {formatDate(task.createdAt)}
      </span>
      <button
        onClick={() => setEditing(true)}
        style={{ background: dark ? "#1e2e4a" : "#dbeafe", color: dark ? "#60a5fa" : "#1d4ed8", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
      >✏️ Edit</button>
      <button
        onClick={() => onDelete(task._id)}
        style={{ background: dark ? "#3a1c1c" : "#fee2e2", color: dark ? "#f87171" : "#dc2626", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
      >🗑️ Delete</button>
    </div>
  );
}
