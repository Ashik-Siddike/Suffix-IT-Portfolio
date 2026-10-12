import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X } from './GeneratedIcons';
import Icon from './Icon';
import SiteImage from './SiteImage';
import { navigation } from '../data/navigation';
import { Container, PrimaryButton } from './ui';

export function NavigationDropdown({ item, open, onToggle, onClose, onOpen, id }) {
  const { pathname } = useLocation();
  const active = pathname === item.path || item.items.some((child) => child.path === pathname);
  const ref = useRef(null);
  const hoverTimer = useRef(0);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);
  useEffect(() => {
    if (!open) return;
    const handler = (event) => {
      if (!ref.current?.contains(event.target)) onClose();
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open, onClose]);
  return (
    <div
      ref={ref}
      className="nav-disclosure"
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(hoverTimer.current);
        onOpen();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => {
          if (!ref.current?.contains(document.activeElement)) onClose();
        }, 180);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onClose();
          ref.current.querySelector('button').focus();
        }
      }}
    >
      <button
        type="button"
        className={`nav-trigger ${open || active ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        {item.label}
        <ChevronDown size={13} aria-hidden="true" />
      </button>
      {open && (
        <div id={id} className={`navigation-dropdown ${item.visual ? 'mega-menu' : ''}`}>
          <Link className="dropdown-overview" to={item.path} onClick={onClose}>
            {item.label}
          </Link>
          <div className="mega-body">
            {item.visual && (
              <div className="mega-feature">
                <SiteImage src={item.visual} alt="" width="340" height="240" sizes="320px" />
              </div>
            )}
            <div className="dropdown-links">
              {item.items.map((child) => (
                <Link to={child.path} key={child.path} onClick={onClose}>
                  {item.visual && (
                    <span className="menu-icon">
                      <Icon name={child.icon} size={20} />
                    </span>
                  )}
                  <span>{child.title}</span>
                  {item.visual && (
                    <ArrowUpRight size={15} className="menu-arrow" aria-hidden="true" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function DesktopNavigation() {
  const [opened, setOpened] = useState(null);
  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      {navigation.map((item) =>
        item.items ? (
          <NavigationDropdown
            key={item.label}
            item={item}
            id={`desktop-${item.label.toLowerCase()}`}
            open={opened === item.label}
            onToggle={() => setOpened(item.label)}
            onOpen={() => setOpened(item.label)}
            onClose={() => setOpened((current) => (current === item.label ? null : current))}
          />
        ) : (
          <NavLink key={item.label} to={item.path} end={item.path === '/'}>
            {item.label}
          </NavLink>
        ),
      )}
    </nav>
  );
}

export function MobileNavigation({ close }) {
  return (
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
      {navigation.map((item) =>
        item.items ? (
          <details key={item.label}>
            <summary>
              {item.label}
              <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <Link to={item.path} onClick={close}>
              {item.label}
            </Link>
            {item.items.map((child) => (
              <Link key={child.path} to={child.path} onClick={close}>
                {child.title}
              </Link>
            ))}
          </details>
        ) : (
          <NavLink key={item.label} to={item.path} end={item.path === '/'} onClick={close}>
            {item.label}
          </NavLink>
        ),
      )}
      <PrimaryButton to="/contact?intent=demo" onClick={close}>
        Contact
      </PrimaryButton>
    </nav>
  );
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef(null);
  const panel = useRef(null);
  // Close the disclosure without updating state during an effect on navigation.
  const close = () => setMobileOpen(false);
  useEffect(() => {
    const handle = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, []);
  return (
    <header className="site-header" key={location.pathname}>
      <Container className="header-inner">
        <Link to="/" className="brand" aria-label="Suffix IT — home" onClick={close}>
          <img
            src="/assets/Suffix-Logo.73142c9b.png"
            alt="Suffix IT — ultimate solutions"
            width="2083"
            height="789"
          />
        </Link>
        <DesktopNavigation />
        <PrimaryButton to="/contact?intent=demo" className="header-cta">
          Contact
        </PrimaryButton>
        <button
          ref={toggle}
          className="mobile-toggle"
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>
      {mobileOpen && (
        <div ref={panel}>
          <MobileNavigation close={close} />
        </div>
      )}
    </header>
  );
}
