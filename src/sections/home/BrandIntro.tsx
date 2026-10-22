import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../../components/Button';
import { Figure } from '../../components/Figure';
import { media } from '../../content/media';
import './BrandIntro.css';

/** Manifiesto: titular centrado a gran escala, foto vertical y frase en sans. */
export function BrandIntro() {
  return (
    <section className="intro section" aria-labelledby="intro-title">
      <div className="intro__grid container">
        <h2 id="intro-title" className="intro__title h2" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
          La atención médica <em>también es</em> la forma <em>en que te</em> acompañan.
        </h2>

        <Figure
          media={media.brandIntro}
          ratio="3 / 4"
          className="intro__figure"
          parallax={0.05}
          sizes="(min-width: 900px) 30vw, 70vw"
        />
        <Figure
          media={media.heroTexture}
          ratio="4 / 5"
          className="intro__texture"
          revealIndex={2}
          sizes="(min-width: 900px) 16vw, 40vw"
        />

        <div className="intro__body" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
          <span className="intro__rule" aria-hidden="true" />
          <p className="statement">
            Victoria reúne especialidades médicas y servicios de acompañamiento para que puedas concentrarte en tu
            bienestar.
          </p>
          <p className="body">
            Te orientamos en cada paso: desde la primera conversación hasta los cuidados que vienen después.
          </p>
          <Link to="/nosotros" className="text-link">
            <span>
              <em>Conoce</em> Victoria
            </span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
