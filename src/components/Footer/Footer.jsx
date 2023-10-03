import './Footer.css';
import GitHubSvg from './../../assets/logo/github.svg';

export const Footer = () => {

  return (
    <footer className='footer'>
      <div className='footerBlock'>
        <a href="https://github.com/KandaskalovOleg/js-ninjas_tt.git" className='footerLink'>
          <img src={GitHubSvg} alt="gihub logo" />
        </a>
      </div>
    </footer>
  );
};
