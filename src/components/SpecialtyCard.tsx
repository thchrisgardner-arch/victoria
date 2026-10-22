import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { specialtyPath, type Specialty } from '../content/specialties';
import type { MediaSlot } from '../content/media';
import { Arrow } from './Button';
import { Figure } from './Figure';
import './SpecialtyCard.css';

type Props = {
  specialty: Specialty;
  index?: number;
  /** "feature": tarjeta con fotografía. "plain": solo tipografía. */
  variant?: 'feature' | 'plain';
  image?: MediaSlot;
  className?: string;
  headingLevel?: 'h3' | 'h4';
};

export function SpecialtyCard({ specialty, index, variant = 'plain', image, className = '', headingLevel: H = 'h3' }: Props) {
  return (
    <Link
      to={specialtyPath(specialty.slug)}
      className={`spec-card spec-card--${variant} ${className}`.trim()}
      data-reveal
      style={{ '--reveal-i': index ?? 0 } as CSSProperties}
    >
      {variant === 'feature' && image && (
        <Figure
          media={image}
          ratio="4 / 5"
          className="spec-card__media"
          reveal={false}
          showBrief={false}
          sizes="(min-width: 900px) 36vw, 100vw"
        />
      )}
      <div className="spec-card__body">
        <H className="spec-card__title h3">{specialty.name}</H>
        <p className="spec-card__summary">{specialty.summary}</p>
        <span className="spec-card__cta">
          <span>
            <em>Explorar</em> área
          </span>
          <span className="spec-card__arrow">
            <Arrow />
          </span>
        </span>
      </div>
    </Link>
  );
}
