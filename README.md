# Victoria Home Health & Spa: rediseño web

Propuesta de rediseño editorial para Victoria Home Health & Spa (Barranquilla).
Concepto: **"Medical Care, Thoughtfully Designed."**

## Ejecutar

```bash
npm install
npm run dev       # desarrollo
npm run build     # tsc + build de producción en dist/
npm run preview   # sirve dist/ en http://localhost:4173
npm run lint
```

Stack: **Vite + React 19 + TypeScript + React Router**. Sin librería de animación: el motion es CSS + `IntersectionObserver`.
Dependencias añadidas y por qué:

| Dependencia | Motivo |
|---|---|
| `react-router-dom` | URLs reales por página (`/especialidades/ginecologia`, etc.) |
| `@fontsource/cormorant-garamond`, `@fontsource-variable/manrope` | Fuentes servidas localmente (sin depender de Google Fonts en tiempo de ejecución) |
| `playwright` (dev) | Capturas y pruebas de interacción en distintas resoluciones |

Es una SPA: el hosting debe redirigir todas las rutas a `index.html` (`public/_redirects` ya lo hace en Netlify; en otros servicios hay que configurar algo equivalente).

## Estructura

```
src/
  content/        ← ÚNICA fuente de datos: textos, servicios, contacto, fotografía
    site.ts         marca, contacto, redes, navegación, etiquetas de CTA
    specialties.ts  9 especialidades + 4 agrupaciones
    logistics.ts    7 servicios logísticos + 4 módulos editoriales
    media.ts        inventario fotográfico con brief de cada encuadre
    team.ts         equipo y credenciales (vacío a propósito)
  styles/tokens.css  color, tipografía (clamp), espaciado, radios, motion
  components/     Header, MobileNavigation, Button, SectionHeading, Figure,
                  SpecialtyCard, PatientExperienceCard, ProcessStep,
                  ContactCTA, ContactForm, Footer, PageIntro, Pending, Wordmark
  sections/home/  EditorialHero, BrandIntro, SpecialtyExplorer,
                  FeaturedService, PatientExperience, HowItWorks, TrustTeam
  pages/          Home, Specialties, SpecialtyDetail, Experience, About,
                  Contact, Legal, NotFound
```

## Decisiones de diseño

- **Paleta:** se parte de la propuesta exploratoria. El gris secundario se oscureció a `#686964` y el teal de texto y CTA a `#3D6461` para cumplir WCAG AA. El teal `#719B98` queda para detalles y titulares grandes. **Falta contrastarla con el manual de marca oficial.**
- **Tipografía:** Cormorant Garamond para titulares (con cursiva en teal como recurso de identidad) y Manrope para la interfaz y la lectura.
- **Hero:** composición asimétrica en 12 columnas: titular escalonado en tres líneas, retrato vertical, detalle fotográfico superpuesto, bloque tonal, coordenadas de la ciudad y una franja con los cuatro pilares del servicio. En móvil la composición se rediseña (imagen desplazada con el detalle encima) en lugar de apilarse sin más.
- **Tarjetas (inspiradas en Alethia):** una tarjeta grande con foto, tarjetas solo tipográficas y una tarjeta índice con borde discontinuo para el resto del catálogo. Al pasar el cursor o con el foco se invierten a verde oscuro.
- **Footer (inspirado en Wolverine):** frase y CTA arriba, 5 columnas (marca, navegación, especialidades, experiencia, contacto y redes), wordmark a ancho completo y franja legal.
- **Motion:** entrada escalonada del hero (líneas con máscara), aparición al hacer scroll, revelado de imágenes con `clip-path`, parallax ligero (solo ≥768 px) y relleno de botones al pasar el cursor. Con `prefers-reduced-motion` todo se muestra directamente, sin animación.

## Pendiente antes del lanzamiento

Las marcas **"Por validar"** muestran en pantalla lo que falta. Se ocultan con `VITE_SHOW_PENDING=false`.

1. **Datos de contacto** (`content/site.ts`): WhatsApp, teléfono, correo, dirección y horario. El botón "Contactar por WhatsApp" solo aparece cuando hay número.
2. **Redes sociales oficiales** (`site.social`).
3. **Logotipo oficial:** `Wordmark.tsx` es un wordmark tipográfico provisional, igual que `public/favicon.svg`. Falta también la imagen `og:image`.
4. **Fotografía:** no se usó ninguna imagen de archivo. Cada espacio muestra un plano tonal con el brief del encuadre (`content/media.ts`). Para sustituirlo, se rellena `src`, `width` y `height`.
5. **Vigencia de servicios:** las 9 especialidades y los 7 servicios logísticos vienen del catálogo 2021–2022, y `procedures` está vacío en todas.
6. **Línea prioritaria:** `featuredSpecialtySlug` apunta a medicina antiaging como hipótesis.
7. **Equipo, credenciales e instalaciones** (`content/team.ts`).
8. **Formulario:** definir `VITE_CONTACT_ENDPOINT` (ver `.env.example`). Sin él, el formulario valida los datos pero no envía nada, y así se lo dice al usuario. Nunca simula un envío correcto.
9. **Textos legales:** política de tratamiento de datos (Ley 1581 de 2012) y aviso de privacidad.
10. **Copy:** todos los textos son propuestas creativas pendientes de aprobación.
11. **SEO:** el título, la descripción y el canonical se fijan por página en el cliente. Si se necesita un SEO más fuerte, conviene prerenderizar (SSG). No se añadieron datos estructurados porque no hay datos verificados.

## Limitaciones de esta fase

La política de red del entorno de desarrollo bloqueó el acceso a victoriahhs.com y a las tres referencias (verostudio.com, alethia.earth, wolverineworldwide.com). **No se inspeccionaron.** Las decisiones visuales se basan en la descripción de cada referencia que hacía el brief. Tampoco había logotipo, catálogo PDF ni fotografías disponibles.
