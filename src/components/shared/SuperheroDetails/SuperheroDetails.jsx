/* eslint-disable react-hooks/exhaustive-deps */
import './SuperheroDetails.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Slider } from './Slider';
import { config } from '../../../env/env';
import { ChangeHeroForm } from './ChangeHeroForm';
import { Loader } from '../Loader/Loader';

export const SuperheroDetails = () => {
  const { id } = useParams();
  const [superheroData, setSuperheroData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isChangeFrom, setIsChangeForm] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ image: null });
  const [errorMsg, setErrorMsg] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('body-no-scroll');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('body-no-scroll');
  };

  useEffect(() => {
    if (isChangeFrom || isDeleting) {
      setIsLoading(true);
      fetch(`${config.apiUrl}superheroes/get-one/${id}`)
        .then(async (response) => {
          setSuperheroData(await response.json());
          setIsLoading(false);
          setIsChangeForm(false);
          setErrorMsg('');
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error fetching superhero details:', error);
        });
    }
  }, [id, isChangeFrom, isDeleting]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setErrorMsg('Attached.');

    setFormData({ ...formData, image: file });
  };
  
  const handleSubmitImage = async (e) => {
    e.preventDefault();
  
    if (superheroData.images.length >= 4) {
      setErrorMsg('Cant contain more than 4 images.');
      return;
    }
  
    try {
      setIsImageLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image);
  
      const response = await fetch(`${config.apiUrl}superheroes/create-image/${superheroData._id}`, {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        const updatedSuperhero = await fetch(`${config.apiUrl}superheroes/get-one/${superheroData._id}`)
          .then(async (response) => response.json());
  
        setSuperheroData(updatedSuperhero);
        setFormData({ ...formData, image: null });
      }
    } finally {
      setErrorMsg('');
      setIsImageLoading(false);
    }
  };

  return (isLoading || isImageLoading)? (
    <div className='loader loaderDetails'>
      <Loader />
    </div>
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
        <div>
          <Slider 
            images={superheroData.images} 
            id={superheroData._id} 
            setIsDeleting={setIsDeleting}
          />
          <div className='addWrapper'>
            <form className='addImageForm' onSubmit={handleSubmitImage}>
              <input
                type='file'
                id='fileInput'
                name='images'
                className='fileInput'
                accept='*image'
                onChange={handleImageChange}
              />
              <div className='inputBlock'>
                <label htmlFor='fileInput' className='customFileInput'>
                  Add image
                </label>
                <span className='errorImg'>{errorMsg}</span>
              </div>
              <button 
                className='updateButton' 
                type='submit' 
                disabled={!formData.image}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
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
                setSuperheroData={setSuperheroData}
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