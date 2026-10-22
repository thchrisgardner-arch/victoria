import { useEffect } from 'react';
import { site } from '../content/site';

type Meta = { title?: string; description?: string; path?: string };

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Título, descripción, canonical y Open Graph por página. */
export function usePageMeta({ title, description = site.description, path = '/' }: Meta) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · Atención médica y acompañamiento en ${site.city}`;
    const url = `${site.url}${path}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path]);
}
