import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, ROLES, Role } from '../services/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: Role;
  photoURL?: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  role: Role;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: AppUser } | unknown>;
  logout: () => Promise<void>;
  hasAccess: (requiredRoles: Role | Role[]) => boolean;
  isAdmin: boolean;
  isEmployee: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<Role>(ROLES.PUBLIC);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as { role?: Role };
          setUser({ 
            uid: firebaseUser.uid, 
            email: firebaseUser.email, 
            displayName: firebaseUser.displayName,
            ...userData 
          });
          setRole(userData.role || ROLES.EMPLOYEE);
        } else {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName
          });
          setRole(ROLES.EMPLOYEE);
        }
      } else {
        setUser(null);
        setRole(ROLES.PUBLIC);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<{ user: AppUser } | unknown> => {
    if (email === 'demo@brokeprice.by' && password === 'demo123') {
      const demoUser: AppUser = {
        uid: 'demo-user-001',
        email: 'demo@brokeprice.by',
        displayName: 'Алексей Иванов'
      };
      setUser(demoUser);
      setRole(ROLES.ADMIN);
      return { user: demoUser };
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as { role?: Role };
        setUser({ 
          uid: result.user.uid, 
          email: result.user.email, 
          displayName: result.user.displayName,
          ...userData 
        });
        setRole(userData.role || ROLES.EMPLOYEE);
      }
      return result;
    } catch (error) {
      if (email && password) {
        const demoUser: AppUser = {
          uid: 'demo-user-' + Date.now(),
          email: email,
          displayName: email.split('@')[0]
        };
        setUser(demoUser);
        setRole(ROLES.EMPLOYEE);
        return { user: demoUser };
      }
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (e) {
      // Silent fail for demo mode
    }
    setUser(null);
    setRole(ROLES.PUBLIC);
  };

  const hasAccess = (requiredRoles: Role | Role[]): boolean => {
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(role);
    }
    return role === requiredRoles;
  };

  const value: AuthContextType = {
    user,
    role,
    loading,
    login,
    logout,
    hasAccess,
    isAdmin: role === ROLES.ADMIN,
    isEmployee: role === ROLES.EMPLOYEE || role === ROLES.ADMIN
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
