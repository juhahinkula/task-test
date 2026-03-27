import { Task } from '../types';

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="card">
        <p style={{ textAlign: 'center', color: '#888', margin: 0 }}>
          No tasks found. Create your first task!
        </p>
      </div>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'todo':
        return 'badge-todo';
      case 'in-progress':
        return 'badge-in-progress';
      case 'done':
        return 'badge-done';
      default:
        return '';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'badge-low';
      case 'medium':
        return 'badge-medium';
      case 'high':
        return 'badge-high';
      default:
        return '';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="card task-card" onClick={() => onEdit(task)}>
          <div className="task-header">
            <div>
              <h3 className="task-title">{task.title}</h3>
              {task.description && <p style={{ color: '#ccc', margin: '0.5rem 0' }}>{task.description}</p>}
            </div>
          </div>
          <div className="task-meta">
            <span className={`badge ${getStatusBadgeClass(task.status)}`}>
              {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
            {task.dueDate && (
              <span style={{ color: '#888', fontSize: '0.875rem' }}>
                Due: {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
