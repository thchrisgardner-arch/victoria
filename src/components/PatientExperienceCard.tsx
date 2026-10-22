import type { CSSProperties } from 'react';
import { logisticsServices, type ExperienceModule } from '../content/logistics';
import { Figure } from './Figure';
import './PatientExperienceCard.css';

export function PatientExperienceCard({ module, index }: { module: ExperienceModule; index: number }) {
  const included = logisticsServices.filter((l) => module.includes.includes(l.slug));
  return (
    <article className="px-card" data-reveal style={{ '--reveal-i': index } as CSSProperties}>
      <Figure
        media={module.image}
        ratio="3 / 4"
        reveal={false}
        showBrief={false}
        className="px-card__media"
        sizes="(min-width: 1000px) 24vw, (min-width: 561px) 46vw, 80vw"
      />
      <div className="px-card__body">
        <h3 className="h3">{module.title}</h3>
        <p className="px-card__text">{module.text}</p>
        {included.length > 1 && (
          <p className="px-card__includes">
            <span className="visually-hidden">Incluye: </span>
            {included.map((l) => l.name).join(' · ')}
          </p>
        )}
      </div>
    </article>
  );
}
