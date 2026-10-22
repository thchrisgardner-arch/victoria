import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Button } from '../../components/Button';
import { SectionHeading } from '../../components/SectionHeading';
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
        <div className="explorer__aside">
          <SectionHeading
            index="02"
            eyebrow="Especialidades médicas"
            id="explorer-title"
            title={
              <>
                Encuentra la atención <em>que necesitas.</em>
              </>
            }
            intro="Explora nuestras áreas de atención y conoce las opciones disponibles para tu proceso."
          />
          <ul className="explorer__groups" role="list" data-reveal style={{ '--reveal-i': 3 } as CSSProperties}>
            {groupOrder.map((g) => (
              <li key={g}>
                <span>{groups[g].label}</span>
                <span className="index-num">{String(specialtiesByGroup(g).length).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
          <Button to="/especialidades" variant="secondary" arrow className="explorer__all">
            Ver todas las especialidades
          </Button>
        </div>

        <div className="explorer__cards">
          {lead && <SpecialtyCard specialty={lead} index={0} variant="feature" image={media.specialtyLead} className="explorer__lead" />}
          {rest.map((s, i) => (
            <SpecialtyCard key={s.slug} specialty={s} index={i + 1} />
          ))}
          <div className="explorer__index" data-reveal style={{ '--reveal-i': rest.length + 1 } as CSSProperties}>
            <p className="label">También en el catálogo</p>
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
            <Link className="text-link" to="/especialidades">
              Ver catálogo completo <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
