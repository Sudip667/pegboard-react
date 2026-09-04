import { useEffect, useRef, useState } from "react";
import { COLUMNS, PRIORITIES } from "../utils/helpers.js";

export default function TaskModal({ initial, onSave, onClose }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [priority, setPriority] = useState(initial.priority || "medium");
  const [status, setStatus] = useState(initial.status || "todo");
  const [dueDate, setDueDate] = useState(initial.dueDate || "");
  const titleRef = useRef(null);
  const isEdit = Boolean(initial.id);

  useEffect(() => {
    titleRef.current && titleRef.current.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      titleRef.current && titleRef.current.focus();
      return;
    }
    onSave({
      ...initial,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
    });
  };

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <h3>{isEdit ? "Edit task" : "New task"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Draft Q3 roadmap"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a bit more detail (optional)"
            />
          </div>

          <div className="field">
            <label>Priority</label>
            <div className="priority-choice">
              {PRIORITIES.map((p) => (
                <button
                  type="button"
                  key={p}
                  data-priority={p}
                  data-active={priority === p}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="task-status">Column</label>
              <select id="task-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                {COLUMNS.map((c) => (
                  <option key={c.status} value={c.status}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="task-due">Due date</label>
              <input id="task-due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
