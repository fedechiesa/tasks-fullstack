const API = "http://127.0.0.1:4000/api";

export async function getTasks() {
  const r = await fetch(`${API}/tasks`);
  if (!r.ok) throw new Error("Error al cargar tareas");
  return r.json();
}

export async function createTask(title) {
  const r = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  if (!r.ok) throw new Error("Error al crear tarea");
  return r.json();
}

export async function updateTask(id, data) {
  const r = await fetch(`${API}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error("Error al actualizar tarea");
  return r.json();
}

export async function deleteTask(id) {
  const r = await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
  if (!(r.ok || r.status === 204)) throw new Error("Error al borrar tarea");
}

export async function clearDone() {
  const res = await fetch("/api/tasks?done=true", { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "No se pudieron eliminar las tareas hechas");
  }
  return true; // 204
}
