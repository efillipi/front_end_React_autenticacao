import { useState, useEffect } from 'react';
import api from '../../services/api';
import history from '../../history'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  async function handleLogin(data) {

    try {
      console.log("Login", data)
      const { data: { token } } = await api.post('/login', data);
      localStorage.setItem('token', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push('/usuarios');
      window.location.reload() // ai meu deus kkkk
    } catch (error) {
      alert('Erro no Login, tente novamente... ' + error);
      window.location.reload() // ai meu deus kkkk
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }

  return { authenticated, loading, handleLogin, handleLogout };
}