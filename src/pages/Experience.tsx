import { ContactCTA } from '../components/ContactCTA';
import { Figure } from '../components/Figure';
import { PageIntro } from '../components/PageIntro';
import { PendingNote } from '../components/Pending';
import { experienceModules, logisticsDisclaimer, logisticsServices } from '../content/logistics';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Experience() {
  usePageMeta({
    title: 'Experiencia del paciente',
    description: 'Servicios logísticos de acompañamiento al paciente: alojamiento, alimentación, transporte, cuidados posquirúrgicos y más.',
    path: '/experiencia-del-paciente',
  });

  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Experiencia del paciente' }]}
        eyebrow="Experiencia del paciente"
        title={
          <>
            Te acompañamos <em>más allá de la consulta.</em>
          </>
        }
        lead={
          <>
            <p className="lead">
              Victoria contempla servicios logísticos complementarios a la atención médica, pensados para que tu proceso sea
              más cómodo y organizado.
            </p>
            <p className="small">{logisticsDisclaimer}</p>
          </>
        }
      />

      {experienceModules.map((m, i) => (
        <section key={m.title} className="page-block xp-block" aria-labelledby={`xp-${i}`}>
          <div className={`page-block__grid container xp-block__grid ${i % 2 ? 'is-flipped' : ''}`}>
            <Figure media={m.image} ratio="4 / 3" className="xp-block__media" />
            <div className="xp-block__copy">
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
              <h2 id={`xp-${i}`} className="h2">
                {m.title}
              </h2>
              <p className="lead">{m.text}</p>
              <ul role="list" className="detail-list">
                {logisticsServices
                  .filter((l) => m.includes.includes(l.slug))
                  .map((l) => (
                    <li key={l.slug} id={l.slug}>
                      <strong>{l.name}</strong>
                      <span>{l.summary}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="page-block">
        <div className="container">
          <PendingNote>
            Condiciones, disponibilidad, cobertura geográfica y si cada servicio tiene costo adicional o está incluido en
            algún proceso.
          </PendingNote>
        </div>
      </section>

      <ContactCTA title="Planifiquemos tu proceso." text="Escríbenos y te contaremos qué servicios de acompañamiento pueden estar disponibles para tu caso." />
    </>
  );
}
