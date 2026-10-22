import type { CSSProperties } from 'react';
import { Button } from '../../components/Button';
import { Figure } from '../../components/Figure';
import { media } from '../../content/media';
import { ctaLabels } from '../../content/site';
import './EditorialHero.css';

/** Titular propuesto, sujeto a validación: "El arte de cuidar de ti." */
const lines: { text: string; italic?: boolean }[] = [
  { text: 'El arte' },
  { text: 'de cuidar', italic: true },
  { text: 'de ti.' },
];

export function EditorialHero() {
  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="hero__photo hero-img">
        <Figure
          media={media.heroMain}
          priority
          parallax={0.04}
          reveal={false}
          showBrief={false}
          sizes="(min-width: 761px) 62vw, 100vw"
        />
      </div>

      <div className="hero__grid container">
        <div className="hero__detail hero-img" style={{ '--d': 3 } as CSSProperties}>
          <Figure media={media.heroDetail} ratio="3 / 4" priority reveal={false} showBrief={false} sizes="(min-width: 761px) 14vw, 34vw" />
        </div>

        <h1 id="hero-title" className="hero__title hero-title">
          {lines.map((line, i) => (
            <span className={`hero__line hero__line--${i + 1}`} key={line.text}>
              <span className="hero__line-inner" style={{ '--d': i + 1 } as CSSProperties}>
                {line.italic ? <em>{line.text}</em> : line.text}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__copy">
          <span className="hero__rule hero-in" style={{ '--d': 4 } as CSSProperties} aria-hidden="true" />
          <p className="hero__lead hero-in" style={{ '--d': 4 } as CSSProperties}>
            Atención médica y bienestar, con una experiencia pensada alrededor de cada persona.
          </p>
          <div className="hero__actions hero-in" style={{ '--d': 5 } as CSSProperties}>
            <Button to="/contacto#valoracion" variant="light" arrow>
              {ctaLabels.primary}
            </Button>
            <Button to="/nosotros" variant="gold">
              {ctaLabels.discover}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
