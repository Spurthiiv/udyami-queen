import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'customer_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  function login(userData) {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  // Mock check: has this phone/email been "registered" before on this device
  function isKnownIdentity(identity) {
    const known = JSON.parse(localStorage.getItem('known_identities') || '[]');
    return known.includes(identity);
  }

  function rememberIdentity(identity) {
    const known = JSON.parse(localStorage.getItem('known_identities') || '[]');
    if (!known.includes(identity)) {
      known.push(identity);
      localStorage.setItem('known_identities', JSON.stringify(known));
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isKnownIdentity, rememberIdentity }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}