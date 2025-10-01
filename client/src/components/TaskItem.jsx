export default function TaskItem({ task, updating, deleting, onToggle, onAskRemove }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <label className="form-check d-flex align-items-center gap-2 m-0" style={{ cursor: "pointer" }}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task)}
            disabled={updating}
          />
          <span
            className="fw-semibold"
            style={{ textDecoration: task.done ? "line-through" : "none", opacity: task.done ? 0.6 : 1 }}
          >
            {task.title}
          </span>
          {updating && <span className="spinner-border spinner-border-sm ms-2" aria-hidden />}
        </label>

        <button className="btn btn-sm btn-outline-danger" onClick={() => onAskRemove(task.id)} disabled={deleting} title="Eliminar">
          {deleting ? (<><span className="spinner-border spinner-border-sm me-1" aria-hidden /> Eliminando...</>) : "Eliminar"}
        </button>
      </div>
    </div>
  );
}
