import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ctaLabels, primaryNav } from '../content/site';
import { groupOrder, groups, specialtiesByGroup, specialtyPath } from '../content/specialties';
import { Arrow, Button } from './Button';
import { MobileNavigation } from './MobileNavigation';
import { Wordmark } from './Wordmark';
import './Header.css';

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaId = useId();
  const megaRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar menús al navegar
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [megaOpen]);

  const hoverOpen = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    if (!megaOpen) hoverOpenedAt.current = Date.now();
    setMegaOpen(true);
  };
  const hoverClose = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 220);
  };

  const solid = scrolled || megaOpen || pathname !== '/';

  return (
    <header className={`site-header ${solid ? 'is-solid' : ''} ${megaOpen ? 'is-mega' : ''}`}>
      <div className="site-header__bar container">
        <Link to="/" className="site-header__brand" aria-label="Victoria Home Health & Spa, ir al inicio">
          <Wordmark />
        </Link>

        <nav className="site-header__nav" aria-label="Principal">
          <ul role="list">
            {primaryNav.map((item) =>
              item.to === '/especialidades' ? (
                <li key={item.to} ref={megaRef} onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
                  <button
                    ref={triggerRef}
                    type="button"
                    className={`nav-link nav-link--trigger ${pathname.startsWith('/especialidades') ? 'is-active' : ''}`}
                    aria-expanded={megaOpen}
                    aria-controls={megaId}
                    onClick={() => {
                      // Evita que el clic que sigue al hover cierre el menú recién abierto
                      if (Date.now() - hoverOpenedAt.current < 600) return;
                      setMegaOpen((v) => !v);
                    }}
                  >
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="chev">
                      <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </button>
                  <div id={megaId} className="mega" hidden={!megaOpen}>
                    <div className="mega__inner container">
                      <div className="mega__intro">
                        <p className="label">Especialidades médicas</p>
                        <p className="mega__title display">Encuentra el área que necesitas.</p>
                        <Link className="text-link" to="/especialidades">
                          Ver todas las especialidades <Arrow />
                        </Link>
                      </div>
                      {groupOrder.map((g) => (
                        <div className="mega__group" key={g}>
                          <p className="mega__group-label label">{groups[g].label}</p>
                          <ul role="list">
                            {specialtiesByGroup(g).map((s) => (
                              <li key={s.slug}>
                                <Link to={specialtyPath(s.slug)}>{s.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} end className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="site-header__actions">
          <Button to="/contacto#valoracion" className="site-header__cta">
            <span className="cta-long">{ctaLabels.primary}</span>
            <span className="cta-short" aria-hidden="true">
              Valoración
            </span>
          </Button>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(true)}
          >
            <span className="menu-toggle__label">Menú</span>
            <span className="menu-toggle__lines" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
