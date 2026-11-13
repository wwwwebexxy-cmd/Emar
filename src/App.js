import { useEffect, useState } from 'react';
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 360);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="floating-actions">
      <a
        className="floating-action floating-action-whatsapp"
        href="https://wa.me/971555303294"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with E M E R Technical Services on WhatsApp"
        title="WhatsApp support"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
      {showBackToTop && (
        <button
          className="floating-action floating-action-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HomePage />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default App;
