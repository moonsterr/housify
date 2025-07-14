import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import g from '../../assets/g-logo.png';
import { useOutletContext } from 'react-router-dom';
import Banner from '../../Components/Banner';
import { useState, useEffect } from 'react';
export default function Login() {
  const [error, setError] = useState('');
  const proceedAction = useOutletContext();
  async function handleSubmit(formData) {
    const username = formData.get('username');
    const password = formData.get('password');

    const res = await proceedAction('login', { username, password });

    if (!res.success) {
      switch (res.data) {
        case 'username':
          setError('username');
          break;
        case 'password':
          setError('password');
          break;
        case 'server':
          setError('server');
          break;
      }
    }
  }
  function errorHelper(error) {
    if (error === 'username') {
      return {
        heading: 'Username is incorrect or not found',
        description:
          'The username you entered was incorrect or not found, enter another username or create an account.',
      };
    } else if (error === 'password') {
      return {
        heading: 'The password is incorrect.',
        description:
          'The password you entered is incorrect, try a different password or create a new account.',
      };
    } else {
      return {
        heading: 'Internal server error',
        description:
          'There was an unexpected error on our part, try again later.',
      };
    }
  }
  function handleGoogle() {
    window.location.href = 'http://localhost:3000/api/users/auth/google';
  }
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [error]);
  return (
    <div className="account">
      {error && (
        <div className="banner-card-component">
          <Banner
            type="error"
            heading={errorHelper(error).heading}
            description={errorHelper(error).description}
          />
        </div>
      )}
      <div className="account-details">
        <h1>Log in</h1>
        <p>Enter your credentials and get ready to explore!</p>
        <form action={handleSubmit} className="registration-form">
          <div className="form-field">
            <div className="form-field-icon">
              <FaEnvelope className="icon" />
            </div>
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
            />
          </div>
          <div className="form-field">
            <div className="form-field-icon">
              <FaLock className="icon" />
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="registration-button">
            Create account
          </button>
          <button
            type="button"
            onClick={handleGoogle}
            className="registration-button google"
          >
            <img style={{ width: '25px', height: '25px' }} src={g} alt="" />
            Login with google
          </button>
        </form>
        <h4>
          Dont have an account? <Link to="../create">Sign up now</Link>
        </h4>
      </div>
    </div>
  );
}
