const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

export default function StatsBar({ tasks, dark }) {
  const th = {
    card:   dark ? "#161b26" : "#ffffff",
    border: dark ? "#2a3149" : "#d1d5e4",
    text:   dark ? "#e8ecf4" : "#1a1d2e",
    subtext:dark ? "#8892ab" : "#5a627a",
  };

  const total     = tasks.length;
  const pending   = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) =>  t.completed).length;
  const createdAt = tasks.length > 0 ? formatDate(tasks[tasks.length - 1].createdAt) : "—";

  const stats = [
    { label: "Total Tasks", value: total,     icon: "📋", color: "#6c5ce7" },
    { label: "Pending",     value: pending,   icon: "⏳", color: "#d97706" },
    { label: "Completed",   value: completed, icon: "✅", color: "#16a34a" },
    { label: "Created At",  value: createdAt, icon: "📅", color: "#2563eb" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, maxWidth: 1100, margin: "22px auto 0", padding: "0 20px" }}>
      {stats.map(({ label, value, icon, color }) => (
        <div key={label} style={{ background: th.card, border: `1.5px solid ${th.border}`, borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: color + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
            {icon}
          </div>
          <div>
            <div style={{ fontSize: 13, color: th.subtext, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: th.text }}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
