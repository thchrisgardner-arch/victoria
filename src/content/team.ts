/**
 * Equipo, credenciales e instalaciones. VACÍO a propósito: solo se publica
 * información verificada y autorizada por Victoria y por cada profesional.
 */
import type { MediaSlot } from './media';

export type TeamMember = {
  name: string;
  role: string;
  /** Especialidades relacionadas (slugs de specialties.ts). */
  specialties: string[];
  /** Registro profesional verificable (p. ej. ReTHUS), solo si el profesional lo autoriza. */
  registry?: string;
  photo?: MediaSlot;
};

export type Credential = { title: string; issuer: string; year?: string };

export const team: TeamMember[] = [];
export const credentials: Credential[] = [];
