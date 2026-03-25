import { useState, useEffect } from 'react';
import { Package, ShoppingCart, TrendingUp, Users, DollarSign, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    products: 1247,
    orders: 89,
    sales: 45680,
    employees: 23,
    pendingOrders: 12,
    lowStock: 5
  });

  const recentOrders = [
    { id: 'ORD-001', client: 'Иван Петров', total: 249.99, status: 'completed', date: '23.03.2026' },
    { id: 'ORD-002', client: 'Мария Сидорова', total: 89.50, status: 'processing', date: '23.03.2026' },
    { id: 'ORD-003', client: 'Алексей Иванов', total: 567.00, status: 'pending', date: '22.03.2026' },
    { id: 'ORD-004', client: 'Елена Козлова', total: 123.45, status: 'completed', date: '22.03.2026' },
  ];

  const topProducts = [
    { name: 'Смартфон Samsung Galaxy A54', sold: 45, revenue: 13499.55 },
    { name: 'Ноутбук Lenovo IdeaPad 3', sold: 28, revenue: 15399.72 },
    { name: 'Наушники Sony WH-1000XM5', sold: 67, revenue: 18759.33 },
    { name: 'Кроссовки Nike Air Max', sold: 89, revenue: 10679.11 },
  ];

  return (
    <div className="dashboard">
      <h1 className="page-title">Панель управления</h1>
      <p className="welcome-text">Добро пожал back, {user?.displayName || 'Сотрудник'}!</p>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(233, 69, 96, 0.15)', color: '#e94560' }}>
            <Package size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.products}</span>
            <span className="stat-label">Товаров на складе</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(78, 204, 163, 0.15)', color: '#4ecca3' }}>
            <ShoppingCart size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.orders}</span>
            <span className="stat-label">Заказов за месяц</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.sales.toLocaleString()} BYN</span>
            <span className="stat-label">Продажи за месяц</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(23, 162, 184, 0.15)', color: '#17a2b8' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.employees}</span>
            <span className="stat-label">Сотрудников</span>
          </div>
        </div>
      </div>

      <div className="alerts-section">
        <div className="alert-card card">
          <div className="alert-icon">
            <AlertTriangle size={20} />
          </div>
          <div className="alert-content">
            <h3>Требуют внимания</h3>
            <p>{stats.pendingOrders} заказов в ожидании</p>
          </div>
        </div>
        <div className="alert-card card">
          <div className="alert-icon warning">
            <Package size={20} />
          </div>
          <div className="alert-content">
            <h3>Заканчивается товар</h3>
            <p>{stats.lowStock} позиций с низким остатком</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2 className="card-title">Последние заказы</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Клиент</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.client}</td>
                  <td>{order.total} BYN</td>
                  <td>
                    <span className={`badge badge-${order.status === 'completed' ? 'success' : order.status === 'processing' ? 'info' : 'warning'}`}>
                      {order.status === 'completed' ? 'Выполнен' : order.status === 'processing' ? 'В обработке' : 'Ожидает'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 className="card-title">Популярные товары</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Товар</th>
                <th>Продано</th>
                <th>Выручка</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, i) => (
                <tr key={i}>
                  <td>{product.name}</td>
                  <td>{product.sold} шт.</td>
                  <td>{product.revenue.toFixed(2)} BYN</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .dashboard {
          animation: fadeIn 0.5s ease-out;
        }

        .welcome-text {
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
          font-size: 1.125rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat-label {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .alerts-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .alert-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: rgba(233, 69, 96, 0.1);
          border-color: rgba(233, 69, 96, 0.3);
        }

        .alert-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent);
          color: white;
        }

        .alert-icon.warning {
          background: var(--color-warning);
          color: var(--color-bg);
        }

        .alert-content h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .alert-content p {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .card-title {
          font-size: 1.125rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .stats-grid, .alerts-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;