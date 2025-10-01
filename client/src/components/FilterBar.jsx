export default function FilterBar({ filter, setFilter, shown, total }) {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
      <div className="btn-group" role="group" aria-label="Filtros">
        <button className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter("all")}>Todas</button>
        <button className={`btn btn-sm ${filter === "pending" ? "btn-warning" : "btn-outline-warning"}`} onClick={() => setFilter("pending")}>Pendientes</button>
        <button className={`btn btn-sm ${filter === "done" ? "btn-success" : "btn-outline-success"}`} onClick={() => setFilter("done")}>Hechas</button>
      </div>
      <small className="opacity-75">Mostrando <strong>{shown}</strong> / {total}</small>
    </div>
  );
}
