import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Listing() {
  const [data, setData] = useState({
    for: null,
    parking: null,
    furnished: null,
    offer: null,
    url: null,
  });
  console.log('hello');
  const [storage] = useLocalStorage('jwt');
  const [, setError] = useState(null);
  async function handleSubmit(formData) {
    try {
      const res = await fetch('http://localhost:3000/api/houses/upload', {
        method: 'post',
        body: formData,
        headers: {
          authorization: `Bearer ${storage}`,
        },
      });
      const this_data = await res.json();
      setData({ ...data, url: this_data.url });
      const bedrooms = formData.get('bedrooms');
      const bathrooms = formData.get('bathrooms');
      const name = formData.get('name');
      const address = formData.get('address');
      const price = formData.get('price');
      const discountedPrice = formData.get('discountedPrice');
      if (!bedrooms || !bathrooms || !name || !address || !price) {
        return;
      }
      const res2 = await fetch('http://localhost:3000/api/houses/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${storage}`,
        },
        body: JSON.stringify({
          for: data.for,
          parkingSpot: data.parking,
          furnished: data.furnished,
          offer: data.offer,
          url: this_data.url,
          bedrooms,
          bathrooms,
          name,
          address,
          price,
          discountedPrice,
        }),
      });
      const data2 = await res2.json();
      console.log(data2);
      if (data2.success) {
        window.location.reload();
      }
    } catch (error) {
      setError(error);
    }
  }
  return (
    <div className="overlayed">
      <main className="list-create">
        <h1>Create a Listing</h1>
        <form action={handleSubmit}>
          <div className="list-field">
            <label htmlFor="for">Sell/Rent</label>
            <div className="btnss">
              <button
                type="button"
                className={data.for === 'sale' ? 'green-btn' : 'normal-btn'}
                onClick={() => setData({ ...data, for: 'sale' })}
              >
                Sell
              </button>
              <button
                type="button"
                className={data.for === 'rent' ? 'green-btn' : 'normal-btn'}
                onClick={() => setData({ ...data, for: 'rent' })}
              >
                Rent
              </button>
            </div>
          </div>
          <div className="list-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Great Condo"
            />
          </div>
          <div className="list-field-rooms">
            <div className="bedroom-field">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input type="number" name="bedrooms" id="bedrooms" />
            </div>
            <div className="bathroom-field">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input type="number" name="bathrooms" id="bathrooms" />
            </div>
          </div>
          <div className="list-field">
            <label htmlFor="">Parking Spot</label>
            <div className="btnss">
              <button
                type="button"
                className={data.parking === true ? 'green-btn' : 'normal-btn'}
                onClick={() => setData({ ...data, parking: true })}
              >
                Yes
              </button>
              <button
                type="button"
                className={data.parking === false ? 'green-btn' : 'normal-btn'}
                onClick={() => setData({ ...data, parking: false })}
              >
                No
              </button>
            </div>
          </div>
          <div className="list-field">
            <label htmlFor="">Furnished</label>
            <div className="btnss">
              <button
                type="button"
                className={data.furnished === true ? 'green-btn' : 'normal-btn'}
                onClick={() => setData({ ...data, furnished: true })}
              >
                Yes
              </button>
              <button
                type="button"
                className={
                  data.furnished === false ? 'green-btn' : 'normal-btn'
                }
                onClick={() => setData({ ...data, furnished: false })}
              >
                No
              </button>
            </div>
          </div>
          <div className="list-field">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="10 Main st Boston"
            />
          </div>
          <div className="list-field">
            <label htmlFor="">Offer</label>
            <div className="btnss">
              <button
                type="button"
                className={data.offer === true ? 'green-btn' : 'normal-btn'}
                onClick={() => setData({ ...data, offer: true })}
              >
                Yes
              </button>
              <button
                type="button"
                className={data.offer === false ? 'green-btn' : 'normal-btn'}
                onClick={() => setData({ ...data, offer: false })}
              >
                No
              </button>
            </div>
          </div>
          <div className="list-field">
            <label htmlFor="price">Regular Price</label>
            <div className="btnss">
              <input type="number" name="price" id="price" />
              {data.for === 'rent' ? <h2>$/ Month</h2> : ''}
            </div>
          </div>
          {data.offer && (
            <div className="list-field">
              <label htmlFor="">Discounted Price</label>
              <input type="number" name="discountedPrice" id="price" />
            </div>
          )}
          <div className="list-field">
            <label htmlFor="image">Choose Cover Image</label>
            <input type="file" name="image" id="image" />
          </div>
          <button className="submitBtn">submit</button>
        </form>
      </main>
    </div>
  );
}
