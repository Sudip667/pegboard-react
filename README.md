# Pegboard — Kanban Task Manager

A real React app (Vite + React 18), not a CDN hack — this is the standard `npm install && npm run dev` setup.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview   # serve the built files locally to check them
```

## Features

- **Create tasks** with a title, description, priority, column, and optional due date
- **Three columns**: To Do → In Progress → Done
- **Drag-and-drop** cards between columns (native HTML5 drag and drop, no library)
- **Edit / delete** tasks, with a confirmation step before delete
- **Priority labels** (High / Medium / Low) with color-coded pills and card borders
- **Search** across title + description, and a **priority filter**
- **Persistence** — tasks are saved to `localStorage` and reload automatically
- Extras: per-column counts, overdue-date highlighting, empty-state hints, toast confirmations, keyboard focus states, and a fully responsive layout (columns stack on mobile)

## Project structure

```
kanban-react/
├── index.html              # Vite entry HTML
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx             # React root
│   ├── App.jsx               # top-level state + composition
│   ├── index.css             # design tokens + all styles
│   ├── components/
│   │   ├── Header.jsx         # brand, search, filter, "New task"
│   │   ├── Board.jsx          # renders the 3 columns
│   │   ├── Column.jsx         # one column + drop zone
│   │   ├── Card.jsx           # one task card (draggable)
│   │   ├── TaskModal.jsx      # add/edit form
│   │   ├── ConfirmModal.jsx   # delete confirmation
│   │   ├── ToastStack.jsx     # bottom-right toasts
│   │   └── icons.jsx          # inline SVG icons
│   ├── hooks/
│   │   ├── useTasks.js        # tasks state synced to localStorage
│   │   └── useToasts.js       # toast queue
│   └── utils/
│       └── helpers.js         # constants, id/date helpers, seed data
└── README.md
```
