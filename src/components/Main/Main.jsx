import { useEffect } from 'react';
import './Main.css';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  useEffect(() => {
    const parallaxContainer = document.querySelector('body');
    const parallax = document.querySelector('.parallax');

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      parallax.style.transform = `translate(-${x * 50}px, -${y * 100}px)`;
    };

    parallaxContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      parallaxContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const scroll = document.querySelector('.scroll');
  
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = scrollY / 5;
  
      scroll.style.transform = `rotate(${rotation}deg)`;
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className='main'>
      <div className="parallaxContainer">
        <div className="parallax"></div>
        <div className="scroll"></div>
        <Outlet />
      </div>
    </main>
  );
};
