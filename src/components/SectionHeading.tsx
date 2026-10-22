import type { CSSProperties, ReactNode } from 'react';

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
  id?: string;
};

/** Encabezado editorial: índice + eyebrow, titular serif y entradilla opcional. */
export function SectionHeading({ index, eyebrow, title, intro, as: Tag = 'h2', className = '', id }: Props) {
  return (
    <header className={`section-heading ${className}`.trim()}>
      <p className="section-heading__eyebrow label" data-reveal>
        {index && <span className="index-num">{index}</span>}
        <span>{eyebrow}</span>
      </p>
      <Tag className={Tag === 'h1' ? 'h1' : 'h2'} id={id} data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
        {title}
      </Tag>
      {intro && (
        <p className="lead section-heading__intro" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
          {intro}
        </p>
      )}
    </header>
  );
}
