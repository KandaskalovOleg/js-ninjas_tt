/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './AddHeroForm.css';
import { config } from '../../../env/env';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';

export const AddHeroForm = ({ closeModal, isModalOpen, setIsCreate }) => {
  const [modalClass, setModalClass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    images: [],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    images: '',
  });

  function validateFieldLength(value, minLength, maxLength, fieldName) {
    if (value.length < minLength || value.length > maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Should contain between ${minLength} and ${maxLength} characters.`,
      }));
      return false;
    }
    return true;
  }

  function validateWordLength(value, maxLength, fieldName) {
    const words = value.split(' ');

    for (const word of words) {
      if (word.length > maxLength) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Word should not be more than ${maxLength} characters.`,
        }));
        return false;
      }
    }

    return true;
  }

  function validateImageCount(files, minCount, maxCount) {
    if (files.length < minCount || files.length > maxCount) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: `Upload from ${minCount} to ${maxCount} images.`,
      }));
      return false;
    }
    return true;
  }

  const handleAddHero = async (e) => {
    e.preventDefault();

    const isNicknameValid = validateFieldLength(formData.nickname, 3, 15, 'nickname');
    const isRealNameValid = validateFieldLength(formData.real_name, 3, 20, 'real_name');
    const isOriginDescriptionValid = validateFieldLength(formData.origin_description, 10, 300, 'origin_description');
    const isSuperpowersValid = validateFieldLength(formData.superpowers, 10, 300, 'superpowers');
    const isCatchPhraseValid = validateFieldLength(formData.catch_phrase, 10, 300, 'catch_phrase');
    const isImageCountValid = validateImageCount(formData.images, 1, 4);
    const isNicknameWordLengthValid = validateWordLength(formData.nickname, 18, 'nickname');
    const isRealNameWordLengthValid = validateWordLength(formData.real_name, 18, 'real_name');
    const isOriginDescriptionWordLengthValid = validateWordLength(formData.origin_description, 18, 'origin_description');
    const isSuperpowersWordLengthValid = validateWordLength(formData.superpowers, 18, 'superpowers');
    const isCatchPhraseWordLengthValid = validateWordLength(formData.catch_phrase, 18, 'catch_phrase');

    if (
      isNicknameValid &&
      isRealNameValid &&
      isOriginDescriptionValid &&
      isSuperpowersValid &&
      isCatchPhraseValid &&
      isImageCountValid &&
      isNicknameWordLengthValid &&
      isRealNameWordLengthValid &&
      isOriginDescriptionWordLengthValid &&
      isSuperpowersWordLengthValid &&
      isCatchPhraseWordLengthValid
    ) {


      try {
        setIsLoading(true);
        const formDataToSend = new FormData();

        for (const key in formData) {
          if (formData[key] instanceof FileList) {
            for (const file of formData[key]) {
              formDataToSend.append(key, file);
            }
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }

        const response = await fetch(`${config.apiUrl}superheroes/create`, {
          method: 'POST',
          body: formDataToSend,
        });

        if (response.ok) {
          setFormData({
            nickname: '',
            real_name: '',
            origin_description: '',
            superpowers: '',
            catch_phrase: '',
            images: [],
          });
          setSuccessMessage('Герой успішно створений.');
          setErrorMessage('');
          closeModal();
          setIsCreate(true);
          setIsLoading(false);
          setErrors({
            nickname: '',
            real_name: '',
            origin_description: '',
            superpowers: '',
            catch_phrase: '',
            images: '',
          });
        } else {
          setErrorMessage('Помилка при створенні героя');
          setSuccessMessage('');
        }
      } catch (error) {
        setErrorMessage('Помилка при створенні героя');
        setSuccessMessage('');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setModalClass('open');
      }, 10);
    } else {
      setModalClass('');
    }
  }, [isModalOpen]);

  return (
    <>
      <div className='modal-backdrop'>
        {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
          <div className={`modal ${modalClass}`}>
            <form className='addHeroForm' onSubmit={handleAddHero}>
              <div className='button-container'>
                <button className='closeButton' onClick={closeModal}>
                  &#10006;
                </button>
              </div>
              <input
                type='text'
                className='text'
                name='nickname'
                placeholder='Nickname'
                value={formData.nickname}
                onChange={handleChange}
              />
              <span className='error'>{errors.nickname}</span>
              <input
                type='text'
                className='text'
                name='real_name'
                placeholder='Real Name'
                value={formData.real_name}
                onChange={handleChange}
              />
              <span className='error'>{errors.real_name}</span>
              <textarea
                className='textarea'
                name='origin_description'
                id='origin_description'
                placeholder='Origin Description'
                value={formData.origin_description}
                onChange={handleChange}
              />
              <span className='error'>{errors.origin_description}</span>
              <textarea
                className='textarea'
                name='superpowers'
                id='superpowers'
                placeholder='Superpowers'
                value={formData.superpowers}
                onChange={handleChange}
              />
              <span className='error'>{errors.superpowers}</span>
              <input
                type='text'
                className='text'
                name='catch_phrase'
                placeholder='Catch Phrase'
                value={formData.catch_phrase}
                onChange={handleChange}
              />
              <span className='error'>{errors.catch_phrase}</span>
              <input
                type='file'
                name='images'
                className='images'
                accept='image/*'
                multiple
                onChange={handleImageChange}
              />
              <span className='error'>{errors.images}</span>
              <button type='submit'>Add new hero</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
