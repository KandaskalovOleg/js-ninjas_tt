/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { config } from '../../../env/env';
import './ChangeHeroForm.css';

export const ChangeHeroForm = ({ superheroData, isModalOpen, closeModal, setIsChangeForm, setSuperheroData }) => {
  const [modalClass, setModalClass] = useState('');
  const [formData, setFormData] = useState({
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
  });

  const [errors, setErrors] = useState({
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
  });

  const [wordLength, setWordLength] = useState({
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
  });

  function validateFieldLength(value, minLength, maxLength) {
    if (value.length < minLength || value.length > maxLength) {
      return `Should contain between ${minLength} and ${maxLength} characters.`;
    }
    return '';
  }

  function validateWordLength(value, maxLength) {
    const words = value.split(' ');
  
    for (const word of words) {
      if (word.length > maxLength) {
        return `Word should not be more than ${maxLength} characters.`;
      }
    }
  
    return '';
  }

  const updateHero = async () => {
    const newErrors = {
      real_name: validateFieldLength(formData.real_name, 3, 15),
      origin_description: validateFieldLength(formData.origin_description, 10, 300),
      superpowers: validateFieldLength(formData.superpowers, 10, 300),
      catch_phrase: validateFieldLength(formData.catch_phrase, 10, 300),
    };

    setErrors(newErrors);

    const wordValidationErrors = {
      real_name: validateWordLength(formData.real_name, 18),
      origin_description: validateWordLength(formData.origin_description, 18),
      superpowers: validateWordLength(formData.superpowers, 18),
      catch_phrase: validateWordLength(formData.catch_phrase, 18),
    };

    setWordLength(wordValidationErrors);
  
    if (
      Object.values(newErrors).every((error) => error === '') &&
      Object.values(wordValidationErrors).every((error) => error === '')
    ) {
      closeModal();
      setIsChangeForm(true);
      try {
        const response = await fetch(`${config.apiUrl}superheroes/update/${superheroData._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setSuperheroData({
            ...superheroData,
            ...formData,
        });
        } else {
          console.error('Помилка при оновленні героя');
        }
      } catch (error) {
        console.error('Помилка при оновленні героя', error);
      }
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setModalClass('open');
      }, 10);
    } else {
      setModalClass('');
    }

    if (superheroData) {
      setFormData({
        real_name: superheroData.real_name || '',
        origin_description: superheroData.origin_description || '',
        superpowers: superheroData.superpowers || '',
        catch_phrase: superheroData.catch_phrase || '',
      });
    }
  }, [isModalOpen, superheroData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='modal-backdrop'>
      <div className={`modal ${modalClass}`}>
        <form className='changeHeroForm' onSubmit={handleSubmit}>
          <div className='button-container'>
            <button
              className='closeButton'
              onClick={closeModal}
            >
              &#10006;
            </button>
          </div>
          <input
            type='text'
            className='text'
            name='real_name'
            placeholder='Real Name'
            value={formData.real_name}
            onChange={handleInputChange}
          />
          <span className='error'>{errors.real_name || wordLength.real_name}</span>
          <textarea
            className='textareaChange'
            name='origin_description'
            id='origin_description'
            placeholder='Origin Description'
            value={formData.origin_description}
            onChange={handleInputChange}
          />
          <span className='error'>{errors.origin_description || wordLength.origin_description}</span>
          <textarea
            className='textareaChange'
            name='superpowers'
            id='superpowers'
            placeholder='Superpowers'
            value={formData.superpowers}
            onChange={handleInputChange}
          />
          <span className='error'>{errors.superpowers || wordLength.superpowers}</span>
          <textarea
            className='textareaChange'
            name='catch_phrase'
            id='superpowers'
            placeholder='Catch Phrase'
            value={formData.catch_phrase}
            onChange={handleInputChange}
          />
          <span className='error'>{errors.catch_phrase || wordLength.catch_phrase}</span>
          <button onClick={updateHero} type='submit'>Change hero</button>
        </form>
      </div>
    </div>
  );
};
