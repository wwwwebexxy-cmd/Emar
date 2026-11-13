import { useEffect, useRef, useState } from 'react';
import {
  FaArrowRight,
  FaCheck,
  FaCogs,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaWrench,
  FaTools,
} from 'react-icons/fa';
import useSeo from '../../hooks/useSeo';
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE } from '../../seo/siteSeo';
import './HomePage.css';

const WHATSAPP_URL = 'https://wa.me/971555303294?text=Hello%20E%20M%20E%20R%20Technical%20Services%2C%20I%20would%20like%20to%20request%20a%20quote.';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Bright%20Vision%20Business%20Center%2C%20Deira%2C%20Dubai';
const MAP_EMBED_URL = 'https://www.google.com/maps?q=Bright%20Vision%20Business%20Center%2C%20Deira%2C%20Dubai&output=embed';

const engineeringAreas = [
  {
    id: 'laundry-details',
    number: '01',
    title: 'Laundry Engineering',
    description: 'Installation, servicing and repair for industrial laundry equipment and control systems.',
    image: '/assets/emer-laundry-engineering.png',
    alt: 'Industrial washer extractors in a modern laundry facility',
    linkLabel: 'Explore laundry services',
  },
  {
    id: 'kitchen-details',
    number: '02',
    title: 'Commercial Kitchen Engineering',
    description: 'Practical engineering support for commercial kitchen equipment, from installation to upgrades.',
    image: '/assets/emer-commercial-kitchen.png',
    alt: 'Stainless steel commercial kitchen with professional cooking equipment',
    linkLabel: 'Explore kitchen services',
  },
];

const heroSlides = [
  {
    laundry: '/assets/emer-laundry-engineering.png',
    laundryAlt: 'Industrial washers in a commercial laundry facility',
    kitchen: '/assets/emer-commercial-kitchen.png',
    kitchenAlt: 'Professional equipment in a commercial kitchen',
    caption: 'Laundry & commercial kitchen engineering',
  },
  {
    laundry: '/assets/emer-service-installation.jpg',
    laundryAlt: 'Technicians installing an industrial laundry washer',
    kitchen: '/assets/emer-service-maintenance.jpg',
    kitchenAlt: 'Technician servicing commercial kitchen equipment',
    caption: 'Installation & preventive maintenance',
  },
];

const supportStages = [
  {
    number: '01',
    icon: <FaTools aria-hidden="true" />,
    title: 'Installation & commissioning',
    text: 'Set up industrial laundry and commercial kitchen equipment.',
  },
  {
    number: '02',
    icon: <FaCheck aria-hidden="true" />,
    title: 'AMC & preventive maintenance',
    text: 'Planned maintenance support for the equipment your operation relies on.',
  },
  {
    number: '03',
    icon: <FaWrench aria-hidden="true" />,
    title: 'Breakdown repairs & upgrades',
    text: 'Repairs, equipment upgrades and spare parts support.',
  },
];

const serviceTypes = [
  {
    icon: <FaTools aria-hidden="true" />,
    title: 'Installation & commissioning',
    text: 'Equipment installation and commissioning support.',
    image: '/assets/emer-service-installation.jpg',
    alt: 'Technicians commissioning an industrial laundry washer extractor',
  },
  {
    icon: <FaCheck aria-hidden="true" />,
    title: 'AMC & preventive maintenance',
    text: 'Planned maintenance to support dependable equipment operation.',
    image: '/assets/emer-service-maintenance.jpg',
    alt: 'Technician carrying out planned maintenance on a commercial dishwasher',
  },
  {
    icon: <FaWrench aria-hidden="true" />,
    title: 'Breakdown repairs',
    text: 'Service and repair for laundry and commercial kitchen equipment.',
    image: '/assets/emer-service-repair.jpg',
    alt: 'Technician diagnosing the control system of an industrial laundry machine',
  },
  {
    icon: <FaCogs aria-hidden="true" />,
    title: 'Upgrades & spare parts',
    text: 'Equipment upgrades, laundry parts and technical component repairs.',
    image: '/assets/emer-service-upgrades.jpg',
    alt: 'Technician fitting replacement components to commercial laundry equipment',
  },
];

const laundryEquipment = [
  'Dry cleaning machines',
  'Washer extractors',
  'Dryers',
  'Tunnel washers & dryers',
  'Flatwork ironers',
  'Bed sheet & towel folders',
  'Pressing & marking machines',
  'PCB, VFD & PLC repair',
  'Padding replacement',
  'Motor rewinding',
  'Boilers & air compressors',
  'Laundry consumables & consultancy',
];

const HomePage = () => {
  const pageRef = useRef(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useSeo({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    ogImage: DEFAULT_OG_IMAGE,
  });

  useEffect(() => {
    const page = pageRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!page || reduceMotion || !('IntersectionObserver' in window)) return undefined;

    const revealItems = page.querySelectorAll('.motion-reveal');
    if (!revealItems.length) return undefined;

    page.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      page.classList.remove('motion-ready');
    };
  }, []);

  useEffect(() => {
    if (heroPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const slideTimer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
      }
    }, 6500);

    return () => window.clearInterval(slideTimer);
  }, [heroPaused]);

  return (
    <div className="emer-page" id="top" ref={pageRef}>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="hero-eyebrow"><span /> E M E R Technical Services · Dubai</p>
            <h1 id="hero-title">Specialists in Laundry &amp; Commercial Kitchen Engineering</h1>
            <p className="hero-description">
              Specialized engineering services for industrial laundry and commercial kitchen equipment,
              including installation, maintenance, repairs, and upgrades.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#services">
                Explore our services <FaArrowRight aria-hidden="true" />
              </a>
              <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <FaWhatsapp aria-hidden="true" /> WhatsApp support
              </a>
            </div>
            <p className="hero-location"><FaMapMarkerAlt aria-hidden="true" /> Deira, Dubai, UAE</p>
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="Laundry and commercial kitchen equipment"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
          onFocusCapture={() => setHeroPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHeroPaused(false);
          }}
        >
          <div className="hero-photo hero-photo-laundry">
            {heroSlides.map((slide, index) => (
              <img
                className={`hero-slide-image${index === activeHeroSlide ? ' is-active' : ''}`}
                src={slide.laundry}
                alt={index === activeHeroSlide ? slide.laundryAlt : ''}
                aria-hidden={index !== activeHeroSlide}
                fetchPriority={index === activeHeroSlide ? 'high' : 'auto'}
                key={slide.laundry}
              />
            ))}
          </div>
          <div className="hero-photo hero-photo-kitchen">
            {heroSlides.map((slide, index) => (
              <img
                className={`hero-slide-image${index === activeHeroSlide ? ' is-active' : ''}`}
                src={slide.kitchen}
                alt={index === activeHeroSlide ? slide.kitchenAlt : ''}
                aria-hidden={index !== activeHeroSlide}
                key={slide.kitchen}
              />
            ))}
          </div>
          <span className="hero-divider" aria-hidden="true" />
          <div className="hero-image-caption">
            <span className="hero-caption-copy">{heroSlides[activeHeroSlide].caption}</span>
            <div className="hero-caption-controls" role="group" aria-label="Hero photos">
              {heroSlides.map((slide, index) => (
                <button
                  className={`hero-slide-control${index === activeHeroSlide ? ' is-active' : ''}`}
                  type="button"
                  aria-label={`Show photo set ${index + 1}: ${slide.caption}`}
                  aria-pressed={index === activeHeroSlide}
                  onClick={() => setActiveHeroSlide(index)}
                  key={slide.caption}
                />
              ))}
              <span className="hero-caption-mark">E M E R</span>
            </div>
          </div>
        </div>
      </section>

      <section className="capability-strip" aria-label="Service capabilities">
        <div className="container capability-viewport">
          <div className="capability-track">
            <div className="capability-group">
              <span>Installation &amp; Commissioning</span>
              <span>AMC &amp; Preventive Maintenance</span>
              <span>Breakdown Repairs</span>
              <span>Spare Parts &amp; Upgrades</span>
            </div>
            <div className="capability-group" aria-hidden="true">
              <span>Installation &amp; Commissioning</span>
              <span>AMC &amp; Preventive Maintenance</span>
              <span>Breakdown Repairs</span>
              <span>Spare Parts &amp; Upgrades</span>
            </div>
          </div>
        </div>
      </section>

      <section className="focus-section" aria-label="Our engineering specialties">
        <div className="container focus-grid">
          {engineeringAreas.map((area) => (
            <a
              className="focus-card motion-reveal"
              href={area.id === 'laundry-details' ? '#laundry-details' : '#kitchen-details'}
              key={area.id}
            >
              <div className="focus-image">
                <img src={area.image} alt={area.alt} loading="lazy" />
                <span className="focus-number">{area.number}</span>
              </div>
              <div className="focus-card-content">
                <div>
                  <h2>{area.title}</h2>
                  <p>{area.description}</p>
                </div>
                <span className="focus-arrow" aria-label={area.linkLabel}><FaArrowRight aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="container about-grid">
          <div className="section-heading motion-reveal motion-reveal-left">
            <p className="section-eyebrow">About E M E R</p>
            <h2>Practical engineering support for essential equipment.</h2>
          </div>
          <div className="about-copy motion-reveal motion-reveal-right">
            <p className="about-lead">
              E M E R Technical Services provides specialized engineering support for industrial laundry and
              commercial kitchen equipment in Dubai.
            </p>
            <p>
              Our work covers installation and commissioning, AMC and preventive maintenance, breakdown repairs,
              equipment upgrades, and spare-parts support.
            </p>
            <p>
              We support the laundry systems and kitchen equipment that daily operations depend on. Whether you need
              planned servicing, a technical repair, or an equipment upgrade, our service scope stays focused on the
              equipment and requirement you bring to us.
            </p>
            <ul className="about-highlights" aria-label="E M E R service specialties">
              <li><FaCheck aria-hidden="true" /> Industrial laundry</li>
              <li><FaCheck aria-hidden="true" /> Commercial kitchens</li>
              <li><FaCheck aria-hidden="true" /> Installation to upgrades</li>
            </ul>
            <a className="text-link" href="#contact">Speak with our team <FaArrowRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="container about-visual-grid">
          <figure className="about-image-card motion-reveal motion-reveal-left">
            <img
              src="/assets/emer-about-laundry.jpg"
              alt="Technician checking an industrial washer in a commercial laundry facility"
              loading="lazy"
            />
            <figcaption>
              <span>Industrial laundry</span>
              <strong>Engineering for laundry systems</strong>
            </figcaption>
          </figure>
          <figure className="about-image-card motion-reveal motion-reveal-right">
            <img
              src="/assets/emer-about-kitchen.jpg"
              alt="Stainless commercial ranges, ovens, and extraction equipment in a professional kitchen"
              loading="lazy"
            />
            <figcaption>
              <span>Commercial kitchens</span>
              <strong>Technical support for kitchen equipment</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="support-journey section-pad" aria-labelledby="support-journey-title">
        <div className="container">
          <div className="section-heading section-heading-centered motion-reveal motion-reveal-scale">
            <p className="section-eyebrow">A connected service approach</p>
            <h2 id="support-journey-title">Support through every stage of equipment service.</h2>
            <p>Installation, planned maintenance, repairs and upgrades for laundry and commercial kitchen equipment.</p>
          </div>
          <div className="support-steps">
            {supportStages.map((stage) => (
              <article className="support-step motion-reveal" key={stage.number}>
                <span className="support-step-number">{stage.number}</span>
                <span className="support-step-icon">{stage.icon}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="container">
          <div className="section-heading section-heading-centered motion-reveal motion-reveal-scale">
            <p className="section-eyebrow">What we do</p>
            <h2>Service for every stage of equipment life.</h2>
            <p>Specialized engineering services for industrial laundry and commercial kitchen equipment.</p>
          </div>
          <div className="service-types-grid">
            {serviceTypes.map((service) => (
              <article className="service-type-card motion-reveal" key={service.title}>
                <div className="service-type-image">
                  <img src={service.image} alt={service.alt} loading="lazy" />
                  <span className="service-type-icon" aria-hidden="true">{service.icon}</span>
                </div>
                <div className="service-type-copy">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="equipment-grid">
            <article className="equipment-panel equipment-panel-laundry motion-reveal motion-reveal-left" id="laundry-details">
              <p className="section-eyebrow">Laundry engineering</p>
              <h3>Equipment and systems we service</h3>
              <p className="equipment-intro">Laundry machine service, component repairs, parts and technical consultancy.</p>
              <ul className="equipment-list">
                {laundryEquipment.map((item) => <li key={item}><FaCheck aria-hidden="true" /> {item}</li>)}
              </ul>
            </article>
            <article className="equipment-panel equipment-panel-kitchen motion-reveal motion-reveal-right" id="kitchen-details">
              <p className="section-eyebrow">Commercial kitchen engineering</p>
              <h3>Support for commercial kitchen equipment</h3>
              <p className="equipment-intro">
                Installation, maintenance, breakdown repairs and equipment upgrades for commercial kitchens.
              </p>
              <ul className="kitchen-service-list">
                <li><FaCheck aria-hidden="true" /> Installation &amp; commissioning</li>
                <li><FaCheck aria-hidden="true" /> AMC &amp; preventive maintenance</li>
                <li><FaCheck aria-hidden="true" /> Breakdown repairs</li>
                <li><FaCheck aria-hidden="true" /> Equipment upgrades</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="container">
          <div className="contact-banner motion-reveal">
            <div>
              <p className="section-eyebrow">Get in touch</p>
              <h2>Need a service visit or a quote?</h2>
              <p>Contact E M E R Technical Services in Deira, Dubai.</p>
            </div>
            <a className="button button-light" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <FaWhatsapp aria-hidden="true" /> Request a quote
            </a>
          </div>

          <div className="contact-content-grid">
            <div className="contact-map motion-reveal">
              <iframe
                src={MAP_EMBED_URL}
                title="Map showing Bright Vision Business Center in Deira, Dubai"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="contact-details">
              <a className="contact-detail motion-reveal" href="tel:+971585878090">
                <span className="contact-icon"><FaPhoneAlt aria-hidden="true" /></span>
                <span className="contact-label">Office</span>
                <strong>+971 58 587 8090</strong>
              </a>
              <a className="contact-detail motion-reveal" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <span className="contact-icon"><FaWhatsapp aria-hidden="true" /></span>
                <span className="contact-label">Mobile &amp; WhatsApp</span>
                <strong>+971 55 530 3294</strong>
              </a>
              <a className="contact-detail motion-reveal" href={MAP_URL} target="_blank" rel="noreferrer">
                <span className="contact-icon"><FaMapMarkerAlt aria-hidden="true" /></span>
                <span className="contact-label">Office location</span>
                <strong>Bright Vision Business Center, Deira, Dubai</strong>
              </a>
              <a className="contact-detail motion-reveal" href="mailto:emertechnicalservice@outlook.com">
                <span className="contact-icon"><FaEnvelope aria-hidden="true" /></span>
                <span className="contact-label">Email</span>
                <strong>emertechnicalservice@outlook.com</strong>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
