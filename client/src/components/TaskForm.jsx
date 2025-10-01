import { useState } from "react";

export default function TaskForm({ onAdd, creating }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = title.trim();
    if (!v || creating) return;
    onAdd(v, () => setTitle(""));
  };

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3">Nueva tarea</h5>
      <form className="row g-2" onSubmit={handleSubmit}>
        <div className="col-12 col-md-9">
          <input
            className="form-control"
            placeholder="Nueva tarea..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={creating}
          />
        </div>
        <div className="col-12 col-md-3 d-grid">
          <button type="submit" className="btn btn-primary" disabled={creating}>
            {creating ? (<><span className="spinner-border spinner-border-sm me-2" aria-hidden /> Agregando...</>) : "Agregar"}
          </button>
        </div>
      </form>
    </div>
  );
}
