export default function Navbar({ pendientes }) {
  return (
    <nav className="navbar navbar-dark" style={{ background: "#121620", borderBottom: "1px solid #262a33" }}>
      <div className="container">
        <span className="navbar-brand fw-semibold d-flex align-items-center gap-2">
          📝 Gestor de Tareas
        </span>
        <span className="badge text-bg-success">{pendientes} pendientes</span>
      </div>
    </nav>
  );
}
