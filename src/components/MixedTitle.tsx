import { Fragment } from 'react';

/** Palabras de enlace que van en cursiva minúscula ("The STORY of the NAME"). */
const LINKING = new Set([
  'a', 'al', 'con', 'de', 'del', 'e', 'el', 'en', 'la', 'las', 'lo', 'los', 'o', 'para', 'por',
  'que', 'se', 'su', 'sus', 'te', 'tu', 'tus', 'u', 'un', 'una', 'y', 'mi', 'más', 'no', 'sin', 'sobre',
]);

/**
 * Convierte un título en texto plano al lenguaje tipográfico del sitio: las
 * palabras de enlace en <em> (cursiva) y el resto en versales vía CSS. Para
 * títulos escritos a mano, usar <em> directamente.
 */
export function MixedTitle({ text }: { text: string }) {
  const tokens = text.split(/(\s+)/);
  return (
    <>
      {tokens.map((t, i) => {
        const bare = t.toLowerCase().replace(/[¿?¡!.,;:]/g, '');
        return LINKING.has(bare) ? <em key={i}>{t}</em> : <Fragment key={i}>{t}</Fragment>;
      })}
    </>
  );
}
