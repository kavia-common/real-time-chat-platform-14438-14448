export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    subtle: "#6B7280",
    border: "#E5E7EB"
  },
  shadow: "0 10px 25px rgba(16, 24, 40, 0.06)",
  radius: "12px",
};

// PUBLIC_INTERFACE
export function applyTheme() {
  /** Applies CSS variables for the Ocean Professional theme to document root. */
  const r = document.documentElement;
  r.style.setProperty("--color-primary", theme.colors.primary);
  r.style.setProperty("--color-secondary", theme.colors.secondary);
  r.style.setProperty("--color-error", theme.colors.error);
  r.style.setProperty("--color-bg", theme.colors.background);
  r.style.setProperty("--color-surface", theme.colors.surface);
  r.style.setProperty("--color-text", theme.colors.text);
  r.style.setProperty("--color-subtle", theme.colors.subtle);
  r.style.setProperty("--color-border", theme.colors.border);
  r.style.setProperty("--radius", theme.radius);
  r.style.setProperty("--shadow", theme.shadow);
}
