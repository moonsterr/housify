import { useParams } from 'react-router-dom';
import { ApiContext } from '../Components/Data';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Property() {
  const [listingData, setListingData] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useContext(ApiContext);
  console.log('ts is the listing data', listingData);
  console.log('this si the data context', data);
  useEffect(() => {
    if (!data) return;

    const listing = data.find((listing) => listing._id === id);
    if (listing) {
      setListingData(listing);
    } else {
      console.log('Listing not found');
    }
  }, [data, id]);

  if (!listingData) return <p>Loading listing...</p>;
  return (
    <main className="property">
      <div className="property-img">
        <button className="go-back" onClick={() => navigate(-1)}>
          {`<`}
        </button>
        <img src={listingData.url} alt="img" />
      </div>
      <div className="property-info">
        <div className="hiya">
          <h1>
            {listingData.name} - ${listingData.price}
          </h1>
          <h3>{listingData.address}</h3>
        </div>
        <div className="badges">
          <div className="small-badge">for {listingData.for}</div>
          {listingData.offer && (
            <div className="discounted">
              ${listingData.price - listingData.discountedPrice} discount
            </div>
          )}
        </div>
        <div className="meta-info">
          <p>{listingData.bedrooms} bedrooms</p>
          <p>{listingData.bathrooms} bathrooms</p>
          <p>{listingData.parkingSpot ? 'Parking spot' : ''}</p>
          <p>{listingData.furnished ? 'furnished' : ''}</p>
        </div>
      </div>
    </main>
  );
}
