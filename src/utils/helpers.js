export const STORAGE_KEY = "pegboard.tasks.v1";

export const COLUMNS = [
  { status: "todo", title: "To Do" },
  { status: "in-progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

export const PRIORITIES = ["high", "medium", "low"];

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function fmtDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isOverdue(dueDate, status) {
  if (!dueDate || status === "done") return false;
  return dueDate < fmtDate(new Date());
}

export function seedTasks() {
  const today = new Date();
  const in3 = new Date(today);
  in3.setDate(in3.getDate() + 3);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return [
    {
      id: uid(),
      title: "Sketch onboarding flow",
      description: "Rough wireframes for the first-run experience — keep it to three screens.",
      priority: "medium",
      status: "todo",
      dueDate: fmtDate(in3),
      createdAt: Date.now() - 400000,
    },
    {
      id: uid(),
      title: "Fix drag-and-drop on Safari",
      description: "Cards snap back instead of dropping into the column on iOS Safari.",
      priority: "high",
      status: "in-progress",
      dueDate: fmtDate(yesterday),
      createdAt: Date.now() - 300000,
    },
    {
      id: uid(),
      title: "Write release notes",
      description: "Summarize what shipped this week for the changelog.",
      priority: "low",
      status: "done",
      dueDate: "",
      createdAt: Date.now() - 200000,
    },
  ];
}
