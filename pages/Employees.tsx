import { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, X, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type EmployeeRole = 'admin' | 'manager' | 'employee';
type EmployeeStatus = 'active' | 'inactive';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  position: string;
  status: EmployeeStatus;
  hireDate: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  position: string;
}

const Employees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Алексей Иванов', email: 'alexey@brokeprice.by', phone: '+375 29 123-45-67', role: 'admin', position: 'Директор', status: 'active', hireDate: '2023-01-15' },
    { id: 2, name: 'Мария Козлова', email: 'maria@brokeprice.by', phone: '+375 44 987-65-43', role: 'manager', position: 'Менеджер', status: 'active', hireDate: '2023-03-20' },
    { id: 3, name: 'Иван Петров', email: 'ivan@brokeprice.by', phone: '+375 33 456-78-90', role: 'employee', position: 'Продавец-консультант', status: 'active', hireDate: '2023-06-10' },
    { id: 4, name: 'Елена Сидорова', email: 'elena@brokeprice.by', phone: '+375 29 111-22-33', role: 'employee', position: 'Кассир', status: 'active', hireDate: '2023-08-05' },
    { id: 5, name: 'Дмитрий Смирнов', email: 'dmitry@brokeprice.by', phone: '+375 44 555-66-77', role: 'employee', position: 'Кладовщик', status: 'inactive', hireDate: '2023-02-28' },
    { id: 6, name: 'Анна Морозова', email: 'anna@brokeprice.by', phone: '+375 29 888-99-00', role: 'employee', position: 'Продавец-консультант', status: 'active', hireDate: '2024-01-10' },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', role: 'employee', position: '' });

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить сотрудника?')) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setFormData({ name: '', email: '', phone: '', role: 'employee', position: '' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingEmployee) {
      setEmployees(employees.map(e => e.id === editingEmployee.id ? { ...formData, id: e.id, status: e.status, hireDate: e.hireDate } : e));
    } else {
      setEmployees([...employees, { ...formData, id: Date.now(), status: 'active', hireDate: new Date().toISOString().split('T')[0] }]);
    }
    setShowModal(false);
  };

  const getRoleBadge = (role: EmployeeRole) => {
    const roles = {
      admin: { label: 'Администратор', class: 'badge-danger' },
      manager: { label: 'Менеджер', class: 'badge-warning' },
      employee: { label: 'Сотрудник', class: 'badge-info' }
    };
    return roles[role];
  };

  return (
    <div className="employees-page">
      <h1 className="page-title">Учёт сотрудников</h1>

      <div className="employees-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={20} />
          Добавить сотрудника
        </button>
      </div>

      <div className="employees-grid">
        {filteredEmployees.map(employee => (
          <div key={employee.id} className="employee-card card">
            <div className="employee-avatar">
              <User size={32} />
            </div>
            <div className="employee-info">
              <h3>{employee.name}</h3>
              <p className="employee-position">{employee.position}</p>
              <p className="employee-email">{employee.email}</p>
              <p className="employee-phone">{employee.phone}</p>
              <div className="employee-badges">
                <span className={`badge ${getRoleBadge(employee.role).class}`}>
                  {getRoleBadge(employee.role).label}
                </span>
                <span className={`badge ${employee.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>
                  {employee.status === 'active' ? 'Активен' : 'Неактивен'}
                </span>
              </div>
            </div>
            <div className="employee-actions">
              <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(employee)}>
                <Edit size={16} />
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(employee.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingEmployee ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</h2>
              <button className="btn btn-sm" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Имя</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Телефон</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Должность</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Роль</label>
                <select
                  className="input-field"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as EmployeeRole })}
                >
                  <option value="employee">Сотрудник</option>
                  <option value="manager">Менеджер</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Отмена
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .employees-page {
          animation: fadeIn 0.5s ease-out;
        }

        .employees-controls {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-bg-secondary);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          flex: 1;
          min-width: 250px;
        }

        .search-box input {
          background: transparent;
          border: none;
          color: var(--color-text);
          flex: 1;
        }

        .search-box input:focus {
          outline: none;
        }

        .employees-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .employee-card {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
        }

        .employee-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--color-bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .employee-info {
          flex: 1;
        }

        .employee-info h3 {
          font-size: 1.125rem;
          margin-bottom: 0.25rem;
        }

        .employee-position {
          color: var(--color-accent);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .employee-email, .employee-phone {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .employee-badges {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .employee-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .modal-header h2 {
          font-size: 1.25rem;
          margin: 0;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid var(--color-border);
        }
      `}</style>
    </div>
  );
};

export default Employees;
