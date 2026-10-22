import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

/**
 * primary: negro sobre claro · light: blanco sobre oscuro ·
 * secondary / ghost: contorno · gold: contorno dorado ·
 * gold-solid: dorado lleno, solo para la conversión principal de una sección.
 */
type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'gold' | 'gold-solid';

type Common = { children: ReactNode; variant?: Variant; arrow?: boolean; className?: string };
type AsLink = Common & { to: string; href?: never };
type AsAnchor = Common & { href: string; to?: never };
type AsButton = Common & {
  to?: never;
  href?: never;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  'aria-describedby'?: string;
};

export type ButtonProps = AsLink | AsAnchor | AsButton;

/** Flecha minimalista: trazo fino y punta corta. */
export function Arrow() {
  return (
    <svg className="arrow" width="18" height="10" viewBox="0 0 18 10" aria-hidden="true" fill="none">
      <path d="M0.5 5h16M12.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Etiqueta con el ritmo tipográfico de la referencia: las primeras palabras en
 * cursiva minúscula y la última en versalitas ("solicitar VALORACIÓN").
 */
export function MixedLabel({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return <>{text}</>;
  const last = words.pop();
  return (
    <>
      <em>{words.join(' ')}</em> {last}
    </>
  );
}

/**
 * Texto que rueda al pasar el cursor (la etiqueta sale por arriba y su copia
 * entra por abajo), como los botones de la referencia.
 */
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span className="roll__track">
        <span className="roll__content">{children}</span>
        <span className="roll__copy" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}

/** Marca el botón como visible al entrar en pantalla para su animación de entrada. */
function useEntrance<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -4% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

export function Button(props: ButtonProps) {
  // Todos los CTA llevan la flecha a la derecha; `arrow={false}` la quita si hiciera falta
  const { children, variant = 'primary', arrow = true, className = '' } = props;
  const [ref, visible] = useEntrance<HTMLAnchorElement & HTMLButtonElement>();
  const cls = `btn btn--${variant} ${visible ? 'is-in' : ''} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__label">
        <RollText>{typeof children === 'string' ? <MixedLabel text={children} /> : children}</RollText>
      </span>
      {arrow && <Arrow />}
    </>
  );

  if ('to' in props && props.to) {
    return (
      <Link ref={ref} className={cls} to={props.to}>
        {inner}
      </Link>
    );
  }
  if ('href' in props && props.href) {
    const external = /^https?:/.test(props.href);
    return (
      <a
        ref={ref}
        className={cls}
        href={props.href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
        {external && <span className="visually-hidden"> (se abre en una pestaña nueva)</span>}
      </a>
    );
  }
  const b = props as AsButton;
  return (
    <button
      ref={ref}
      className={cls}
      type={b.type ?? 'button'}
      disabled={b.disabled}
      onClick={b.onClick}
      aria-describedby={b['aria-describedby']}
    >
      {inner}
    </button>
  );
}
