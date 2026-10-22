/**
 * Inventario de fotografía.
 *
 * No hay fotografías autorizadas de Victoria disponibles en esta fase, y no se
 * usan imágenes de archivo que puedan confundirse con el equipo o las
 * instalaciones reales. Cada entrada describe el encuadre que se necesita
 * (sirve como brief de producción fotográfica). Mientras `src` sea `undefined`,
 * el componente <Figure> dibuja un plano tonal de dirección de arte.
 *
 * Para sustituir: coloca el archivo en /public/images/<carpeta>/ y rellena `src`
 * (idealmente .avif o .webp), `width` y `height`.
 */

export type Tone = 'linen' | 'mineral' | 'sand' | 'dusk' | 'stone';

export type MediaSlot = {
  /** Texto alternativo final, pensado para la fotografía definitiva. */
  alt: string;
  /** Brief del encuadre requerido. Se muestra en el plano provisional. */
  brief: string;
  tone: Tone;
  src?: string;
  width?: number;
  height?: number;
};

const slot = (alt: string, brief: string, tone: Tone): MediaSlot => ({ alt, brief, tone });

export const media = {
  heroMain: slot(
    'Paciente conversando con una profesional de Victoria en un espacio luminoso',
    'Retrato vertical, luz natural lateral, conversación cercana. Personal y espacio reales de Victoria.',
    'linen',
  ),
  heroDetail: slot(
    'Detalle de manos acompañando a una paciente',
    'Detalle cerrado: manos, textura textil, gesto de acompañamiento.',
    'mineral',
  ),
  heroTexture: slot(
    'Textura de luz sobre una superficie clara',
    'Plano abstracto: luz de la mañana sobre lino o pared.',
    'sand',
  ),
  brandIntro: slot(
    'Espacio de atención de Victoria',
    'Fotografía institucional horizontal de un espacio real de atención o recepción.',
    'stone',
  ),
  featuredAntiaging: slot(
    'Ambiente de bienestar de la línea de medicina antiaging',
    'Editorial de bienestar: piel, luz suave, sin resultados antes/después.',
    'sand',
  ),
  featuredAntiagingDetail: slot(
    'Detalle de consulta de medicina antiaging',
    'Detalle de consulta: superficies, objetos, sin procedimientos invasivos.',
    'mineral',
  ),
  specialtyLead: slot(
    'Consulta de valoración con un especialista de Victoria',
    'Consulta de valoración: conversación, gesto, sin instrumental quirúrgico.',
    'linen',
  ),
  lodging: slot('Habitación de alojamiento para pacientes', 'Habitación real ofrecida a pacientes, luz cálida.', 'linen'),
  transport: slot('Traslado acompañado de un paciente', 'Llegada o traslado acompañado; sin marcas de terceros visibles.', 'stone'),
  postOp: slot('Cuidado posquirúrgico en casa', 'Momento de cuidado y descanso; trato humano, sin exponer heridas.', 'mineral'),
  complementary: slot('Servicios complementarios para la recuperación', 'Bodegón: alimentación, artículos de recuperación, textiles.', 'sand'),
  facilities: slot('Instalaciones de Victoria', 'Panorámica de instalaciones verificadas.', 'stone'),
  closing: slot('Recepción de Victoria', 'Plano amplio y sereno para el cierre de página.', 'dusk'),
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof media;
