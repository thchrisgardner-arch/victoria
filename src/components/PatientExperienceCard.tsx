import type { CSSProperties } from 'react';
import { logisticsServices, type ExperienceModule } from '../content/logistics';
import { Figure } from './Figure';
import './PatientExperienceCard.css';

export function PatientExperienceCard({ module, index }: { module: ExperienceModule; index: number }) {
  const included = logisticsServices.filter((l) => module.includes.includes(l.slug));
  return (
    <article className="px-card" data-reveal style={{ '--reveal-i': index } as CSSProperties}>
      <Figure media={module.image} ratio="3 / 4" reveal={false} showBrief={false} className="px-card__media" />
      <div className="px-card__body">
        <p className="index-num">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="h3">{module.title}</h3>
        <p className="px-card__text">{module.text}</p>
        {included.length > 1 && (
          <ul className="px-card__tags" role="list" aria-label={`Servicios en ${module.title}`}>
            {included.map((l) => (
              <li key={l.slug}>{l.name}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
