import { useEffect, useState } from 'react';
import axios from 'axios';
import { envConfig } from '../envConfigurations/EnvConfigurations';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${envConfig().apiUrl}/validate-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuthenticated(res.data.valid);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { loading, authenticated };
};
