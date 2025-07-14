import { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ApiContext } from '../Components/Data';
import { Link } from 'react-router-dom';

export default function Explore() {
  const { data } = useContext(ApiContext);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeIdxB, setActiveIdxB] = useState(0);
  const [activeIdxC, setActiveIdxC] = useState(0);
  const slides = [1, 2, 3, 4, 5];

  console.log(data);
  if (!data) return <h1>loading...</h1>;
  return (
    <main className="explore">
      <h1>Explore</h1>
      <h2>Recommended</h2>
      <Link to="all" className="swipermainA">
        <Swiper
          className="swiper-main swiper-cards"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          onSlideChange={(s) => setActiveIdx(s.realIndex)}
        >
          {data.map((listing, index) => {
            if (index > 5) return;
            return (
              <SwiperSlide key={index}>
                <div className="swiper-img">
                  <div className="swiper-img-overlay">
                    <h2>{listing.name}</h2>
                    <h3>
                      ${listing.price || listing.discountedPrice}{' '}
                      {listing.for === 'rent' ? '/month' : ''}
                    </h3>
                  </div>
                  <img src={listing.url} alt="slide idk" />
                </div>
              </SwiperSlide>
            );
          })}
          <div className="dots">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === activeIdx ? 'dot--active' : ''}`}
              />
            ))}
          </div>
        </Swiper>
      </Link>
      <div className="categories">
        <h4>Categories</h4>
        <div className="category">
          <p>Places for rent</p>

          <Link to="rent" className="swipermainA">
            <Swiper
              className="swiper-main swiper-cards"
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              // navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              onSlideChange={(s) => setActiveIdxB(s.realIndex)}
            >
              {data
                .filter((listing) => listing.for === 'rent')
                .map((listing, index) => {
                  if (index > 5) return;
                  return (
                    <SwiperSlide key={index}>
                      <div className="swiper-img">
                        <div className="swiper-img-overlay">
                          <h2>{listing.name}</h2>
                          <h3>
                            ${listing.price || listing.discountedPrice}{' '}
                            {listing.for === 'rent' ? '/month' : ''}
                          </h3>
                        </div>
                        <img src={listing.url} alt="slide idk" />
                      </div>
                    </SwiperSlide>
                  );
                })}
              <div className="dots">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === activeIdxB ? 'dot--active' : ''}`}
                  />
                ))}
              </div>
            </Swiper>
          </Link>
        </div>
        <div className="category">
          <p>Places for Sale</p>
          <Link to="sale" className="swipermainA">
            <Swiper
              className="swiper-main swiper-cards swiper-category"
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              // navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              onSlideChange={(s) => setActiveIdxC(s.realIndex)}
            >
              {data
                .filter((listing) => listing.for === 'sale')
                .map((listing, index) => {
                  if (index > 5) return;
                  return (
                    <SwiperSlide key={index}>
                      <div className="swiper-img">
                        <div className="swiper-img-overlay">
                          <h2>{listing.name}</h2>
                          <h3>
                            ${listing.price || listing.discountedPrice}{' '}
                            {listing.for === 'rent' ? '/month' : ''}
                          </h3>
                        </div>
                        <img src={listing.url} alt="slide idk" />
                      </div>
                    </SwiperSlide>
                  );
                })}
              <div className="dots">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === activeIdxC ? 'dot--active' : ''}`}
                  />
                ))}
              </div>
            </Swiper>
          </Link>
        </div>
      </div>
    </main>
  );
}
