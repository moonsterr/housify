import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navi = useNavigate();
  useEffect(() => {
    navi('app');
  }, []);
}
