import { useState, useEffect, useCallback, useRef } from "react";
import StatsBar      from "./components/StatsBar";
import AddTaskForm   from "./components/AddTaskForm";
import TodoItem      from "./components/TodoItem";
import Notification  from "./components/Notification";
import "./App.css";

const API = "/api/todos";

const apiFetch = (url, options = {}) =>
  fetch(url, { headers: { "Content-Type": "application/json" }, ...options }).then((r) => r.json());

export default function App() {
  const [tasks,        setTasks]        = useState([]);
  const [filter,       setFilter]       = useState("All");
  const [searchInput,  setSearchInput]  = useState("");
  const [search,       setSearch]       = useState("");
  const [dark,         setDark]         = useState(true);
  const [loading,      setLoading]      = useState(false);
  const [submitting,   setSubmitting]   = useState(false);
  const [notif,        setNotif]        = useState({ msg: "", type: "info" });
  const debounceRef = useRef(null);

  const notify = (msg, type = "info") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif({ msg: "", type: "info" }), 3000);
  };

  // ── Fetch ──────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const f = filter === "All" ? "" : filter;
      const res = await apiFetch(`${API}?filter=${f}&search=${encodeURIComponent(search)}`);
      if (res.success) setTasks(res.data);
      else notify("Failed to load tasks.", "error");
    } catch {
      notify("Cannot reach server. Is the backend running?", "error");
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // Debounce search input
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  // ── Handlers ───────────────────────────────────────────────
  const handleAdd = async (text, priority) => {
    setSubmitting(true);
    try {
      const res = await apiFetch(API, { method: "POST", body: JSON.stringify({ text, priority }) });
      if (res.success) { fetchTasks(); notify("Task added!", "success"); }
      else notify(res.message, "error");
    } catch { notify("Failed to add task.", "error"); }
    finally { setSubmitting(false); }
  };

  const handleToggle = async (id) => {
    try {
      const res = await apiFetch(`${API}/${id}/toggle`, { method: "PATCH" });
      if (res.success) setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      else notify(res.message, "error");
    } catch { notify("Failed to update task.", "error"); }
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiFetch(`${API}/${id}`, { method: "DELETE" });
      if (res.success) { fetchTasks(); notify("Task deleted.", "info"); }
      else notify(res.message, "error");
    } catch { notify("Failed to delete task.", "error"); }
  };

  const handleSave = async (id, updates) => {
    try {
      const res = await apiFetch(`${API}/${id}`, { method: "PUT", body: JSON.stringify(updates) });
      if (res.success) { setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t))); notify("Task updated!", "success"); }
      else notify(res.message, "error");
    } catch { notify("Failed to update task.", "error"); }
  };

  // ── Theme ──────────────────────────────────────────────────
  const th = {
    bg:      dark ? "#0d0f14" : "#f3f4f8",
    card:    dark ? "#161b26" : "#ffffff",
    border:  dark ? "#2a3149" : "#d1d5e4",
    text:    dark ? "#e8ecf4" : "#1a1d2e",
    subtext: dark ? "#8892ab" : "#5a627a",
    inputBg: dark ? "#1a2033" : "#f9fafc",
    accent:  "#6c5ce7",
  };

  const filterBtn = (active) => ({
    padding: "9px 20px", borderRadius: 10,
    border: active ? "none" : `1.5px solid ${th.border}`,
    background: active ? th.accent : "transparent",
    color: active ? "#fff" : th.text,
    fontWeight: 600, cursor: "pointer", fontSize: 14,
    display: "flex", alignItems: "center", gap: 7,
  });

  return (
    <div className="app" style={{ background: th.bg, color: th.text }}>

      {/* Header */}
      <header style={{ textAlign: "center", padding: "44px 20px 10px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: 0, color: th.text }}>
          📋 Personal Todo App
        </h1>
      </header>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", maxWidth: 1100, margin: "22px auto 0", padding: "0 20px" }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: th.subtext, pointerEvents: "none" }}>🔍</span>
          <input
            style={{ width: "100%", background: th.inputBg, border: `1.5px solid ${th.border}`, borderRadius: 10, padding: "10px 14px 10px 38px", color: th.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}
            placeholder="Search tasks..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Filters */}
        {["All", "Pending", "Completed"].map((f) => (
          <button key={f} style={filterBtn(filter === f)} onClick={() => setFilter(f)}>
            {f === "Pending"   && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />}
            {f === "Completed" && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />}
            {f}
          </button>
        ))}

        {/* Dark/Light toggle */}
        <button
          style={{ padding: "9px 18px", borderRadius: 10, border: `1.5px solid ${th.border}`, background: dark ? "#1e2535" : "#e8eaf6", color: th.text, fontWeight: 600, cursor: "pointer", fontSize: 13, marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}
          onClick={() => setDark(!dark)}
        >
          {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Stats */}
      <StatsBar tasks={tasks} dark={dark} />

      {/* Add Task Form */}
      <AddTaskForm dark={dark} onAdd={handleAdd} loading={submitting} />

      {/* Notification */}
      <Notification message={notif.msg} type={notif.type} dark={dark} />

      {/* Task List */}
      <div style={{ maxWidth: 1100, margin: "14px auto 0", padding: "0 20px" }}>
        <div style={{ background: th.card, border: `1.5px solid ${th.border}`, borderRadius: 14, overflow: "hidden" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: th.subtext }}>⏳ Loading tasks…</div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: th.subtext, fontSize: 15 }}>
              No tasks found. Add one above!
            </div>
          ) : (
            tasks.map((task, i) => (
              <div key={task._id} style={{ borderBottom: i < tasks.length - 1 ? `1px solid ${th.border}` : "none" }}>
                <TodoItem
                  task={task}
                  dark={dark}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onSave={handleSave}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: 36, fontSize: 13, color: th.subtext, paddingBottom: 30 }}>
        © 2025 Personal Todo App. All rights reserved.
      </footer>
    </div>
  );
}
