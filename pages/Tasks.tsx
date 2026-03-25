import { useState } from 'react';
import { CheckSquare, Plus, X, Calendar, Clock, User } from 'lucide-react';

type TaskPriority = 'high' | 'medium' | 'low';
type TaskStatus = 'pending' | 'in-progress' | 'completed';

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  priority: TaskPriority;
  status: TaskStatus;
  date: string;
  time: string;
}

interface TaskFormData {
  title: string;
  description: string;
  assignedTo: string;
  priority: TaskPriority;
  date: string;
  time: string;
}

interface PriorityInfo {
  label: string;
  class: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Открыть магазин', description: 'Подготовить зал к открытию, включить свет, проверить кассу', assignedTo: 'Алексей Иванов', priority: 'high', status: 'completed', date: '23.03.2026', time: '08:00' },
    { id: 2, title: 'Приёмка товара', description: 'Принять поставку电子产品 на склад', assignedTo: 'Дмитрий Смирнов', priority: 'high', status: 'in-progress', date: '23.03.2026', time: '09:00' },
    { id: 3, title: 'Обновить ценники', description: 'Заменить ценники на акционные товары', assignedTo: 'Елена Сидорова', priority: 'medium', status: 'pending', date: '23.03.2026', time: '10:30' },
    { id: 4, title: 'Проверить остатки', description: 'Сделать сверку остатков с базой данных', assignedTo: 'Иван Петров', priority: 'medium', status: 'pending', date: '23.03.2026', time: '11:00' },
    { id: 5, title: 'Обработать заказы', description: 'Подготовить 5 заказов к отправке', assignedTo: 'Мария Козлова', priority: 'high', status: 'pending', date: '23.03.2026', time: '14:00' },
    { id: 6, title: 'Инвентаризация', description: 'Пересчёт товаров в отделе "Одежда"', assignedTo: 'Анна Морозова', priority: 'low', status: 'pending', date: '24.03.2026', time: '15:00' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState<TaskFormData>({ title: '', description: '', assignedTo: '', priority: 'medium', date: new Date().toISOString().split('T')[0], time: '09:00' });
  const [filter, setFilter] = useState<string>('all');

  const employees = ['Алексей Иванов', 'Мария Козлова', 'Иван Петров', 'Елена Сидорова', 'Дмитрий Смирнов', 'Анна Морозова'];

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t: Task) => t.status === filter);

  const addTask = () => {
    if (newTask.title && newTask.assignedTo) {
      setTasks([...tasks, { ...newTask, id: Date.now(), status: 'pending' }]);
      setShowModal(false);
      setNewTask({ title: '', description: '', assignedTo: '', priority: 'medium', date: new Date().toISOString().split('T')[0], time: '09:00' });
    }
  };

  const updateStatus = (taskId: number, newStatus: TaskStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const getPriorityBadge = (priority: TaskPriority): PriorityInfo => {
    const priorities: Record<TaskPriority, PriorityInfo> = {
      high: { label: 'Высокий', class: 'badge-danger' },
      medium: { label: 'Средний', class: 'badge-warning' },
      low: { label: 'Низкий', class: 'badge-info' }
    };
    return priorities[priority];
  };

  const getStatusLabel = (status: TaskStatus): string => {
    const statuses: Record<TaskStatus, string> = {
      pending: 'Ожидает',
      'in-progress': 'В процессе',
      completed: 'Выполнено'
    };
    return statuses[status];
  };

  const todaysTasks = tasks.filter((t: Task) => t.date === '23.03.2026');

  return (
    <div className="tasks-page">
      <h1 className="page-title">Назначение обязанностей на день</h1>

      <div className="tasks-header">
        <div className="today-date">
          <Calendar size={20} />
          <span>23 марта 2026, Понедельник</span>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Добавить задачу
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-mini">
          <span>Всего задач сегодня: <strong>{todaysTasks.length}</strong></span>
        </div>
        <div className="stat-mini warning">
          <span>В ожидании: <strong>{todaysTasks.filter(t => t.status === 'pending').length}</strong></span>
        </div>
        <div className="stat-mini info">
          <span>В процессе: <strong>{todaysTasks.filter(t => t.status === 'in-progress').length}</strong></span>
        </div>
        <div className="stat-mini success">
          <span>Выполнено: <strong>{todaysTasks.filter(t => t.status === 'completed').length}</strong></span>
        </div>
      </div>

      <div className="filter-tabs">
        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Все</button>
        <button className={`filter-tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Ожидают</button>
        <button className={`filter-tab ${filter === 'in-progress' ? 'active' : ''}`} onClick={() => setFilter('in-progress')}>В процессе</button>
        <button className={`filter-tab ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Выполнены</button>
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-card card ${task.status}`}>
            <div className="task-priority">
              <span className={`badge ${getPriorityBadge(task.priority).class}`}>
                {getPriorityBadge(task.priority).label}
              </span>
            </div>
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <div className="task-meta">
                <span><User size={14} /> {task.assignedTo}</span>
                <span><Calendar size={14} /> {task.date}</span>
                <span><Clock size={14} /> {task.time}</span>
              </div>
            </div>
            <div className="task-actions">
              <span className={`status-badge status-${task.status}`}>{getStatusLabel(task.status)}</span>
              <div className="status-buttons">
                {task.status !== 'completed' && (
                  <button 
                    className="btn btn-sm btn-success" 
                    onClick={() => updateStatus(task.id, 'completed')}
                  >
                    <CheckSquare size={16} />
                    Выполнено
                  </button>
                )}
                {task.status === 'pending' && (
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => updateStatus(task.id, 'in-progress')}
                  >
                    Начать
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Новая задача</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Название</label>
                <input
                  type="text"
                  className="input-field"
                  value={newTask.title}
                  onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Введите название задачи"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Описание</label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={newTask.description}
                  onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Опишите задачу"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Исполнитель</label>
                  <select
                    className="input-field"
                    value={newTask.assignedTo}
                    onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  >
                    <option value="">Выберите сотрудника</option>
                    {employees.map(emp => (
                      <option key={emp} value={emp}>{emp}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Приоритет</label>
                  <select
                    className="input-field"
                    value={newTask.priority}
                    onChange={e => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Дата</label>
                  <input
                    type="date"
                    className="input-field"
                    value={newTask.date}
                    onChange={e => setNewTask({ ...newTask, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Время</label>
                  <input
                    type="time"
                    className="input-field"
                    value={newTask.time}
                    onChange={e => setNewTask({ ...newTask, time: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Отмена</button>
              <button className="btn btn-primary" onClick={addTask}>Добавить задачу</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .today-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-secondary);
          font-size: 1.125rem;
        }

        .stats-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .stat-mini {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
        }

        .stat-mini.warning { border-color: var(--color-warning); color: var(--color-warning); }
        .stat-mini.info { border-color: var(--color-info); color: var(--color-info); }
        .stat-mini.success { border-color: var(--color-success); color: var(--color-success); }

        .filter-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 0.5rem 1rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-tab:hover, .filter-tab.active {
          background: var(--color-accent);
          color: white;
          border-color: var(--color-accent);
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .task-card {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          border-left: 4px solid var(--color-border);
        }

        .task-card.completed {
          border-left-color: var(--color-success);
          opacity: 0.7;
        }

        .task-card.in-progress {
          border-left-color: var(--color-info);
        }

        .task-card.pending {
          border-left-color: var(--color-warning);
        }

        .task-priority {
          flex-shrink: 0;
        }

        .task-content {
          flex: 1;
        }

        .task-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .task-description {
          color: var(--color-text-secondary);
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .task-meta {
          display: flex;
          gap: 1.5rem;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .task-meta span {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .task-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }

        .status-badge {
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-pending {
          background: rgba(255, 193, 7, 0.2);
          color: var(--color-warning);
        }

        .status-in-progress {
          background: rgba(23, 162, 184, 0.2);
          color: var(--color-info);
        }

        .status-completed {
          background: rgba(78, 204, 163, 0.2);
          color: var(--color-success);
        }

        .status-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-success {
          background: var(--color-success);
          color: white;
        }

        .btn-info {
          background: var(--color-info);
          color: white;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        textarea.input-field {
          resize: vertical;
          min-height: 80px;
        }
      `}</style>
    </div>
  );
};

export default Tasks;