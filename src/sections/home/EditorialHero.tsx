import type { CSSProperties } from 'react';
import { Button } from '../../components/Button';
import { Figure } from '../../components/Figure';
import { media } from '../../content/media';
import { ctaLabels, site } from '../../content/site';
import './EditorialHero.css';

const lines: { text: string; italic?: boolean }[] = [
  { text: 'Tu bienestar merece' },
  { text: 'una atención' },
  { text: 'extraordinaria.', italic: true },
];

const pillars = ['Especialidades médicas', 'Procedimientos quirúrgicos', 'Medicina antiaging', 'Acompañamiento al paciente'];

export function EditorialHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__grid container">
        <p className="hero__eyebrow label hero-in" style={{ '--d': 0 } as CSSProperties}>
          Victoria Home Health &amp; Spa <span aria-hidden="true">·</span> {site.city}
        </p>

        <h1 id="hero-title" className="hero__title h1">
          {lines.map((line, i) => (
            <span className={`hero__line hero__line--${i + 1}`} key={line.text}>
              <span className="hero__line-inner" style={{ '--d': i + 1 } as CSSProperties}>
                {line.italic ? <em>{line.text}</em> : line.text}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__media">
          <div className="hero__main hero-img">
            <Figure media={media.heroMain} ratio="4 / 5" priority parallax={0.06} reveal={false} sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
          <div className="hero__detail hero-img" style={{ '--d': 2 } as CSSProperties}>
            <Figure media={media.heroDetail} ratio="3 / 4" priority reveal={false} showBrief={false} sizes="(min-width: 900px) 16vw, 40vw" />
          </div>
          <p className="hero__coords small hero-in" style={{ '--d': 5 } as CSSProperties}>
            {site.city}, {site.country}
            <span>{site.cityCoordinates}</span>
          </p>
        </div>

        <div className="hero__copy">
          <p className="lead hero-in" style={{ '--d': 4 } as CSSProperties}>
            Atención médica y acompañamiento integral, con servicios pensados para cuidar de ti en cada etapa de tu
            experiencia.
          </p>
          <div className="hero__actions hero-in" style={{ '--d': 5 } as CSSProperties}>
            <Button to="/contacto#valoracion" arrow>
              {ctaLabels.primary}
            </Button>
            <a className="text-link" href="#especialidades">
              {ctaLabels.secondary}
              <svg className="arrow" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none">
                <path d="M6 1v10M1.5 6.5L6 11l4.5-4.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
          </div>
        </div>

        <ul className="hero__pillars hero-in" role="list" style={{ '--d': 6 } as CSSProperties}>
          {pillars.map((p, i) => (
            <li key={p}>
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span> {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
