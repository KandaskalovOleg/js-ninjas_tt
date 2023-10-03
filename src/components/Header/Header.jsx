import { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [headerMargin, setHeaderMargin] = useState();

  useEffect(() => {
    const updateHeaderMargin = () => {
      const aElement = document.querySelector('.navLink');
      if (aElement) {
        const aHeight = aElement.offsetHeight;
        setHeaderMargin(aHeight);
      }
    };

    updateHeaderMargin();
    window.addEventListener('resize', updateHeaderMargin);

    return () => {
      window.removeEventListener('resize', updateHeaderMargin);
    };
  }, []);

  return (
    <header 
      className='header' 
      style={{ marginBottom: `${headerMargin}px` }}
    >
      <Link to='/' className='navLink'>
        <h1 className='logo'>Superheroes</h1>
      </Link>
    </header>
  );
};
