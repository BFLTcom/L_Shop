import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, CreditCard, Shield, ArrowRight, Package, TrendingUp, Store } from 'lucide-react';

const Home = () => {
  const features = [
    { icon: Package, title: 'Большой ассортимент', desc: 'Тысячи товаров по низким ценам' },
    { icon: Truck, title: 'Быстрая доставка', desc: 'Доставим за 1-2 дня' },
    { icon: CreditCard, title: 'Удобная оплата', desc: 'Наличными и картой' },
    { icon: Shield, title: 'Гарантия качества', desc: 'Возврат в течение 14 дней' },
  ];

  const benefits = [
    { icon: TrendingUp, title: 'Скидки до 70%', desc: 'Регулярные акции и распродажи' },
    { icon: Store, title: 'Физические магазины', desc: 'Заберите заказ в удобном месте' },
    { icon: ShoppingBag, title: 'Легкий возврат', desc: 'Простая процедура возврата товара' },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Магазин <span className="highlight">BrokePrice</span>
          </h1>
          <p className="hero-subtitle">
            Качественные товары по доступным ценам. Более 10 000 наименований в наличии
          </p>
          <div className="hero-actions">
            <Link to="/catalog" className="btn btn-primary">
              Смотреть каталог
              <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Узнать больше
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">10 000+</span>
            <span className="stat-text">Товаров</span>
          </div>
          <div className="stat">
            <span className="stat-number">50 000+</span>
            <span className="stat-text">Клиентов</span>
          </div>
          <div className="stat">
            <span className="stat-number">5 лет</span>
            <span className="stat-text">На рынке</span>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">
                <f.icon size={32} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="benefits">
        <h2 className="section-title">Наши преимущества</h2>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <div className="benefit-icon">
                <b.icon size={28} />
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Готовы сделать заказ?</h2>
        <p>Переходите в каталог и выбирайте нужные товары</p>
        <Link to="/catalog" className="btn btn-primary">
          Перейти в каталог
        </Link>
      </section>

      <style>{`
        .home-page {
          animation: fadeIn 0.5s ease-out;
        }

        .hero {
          text-align: center;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%);
          border-radius: var(--radius-lg);
          margin-bottom: 3rem;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(233, 69, 96, 0.1) 0%, transparent 50%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .highlight {
          background: linear-gradient(135deg, var(--color-accent), var(--color-success));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        .stat-text {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .section-title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .features, .benefits {
          margin-bottom: 3rem;
        }

        .features-grid, .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .feature-card, .benefit-card {
          background: var(--color-bg-secondary);
          padding: 2rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature-card:hover, .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .feature-icon, .benefit-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(233, 69, 96, 0.15);
          color: var(--color-accent);
        }

        .feature-card h3, .benefit-card h3 {
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .feature-card p, .benefit-card p {
          color: var(--color-text-secondary);
        }

        .cta {
          text-align: center;
          padding: 3rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }

        .cta h2 {
          margin-bottom: 1rem;
        }

        .cta p {
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
