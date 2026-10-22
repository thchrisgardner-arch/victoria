import type { ReactNode } from 'react';
import './Pending.css';

/**
 * Marca visible de contenido pendiente de validación por el cliente.
 * Se muestra mientras VITE_SHOW_PENDING no sea "false".
 */
export const showPending = import.meta.env.VITE_SHOW_PENDING !== 'false';

export function PendingNote({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  if (!showPending) return null;
  return (
    <p className={`pending pending--${tone}`}>
      <span className="pending__tag">Por validar</span>
      <span>{children}</span>
    </p>
  );
}
