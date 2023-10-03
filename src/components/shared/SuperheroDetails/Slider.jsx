/* eslint-disable react/prop-types */
import './Slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { config } from '../../../env/env';


export const Slider = ({ images }) => {
  function replaceSpacesWithPercent20(inputString) {
    return inputString.replace(/ /g, '%20');
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return (
        `<span class="${className}">
          <img src=${`${config.apiUrl}${replaceSpacesWithPercent20(images[index])}`} alt="superhero image" />
        </span>`
      );
    },
  };

  return images && (
    <div className='slider'>
      <div className='sliderWrapper'>
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="mySwiper"
        >
          {Object.keys(images).map((key, index) => (
            <SwiperSlide key={index}>
              <img src={`${config.apiUrl}${images[index]}`} alt={`superhero image ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};