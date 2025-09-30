import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { v4 as uuid } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// --------------------
// CONFIG DE ARCHIVO
// --------------------
const TASKS_PATH = path.join(__dirname, "data", "tasks.json");
if (!existsSync(TASKS_PATH)) {
  writeFileSync(TASKS_PATH, "[]", "utf-8");
}

function loadTasks() {
  try {
    const data = readFileSync(TASKS_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  writeFileSync(TASKS_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

// --------------------
// ENDPOINTS
// --------------------

// 🔹 Healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, at: new Date().toISOString() });
});

// 🔹 Obtener todas las tareas
app.get("/api/tasks", (_req, res) => {
  res.json(loadTasks());
});

// 🔹 Crear una tarea nueva
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Título inválido" });
  }
  const tasks = loadTasks();
  const nueva = { id: uuid(), title: title.trim(), done: false, createdAt: Date.now() };
  tasks.push(nueva);
  saveTasks(tasks);
  res.status(201).json(nueva);
});

// 🔹 Editar una tarea (cambiar título o marcar como hecha)
app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;
  const tasks = loadTasks();
  const i = tasks.findIndex(t => t.id === id);
  if (i === -1) return res.status(404).json({ error: "Tarea no encontrada" });

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Título inválido" });
    }
    tasks[i].title = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== "boolean") {
      return res.status(400).json({ error: "done debe ser boolean" });
    }
    tasks[i].done = done;
  }

  saveTasks(tasks);
  res.json(tasks[i]);
});

// 🔹 Eliminar una tarea
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = loadTasks();
  const next = tasks.filter(t => t.id !== id);
  if (next.length === tasks.length) return res.status(404).json({ error: "No encontrada" });
  saveTasks(next);
  res.status(204).end();
});

// --------------------
// SERVIDOR
// --------------------
const PORT = 4000;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`API Express en http://127.0.0.1:${PORT}`);
});
