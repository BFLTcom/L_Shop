import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Warehouse from './pages/Warehouse';
import Orders from './pages/Orders';
import Sales from './pages/Sales';
import Employees from './pages/Employees';
import PriceTags from './pages/PriceTags';
import Tasks from './pages/Tasks';
import { Role } from './services/firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: Role[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { role, loading } = useAuth();

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['employee', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/warehouse"
            element={
              <ProtectedRoute roles={['employee', 'admin']}>
                <Warehouse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute roles={['employee', 'admin']}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute roles={['employee', 'admin']}>
                <Sales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute roles={['admin']}>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/price-tags"
            element={
              <ProtectedRoute roles={['employee', 'admin']}>
                <PriceTags />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute roles={['employee', 'admin']}>
                <Tasks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
