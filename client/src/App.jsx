import { useEffect, useMemo, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask, clearDone } from "./api";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import ConfirmModal from "./components/ConfirmModal";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [clearing, setClearing] = useState(false);

  const [toast, setToast] = useState({ show: false, type: "success", msg: "" });
  const [filter, setFilter] = useState("all");
  const [confirm, setConfirm] = useState({ show: false, taskId: null });

  const showToast = (type, msg) => {
    setToast({ show: true, type, msg });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (e) {
        setErr(e.message || "Error cargando tareas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAdd(title, doneReset) {
    try {
      setCreating(true);
      const nueva = await createTask(title);
      setTasks((prev) => [nueva, ...prev]);
      setErr("");
      showToast("success", "Tarea creada ✅");
      doneReset?.();
    } catch (e) {
      const msg = e.message || "No se pudo crear la tarea";
      setErr(msg);
      showToast("danger", msg);
    } finally {
      setCreating(false);
    }
  }

  async function handleToggle(t) {
    if (updatingId) return;
    try {
      setUpdatingId(t.id);
      const updated = await updateTask(t.id, { done: !t.done });
      setTasks((prev) => prev.map((x) => (x.id === t.id ? updated : x)));
      showToast("success", updated.done ? "Marcada como hecha ✔️" : "Marcada como pendiente");
    } catch (e) {
      const msg = e.message || "No se pudo actualizar la tarea";
      setErr(msg);
      showToast("danger", msg);
    } finally {
      setUpdatingId(null);
    }
  }

  function askRemove(id) {
    setConfirm({ show: true, taskId: id });
  }

  async function confirmRemove() {
    const id = confirm.taskId;
    if (!id || deletingId) return;
    try {
      setDeletingId(id);
      await deleteTask(id);
      setTasks((prev) => prev.filter((x) => x.id !== id));
      setConfirm({ show: false, taskId: null });
      showToast("success", "Tarea eliminada 🗑️");
    } catch (e) {
      const msg = e.message || "No se pudo eliminar la tarea";
      setErr(msg);
      showToast("danger", msg);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleClearDone() {
    if (clearing) return;
    try {
      setClearing(true);
      await clearDone();
      setTasks((prev) => prev.filter((t) => !t.done));
      showToast("success", "Tareas hechas eliminadas");
      // si estabas parado en el filtro "done", no muestres vacío confuso:
      if (filter === "done") setFilter("all");
    } catch (e) {
      const msg = e.message || "No se pudieron eliminar las tareas hechas";
      setErr(msg);
      showToast("danger", msg);
    } finally {
      setClearing(false);
    }
  }

  const pendientes = useMemo(() => tasks.filter((t) => !t.done).length, [tasks]);
  const hasDone = useMemo(() => tasks.some((t) => t.done), [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  return (
    <>
      <Navbar pendientes={pendientes} />

      <main className="container py-4" style={{ maxWidth: 820 }}>
        {loading && (
          <div className="alert alert-secondary d-flex align-items-center" role="alert">
            <span className="spinner-border spinner-border-sm me-2" aria-hidden /> Cargando...
          </div>
        )}
        {err && !loading && <div className="alert alert-danger" role="alert">{err}</div>}

        <TaskForm onAdd={handleAdd} creating={creating} />

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          shown={filteredTasks.length}
          total={tasks.length}
          onClearDone={handleClearDone}
          clearing={clearing}
          hasDone={hasDone}
        />

        {tasks.length === 0 && !loading ? (
          <div className="text-center opacity-75 py-5">No hay tareas todavía. ¡Creá la primera!</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            updatingId={updatingId}
            deletingId={deletingId}
            onToggle={handleToggle}
            onAskRemove={askRemove}
          />
        )}
      </main>

      <ConfirmModal
        show={confirm.show}
        title="Eliminar tarea"
        message="¿Seguro que querés eliminar esta tarea? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={confirmRemove}
        onCancel={() => setConfirm({ show: false, taskId: null })}
        busy={!!deletingId}
      />

      <Toast
        show={toast.show}
        type={toast.type}
        msg={toast.msg}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </>
  );
}
