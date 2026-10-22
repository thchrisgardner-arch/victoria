import type { CSSProperties } from 'react';
import { Button } from '../../components/Button';
import { Figure } from '../../components/Figure';
import { PendingNote } from '../../components/Pending';
import { media } from '../../content/media';
import { featuredSpecialtySlug, getSpecialty, specialtyPath } from '../../content/specialties';
import './FeaturedService.css';

/**
 * Servicio destacado con tratamiento de campaña editorial. Hoy apunta a
 * medicina antiaging como hipótesis; cambiar `featuredSpecialtySlug` cuando el
 * cliente confirme la línea prioritaria.
 */
export function FeaturedService() {
  const s = getSpecialty(featuredSpecialtySlug);
  if (!s) return null;

  return (
    <section className="featured on-dark" aria-labelledby="featured-title">
      <div className="featured__grid container">
        <Figure
          media={media.featuredAntiaging}
          ratio="4 / 5"
          className="featured__main"
          parallax={0.06}
          sizes="(min-width: 900px) 48vw, 92vw"
        />
        <Figure
          media={media.featuredAntiagingDetail}
          ratio="3 / 4"
          className="featured__detail"
          revealIndex={2}
          sizes="(min-width: 900px) 18vw, 40vw"
        />

        <h2 id="featured-title" className="h2 featured__title" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
          Bienestar <em>que evoluciona</em> contigo.
        </h2>

        <div className="featured__text" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
          <p className="lead">
            Conoce las opciones de atención en medicina antiaging y consulta con el equipo las alternativas disponibles
            para tus necesidades.
          </p>
          <Button to={specialtyPath(s.slug)} variant="gold" arrow>
            {`Explorar ${s.name.toLowerCase()}`}
          </Button>
          <PendingNote tone="dark">Línea prioritaria y tratamientos vigentes, por confirmar con Victoria.</PendingNote>
        </div>
      </div>
    </section>
  );
}
