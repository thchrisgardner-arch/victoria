import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './PageIntro.css';

type Crumb = { label: string; to?: string };

type Props = {
  /** Ya no se muestra: los rótulos pequeños se retiraron del diseño. */
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  aside?: ReactNode;
};

/** Introducción editorial de páginas internas. */
export function PageIntro({ title, lead, crumbs, aside }: Props) {
  return (
    <section className="page-intro">
      <div className="page-intro__grid container">
        {crumbs && (
          <nav aria-label="Ruta de navegación" className="page-intro__crumbs">
            <ol role="list">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="h1 page-intro__title hero-in" style={{ '--d': 1 } as CSSProperties}>
          {title}
        </h1>
        {lead && (
          <div className="page-intro__lead hero-in" style={{ '--d': 2 } as CSSProperties}>
            {typeof lead === 'string' ? <p className="lead">{lead}</p> : lead}
          </div>
        )}
        {aside && (
          <div className="page-intro__aside hero-in" style={{ '--d': 3 } as CSSProperties}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
