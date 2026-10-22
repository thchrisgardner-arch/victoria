import type { CSSProperties } from 'react';

type Props = { index: number; title: string; text: string };

export function ProcessStep({ index, title, text }: Props) {
  return (
    <li className="step" data-reveal style={{ '--reveal-i': index } as CSSProperties}>
      <span className="step__num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="h3 step__title">
        <span className="visually-hidden">Paso {index + 1}: </span>
        {title}
      </h3>
      <p className="step__text">{text}</p>
    </li>
  );
}
