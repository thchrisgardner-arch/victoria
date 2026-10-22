import { useRef, type CSSProperties } from 'react';
import { referenceSrcSet, referenceUrl, type MediaSlot } from '../content/media';
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
  /** Muestra el brief del encuadre en el plano provisional (solo sin fotografía). */
  showBrief?: boolean;
  reveal?: 'mask' | 'fade' | false;
  revealIndex?: number;
  sizes?: string;
  style?: CSSProperties;
};

/**
 * Figura fotográfica. Prioridad: `media.src` (fotografía propia) →
 * `media.reference` (fotografía editorial de referencia) → plano tonal.
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
  const ref = media.src ? undefined : media.reference;
  const hasImage = Boolean(media.src || ref);

  const loading = {
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: priority ? ('sync' as const) : ('async' as const),
    ...(priority ? { fetchPriority: 'high' as const } : {}),
  };

  return (
    <figure
      className={`figure tone-${media.tone} ${hasImage ? '' : 'figure--pending'} ${className}`.trim()}
      style={{ aspectRatio: ratio, '--reveal-i': revealIndex, ...style } as CSSProperties}
      data-reveal={reveal === 'mask' ? 'mask' : reveal === 'fade' ? '' : undefined}
    >
      <div className="figure__inner" ref={parallax ? innerRef : undefined}>
        {media.src ? (
          <img src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} {...loading} />
        ) : ref ? (
          <img
            src={referenceUrl(ref, 1200)}
            srcSet={referenceSrcSet(ref)}
            sizes={sizes}
            alt={media.alt}
            style={{ objectPosition: ref.focus }}
            {...loading}
          />
        ) : (
          <div className="figure__art" role="img" aria-label="Espacio reservado para fotografía de Victoria">
            <span className="figure__light" />
          </div>
        )}
      </div>
      {!hasImage && showBrief && (
        <figcaption className="figure__pending">
          <span className="figure__pending-tag">Fotografía por producir</span>
          <span className="figure__pending-brief">{media.brief}</span>
        </figcaption>
      )}
    </figure>
  );
}
