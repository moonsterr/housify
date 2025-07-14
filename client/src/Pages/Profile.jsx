import Listing from './listing';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FaHouseUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ApiContext } from '../Components/Data';
import { FaBed, FaBath } from 'react-icons/fa';
export default function Profile() {
  const [person, setPerson] = useState('');
  const [storage, setStorage] = useLocalStorage('jwt');
  const [edit, setEdit] = useState(false);
  const [userListings, setUserListings] = useState(null);
  const { data } = useContext(ApiContext);
  const navigate = useNavigate();
  async function handleSubmit(formdata) {
    const display = formdata.get('display');
    const email = formdata.get('email');
    const res = await fetch(
      'https://housify-ztdw.onrender.com/api/users/editUser',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${storage}`,
        },
        body: JSON.stringify({
          display,
          email,
        }),
      }
    );
    const data = await res.json();
    setEdit(false);
    setPerson(data.data);
  }
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          'https://housify-ztdw.onrender.com/api/users/getUser',
          {
            method: 'get',
            headers: {
              'Content-type': 'application/json',
              authorization: `Bearer ${storage}`,
            },
          }
        );
        const data = await res.json();
        setPerson(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);
  useEffect(() => {
    if (!data) {
      return;
    }
    const mappedPosts = data.filter((listing) => {
      return listing.owner === person._id;
    });
    setUserListings(mappedPosts);
  }, [data, person]);
  return (
    <>
      <div className="profile-main">
        <div className="header">
          <h1>My profile</h1>
          <button
            onClick={() => {
              setStorage('jwt', '');
              navigate('/registration/login');
            }}
          >
            Logout
          </button>
        </div>
        <section className="profile-details">
          {!edit && (
            <div className="profile-details-view">
              <div className="view-text">
                <h3>Personal Details</h3>
                <button onClick={() => setEdit(true)}>change</button>
              </div>
              <div className="view-info">
                <h3>{person.display}</h3>
                <p>{person.email}</p>
              </div>
            </div>
          )}
          {edit && (
            <div className="profile-details-edit">
              <form action={handleSubmit}>
                <div className="edit-info">
                  <h3>Personal Details</h3>
                  <button type="submit">done</button>
                </div>
                <div className="edit-info">
                  <label htmlFor="">Display Name</label>
                  <input
                    type="text"
                    name="display"
                    id="display"
                    onChange={(e) =>
                      setPerson({ ...person, display: e.target.value })
                    }
                    value={person.display}
                  />
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="display"
                    value={person.email}
                    onChange={(e) =>
                      setPerson({ ...person, email: e.target.value })
                    }
                  />
                </div>
              </form>
            </div>
          )}
        </section>

        <div className="sell-rent-home">
          <FaHouseUser className="icon" />
          <h3>Sell or rent your home</h3>
          <Link to="../createlist">{`>`}</Link>
        </div>

        {userListings && (
          <div className="listings-container">
            {userListings.map((listing) => {
              return (
                <div className="listing-card" key={listing._id}>
                  <div className="listing-card-img">
                    <Link to={`../property/${listing._id}`}>
                      <img src={listing.url} alt="Picture of the house" />
                    </Link>
                  </div>
                  <div className="listing-card-info">
                    <div className="card-info-heading">
                      <h4>{listing.address}</h4>
                      <h1>{listing.name}</h1>
                    </div>
                    <h2 className="card-info-pricing">
                      ${listing.price} {listing.for === 'rent' ? '/month' : ''}
                    </h2>
                    <div className="rooms">
                      <h2>
                        <FaBed className="icon" /> {listing.bedrooms} Bedrooms
                      </h2>
                      <h2>
                        <FaBath className="icon" /> {listing.bathrooms}{' '}
                        bathrooms
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
