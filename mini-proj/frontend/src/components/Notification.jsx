export default function Notification({ message, type, dark }) {
  if (!message) return null;

  const map = {
    info:    { bg: dark?"#1a2a45":"#dbeafe", border: dark?"#2a4a7a":"#93c5fd", color: dark?"#93c5fd":"#1e40af" },
    success: { bg: dark?"#14291f":"#dcfce7", border: dark?"#166534":"#86efac", color: dark?"#4ade80":"#15803d" },
    error:   { bg: dark?"#2d1515":"#fee2e2", border: dark?"#7f1d1d":"#fca5a5", color: dark?"#f87171":"#dc2626" },
    warn:    { bg: dark?"#2d2000":"#fef9c3", border: dark?"#854d0e":"#fde047", color: dark?"#fbbf24":"#92400e" },
  };
  const c = map[type] || map.info;
  const icon = type === "error" ? "⚠️" : type === "success" ? "✅" : type === "warn" ? "⚠️" : "ℹ️";

  return (
    <div style={{ maxWidth: 1100, margin: "12px auto 0", padding: "0 20px" }}>
      <div style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: 10, padding: "11px 18px", color: c.color, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
        {icon} {message}
      </div>
    </div>
  );
}
