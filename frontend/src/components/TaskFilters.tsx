type FiltersState = {
  status: string;
  priority: string;
  search: string;
}

type TaskFiltersProps = {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

function TaskFilters({ filters, onFilterChange }: TaskFiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    onFilterChange({
      status: '',
      priority: '',
      search: ''
    });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          className="form-control"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          className="form-control"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          className="form-control"
          value={filters.priority}
          onChange={handleChange}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="filter-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button onClick={handleReset} className="btn btn-secondary" style={{ width: '100%' }}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
