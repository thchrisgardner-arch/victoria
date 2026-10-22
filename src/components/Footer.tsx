import { Link } from 'react-router-dom';
import { referenceCredits } from '../content/media';
import { ctaLabels, legalNav, primaryNav, site, whatsappHref } from '../content/site';
import { specialties, specialtyPath } from '../content/specialties';
import { logisticsServices } from '../content/logistics';
import { Button, RollText } from './Button';
import { PendingNote } from './Pending';
import { Wordmark } from './Wordmark';
import './Footer.css';

const year = new Date().getFullYear();

export function Footer() {
  const wa = whatsappHref();
  const { contact } = site;
  const contactRows = [
    { label: 'Teléfono', value: contact.phone, href: contact.phone ? `tel:${contact.phone.replace(/\s/g, '')}` : null },
    { label: 'Correo', value: contact.email, href: contact.email ? `mailto:${contact.email}` : null },
    { label: 'Dirección', value: contact.address, href: null },
    { label: 'Horario', value: contact.hours, href: null },
  ].filter((r) => r.value);

  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__lead">
          <p className="site-footer__statement display">
            Atención médica, <em>pensada con</em> cuidado.
          </p>
          <div className="site-footer__lead-actions">
            <Button to="/contacto#valoracion" variant="light" arrow>
              {ctaLabels.primary}
            </Button>
            {wa ? (
              <Button href={wa} variant="gold">
                {ctaLabels.whatsapp}
              </Button>
            ) : (
              <Button to="/contacto" variant="gold">
                Ver canales de contacto
              </Button>
            )}
          </div>
        </div>

        <div className="site-footer__cols">
          <div className="site-footer__about">
            <p className="site-footer__text">
              Atención médica y acompañamiento al paciente en {site.city}, {site.country}.
            </p>
          </div>

          <nav aria-labelledby="ft-nav">
            <h2 id="ft-nav" className="site-footer__heading">
              Navegación
            </h2>
            <ul role="list">
              {primaryNav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="roll-host">
                    <RollText>{n.label}</RollText>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="ft-spec" className="site-footer__wide">
            <h2 id="ft-spec" className="site-footer__heading">
              Especialidades
            </h2>
            <ul role="list" className="site-footer__two-col">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link to={specialtyPath(s.slug)}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="ft-xp">
            <h2 id="ft-xp" className="site-footer__heading">
              Experiencia
            </h2>
            <ul role="list">
              {logisticsServices.map((l) => (
                <li key={l.slug}>
                  <Link to={`/experiencia-del-paciente#${l.slug}`}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="site-footer__heading">Contacto</h2>
            {contactRows.length > 0 ? (
              <dl className="site-footer__contact">
                {contactRows.map((r) => (
                  <div key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.href ? <a href={r.href}>{r.value}</a> : r.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <PendingNote tone="dark">Teléfono, correo, dirección y horario oficiales.</PendingNote>
            )}
            <h2 className="site-footer__heading site-footer__heading--spaced">Redes</h2>
            {site.social.length > 0 ? (
              <ul role="list">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                      <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <PendingNote tone="dark">Perfiles oficiales de Victoria.</PendingNote>
            )}
          </div>
        </div>

        <div className="site-footer__mark" aria-hidden="true">
          <Wordmark size="xl" />
        </div>

        <div className="site-footer__legal">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <ul role="list">
            {legalNav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="site-footer__disclaimer">
            La información de este sitio es orientativa y no reemplaza una valoración médica.
          </p>
          {referenceCredits.length > 0 && (
            <p className="site-footer__credits">
              Fotografías editoriales de referencia (Unsplash), pendientes de sustituir por material propio de Victoria:{' '}
              {referenceCredits.map((r, i) => (
                <span key={r.id}>
                  <a href={r.page} target="_blank" rel="noopener noreferrer">
                    {r.author}
                  </a>
                  {i < referenceCredits.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
