import { Outlet, useNavigate } from 'react-router-dom';
import { FaHouseUser } from 'react-icons/fa';
import useLocalStorage from '../hooks/useLocalStorage';
export default function RegistrationLayout() {
  const [, setStorage] = useLocalStorage('jwt', '');
  const server = 'http://localhost:3000/api/users';
  const navigate = useNavigate();
  async function proceedAction(type, { username, password }) {
    if (type === 'create') {
      const res = await create(username, password);
      console.log(res);
      return res;
    }
    if (type === 'login') {
      const loginResult = await login(username, password);
      if (loginResult.success) {
        navigate('/');
      }
      return loginResult;
    }
  }

  async function create(username, password) {
    try {
      const res = await fetch(`${server}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return { success: false, status: 401, data: error };
    }
  }
  async function login(username, password) {
    try {
      const res = await fetch(`${server}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStorage(data.data);
      }

      return data;
    } catch (error) {
      return { success: false, status: 401, data: error };
    }
  }
  return (
    <main className="registration-page">
      <div className="registration-logo">
        <FaHouseUser className="house-icon" />
        <h1>Housify.it</h1>
      </div>
      <Outlet context={proceedAction} />
    </main>
  );
}
