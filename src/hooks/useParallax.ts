import { useEffect, type RefObject } from 'react';

/**
 * Parallax ligero: desplaza el elemento en Y según su posición en el viewport.
 * Se desactiva con movimiento reducido y en pantallas pequeñas.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, strength = 0.08) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 768px)');
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce.matches || !wide.matches) {
        el.style.transform = '';
        return;
      }
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-center * strength).toFixed(1)}px, 0) scale(1.08)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, strength]);
}
