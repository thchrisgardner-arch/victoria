import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ctaLabels } from '../content/site';
import { Button, MixedLabel, RollText } from './Button';
import { SiteMenu } from './MobileNavigation';
import { Wordmark } from './Wordmark';
import './Header.css';

/**
 * Cabecera al estilo de la referencia: botón "Menú" a la izquierda, wordmark
 * centrado y CTA a la derecha. La navegación completa vive en <SiteMenu>.
 */
export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar el menú al navegar
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  const solid = scrolled || pathname !== '/';

  return (
    <header className={`site-header ${solid ? 'is-solid' : 'is-over-dark'}`}>
      <div className="site-header__bar container">
        <button
          type="button"
          className="menu-toggle roll-host"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="menu-toggle__diamond" aria-hidden="true" />
          <span className="menu-toggle__label">
            <RollText>Menú</RollText>
          </span>
          <span className="menu-toggle__lines" aria-hidden="true" />
        </button>

        <Link to="/" className="site-header__brand" aria-label="Victoria Home Health & Spa, ir al inicio">
          <Wordmark />
        </Link>

        <Button to="/contacto#valoracion" className="site-header__cta">
          <span className="cta-long">
            <MixedLabel text={ctaLabels.primary} />
          </span>
          <span className="cta-short" aria-hidden="true">
            Valoración
          </span>
        </Button>
      </div>

      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
