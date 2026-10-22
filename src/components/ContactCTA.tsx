import type { CSSProperties } from 'react';
import { ctaLabels, whatsappHref } from '../content/site';
import { media } from '../content/media';
import { Button } from './Button';
import { Figure } from './Figure';
import { MixedTitle } from './MixedTitle';
import { PendingNote } from './Pending';
import './ContactCTA.css';

type Props = {
  title?: string;
  text?: string;
};

/** Cierre de alto impacto: fotografía a sangre, titular centrado y CTA dorado. */
export function ContactCTA({
  title = 'Estamos aquí para orientarte.',
  text = 'Cuéntanos qué estás buscando y te ayudaremos a conocer las opciones de atención disponibles.',
}: Props) {
  const wa = whatsappHref();
  return (
    <section className="contact-cta on-dark" aria-labelledby="contact-cta-title">
      <div className="contact-cta__bg" aria-hidden="true">
        <Figure media={media.closing} reveal="fade" parallax={0.05} showBrief={false} sizes="100vw" />
      </div>
      <div className="contact-cta__inner container">
        <h2 id="contact-cta-title" className="contact-cta__title display" data-reveal>
          <MixedTitle text={title} />
        </h2>
        <span className="contact-cta__rule" data-reveal="line" aria-hidden="true" />
        <div className="contact-cta__body" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
          <p className="contact-cta__text">{text}</p>
          <div className="contact-cta__actions">
            <Button to="/contacto#valoracion" variant="gold-solid" arrow>
              {ctaLabels.primary}
            </Button>
            {wa ? (
              <Button href={wa} variant="ghost">
                {ctaLabels.whatsapp}
              </Button>
            ) : (
              <PendingNote tone="dark">Número oficial de WhatsApp para activar “{ctaLabels.whatsapp}”.</PendingNote>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
