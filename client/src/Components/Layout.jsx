import { NavLink, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Data from './Data';

export default function Layout() {
  const [storage] = useLocalStorage('jwt');
  const navigate = useNavigate();
  useEffect(() => {
    if (!storage) {
      navigate('/registration/login');
    }
  }, [storage]);
  return (
    <Data>
      <main>
        <nav className="navbar">
          <NavLink
            relative="path"
            end
            to=""
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Explore
          </NavLink>
          <NavLink
            to="offers"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Offer
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Profile
          </NavLink>
        </nav>
        <Outlet />
      </main>
    </Data>
  );
}
