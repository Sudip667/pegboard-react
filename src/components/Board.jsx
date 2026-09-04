import Column from "./Column.jsx";
import { COLUMNS } from "../utils/helpers.js";

export default function Board({ tasksByColumn, onEdit, onDelete, onAddTo, dragState, setDragState, onDropTask }) {
  return (
    <main className="board">
      {COLUMNS.map((col) => (
        <Column
          key={col.status}
          status={col.status}
          title={col.title}
          tasks={tasksByColumn[col.status]}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddTo={onAddTo}
          dragState={dragState}
          setDragState={setDragState}
          onDropTask={onDropTask}
        />
      ))}
    </main>
  );
}
