import './SuperheroDetails.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Slider } from './Slider';
import { config } from '../../../env/env';
import { ChangeHeroForm } from './ChangeHeroForm';

export const SuperheroDetails = () => {
  const { id } = useParams();
  const [superheroData, setSuperheroData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isChangeFrom, setIsChangeForm] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('body-no-scroll');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('body-no-scroll');
  };

  useEffect(() => {
    if (isChangeFrom) {
      setIsLoading(true);
      fetch(`${config.apiUrl}superheroes/get-one/${id}`)
        .then(async (response) => {
          setSuperheroData(await response.json());
          setIsLoading(false);
          setIsChangeForm(false);
          console.log(isChangeFrom);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error fetching superhero details:', error);
        });
    }
  }, [id, isChangeFrom]);

  return isLoading ? (
    <div className='loader'>Loading...</div>
  ) : (
    <div className='superhero'>
      <h2 className='nickName'>
        {superheroData.nickname}
      </h2>
      <Link to="/" className='backButtonWrapper'>
        <span className='backButton'>
          back
        </span>
      </Link>
      <div className='superheroContent'>
        <Slider images={superheroData.images}/>
        <div className='aboutBlock'>
          <div className='editBlock'>
            <h3 className='realName'>
              {superheroData.real_name}
            </h3>
            <button onClick={openModal} className='editButton'>
              edit
            </button>
            {isModalOpen && (
              <ChangeHeroForm 
                superheroData={superheroData}
                closeModal={closeModal} 
                isModalOpen={isModalOpen}
                setIsChangeForm={setIsChangeForm}
              />
            )}
          </div>
          <div className='descriprionBlocks'>
            <div className='descriptionBlock'>
              <h4 className='descriprionTitle'>
                Origin decription
              </h4>
              <p className='descriprionText'>
              {superheroData.origin_description}
              </p>
            </div>
            <div className='descriptionBlock'>
              <h4 className='descriprionTitle'>
                Superpowers
              </h4>
              <p className='descriprionText'>
                {superheroData.superpowers}
              </p>
            </div>
            <div className='descriptionBlock'>
              <h4 className='descriprionTitle'>
                Catch Phrase
              </h4>
              <p className='descriprionText'>
                {superheroData.catch_phrase}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};