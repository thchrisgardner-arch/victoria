import './Wordmark.css';

/**
 * Wordmark tipográfico PROVISIONAL. No se tuvo acceso al logotipo oficial;
 * sustituir por el archivo vectorial aprobado (SVG) cuando esté disponible.
 */
export function Wordmark({ size = 'md' }: { size?: 'md' | 'xl' }) {
  return (
    <span className={`wordmark wordmark--${size}`}>
      <span className="wordmark__name">Victoria</span>
      <span className="wordmark__sub">Home Health &amp; Spa</span>
    </span>
  );
}
