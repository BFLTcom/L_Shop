import { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';

type Period = 'week' | 'month';

interface SalesData {
  day: string;
  sales: number;
}

const Sales = () => {
  const [period, setPeriod] = useState<Period>('week');

  const [stats] = useState({
    totalRevenue: 45680,
    totalOrders: 89,
    avgOrder: 513.03,
    growth: 12.5
  });

  const salesData: Record<Period, SalesData[]> = {
    week: [
      { day: 'Пн', sales: 2340 },
      { day: 'Вт', sales: 3120 },
      { day: 'Ср', sales: 1890 },
      { day: 'Чт', sales: 4230 },
      { day: 'Пт', sales: 5670 },
      { day: 'Сб', sales: 7890 },
      { day: 'Вс', sales: 6540 },
    ],
    month: [
      { day: '1', sales: 12300 },
      { day: '5', sales: 15600 },
      { day: '10', sales: 8900 },
      { day: '15', sales: 18900 },
      { day: '20', sales: 23400 },
      { day: '25', sales: 19800 },
      { day: '30', sales: 14500 },
    ]
  };

  const recentSales = [
    { id: 'SALE-001', product: 'Смартфон Samsung Galaxy A54', quantity: 2, total: 599.98, date: '23.03.2026', seller: 'Алексей С.' },
    { id: 'SALE-002', product: 'Кроссовки Nike Air Max', quantity: 1, total: 119.99, date: '23.03.2026', seller: 'Мария К.' },
    { id: 'SALE-003', product: 'Ноутбук Lenovo IdeaPad 3', quantity: 1, total: 549.99, date: '23.03.2026', seller: 'Иван П.' },
    { id: 'SALE-004', product: 'Наушники Sony WH-1000XM5', quantity: 3, total: 839.97, date: '22.03.2026', seller: 'Елена В.' },
    { id: 'SALE-005', product: 'Робот-пылесос Xiaomi', quantity: 1, total: 249.99, date: '22.03.2026', seller: 'Алексей С.' },
  ];

  const topProducts = [
    { name: 'Кроссовки Nike Air Max', sold: 89, revenue: 10679 },
    { name: 'Наушники Sony WH-1000XM5', sold: 67, revenue: 18759 },
    { name: 'Смартфон Samsung Galaxy A54', sold: 45, revenue: 13499 },
    { name: 'Ноутбук Lenovo IdeaPad 3', sold: 28, revenue: 15399 },
  ];

  const maxSales = Math.max(...salesData[period].map((d: SalesData) => d.sales));

  return (
    <div className="sales-page">
      <h1 className="page-title">Учёт продаж</h1>

      <div className="sales-controls">
        <div className="period-selector">
          <button className={`period-btn ${period === 'week' ? 'active' : ''}`} onClick={() => setPeriod('week')}>Неделя</button>
          <button className={`period-btn ${period === 'month' ? 'active' : ''}`} onClick={() => setPeriod('month')}>Месяц</button>
        </div>
        <button className="btn btn-secondary">
          <Download size={18} />
          Экспорт
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(233, 69, 96, 0.15)', color: '#e94560' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.totalRevenue.toLocaleString()} BYN</span>
            <span className="stat-label">Общая выручка</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(78, 204, 163, 0.15)', color: '#4ecca3' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.totalOrders}</span>
            <span className="stat-label">Заказов</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.avgOrder.toFixed(2)} BYN</span>
            <span className="stat-label">Средний чек</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(23, 162, 184, 0.15)', color: '#17a2b8' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">+{stats.growth}%</span>
            <span className="stat-label">Рост</span>
          </div>
        </div>
      </div>

      <div className="sales-grid">
        <div className="card chart-card">
          <h2 className="card-title">Динамика продаж</h2>
          <div className="chart-container">
            <div className="bar-chart">
              {salesData[period].map((item, i) => (
                <div key={i} className="bar-wrapper">
                  <div className="bar" style={{ height: `${(item.sales / maxSales) * 100}%` }}>
                    <span className="bar-value">{item.sales.toLocaleString()}</span>
                  </div>
                  <span className="bar-label">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Топ товаров</h2>
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
                  <td>{product.revenue.toLocaleString()} BYN</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Последние продажи</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Товар</th>
              <th>Кол-во</th>
              <th>Сумма</th>
              <th>Дата</th>
              <th>Продавец</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map(sale => (
              <tr key={sale.id}>
                <td><code>{sale.id}</code></td>
                <td>{sale.product}</td>
                <td>{sale.quantity} шт.</td>
                <td>{sale.total} BYN</td>
                <td>{sale.date}</td>
                <td>{sale.seller}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .sales-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .period-selector {
          display: flex;
          gap: 0.5rem;
          background: var(--color-bg-secondary);
          padding: 0.25rem;
          border-radius: var(--radius-sm);
        }

        .period-btn {
          padding: 0.5rem 1.25rem;
          border: none;
          background: transparent;
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .period-btn.active {
          background: var(--color-accent);
          color: white;
        }

        .chart-card {
          min-height: 300px;
        }

        .chart-container {
          height: 220px;
          display: flex;
          align-items: flex-end;
        }

        .bar-chart {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          height: 100%;
          gap: 0.5rem;
        }

        .bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          height: 100%;
        }

        .bar {
          width: 100%;
          background: linear-gradient(to top, var(--color-accent), #ff6b7a);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          position: relative;
          min-height: 20px;
          transition: height 0.3s ease;
          display: flex;
          justify-content: center;
          margin-top: auto;
        }

        .bar-value {
          position: absolute;
          top: -25px;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          white-space: nowrap;
        }

        .bar-label {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        code {
          background: var(--color-bg-tertiary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default Sales;