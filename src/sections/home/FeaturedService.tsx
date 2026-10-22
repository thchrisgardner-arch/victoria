import type { CSSProperties } from 'react';
import { Button } from '../../components/Button';
import { Figure } from '../../components/Figure';
import { PendingNote } from '../../components/Pending';
import { media } from '../../content/media';
import { featuredSpecialtySlug, getSpecialty, specialtyPath } from '../../content/specialties';
import './FeaturedService.css';

/**
 * Servicio destacado. Hoy apunta a medicina antiaging como hipótesis; cambiar
 * `featuredSpecialtySlug` cuando el cliente confirme la línea prioritaria.
 */
export function FeaturedService() {
  const s = getSpecialty(featuredSpecialtySlug);
  if (!s) return null;

  return (
    <section className="featured" aria-labelledby="featured-title">
      <div className="featured__grid container">
        <Figure media={media.featuredAntiaging} ratio="7 / 6" className="featured__main" parallax={0.07} />
        <Figure media={media.featuredAntiagingDetail} ratio="1 / 1" className="featured__detail" showBrief={false} revealIndex={2} />

        <div className="featured__copy">
          <p className="label featured__eyebrow" data-reveal>
            <span className="index-num">03</span> Servicio destacado · {s.name}
          </p>
          <h2 id="featured-title" className="h2 featured__title" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
            Bienestar que <em>evoluciona contigo.</em>
          </h2>
          <div className="featured__text" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
            <p className="lead">
              Conoce las opciones de atención en medicina antiaging y consulta con el equipo sobre las alternativas
              disponibles para tus necesidades.
            </p>
            <Button to={specialtyPath(s.slug)} arrow>
              Explorar {s.name.toLowerCase()}
            </Button>
            <PendingNote>Línea prioritaria y tratamientos vigentes, por confirmar con Victoria.</PendingNote>
          </div>
        </div>
      </div>
    </section>
  );
}
