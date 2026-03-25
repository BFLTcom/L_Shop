import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

interface Store {
  name: string;
  address: string;
  phone: string;
  hours: string;
}

interface Contact {
  icon: typeof Phone;
  title: string;
  content: string;
  desc: string;
}

const Contacts = () => {
  const stores: Store[] = [
    { name: 'Центральный магазин', address: 'г. Минск, ул. Немига, 12', phone: '+375 29 123-45-67', hours: '09:00 - 21:00' },
    { name: 'ТЦ "Галерея"', address: 'г. Минск, пр. Победителей, 65', phone: '+375 29 234-56-78', hours: '10:00 - 22:00' },
    { name: 'ТРЦ "Экспобел"', address: 'г. Минск, ул. Бобруйская, 6', phone: '+375 29 345-67-89', hours: '10:00 - 22:00' },
    { name: 'Магазин на Пушкинской', address: 'г. Минск, ул. Пушкина, 22', phone: '+375 29 456-78-90', hours: '09:00 - 20:00' },
  ];

  const contacts: Contact[] = [
    { icon: Phone, title: 'Телефон', content: '+375 29 123-45-67', desc: 'Ежедневно с 9:00 до 21:00' },
    { icon: Mail, title: 'Email', content: 'info@brokeprice.by', desc: 'Ответим в течение 2 часов' },
    { icon: MessageCircle, title: 'Telegram', content: '@brokeprice_shop', desc: 'Быстрые ответы на ваши вопросы' },
  ];

  return (
    <div className="contacts-page">
      <h1 className="page-title">Контакты</h1>

      <section className="contacts-main">
        <div className="contacts-info">
          <h2>Свяжитесь с нами</h2>
          <p>Мы всегда рады помочь! Выберите удобный способ связи</p>
          
          <div className="contacts-list">
            {contacts.map((c, i) => (
              <div key={i} className="contact-item">
                <div className="contact-icon">
                  <c.icon size={24} />
                </div>
                <div className="contact-details">
                  <h3>{c.title}</h3>
                  <p className="contact-value">{c.content}</p>
                  <p className="contact-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contacts-form">
          <h2>Отправить сообщение</h2>
          <form>
            <div className="form-group">
              <label className="form-label">Ваше имя</label>
              <input type="text" className="input-field" placeholder="Иван Иванов" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="input-field" placeholder="example@mail.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Сообщение</label>
              <textarea className="input-field" rows={4} placeholder="Ваше сообщение..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Отправить</button>
          </form>
        </div>
      </section>

      <section className="stores-section">
        <h2 className="section-title">Наши магазины</h2>
        <div className="stores-grid">
          {stores.map((s, i) => (
            <div key={i} className="store-card">
              <div className="store-icon">
                <MapPin size={24} />
              </div>
              <h3>{s.name}</h3>
              <p className="store-address">{s.address}</p>
              <div className="store-details">
                <p><Phone size={16} /> {s.phone}</p>
                <p><Clock size={16} /> {s.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="map-section">
        <h2 className="section-title">Мы на карте</h2>
        <div className="map-container">
          <div className="map-placeholder">
            <MapPin size={48} />
            <p>г. Минск, ул. Немига, 12</p>
            <span>Центральный офис</span>
          </div>
        </div>
      </section>

      <style>{`
        .contacts-page {
          animation: fadeIn 0.5s ease-out;
        }

        .contacts-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .contacts-info h2, .contacts-form h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .contacts-info > p {
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
        }

        .contacts-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-item {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }

        .contact-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(233, 69, 96, 0.15);
          color: var(--color-accent);
          border-radius: var(--radius-sm);
          flex-shrink: 0;
        }

        .contact-details h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .contact-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-accent);
          margin-bottom: 0.25rem;
        }

        .contact-desc {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .contacts-form {
          padding: 2rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }

        textarea.input-field {
          resize: vertical;
        }

        .section-title {
          font-size: 1.75rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .stores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .store-card {
          padding: 1.5rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }

        .store-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(78, 204, 163, 0.15);
          color: var(--color-success);
          border-radius: var(--radius-sm);
          margin-bottom: 1rem;
        }

        .store-card h3 {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }

        .store-address {
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
        }

        .store-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .store-details p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .map-container {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--color-border);
        }

        .map-placeholder {
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: var(--color-text-secondary);
          background: var(--color-bg-tertiary);
        }

        .map-placeholder p {
          font-size: 1.25rem;
          color: var(--color-text);
        }

        @media (max-width: 768px) {
          .contacts-main {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Contacts;
