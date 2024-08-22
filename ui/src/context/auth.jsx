/*import { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');

    if (token && storedRole && storedUserId) {
      setLogged(true);
      setRole(storedRole);
      setUserId(storedUserId);
    }
  }, []);

  const login = (token, role, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    setLogged(true);
    setRole(role);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setLogged(false);
    setRole('');
    setUserId('');
  };

  // Função de logout que será disponibilizada no contexto
  const signout = logout;

  return (
    <AuthContext.Provider value={{ logged, role, userId, login, logout, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);*/
