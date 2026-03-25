import { useState } from 'react';
import { Plus, Search, Package, Edit, Trash2, X } from 'lucide-react';

type ProductStatus = 'active' | 'low' | 'critical';

interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  minStock: number;
  status: ProductStatus;
}

interface FormData {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  minStock: number;
  status: ProductStatus;
}

const Warehouse = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, sku: 'SM-A546', name: 'Смартфон Samsung Galaxy A54', category: 'Электроника', quantity: 15, price: 299.99, minStock: 5, status: 'active' },
    { id: 2, sku: 'LP-IDEAPAD', name: 'Ноутбук Lenovo IdeaPad 3', category: 'Электроника', quantity: 8, price: 549.99, minStock: 3, status: 'active' },
    { id: 3, sku: 'HP-SONY5', name: 'Наушники Sony WH-1000XM5', category: 'Электроника', quantity: 12, price: 279.99, minStock: 5, status: 'active' },
    { id: 4, sku: 'JK-WINTER', name: 'Куртка зимняя мужская', category: 'Одежда', quantity: 25, price: 89.99, minStock: 10, status: 'active' },
    { id: 5, sku: 'SN-NIKE', name: 'Кроссовки Nike Air Max', category: 'Одежда', quantity: 30, price: 119.99, minStock: 10, status: 'active' },
    { id: 6, sku: 'RB-XIAOMI', name: 'Робот-пылесос Xiaomi', category: 'Дом', quantity: 3, price: 249.99, minStock: 5, status: 'low' },
    { id: 7, sku: 'PG-BOSCH', name: 'Посудомоечная машина Bosch', category: 'Дом', quantity: 2, price: 499.99, minStock: 3, status: 'critical' },
    { id: 8, sku: 'BY-MOUNTAIN', name: 'Велосипед горный', category: 'Спорт', quantity: 7, price: 399.99, minStock: 3, status: 'active' },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', sku: '', category: '', quantity: 0, price: 0, minStock: 5, status: 'active' });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', sku: '', category: '', quantity: 0, price: 0, minStock: 5, status: 'active' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: p.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now(), status: 'active' }]);
    }
    setShowModal(false);
  };

  const getStatusBadge = (status: ProductStatus) => {
    const statuses = {
      active: { label: 'В наличии', class: 'badge-success' },
      low: { label: 'Заканчивается', class: 'badge-warning' },
      critical: { label: 'Критически мало', class: 'badge-danger' }
    };
    return statuses[status];
  };

  return (
    <div className="warehouse-page">
      <h1 className="page-title">Учёт склада</h1>

      <div className="warehouse-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Поиск по названию или артикулу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={20} />
          Добавить товар
        </button>
      </div>

      <div className="products-table">
        <table className="table">
          <thead>
            <tr>
              <th>Артикул</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Кол-во</th>
              <th>Цена</th>
              <th>Мин. остаток</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.price.toFixed(2)} BYN</td>
                <td>{product.minStock}</td>
                <td>
                  <span className={`badge ${getStatusBadge(product.status).class}`}>
                    {getStatusBadge(product.status).label}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(product)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Редактировать товар' : 'Добавить товар'}</h2>
              <button className="btn btn-sm" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Название</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Артикул</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.sku}
                  onChange={e => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Категория</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Количество</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Цена</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Минимальный остаток</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.minStock}
                  onChange={e => setFormData({ ...formData, minStock: Number(e.target.value) })}
                />
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
        .warehouse-page {
          animation: fadeIn 0.5s ease-out;
        }

        .warehouse-controls {
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

        .products-table {
          overflow-x: auto;
        }

        .action-buttons {
          display: flex;
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

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Warehouse;
