import { isOverdue } from "../utils/helpers.js";
import { EditIcon, TrashIcon, CalendarIcon } from "./icons.jsx";

export default function Card({ task, isDragging, onEdit, onDelete, onDragStart, onDragEnd }) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className={"card" + (isDragging ? " dragging" : "")}
      data-priority={task.priority}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      tabIndex={0}
    >
      <div className="card-top">
        <p className="card-title">{task.title}</p>
        <div className="card-actions">
          <button className="card-action-btn" title="Edit task" onClick={() => onEdit(task)}>
            <EditIcon />
          </button>
          <button className="card-action-btn danger" title="Delete task" onClick={() => onDelete(task)}>
            <TrashIcon />
          </button>
        </div>
      </div>

      {task.description ? <p className="card-desc">{task.description}</p> : null}

      <div className="card-meta">
        <span className="priority-pill" data-priority={task.priority}>
          {task.priority}
        </span>
        {task.dueDate ? (
          <span className={"due-pill" + (overdue ? " overdue" : "")}>
            <CalendarIcon />
            {task.dueDate}
          </span>
        ) : null}
      </div>
    </div>
  );
}
