import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Button } from '../../components/Button';
import { SpecialtyCard } from '../../components/SpecialtyCard';
import { media } from '../../content/media';
import {
  featuredSpecialtySlug,
  groupOrder,
  groups,
  specialties,
  specialtiesByGroup,
  specialtyPath,
} from '../../content/specialties';
import './SpecialtyExplorer.css';

export function SpecialtyExplorer() {
  const selection = specialties.filter((s) => s.featuredOnHome && s.slug !== featuredSpecialtySlug);
  const [lead, ...rest] = selection;
  const others = specialties.filter((s) => !selection.includes(s));

  return (
    <section id="especialidades" className="explorer section" aria-labelledby="explorer-title">
      <div className="explorer__grid container">
        <header className="explorer__head">
          <h2 id="explorer-title" className="h2" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
            Encuentra <em>la atención que</em> necesitas.
          </h2>
        </header>

        <div className="explorer__intro" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
          <p className="body">Explora nuestras áreas de atención y conoce las opciones disponibles para tu proceso.</p>
          <ul className="explorer__groups" role="list">
            {groupOrder.map((g) => (
              <li key={g}>
                <span>{groups[g].label}</span>
                <span className="index-num">{String(specialtiesByGroup(g).length).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
          <Button to="/especialidades" variant="secondary" arrow>
            Ver todas las especialidades
          </Button>
        </div>

        <div className="explorer__cards">
          {lead && <SpecialtyCard specialty={lead} index={0} variant="feature" image={media.specialtyLead} className="explorer__lead" />}
          {rest.map((s, i) => (
            <SpecialtyCard key={s.slug} specialty={s} index={i + 1} />
          ))}
          <div className="explorer__index" data-reveal style={{ '--reveal-i': rest.length + 1 } as CSSProperties}>
            <h3 className="h3">Más especialidades</h3>
            <ul role="list">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link to={specialtyPath(s.slug)}>
                    {s.name}
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
