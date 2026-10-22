import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../../components/Button';
import { Figure } from '../../components/Figure';
import { media } from '../../content/media';
import './BrandIntro.css';

export function BrandIntro() {
  return (
    <section className="intro section" aria-labelledby="intro-title">
      <div className="intro__grid container">
        <p className="intro__eyebrow label" data-reveal>
          <span className="index-num">01</span> Victoria
        </p>

        <h2 id="intro-title" className="intro__title h2" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
          La atención médica también es <em>la forma en que te acompañan.</em>
        </h2>

        <Figure media={media.brandIntro} ratio="5 / 6" className="intro__figure" parallax={0.05} />
        <Figure media={media.heroTexture} ratio="1 / 1" className="intro__texture" showBrief={false} revealIndex={2} />

        <div className="intro__body" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
          <p className="lead">
            Victoria reúne especialidades médicas y servicios de acompañamiento al paciente para que puedas concentrarte en
            tu bienestar mientras te orientamos en cada paso.
          </p>
          <Link to="/nosotros" className="text-link">
            Conoce Victoria <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
