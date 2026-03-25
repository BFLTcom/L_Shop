import { useState } from 'react';
import { Tag, Printer, Download, CheckSquare } from 'lucide-react';

interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  category: string;
}

const PriceTags = () => {
  const [products] = useState<Product[]>([
    { id: 1, sku: 'SM-A546', name: 'Смартфон Samsung Galaxy A54', price: 299.99, category: 'Электроника' },
    { id: 2, sku: 'LP-IDEAPAD', name: 'Ноутбук Lenovo IdeaPad 3', price: 549.99, category: 'Электроника' },
    { id: 3, sku: 'HP-SONY5', name: 'Наушники Sony WH-1000XM5', price: 279.99, category: 'Электроника' },
    { id: 4, sku: 'JK-WINTER', name: 'Куртка зимняя мужская', price: 89.99, category: 'Одежда' },
    { id: 5, sku: 'SN-NIKE', name: 'Кроссовки Nike Air Max', price: 119.99, category: 'Одежда' },
    { id: 6, sku: 'RB-XIAOMI', name: 'Робот-пылесос Xiaomi', price: 249.99, category: 'Дом' },
    { id: 7, sku: 'PG-BOSCH', name: 'Посудомоечная машина Bosch', price: 499.99, category: 'Дом' },
    { id: 8, sku: 'BY-MOUNTAIN', name: 'Велосипед горный', price: 399.99, category: 'Спорт' },
  ]);

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceTagSize, setPriceTagSize] = useState<string>('medium');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = categoryFilter === 'all' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  const toggleProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const printTags = () => {
    alert(`Печать ценников для ${selectedProducts.length} товаров\nРазмер: ${priceTagSize}`);
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',');
  };

  return (
    <div className="pricetags-page">
      <h1 className="page-title">Меню ценников</h1>

      <div className="pricetags-controls">
        <div className="filter-group">
          <label>Категория:</label>
          <select 
            className="input-field" 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Все категории</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Размер ценника:</label>
          <div className="size-buttons">
            <button 
              className={`size-btn ${priceTagSize === 'small' ? 'active' : ''}`}
              onClick={() => setPriceTagSize('small')}
            >
              Маленький
            </button>
            <button 
              className={`size-btn ${priceTagSize === 'medium' ? 'active' : ''}`}
              onClick={() => setPriceTagSize('medium')}
            >
              Средний
            </button>
            <button 
              className={`size-btn ${priceTagSize === 'large' ? 'active' : ''}`}
              onClick={() => setPriceTagSize('large')}
            >
              Большой
            </button>
          </div>
        </div>
      </div>

      <div className="pricetags-actions">
        <button className="btn btn-secondary" onClick={selectAll}>
          <CheckSquare size={18} />
          {selectedProducts.length === filteredProducts.length ? 'Снять всё' : 'Выбрать все'}
        </button>
        <button 
          className="btn btn-primary" 
          disabled={selectedProducts.length === 0}
          onClick={printTags}
        >
          <Printer size={18} />
          Печать ценников ({selectedProducts.length})
        </button>
      </div>

      <div className="selected-count">
        Выбрано товаров: {selectedProducts.length} из {filteredProducts.length}
      </div>

      <div className="tags-grid">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className={`tag-card ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
            onClick={() => toggleProduct(product.id)}
          >
            <div className="tag-checkbox">
              <input 
                type="checkbox" 
                checked={selectedProducts.includes(product.id)}
                onChange={() => toggleProduct(product.id)}
              />
            </div>
            <div className="tag-preview" data-size={priceTagSize}>
              <div className="tag-name">{product.name}</div>
              <div className="tag-sku">Арт: {product.sku}</div>
              <div className="tag-price">{formatPrice(product.price)} BYN</div>
              <div className="tag-barcode">
                <div className="barcode-lines">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .pricetags-controls {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .filter-group label {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .filter-group .input-field {
          min-width: 180px;
        }

        .size-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .size-btn {
          padding: 0.5rem 1rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .size-btn:hover, .size-btn.active {
          background: var(--color-accent);
          color: white;
          border-color: var(--color-accent);
        }

        .pricetags-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .selected-count {
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .tags-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .tag-card {
          background: var(--color-bg-secondary);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          gap: 1rem;
        }

        .tag-card:hover {
          border-color: var(--color-accent);
        }

        .tag-card.selected {
          border-color: var(--color-accent);
          background: rgba(233, 69, 96, 0.05);
        }

        .tag-checkbox {
          display: flex;
          align-items: flex-start;
          padding-top: 0.25rem;
        }

        .tag-checkbox input {
          width: 18px;
          height: 18px;
          accent-color: var(--color-accent);
        }

        .tag-preview {
          flex: 1;
          background: white;
          border-radius: var(--radius-sm);
          padding: 1rem;
          color: #333;
        }

        .tag-preview[data-size="small"] {
          padding: 0.5rem;
        }

        .tag-preview[data-size="large"] {
          padding: 1.5rem;
        }

        .tag-name {
          font-weight: 700;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }

        .tag-preview[data-size="large"] .tag-name {
          font-size: 1rem;
        }

        .tag-sku {
          font-size: 0.75rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .tag-price {
          font-weight: 700;
          font-size: 1.25rem;
          color: #e94560;
        }

        .tag-preview[data-size="small"] .tag-price {
          font-size: 1rem;
        }

        .tag-preview[data-size="large"] .tag-price {
          font-size: 1.5rem;
        }

        .tag-barcode {
          margin-top: 0.5rem;
        }

        .barcode-lines {
          display: flex;
          gap: 2px;
          height: 20px;
        }

        .barcode-lines span {
          width: 2px;
          background: #333;
        }
      `}</style>
    </div>
  );
};

export default PriceTags;