import { useState, useEffect } from 'react';
import './Header.css';

function Header() {
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
      <a href="#" className='navLink'>
        <h1 className='logo'>Superheros</h1>
      </a>
    </header>
  )
}

export default Header;
