import type { CSSProperties } from 'react';
import { Button } from '../../components/Button';
import { PatientExperienceCard } from '../../components/PatientExperienceCard';
import { experienceModules, logisticsDisclaimer } from '../../content/logistics';
import './PatientExperience.css';

export function PatientExperience() {
  return (
    <section className="px section" aria-labelledby="px-title">
      <div className="container">
        <div className="px__head">
          <p className="label px__eyebrow" data-reveal>
            <span className="index-num">04</span> Experiencia del paciente
          </p>
          <h2 id="px-title" className="h2 px__title" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
            Te acompañamos <em>más allá de la consulta.</em>
          </h2>
          <div className="px__intro" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
            <p className="body">
              Además de la atención médica, Victoria ofrece servicios logísticos que pueden complementar tu proceso y
              hacerlo más cómodo y organizado.
            </p>
            <Button to="/experiencia-del-paciente" variant="secondary" arrow>
              Conocer la experiencia
            </Button>
          </div>
        </div>

        <div className="px__cards" role="region" aria-label="Servicios de acompañamiento" tabIndex={0}>
          {experienceModules.map((m, i) => (
            <PatientExperienceCard key={m.title} module={m} index={i} />
          ))}
        </div>

        <p className="px__note small">{logisticsDisclaimer}</p>
      </div>
    </section>
  );
}
