import './Footer.css';
import GitHubSvg from './../../logo/github.svg';

function Footer() {

  return (
    <footer className='footer'>
      <div className='footerBlock'>
        <a href="https://github.com/KandaskalovOleg/js-ninjas_tt.git" className='footerLink'>
          <img src={GitHubSvg} alt="gihub logo" />
        </a>
      </div>
    </footer>
  )
}

export default Footer;
