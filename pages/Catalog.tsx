import { useState } from 'react';
import { Search, Filter, Package, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  stock: number;
}

interface Category {
  id: string;
  name: string;
}

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('all');

  const categories: Category[] = [
    { id: 'all', name: 'Все товары' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'clothing', name: 'Одежда' },
    { id: 'home', name: 'Дом и сад' },
    { id: 'sports', name: 'Спорт' },
    { id: 'toys', name: 'Игрушки' },
  ];

  const products: Product[] = [
    { id: 1, name: 'Смартфон Samsung Galaxy A54', category: 'electronics', price: 299.99, oldPrice: 399.99, image: '📱', stock: 15 },
    { id: 2, name: 'Ноутбук Lenovo IdeaPad 3', category: 'electronics', price: 549.99, oldPrice: 699.99, image: '💻', stock: 8 },
    { id: 3, name: 'Наушники Sony WH-1000XM5', category: 'electronics', price: 279.99, oldPrice: 349.99, image: '🎧', stock: 12 },
    { id: 4, name: 'Куртка зимняя мужская', category: 'clothing', price: 89.99, oldPrice: 129.99, image: '🧥', stock: 25 },
    { id: 5, name: 'Кроссовки Nike Air Max', category: 'clothing', price: 119.99, oldPrice: 159.99, image: '👟', stock: 30 },
    { id: 6, name: 'Робот-пылесос Xiaomi', category: 'home', price: 249.99, oldPrice: 329.99, image: '🤖', stock: 5 },
    { id: 7, name: 'Посудомоечная машина Bosch', category: 'home', price: 499.99, oldPrice: 599.99, image: '🧼', stock: 3 },
    { id: 8, name: 'Велосипед горный', category: 'sports', price: 399.99, oldPrice: 499.99, image: '🚴', stock: 7 },
    { id: 9, name: 'Набор гантелей 20кг', category: 'sports', price: 79.99, oldPrice: 99.99, image: '🏋️', stock: 20 },
    { id: 10, name: 'Конструктор LEGO City', category: 'toys', price: 49.99, oldPrice: 69.99, image: '🧱', stock: 40 },
    { id: 11, name: 'Игровая приставка PlayStation 5', category: 'electronics', price: 549.99, image: '🎮', stock: 2 },
    { id: 12, name: 'Телевизор LG 55 дюймов', category: 'electronics', price: 449.99, oldPrice: 549.99, image: '📺', stock: 6 },
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="catalog-page">
      <h1 className="page-title">Каталог товаров</h1>

      <div className="catalog-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="category-filter">
          <Filter size={20} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <div className="product-info">
              <span className="product-category">{categories.find(c => c.id === product.category)?.name}</span>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                <span className="price-current">{product.price} BYN</span>
                {product.oldPrice && (
                  <span className="price-old">{product.oldPrice} BYN</span>
                )}
              </div>
              <div className="product-stock">
                <Package size={16} />
                <span>В наличии: {product.stock} шт.</span>
              </div>
              <button className="btn btn-primary btn-sm">
                <ShoppingCart size={16} />
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <Package size={64} />
          <h3>Товары не найдены</h3>
          <p>Попробуйте изменить параметры поиска</p>
        </div>
      )}

      <style>{`
        .catalog-page {
          animation: fadeIn 0.5s ease-out;
        }

        .catalog-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-box, .category-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-bg-secondary);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
        }

        .search-box {
          flex: 1;
          min-width: 250px;
        }

        .search-box input, .category-filter select {
          background: transparent;
          border: none;
          color: var(--color-text);
          flex: 1;
        }

        .search-box input:focus, .category-filter select:focus {
          outline: none;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .product-card {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .product-image {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          background: var(--color-bg-tertiary);
        }

        .product-info {
          padding: 1.25rem;
        }

        .product-category {
          font-size: 0.75rem;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .product-name {
          font-size: 1rem;
          margin: 0.5rem 0;
          color: var(--color-text);
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .price-current {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-success);
        }

        .price-old {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          text-decoration: line-through;
        }

        .product-stock {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .product-card .btn {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Catalog;
