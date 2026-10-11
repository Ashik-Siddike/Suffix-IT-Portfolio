import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, MapPin, Phone } from './GeneratedIcons';
import { company } from '../data/company';
import { Container } from './ui';
import SiteImage from './SiteImage';
const credentials = [
  ['certificate (1).b2ea00ce.png', 'ISO 9001:2015 mark published by Suffix IT'],
  ['certificate (2).336c9402.png', 'ISO 27001 mark published by Suffix IT'],
  ['basis.e4d85a47.png', 'BASIS'],
  ['bacco.1c028dc0.png', 'BACCO'],
  ['cisco.6cef068a.png', 'Cisco'],
  ['fort.975c6027.png', 'Fortinet'],
];
export default function SiteFooter() {
  return (
    <footer className="site-footer reference-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-company">
            <Link to="/" className="brand footer-brand">
              <img
                src="/assets/Suffix-Logo.73142c9b.png"
                alt="Suffix IT ultimate solutions"
                width="2083"
                height="789"
                loading="lazy"
              />
            </Link>
            <p>
              We maintain strategic partnerships with multiple organizations in Bangladesh and
              worldwide, working together to deliver high-quality solutions and long-term value.
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/suffixworld/"
                target="_blank"
                rel="noreferrer"
                aria-label="Suffix IT on Facebook"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/suffix-it-limited/"
                target="_blank"
                rel="noreferrer"
                aria-label="Suffix IT on LinkedIn"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="footer-contact-column">
            <h2>CONTACT US</h2>
            <div className="footer-method">
              <span>
                <MapPin size={19} aria-hidden="true" />
              </span>
              <p>
                Cha-70,70/A, Rupayan Millennium Square (9A), Progoti Sharoni, North Badda, Gulshan,
                Dhaka-1212.
              </p>
            </div>
            <a className="footer-method" href={`mailto:${company.email}`}>
              <span>
                <Mail size={19} aria-hidden="true" />
              </span>
              {company.email}
            </a>
            <a className="footer-method" href={`tel:${company.phoneHref}`}>
              <span>
                <Phone size={19} aria-hidden="true" />
              </span>
              {company.phone}
            </a>
          </div>
          <div className="footer-quick-links">
            <h2>QUICK LINKS</h2>
            <Link to="/about">About Us</Link>
            <Link to="/career">Career</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div
            className="footer-credentials"
            aria-label="Credential and partner marks published on the original website"
          >
            {credentials.map(([file, alt]) => (
              <SiteImage
                key={file}
                src={`/assets/${file}`}
                alt={alt}
                width="160"
                height="90"
                sizes="160px"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} All Rights Reserved by{' '}
            <Link to="/">Suffix IT Limited</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
