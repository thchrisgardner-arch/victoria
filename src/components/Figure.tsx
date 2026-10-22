import { useRef, type CSSProperties } from 'react';
import type { MediaSlot } from '../content/media';
import { useParallax } from '../hooks/useParallax';
import './Figure.css';

type Props = {
  media: MediaSlot;
  /** Proporción ancho/alto, p. ej. "4 / 5". Reserva espacio y evita saltos de layout. */
  ratio?: string;
  className?: string;
  /** Imagen crítica (hero): carga inmediata y prioridad alta. */
  priority?: boolean;
  parallax?: number;
  /** Muestra el brief del encuadre en el plano provisional. */
  showBrief?: boolean;
  reveal?: 'mask' | 'fade' | false;
  revealIndex?: number;
  sizes?: string;
  style?: CSSProperties;
};

/**
 * Figura fotográfica. Con `media.src` renderiza la fotografía real; sin ella,
 * un plano tonal provisional claramente identificado como tal.
 */
export function Figure({
  media,
  ratio,
  className = '',
  priority = false,
  parallax,
  showBrief = true,
  reveal = 'mask',
  revealIndex = 0,
  sizes = '100vw',
  style,
}: Props) {
  const innerRef = useRef<HTMLDivElement>(null);
  useParallax(innerRef, parallax ?? 0);

  return (
    <figure
      className={`figure ${media.src ? '' : `figure--pending tone-${media.tone}`} ${className}`.trim()}
      style={{ aspectRatio: ratio, '--reveal-i': revealIndex, ...style } as CSSProperties}
      data-reveal={reveal === 'mask' ? 'mask' : reveal === 'fade' ? '' : undefined}
    >
      <div className="figure__inner" ref={parallax ? innerRef : undefined}>
        {media.src ? (
          <img
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            {...(priority ? { fetchPriority: 'high' as const } : {})}
          />
        ) : (
          <div className="figure__art" role="img" aria-label="Espacio reservado para fotografía de Victoria">
            <span className="figure__light" />
            <span className="figure__grain" />
          </div>
        )}
      </div>
      {!media.src && showBrief && (
        <figcaption className="figure__pending">
          <span className="figure__pending-tag">Fotografía por producir</span>
          <span className="figure__pending-brief">{media.brief}</span>
        </figcaption>
      )}
    </figure>
  );
}
