import Card from "./Card.jsx";
import { PlusIcon } from "./icons.jsx";

export default function Column({
  status,
  title,
  tasks,
  onEdit,
  onDelete,
  onAddTo,
  dragState,
  setDragState,
  onDropTask,
}) {
  const isOver = dragState.overColumn === status;

  const handleDragOver = (e) => {
    e.preventDefault();
    if (dragState.overColumn !== status) {
      setDragState((s) => ({ ...s, overColumn: status }));
    }
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget === e.target) {
      setDragState((s) => ({ ...s, overColumn: null }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (dragState.draggedId) onDropTask(dragState.draggedId, status);
    setDragState({ draggedId: null, overColumn: null });
  };

  return (
    <div
      className={"column" + (isOver ? " drag-over" : "")}
      data-status={status}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-head">
        <span className="column-dot" />
        <h2>{title}</h2>
        <span className="column-count">{tasks.length}</span>
        <button
          className="btn-icon btn-add"
          title={`Add task to ${title}`}
          onClick={() => onAddTo(status)}
        >
          <PlusIcon />
        </button>
      </div>

      <div className="column-body">
        {tasks.length === 0 ? (
          <div className="empty-column">Nothing here yet — drag a card over or add a new task.</div>
        ) : (
          tasks.map((t) => (
            <Card
              key={t.id}
              task={t}
              onEdit={onEdit}
              onDelete={onDelete}
              isDragging={dragState.draggedId === t.id}
              onDragStart={(e, id) => {
                e.dataTransfer.effectAllowed = "move";
                setDragState({ draggedId: id, overColumn: null });
              }}
              onDragEnd={() => setDragState({ draggedId: null, overColumn: null })}
            />
          ))
        )}
      </div>
    </div>
  );
}
