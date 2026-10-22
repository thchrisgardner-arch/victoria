import { media, type MediaSlot } from './media';

/**
 * Servicios logísticos — fuente: catálogo 2021–2022. Pendientes de validación.
 * Ningún servicio se presenta como incluido en un tratamiento ni disponible
 * para todos los pacientes.
 */

export type LogisticsService = { slug: string; name: string; summary: string };

export const logisticsServices: LogisticsService[] = [
  { slug: 'alojamiento', name: 'Alojamiento', summary: 'Opciones de estadía durante el proceso.' },
  { slug: 'alimentacion', name: 'Alimentación', summary: 'Apoyo con la alimentación durante la recuperación.' },
  { slug: 'transporte', name: 'Transporte', summary: 'Traslados relacionados con la atención.' },
  { slug: 'cuidados-posquirurgicos', name: 'Cuidados posquirúrgicos', summary: 'Acompañamiento en el periodo posterior a la cirugía.' },
  { slug: 'visitas-medicas', name: 'Visitas médicas generales', summary: 'Visitas de medicina general.' },
  { slug: 'articulos-recuperacion', name: 'Artículos para la recuperación', summary: 'Artículos necesarios para el periodo de recuperación.' },
  { slug: 'masajes-posquirurgicos', name: 'Masajes posquirúrgicos', summary: 'Masajes indicados en el periodo posquirúrgico.' },
];

export type ExperienceModule = {
  title: string;
  text: string;
  includes: string[];
  image: MediaSlot;
};

/** Agrupación editorial de los 7 servicios en 4 módulos para la página de inicio. */
export const experienceModules: ExperienceModule[] = [
  {
    title: 'Alojamiento',
    text: 'Un lugar donde descansar mientras transcurre tu proceso.',
    includes: ['alojamiento'],
    image: media.lodging,
  },
  {
    title: 'Transporte',
    text: 'Traslados coordinados para llegar a cada cita con tranquilidad.',
    includes: ['transporte'],
    image: media.transport,
  },
  {
    title: 'Cuidados posquirúrgicos',
    text: 'Acompañamiento en los días posteriores, con visitas médicas generales y masajes posquirúrgicos.',
    includes: ['cuidados-posquirurgicos', 'visitas-medicas', 'masajes-posquirurgicos'],
    image: media.postOp,
  },
  {
    title: 'Servicios complementarios',
    text: 'Alimentación y artículos necesarios para la recuperación.',
    includes: ['alimentacion', 'articulos-recuperacion'],
    image: media.complementary,
  },
];

export const logisticsDisclaimer =
  'La disponibilidad, las condiciones y el alcance de cada servicio se confirman de forma individual. No todos los servicios están incluidos en todos los procesos.';
