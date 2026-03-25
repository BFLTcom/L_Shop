import { Store, Award, Users, TrendingUp, Clock } from 'lucide-react';

const About = () => {
  const timeline = [
    { year: '2019', title: 'Открытие первого магазина', desc: 'Начали с одного магазина в центре города' },
    { year: '2020', title: 'Запуск интернет-магазина', desc: 'Добавили возможность онлайн-покупок' },
    { year: '2021', title: 'Расширение сети', desc: 'Открыли 5 филиалов по городу' },
    { year: '2022', title: '10 000 клиентов', desc: 'Достигли отметки в 10 000 довольных клиентов' },
    { year: '2023', title: 'Новый склад', desc: 'Открыли современный логистический центр' },
  ];

  const values = [
    { icon: Award, title: 'Качество', desc: 'Только проверенные товары от надежных поставщиков' },
    { icon: Users, title: 'Клиенты', desc: 'Индивидуальный подход к каждому покупателю' },
    { icon: TrendingUp, title: 'Развитие', desc: 'Постоянно улучшаем сервис и ассортимент' },
    { icon: Clock, title: 'Надежность', desc: 'Работаем точно в срок, всегда выполняем обещания' },
  ];

  return (
    <div className="about-page">
      <h1 className="page-title">О магазине BrokePrice</h1>

      <section className="about-intro">
        <div className="intro-content">
          <h2>Мы — ваш надежный партнер в мире покупок</h2>
          <p>
            BrokePrice — это сеть магазинов с доступными ценами и широким ассортиментом товаров.
            Мы работаем с 2019 года и за это время помогли тысячам клиентов найти нужные товары по отличным ценам.
          </p>
          <p>
            Наша миссия — сделать качественные товары доступными для каждого. Мы постоянно расширяем ассортимент,
            улучшаем сервис и ищем новые пути для удовлетворения потребностей наших клиентов.
          </p>
        </div>
        <div className="intro-image">
          <Store size={120} />
        </div>
      </section>

      <section className="values">
        <h2 className="section-title">Наши ценности</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-icon">
                <v.icon size={32} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline">
        <h2 className="section-title">Наша история</h2>
        <div className="timeline-container">
          {timeline.map((t, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-year">{t.year}</div>
              <div className="timeline-content">
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="stat-item">
          <span className="stat-number">5+</span>
          <span className="stat-label">Лет на рынке</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50 000+</span>
          <span className="stat-label">Клиентов</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">10 000+</span>
          <span className="stat-label">Товаров</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">8</span>
          <span className="stat-label">Магазинов</span>
        </div>
      </section>

      <style>{`
        .about-page {
          animation: fadeIn 0.5s ease-out;
        }

        .about-intro {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
          align-items: center;
          margin-bottom: 3rem;
          padding: 2rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
        }

        .intro-content h2 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }

        .intro-content p {
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
        }

        .intro-image {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          padding: 2rem;
        }

        .section-title {
          font-size: 1.75rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .value-card {
          background: var(--color-bg-secondary);
          padding: 2rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          text-align: center;
        }

        .value-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(78, 204, 163, 0.15);
          color: var(--color-success);
        }

        .value-card h3 {
          margin-bottom: 0.5rem;
        }

        .value-card p {
          color: var(--color-text-secondary);
        }

        .timeline-container {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 3rem;
        }

        .timeline-container::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--color-border);
        }

        .timeline-item {
          position: relative;
          padding-bottom: 2rem;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -2rem;
          top: 0;
          width: 12px;
          height: 12px;
          background: var(--color-accent);
          border-radius: 50%;
          transform: translateX(-5px);
        }

        .timeline-year {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }

        .timeline-content h3 {
          margin-bottom: 0.5rem;
        }

        .timeline-content p {
          color: var(--color-text-secondary);
        }

        .stats {
          display: flex;
          justify-content: space-around;
          padding: 2rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          flex-wrap: wrap;
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        .stat-label {
          color: var(--color-text-secondary);
        }

        @media (max-width: 768px) {
          .about-intro {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
