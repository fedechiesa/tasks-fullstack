import TaskItem from "./TaskItem";

export default function TaskList({ tasks, updatingId, deletingId, onToggle, onAskRemove }) {
  if (tasks.length === 0) {
    return <div className="text-center opacity-75 py-5">No hay tareas para el filtro seleccionado.</div>;
  }
  return (
    <div className="d-grid gap-3">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          updating={updatingId === t.id}
          deleting={deletingId === t.id}
          onToggle={onToggle}
          onAskRemove={onAskRemove}
        />
      ))}
    </div>
  );
}
