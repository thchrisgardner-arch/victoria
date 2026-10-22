import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { ContactCTA } from '../components/ContactCTA';
import { PageIntro } from '../components/PageIntro';
import { PendingNote } from '../components/Pending';
import { SpecialtyCard } from '../components/SpecialtyCard';
import { ctaLabels } from '../content/site';
import { getSpecialty, groups, specialtiesByGroup, specialties } from '../content/specialties';
import { team } from '../content/team';
import { usePageMeta } from '../hooks/usePageMeta';
import NotFound from './NotFound';

export default function SpecialtyDetail() {
  const { slug = '' } = useParams();
  const s = getSpecialty(slug);
  usePageMeta({
    title: s?.name ?? 'Página no encontrada',
    description: s ? `${s.name} en Victoria Home Health & Spa, Barranquilla. ${s.summary}` : undefined,
    path: `/especialidades/${slug}`,
  });
  if (!s) return <NotFound />;

  const members = team.filter((m) => m.specialties.includes(s.slug));
  const sameGroup = specialtiesByGroup(s.group).filter((x) => x.slug !== s.slug);
  const related = (sameGroup.length ? sameGroup : specialties.filter((x) => x.slug !== s.slug)).slice(0, 3);

  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Especialidades', to: '/especialidades' }, { label: s.name }]}
        eyebrow={groups[s.group].label}
        title={s.name}
        lead={
          <>
            <p className="lead">{s.intro}</p>
            <div>
              <Button to={`/contacto?servicio=${s.slug}#valoracion`} arrow>
                {ctaLabels.primary}
              </Button>
            </div>
          </>
        }
      />

      <section className="page-block" aria-labelledby="proc-title">
        <div className="page-block__grid container">
          <div className="page-block__label">
            <p className="label">Procedimientos</p>
          </div>
          <div className="page-block__content">
            <h2 id="proc-title" className="h2">
              Opciones <em>disponibles</em>
            </h2>
            {s.procedures.length > 0 ? (
              <ul className="detail-list" role="list">
                {s.procedures.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : (
              <PendingNote>
                Listado de procedimientos vigentes para {s.name.toLowerCase()}. Mientras se confirma, solicita información
                para conocer las alternativas disponibles.
              </PendingNote>
            )}
          </div>
        </div>
      </section>

      <section className="page-block" aria-labelledby="team-title">
        <div className="page-block__grid container">
          <div className="page-block__label">
            <p className="label">Equipo</p>
          </div>
          <div className="page-block__content">
            <h2 id="team-title" className="h3">
              Profesionales del área
            </h2>
            {members.length > 0 ? (
              <ul role="list" className="detail-list">
                {members.map((m) => (
                  <li key={m.name}>
                    <strong>{m.name}</strong> · {m.role}
                  </li>
                ))}
              </ul>
            ) : (
              <PendingNote>Profesionales y registros verificados de esta especialidad.</PendingNote>
            )}
            <h2 className="h3">Preguntas frecuentes</h2>
            <PendingNote>Preguntas frecuentes aprobadas por el equipo médico.</PendingNote>
          </div>
        </div>
      </section>

      <section className="page-block" aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className="label related-title">
            Otras especialidades
          </h2>
          <div className="related-grid">
            {related.map((r, i) => (
              <SpecialtyCard key={r.slug} specialty={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
