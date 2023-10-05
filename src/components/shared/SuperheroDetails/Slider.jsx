/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './Slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import SwipeCore from 'swiper/core';
import { config } from '../../../env/env';
import { useEffect, useState } from 'react';

SwipeCore.use([Pagination]);

export const Slider = ({ images, id, setIsDeleting }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const imgRefs = [];
  const buttonRefs = [];

  function replaceSpacesWithPercent20(inputString) {
    return inputString.replace(/ /g, '%20');
  }

  const handleDeleteImage = async () => {
    setIsDeleting(true);
    try {
      const fileNameToDelete = images[activeSlideIndex];
      const fileName = fileNameToDelete.split('\\').pop();
      console.log(fileName);
  
      await fetch(`${config.apiUrl}superheroes/delete-image/${id}/${fileName}`, {
        method: 'DELETE',
      });
  
    } catch (error) {
      console.error('Помилка видалення картинки', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.realIndex);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return (`
        <span class="${className}">
          <img src=${`${config.apiUrl}${replaceSpacesWithPercent20(images[index])}`} alt="superhero image" />
        </span>
      `);
    },
  };

  const adjustButtonPosition = () => {
    imgRefs.forEach((img, index) => {
      const button = buttonRefs[index];

      if (img && button) {
        const imgMarginRight = window.getComputedStyle(img).getPropertyValue('margin-right');
        const marginRightValue = parseInt(imgMarginRight, 10);
        const newRightValue = marginRightValue + 10;
      
        button.style.right = `${newRightValue}px`;
      }
    });
  };

  useEffect(() => {
  if (isImagesLoaded) {
    adjustButtonPosition();
    }
  }, [isImagesLoaded, activeSlideIndex]);

  const handleLastImageLoad = () => {
    setIsImagesLoaded(true);
  };

  return (
    <div className='slider'>
      <div className='sliderWrapper'>
        {images.length > 0 && (
          <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
            onSlideChange={handleSlideChange}
          >
            {Object.keys(images).map((key, index) => (
              <SwiperSlide key={index}>
                <img
                  ref={(img) => { imgRefs[index] = img; }}
                  src={`${config.apiUrl}${images[index]}`}
                  alt={`superhero image ${index + 1}`}
                  onLoad={(index === images.length - 1) ? handleLastImageLoad : null}
                />
                {isImagesLoaded && activeSlideIndex === index && (
                  <button
                    className="deleteImageButton"
                    onClick={handleDeleteImage}
                    ref={(button) => { buttonRefs[index] = button; }}
                  >
                    ✖
                  </button>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};
