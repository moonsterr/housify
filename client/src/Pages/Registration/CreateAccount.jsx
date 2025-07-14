import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import g from '../../assets/g-logo.png';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Banner from '../../Components/Banner';
export default function CreateAccount() {
  const proceedAction = useOutletContext();

  const [error, setError] = useState('');
  async function handleSubmit(formData) {
    const username = formData.get('username');
    const password = formData.get('password');
    const res = await proceedAction('create', { username, password });
    if (res.success) {
      setError('');
      await proceedAction('login', { username, password });
    }
    if (!res.success) {
      switch (res.data) {
        case 'already exists':
          setError('username');
          break;
        default:
          setError('server');
      }
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
    <>
      {error && (
        <div className="banner-card-component">
          <Banner
            type="error"
            heading={`${
              error === 'username'
                ? 'Username already exists.'
                : 'Something went wrong'
            }`}
            description={`${
              error === 'username'
                ? 'The username you entered already exists, please use another username or login to an existing account.'
                : 'Something went wrong on our end, please try again later or contact us if the issue reoccurs.'
            }`}
          />
        </div>
      )}
      <div className="account">
        <div className="account-details">
          <h1>Create Account </h1>
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
          </form>
          <button
            onClick={handleGoogle}
            type="button"
            className="registration-button google"
          >
            <img style={{ width: '25px', height: '25px' }} src={g} alt="" />
            Register with google
          </button>

          <h4>
            Have an account? <Link to="../login">Login now</Link>
          </h4>
        </div>
      </div>
    </>
  );
}
