import { SearchIcon, PlusIcon, SunIcon, MoonIcon, BoardMarkIcon } from "./icons.jsx";

export default function Header({ search, setSearch, priorityFilter, setPriorityFilter, onAdd, theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <BoardMarkIcon />
        </span>
        <h1>Pegboard</h1>
        <span className="tagline">a small, sturdy kanban board</span>
      </div>

      <div className="header-controls">
        <div className="search-field">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tasks"
          />
        </div>

        <select
          className="filter-select"
          value={priorityFilter}
          aria-label="Filter by priority"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All priorities</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>

        <button className="btn btn-primary" onClick={onAdd}>
          <PlusIcon /> New task
        </button>

        <button
          className="btn-icon theme-toggle"
          onClick={onToggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
