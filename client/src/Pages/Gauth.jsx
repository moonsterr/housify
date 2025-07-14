import { useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';

export default function Gauth() {
  const [, setStorage] = useLocalStorage('jwt', '');
  const [searchparams] = useSearchParams();
  const token = searchparams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setStorage(token);
      navigate('/app'); // Redirect after saving token
    }
  }, [token, setStorage, navigate]);

  return null; // or loading spinner if you want
}
