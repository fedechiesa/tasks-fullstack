import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const nueva = await createTask(title.trim());
    setTasks((prev) => [nueva, ...prev]); // agrego sin recargar
    setTitle("");
  }
  async function toggleDone(t) {
    const updated = await updateTask(t.id, { done: !t.done });
    setTasks((prev) => prev.map((x) => (x.id === t.id ? updated : x)));
  }

  async function remove(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 16 }}>
      <h1>📝 Gestor de Tareas</h1>
      {loading && <p>Cargando...</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <input
          placeholder="Nueva tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Agregar</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 10,
            }}
          >
            <label
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleDone(t)}
              />
              <span
                style={{ textDecoration: t.done ? "line-through" : "none" }}
              >
                {t.title}
              </span>
            </label>
            <button onClick={() => remove(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
