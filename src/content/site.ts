/**
 * Datos institucionales centralizados.
 *
 * IMPORTANTE: ningún dato de contacto, dirección ni red social ha sido
 * verificado todavía. Cada campo marcado con `null` debe completarse con
 * información oficial aprobada por Victoria antes del lanzamiento. Los
 * componentes ya saben qué mostrar cuando un dato falta: nunca se inventa.
 */

export type SocialLink = { label: string; href: string };

export const site = {
  name: 'Victoria Home Health & Spa',
  shortName: 'Victoria',
  city: 'Barranquilla',
  country: 'Colombia',
  /** Coordenadas públicas de la ciudad (no de una sede). */
  cityCoordinates: '10.96° N · 74.80° O',
  url: 'https://victoriahhs.com',
  tagline: 'Medical Care, Thoughtfully Designed.',
  description:
    'Atención médica y acompañamiento integral en Barranquilla: especialidades médicas, procedimientos quirúrgicos, medicina antiaging y servicios logísticos para el paciente.',

  contact: {
    /** Número internacional sin signos, p. ej. "573001234567". PENDIENTE. */
    whatsapp: null as string | null,
    /** Teléfono en formato legible. PENDIENTE. */
    phone: null as string | null,
    email: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },

  /** Perfiles oficiales verificados. PENDIENTE: no se publican perfiles no confirmados. */
  social: [] as SocialLink[],

  /** Mensaje inicial sugerido para WhatsApp. */
  whatsappMessage: 'Hola, quisiera recibir información sobre una valoración.',
} as const;

export function whatsappHref(): string | null {
  const number = site.contact.whatsapp;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`;
}

export type NavItem = { label: string; to: string };

export const primaryNav: NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Especialidades', to: '/especialidades' },
  { label: 'Experiencia del paciente', to: '/experiencia-del-paciente' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
];

export const legalNav: NavItem[] = [
  { label: 'Política de tratamiento de datos', to: '/legal/tratamiento-de-datos' },
  { label: 'Aviso de privacidad', to: '/legal/aviso-de-privacidad' },
];

export const ctaLabels = {
  primary: 'Solicitar valoración',
  secondary: 'Explorar especialidades',
  discover: 'Descubrir Victoria',
  whatsapp: 'Contactar por WhatsApp',
} as const;
