import { Link } from 'react-router-dom';
import { ctaLabels, legalNav, primaryNav, site, whatsappHref } from '../content/site';
import { specialties, specialtyPath } from '../content/specialties';
import { logisticsServices } from '../content/logistics';
import { Button } from './Button';
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
            Atención médica, <em>pensada</em> con cuidado.
          </p>
          <div className="site-footer__lead-actions">
            <Button to="/contacto#valoracion" variant="light" arrow>
              {ctaLabels.primary}
            </Button>
            {wa ? (
              <Button href={wa} variant="ghost">
                {ctaLabels.whatsapp}
              </Button>
            ) : (
              <Button to="/contacto" variant="ghost">
                Ver canales de contacto
              </Button>
            )}
          </div>
        </div>

        <div className="site-footer__cols">
          <div className="site-footer__about">
            <p className="label site-footer__heading">Victoria Home Health &amp; Spa</p>
            <p className="site-footer__text">
              Atención médica y acompañamiento al paciente en {site.city}, {site.country}.
            </p>
          </div>

          <nav aria-label="Navegación del sitio">
            <p className="label site-footer__heading">Navegación</p>
            <ul role="list">
              {primaryNav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Especialidades" className="site-footer__wide">
            <p className="label site-footer__heading">Especialidades médicas</p>
            <ul role="list" className="site-footer__two-col">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link to={specialtyPath(s.slug)}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Experiencia del paciente">
            <p className="label site-footer__heading">Experiencia del paciente</p>
            <ul role="list">
              {logisticsServices.map((l) => (
                <li key={l.slug}>
                  <Link to={`/experiencia-del-paciente#${l.slug}`}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label site-footer__heading">Contacto</p>
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
            <p className="label site-footer__heading site-footer__heading--spaced">Redes sociales</p>
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
        </div>
      </div>
    </footer>
  );
}
