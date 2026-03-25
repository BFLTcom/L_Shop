import { useState } from 'react';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed';

interface Order {
  id: string;
  client: string;
  phone: string;
  address: string;
  total: number;
  status: OrderStatus;
  items: number;
  date: string;
  payment: string;
}

import { Search, Filter, Package, Truck, CheckCircle, Clock, X } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD-2026-001', client: 'Иван Петров', phone: '+375 29 123-45-67', address: 'г. Минск, ул. Ленина 10', total: 249.99, status: 'completed', items: 2, date: '23.03.2026', payment: 'card' },
    { id: 'ORD-2026-002', client: 'Мария Сидорова', phone: '+375 44 987-65-43', address: 'г. Минск, ул. Пушкина 5', total: 89.50, status: 'processing', items: 1, date: '23.03.2026', payment: 'cash' },
    { id: 'ORD-2026-003', client: 'Алексей Иванов', phone: '+375 33 456-78-90', address: 'г. Гомель, ул. Советская 15', total: 567.00, status: 'pending', items: 3, date: '22.03.2026', payment: 'card' },
    { id: 'ORD-2026-004', client: 'Елена Козлова', phone: '+375 29 111-22-33', address: 'г. Минск, ул. Якуба Коласа 20', total: 123.45, status: 'shipped', items: 1, date: '22.03.2026', payment: 'card' },
    { id: 'ORD-2026-005', client: 'Дмитрий Смирнов', phone: '+375 44 555-66-77', address: 'г. Брест, ул. Гоголя 8', total: 899.00, status: 'processing', items: 5, date: '21.03.2026', payment: 'card' },
    { id: 'ORD-2026-006', client: 'Анна Морозова', phone: '+375 29 888-99-00', address: 'г. Минск, ул. Сурганова 12', total: 156.75, status: 'completed', items: 2, date: '21.03.2026', payment: 'cash' },
  ]);

  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed';

  const getStatusIcon = (status: OrderStatus) => {
    const icons = {
      pending: <Clock size={16} />,
      processing: <Package size={16} />,
      shipped: <Truck size={16} />,
      completed: <CheckCircle size={16} />
    };
    return icons[status];
  };

  const getStatusLabel = (status: OrderStatus) => {
    const labels = {
      pending: 'Ожидает',
      processing: 'В обработке',
      shipped: 'Отправлен',
      completed: 'Выполнен'
    };
    return labels[status];
  };

  return (
    <div className="orders-page">
      <h1 className="page-title">Учёт заказов</h1>

      <div className="orders-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Поиск по ID или клиенту..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="filter-tabs">
          <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            Все
          </button>
          <button className={`filter-tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
            Ожидающие
          </button>
          <button className={`filter-tab ${filter === 'processing' ? 'active' : ''}`} onClick={() => setFilter('processing')}>
            В обработке
          </button>
          <button className={`filter-tab ${filter === 'shipped' ? 'active' : ''}`} onClick={() => setFilter('shipped')}>
            Отправленные
          </button>
          <button className={`filter-tab ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>
            Выполненные
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-mini">
          <span>Всего заказов: <strong>{orders.length}</strong></span>
        </div>
        <div className="stat-mini warning">
          <span>Ожидают: <strong>{orders.filter(o => o.status === 'pending').length}</strong></span>
        </div>
        <div className="stat-mini info">
          <span>В обработке: <strong>{orders.filter(o => o.status === 'processing').length}</strong></span>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Клиент</th>
              <th>Товаров</th>
              <th>Сумма</th>
              <th>Дата</th>
              <th>Оплата</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td><code>{order.id}</code></td>
                <td>{order.client}</td>
                <td>{order.items} шт.</td>
                <td>{order.total} BYN</td>
                <td>{order.date}</td>
                <td>{order.payment === 'card' ? 'Карта' : 'Наличные'}</td>
                <td>
                  <span className={`badge badge-${order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'info'}`}>
                    {getStatusIcon(order.status)}
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm" onClick={() => setSelectedOrder(order)}>
                    Подробнее
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Заказ {selectedOrder.id}</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Клиент:</span>
                  <span>{selectedOrder.client}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Телефон:</span>
                  <span>{selectedOrder.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Адрес:</span>
                  <span>{selectedOrder.address}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Количество товаров:</span>
                  <span>{selectedOrder.items}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Сумма:</span>
                  <span className="total-price">{selectedOrder.total} BYN</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Способ оплаты:</span>
                  <span>{selectedOrder.payment === 'card' ? 'Банковская карта' : 'Наличные'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Текущий статус:</span>
                  <span className={`badge badge-${selectedOrder.status === 'completed' ? 'success' : selectedOrder.status === 'pending' ? 'warning' : 'info'}`}>
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
              </div>
              <div className="status-actions">
                <h3>Изменить статус:</h3>
                <div className="action-buttons">
                  <button className="btn btn-sm" onClick={() => updateStatus(selectedOrder.id, 'pending')}>Ожидает</button>
                  <button className="btn btn-sm btn-info" onClick={() => updateStatus(selectedOrder.id, 'processing')}>В обработке</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => updateStatus(selectedOrder.id, 'shipped')}>Отправлен</button>
                  <button className="btn btn-sm btn-primary" onClick={() => updateStatus(selectedOrder.id, 'completed')}>Выполнен</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .orders-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-bg-secondary);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          max-width: 400px;
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

        .filter-tabs {
          display: flex;
          gap: 0.5rem;
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

        .stat-mini.warning {
          border-color: var(--color-warning);
          color: var(--color-warning);
        }

        .stat-mini.info {
          border-color: var(--color-info);
          color: var(--color-info);
        }

        code {
          background: var(--color-bg-tertiary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-sm {
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        }

        .btn-info {
          background: var(--color-info);
          color: white;
        }

        .order-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border);
        }

        .detail-label {
          color: var(--color-text-secondary);
        }

        .total-price {
          font-weight: 700;
          font-size: 1.125rem;
          color: var(--color-accent);
        }

        .status-actions h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

export default Orders;