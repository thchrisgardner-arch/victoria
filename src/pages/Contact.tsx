import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { ContactForm } from '../components/ContactForm';
import { PageIntro } from '../components/PageIntro';
import { PendingNote } from '../components/Pending';
import { getSpecialty } from '../content/specialties';
import { logisticsServices } from '../content/logistics';
import { ctaLabels, site, whatsappHref } from '../content/site';
import { usePageMeta } from '../hooks/usePageMeta';
import './Contact.css';

const formEnabled = Boolean(import.meta.env.VITE_CONTACT_ENDPOINT);

export default function Contact() {
  usePageMeta({
    title: 'Contacto y solicitud de valoración',
    description: 'Solicita información o una valoración en Victoria Home Health & Spa, Barranquilla.',
    path: '/contacto',
  });
  const [params] = useSearchParams();
  const requested = params.get('servicio') ?? '';
  const valid = getSpecialty(requested) || logisticsServices.some((l) => l.slug === requested) ? requested : '';
  const wa = whatsappHref();
  const { contact } = site;

  const channels = [
    contact.phone && { label: 'Teléfono', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    contact.email && { label: 'Correo', value: contact.email, href: `mailto:${contact.email}` },
    contact.address && { label: 'Dirección', value: contact.address },
    contact.hours && { label: 'Horario', value: contact.hours },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Contacto' }]}
        eyebrow="Contacto"
        title={
          <>
            Estamos aquí <em>para orientarte.</em>
          </>
        }
        lead="Cuéntanos qué estás buscando y te ayudaremos a conocer las opciones de atención disponibles."
      />

      <section className="page-block" aria-labelledby="valoracion">
        <div className="page-block__grid container">
          <aside className="contact-aside" aria-label="Canales oficiales">
            <p className="label">Canales oficiales</p>
            {wa && (
              <Button href={wa} variant="secondary">
                {ctaLabels.whatsapp}
              </Button>
            )}
            {channels.length > 0 ? (
              <dl className="contact-aside__list">
                {channels.map((c) => (
                  <div key={c.label}>
                    <dt>{c.label}</dt>
                    <dd>{c.href ? <a href={c.href}>{c.value}</a> : c.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <PendingNote>WhatsApp, teléfono, correo, dirección y horario de atención oficiales.</PendingNote>
            )}

            <p className="label contact-aside__sub">Ubicación</p>
            <p className="body">
              {site.city}, {site.country}
            </p>
            {!contact.address && <PendingNote>Dirección y mapa de la sede.</PendingNote>}

            <p className="label contact-aside__sub">Redes sociales</p>
            {site.social.length > 0 ? (
              <ul role="list">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a className="text-link" href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <PendingNote>Perfiles oficiales verificados.</PendingNote>
            )}
          </aside>

          <div className="contact-main">
            <h2 id="valoracion" className="h2">
              Solicitar <em>valoración</em>
            </h2>
            {!formEnabled && (
              <PendingNote>
                Integración de envío (VITE_CONTACT_ENDPOINT). Hasta entonces el formulario valida los datos pero no los
                envía.
              </PendingNote>
            )}
            <ContactForm key={valid} defaultService={valid} />
          </div>
        </div>
      </section>
    </>
  );
}
