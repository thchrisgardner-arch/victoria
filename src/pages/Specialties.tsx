import { ContactCTA } from '../components/ContactCTA';
import { PageIntro } from '../components/PageIntro';
import { PendingNote } from '../components/Pending';
import { SpecialtyCard } from '../components/SpecialtyCard';
import { groupOrder, groups, specialtiesByGroup } from '../content/specialties';
import { usePageMeta } from '../hooks/usePageMeta';
import './Specialties.css';

export default function Specialties() {
  usePageMeta({
    title: 'Especialidades médicas',
    description: 'Conoce las áreas de atención de Victoria Home Health & Spa en Barranquilla: cirugía, atención especializada, diagnóstico y medicina antiaging.',
    path: '/especialidades',
  });

  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Especialidades' }]}
        title={
          <>
            Áreas de atención, <em>organizadas para</em> ti.
          </>
        }
        lead={
          <>
            <p className="lead">
              Explora las especialidades por categoría. Cada área comienza con una valoración en la que se revisan tus
              necesidades y las alternativas disponibles.
            </p>
            <PendingNote>Inventario basado en el catálogo 2021–2022; vigencia de cada especialidad por confirmar.</PendingNote>
          </>
        }
      />

      {groupOrder.map((g) => (
        <section key={g} className="spec-group page-block" aria-labelledby={`group-${g}`}>
          <div className="page-block__grid container">
            <div className="page-block__label spec-group__label">
              <h2 id={`group-${g}`} className="h3">
                {groups[g].label}
              </h2>
              <p className="body">{groups[g].description}</p>
            </div>
            <div className="page-block__content spec-group__cards">
              {specialtiesByGroup(g).map((s, i) => (
                <SpecialtyCard key={s.slug} specialty={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <ContactCTA title="¿No sabes por dónde empezar?" text="Cuéntanos qué estás buscando y te orientaremos hacia el área de atención adecuada." />
    </>
  );
}
