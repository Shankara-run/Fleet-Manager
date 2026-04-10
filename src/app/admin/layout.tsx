import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/trips", label: "Trips", icon: "🚗" },
  { href: "/admin/drivers", label: "Drivers", icon: "👤" },
  { href: "/admin/vehicles", label: "Vehicles", icon: "🚙" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div style={{ padding: "0 1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <span style={{ 
              width: "40px", 
              height: "40px", 
              background: "var(--main-brand)", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem"
            }}>🚗</span>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--white)" }}>
              Fleet<span style={{ color: "var(--main-brand)" }}>Manager</span>
            </span>
          </Link>
        </div>

        <nav style={{ padding: "0 1rem" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map((item) => (
              <li key={item.href} style={{ marginBottom: "0.5rem" }}>
                <Link 
                  href={item.href} 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "0.75rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    transition: "all 0.2s ease"
                  }}
                  className="admin-nav-link"
                >
                  <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ 
          position: "absolute", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          padding: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.1)"
        }}>
          <Link 
            href="/" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.75rem",
              padding: "0.875rem 1rem",
              borderRadius: "8px",
              textDecoration: "none",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
              transition: "all 0.2s ease"
            }}
            className="admin-nav-link"
          >
            <span style={{ fontSize: "1.25rem" }}>🏠</span>
            Back to Home
          </Link>
        </div>
      </aside>

      <main className="admin-content">
        {children}
      </main>

      <style>{`
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.1);
          color: var(--white);
        }
      `}</style>
    </div>
  );
}
