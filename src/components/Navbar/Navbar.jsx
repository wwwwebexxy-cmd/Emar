import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="site-nav">
      <div className="nav-inner container">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="E M E R Technical Services home">
          <img src="/assets/emer-logo-transparent.png" alt="E M E R Technical Services" />
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>

        <div className={menuOpen ? 'nav-panel nav-panel-open' : 'nav-panel'}>
          <nav aria-label="Main navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
          </nav>
          <a className="nav-quote" href="#contact" onClick={closeMenu}>Get a Quote</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
