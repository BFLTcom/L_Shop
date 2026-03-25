import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Вход в систему</h1>
          <p>Авторизуйтесь для доступа к панели управления</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="employee@brokeprice.by"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            <LogIn size={20} />
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="login-footer">
          <p>Доступ только для сотрудников и администраторов</p>
          <p>Демо-аккаунт: demo@brokeprice.by / demo123</p>
        </div>
      </div>

      <style>{`
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          padding: 2rem;
        }

        .login-container {
          width: 100%;
          max-width: 420px;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          padding: 2.5rem;
          box-shadow: var(--shadow-lg);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-header h1 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .login-header p {
          color: var(--color-text-secondary);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(220, 53, 69, 0.15);
          border: 1px solid var(--color-error);
          border-radius: var(--radius-sm);
          color: var(--color-error);
        }

        .btn-block {
          width: 100%;
          justify-content: center;
          padding: 1rem;
          font-size: 1rem;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .login-footer p:first-child {
          margin-bottom: 0.5rem;
          color: var(--color-warning);
        }
      `}</style>
    </div>
  );
};

export default Login;
