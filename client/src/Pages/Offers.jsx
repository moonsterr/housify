import { useContext } from 'react';
import { ApiContext } from '../Components/Data';
import { Link } from 'react-router-dom';
import { FaBed, FaBath } from 'react-icons/fa';

export default function Offers() {
  const { data } = useContext(ApiContext);
  if (!data) return <p>Loading listings...</p>;
  return (
    <div className="listings-container">
      {data
        .filter((listing) => listing.offer)
        .map((listing) => {
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
                    <FaBath className="icon" /> {listing.bathrooms} bathrooms
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
