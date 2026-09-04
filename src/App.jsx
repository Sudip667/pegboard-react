import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import TaskModal from "./components/TaskModal.jsx";
import ConfirmModal from "./components/ConfirmModal.jsx";
import ToastStack from "./components/ToastStack.jsx";
import { useTasks } from "./hooks/useTasks.js";
import { useToasts } from "./hooks/useToasts.js";
import { useTheme } from "./hooks/useTheme.js";
import { uid } from "./utils/helpers.js";

export default function App() {
  const [tasks, setTasks] = useTasks();
  const [toasts, pushToast] = useToasts();
  const [theme, toggleTheme] = useTheme();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [modalState, setModalState] = useState(null); // { initial }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [dragState, setDragState] = useState({ draggedId: null, overColumn: null });

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesSearch =
        !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, priorityFilter]);

  const tasksByColumn = useMemo(() => {
    const map = { todo: [], "in-progress": [], done: [] };
    filteredTasks
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .forEach((t) => {
        if (map[t.status]) map[t.status].push(t);
      });
    return map;
  }, [filteredTasks]);

  const openAddModal = (status) => setModalState({ initial: { status: status || "todo", priority: "medium" } });
  const openEditModal = (task) => setModalState({ initial: task });
  const closeModal = () => setModalState(null);

  const saveTask = (task) => {
    if (task.id) {
      setTasks((ts) => ts.map((t) => (t.id === task.id ? task : t)));
      pushToast("Task updated");
    } else {
      setTasks((ts) => [...ts, { ...task, id: uid(), createdAt: Date.now() }]);
      pushToast("Task added");
    }
    closeModal();
  };

  const requestDelete = (task) => setDeleteTarget(task);
  const confirmDelete = () => {
    setTasks((ts) => ts.filter((t) => t.id !== deleteTarget.id));
    pushToast("Task deleted");
    setDeleteTarget(null);
  };

  const moveTask = (id, status) => {
    setTasks((ts) => ts.map((t) => (t.id === id && t.status !== status ? { ...t, status } : t)));
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        onAdd={() => openAddModal("todo")}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <Board
        tasksByColumn={tasksByColumn}
        onEdit={openEditModal}
        onDelete={requestDelete}
        onAddTo={openAddModal}
        dragState={dragState}
        setDragState={setDragState}
        onDropTask={moveTask}
      />

      {modalState && <TaskModal initial={modalState.initial} onSave={saveTask} onClose={closeModal} />}
      {deleteTarget && (
        <ConfirmModal task={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      <ToastStack toasts={toasts} />
    </>
  );
}
