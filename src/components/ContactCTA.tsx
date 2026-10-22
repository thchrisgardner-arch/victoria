import type { CSSProperties } from 'react';
import { ctaLabels, whatsappHref } from '../content/site';
import { media } from '../content/media';
import { Button } from './Button';
import { Figure } from './Figure';
import { PendingNote } from './Pending';
import './ContactCTA.css';

type Props = {
  title?: string;
  text?: string;
};

export function ContactCTA({
  title = 'Estamos aquí para orientarte.',
  text = 'Cuéntanos qué estás buscando y te ayudaremos a conocer las opciones de atención disponibles.',
}: Props) {
  const wa = whatsappHref();
  const [first, ...rest] = title.split(' ');
  return (
    <section className="contact-cta on-dark" aria-labelledby="contact-cta-title">
      <div className="contact-cta__grid container">
        <h2 id="contact-cta-title" className="contact-cta__title display" data-reveal>
          {first} <em>{rest.join(' ')}</em>
        </h2>
        <Figure media={media.closing} ratio="4 / 5" className="contact-cta__figure" showBrief={false} />
        <div className="contact-cta__body" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
          <p className="contact-cta__text">{text}</p>
          <div className="contact-cta__actions">
            <Button to="/contacto#valoracion" variant="light" arrow>
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
