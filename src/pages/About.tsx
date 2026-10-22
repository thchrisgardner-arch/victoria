import { ContactCTA } from '../components/ContactCTA';
import { PageIntro } from '../components/PageIntro';
import { PendingNote } from '../components/Pending';
import { usePageMeta } from '../hooks/usePageMeta';
import { TrustTeam } from '../sections/home/TrustTeam';

const principles = [
  { title: 'Claridad', text: 'Información comprensible para que tomes decisiones con tranquilidad.' },
  { title: 'Atención personalizada', text: 'Cada proceso empieza por escuchar lo que necesitas.' },
  { title: 'Acompañamiento', text: 'La atención médica y la logística del paciente, pensadas en conjunto.' },
];

export default function About() {
  usePageMeta({
    title: 'Nosotros',
    description: 'Conoce Victoria Home Health & Spa, su enfoque de atención y acompañamiento al paciente en Barranquilla.',
    path: '/nosotros',
  });

  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Nosotros' }]}
        eyebrow="Nosotros"
        title={
          <>
            Atención médica, <em>pensada con cuidado.</em>
          </>
        }
        lead="Victoria Home Health & Spa reúne servicios médicos, procedimientos quirúrgicos, medicina estética y antiaging, y servicios logísticos de acompañamiento al paciente en Barranquilla."
      />

      <section className="page-block" aria-labelledby="history-title">
        <div className="page-block__grid container">
          <div className="page-block__label">
            <p className="label">Historia</p>
          </div>
          <div className="page-block__content">
            <h2 id="history-title" className="h2">
              Nuestra <em>historia</em>
            </h2>
            <PendingNote>Año de fundación, origen y trayectoria de Victoria, redactados con información aprobada.</PendingNote>
          </div>
        </div>
      </section>

      <section className="page-block" aria-labelledby="philo-title">
        <div className="page-block__grid container">
          <div className="page-block__label">
            <p className="label">Filosofía de atención</p>
          </div>
          <div className="page-block__content">
            <h2 id="philo-title" className="h2">
              Lo que guía <em>cada proceso</em>
            </h2>
            <ol role="list" className="principles">
              {principles.map((p, i) => (
                <li key={p.title} data-reveal style={{ ['--reveal-i' as string]: i }}>
                  <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h3">{p.title}</h3>
                  <p className="body">{p.text}</p>
                </li>
              ))}
            </ol>
            <PendingNote>Principios propuestos por el equipo creativo; validar con la dirección de Victoria.</PendingNote>
          </div>
        </div>
      </section>

      <TrustTeam />
      <ContactCTA />
    </>
  );
}
