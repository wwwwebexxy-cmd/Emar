import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand">
        <a className="footer-logo" href="#top" aria-label="E M E R Technical Services home">
          <img src="/assets/emer-logo-transparent.png" alt="E M E R Technical Services" />
        </a>
        <p>Specialists in Laundry &amp; Commercial Kitchen Engineering.</p>
      </div>

      <nav className="footer-nav" aria-label="Footer navigation">
        <p className="footer-heading">Explore</p>
        <a href="#about">About us</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="footer-contact">
        <p className="footer-heading">Contact</p>
        <a href="tel:+971585878090"><FaPhoneAlt aria-hidden="true" /> +971 58 587 8090</a>
        <a href="https://wa.me/971555303294" target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" /> +971 55 530 3294</a>
        <a href="mailto:emertechnicalservice@outlook.com"><FaEnvelope aria-hidden="true" /> emertechnicalservice@outlook.com</a>
        <a href="https://www.google.com/maps/search/?api=1&query=Bright%20Vision%20Business%20Center%2C%20Deira%2C%20Dubai" target="_blank" rel="noreferrer">
          <FaMapMarkerAlt aria-hidden="true" /> Bright Vision Business Center, Deira, Dubai
        </a>
      </div>
    </div>

    <div className="container footer-bottom">
      <p>© {new Date().getFullYear()} E M E R Technical Services. All rights reserved.</p>
      <a href="#top">Back to top ↑</a>
    </div>
  </footer>
);

export default Footer;
