import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';

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

export function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', arrow = false, className = '' } = props;
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if ('to' in props && props.to) {
    return (
      <Link className={cls} to={props.to}>
        {inner}
      </Link>
    );
  }
  if ('href' in props && props.href) {
    const external = /^https?:/.test(props.href);
    return (
      <a className={cls} href={props.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
        {external && <span className="visually-hidden"> (se abre en una pestaña nueva)</span>}
      </a>
    );
  }
  const b = props as AsButton;
  return (
    <button
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
