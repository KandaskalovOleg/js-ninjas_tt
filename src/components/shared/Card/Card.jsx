/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Card.css';
import { config } from '../../../env/env';
import { Loader } from '../Loader/Loader';

export const Card = ({ superhero, onDeleteClick }) => {
  const {
    _id,
    nickname,
    images,
  } = superhero;

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (images.length > 0) {
      const loadImage = () => {
        const image = new Image();
        image.src = `${config.apiUrl}${images?.length > 0 ? images[0] : ''}`;
        image.onload = () => {
          setIsLoading(false);
        };
      };

      loadImage();
    } else {
      setIsLoading(false);
    }
  }, [images]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDeleteClick(_id);
  };

  return (
    <Link 
      to={`/superheroes/${_id}`}
      className='cardBlock'
    >
      <div className='imgWrapper'>
        <button 
          className='deleteButton' 
          onClick={handleDeleteClick}
        >
          &#10006;
        </button>
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <img 
            src={`${config.apiUrl}${images?.length > 0 ? images[0] : ''}`}
            alt="superhero image"
            className='image'
          />
        )}
      </div>
      <h2 className='title'>{nickname}</h2>
    </Link>
  );
};
