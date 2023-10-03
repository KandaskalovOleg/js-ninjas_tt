/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './Card.css';
import { config } from '../../../env/env';

export const Card = ({ superhero, onDeleteClick }) => {
  const {
    _id,
    nickname,
    images,
  } = superhero;

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
        <img 
          src={`${config.apiUrl}${images?.length > 0 ? images[0] : ''}`}
          alt="superhero image"
          className='image'
        />
      </div>
      <h2 className='title'>{nickname}</h2>
    </Link>
  );
};
