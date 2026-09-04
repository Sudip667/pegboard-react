import { useEffect } from "react";

export default function ConfirmModal({ task, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal confirm-modal" role="alertdialog" aria-modal="true">
        <h3>Delete task?</h3>
        <p>"{task.title}" will be removed for good. This can't be undone.</p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" style={{ background: "#e8555a", color: "#1a0505" }} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
