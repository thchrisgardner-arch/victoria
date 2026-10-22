import { useEffect, useRef, type CSSProperties } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ctaLabels, primaryNav, whatsappHref } from '../content/site';
import { specialties, specialtyPath } from '../content/specialties';
import { Button } from './Button';
import { Wordmark } from './Wordmark';
import './MobileNavigation.css';

type Props = { open: boolean; onClose: () => void };

/**
 * Menú móvil sobre <dialog> modal: el navegador gestiona el foco atrapado,
 * Escape y la inertización del contenido de fondo.
 */
export function MobileNavigation({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const wa = whatsappHref();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.classList.toggle('is-locked', open);
  }, [open]);

  return (
    <dialog
      ref={ref}
      id="mobile-nav"
      className="mobile-nav"
      aria-label="Menú principal"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="mobile-nav__top container">
        <Link to="/" aria-label="Ir al inicio" onClick={onClose}>
          <Wordmark />
        </Link>
        <button type="button" className="mobile-nav__close" onClick={onClose}>
          Cerrar
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      <nav className="mobile-nav__body container" aria-label="Principal móvil">
        <ul role="list" className="mobile-nav__list">
          {primaryNav.map((item, i) => (
            <li key={item.to} style={{ '--i': i } as CSSProperties}>
              {item.to === '/especialidades' ? (
                <details className="mobile-nav__details">
                  <summary>
                    <span>{item.label}</span>
                    <span className="mobile-nav__plus" aria-hidden="true" />
                  </summary>
                  <ul role="list" className="mobile-nav__sub">
                    <li>
                      <Link to="/especialidades" onClick={onClose}>
                        Todas las especialidades
                      </Link>
                    </li>
                    {specialties.map((s) => (
                      <li key={s.slug}>
                        <Link to={specialtyPath(s.slug)} onClick={onClose}>
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <NavLink to={item.to} end onClick={onClose}>
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="mobile-nav__footer">
          <Button to="/contacto#valoracion" arrow>
            {ctaLabels.primary}
          </Button>
          {wa && (
            <Button href={wa} variant="secondary">
              {ctaLabels.whatsapp}
            </Button>
          )}
        </div>
      </nav>
    </dialog>
  );
}
