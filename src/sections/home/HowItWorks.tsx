import type { CSSProperties } from 'react';
import { Button } from '../../components/Button';
import { ProcessStep } from '../../components/ProcessStep';
import { ctaLabels } from '../../content/site';
import './HowItWorks.css';

const steps = [
  {
    title: 'Cuéntanos qué necesitas',
    text: 'Indica el servicio que te interesa o, si aún no lo tienes claro, describe brevemente lo que buscas.',
  },
  {
    title: 'Solicita información o una valoración',
    text: 'Envía tu solicitud a través del formulario o de los canales oficiales de Victoria.',
  },
  {
    title: 'Recibe orientación',
    text: 'El equipo te contactará para orientarte sobre los siguientes pasos y las opciones disponibles.',
  },
];

export function HowItWorks() {
  return (
    <section className="how section" aria-labelledby="how-title">
      <div className="how__grid container">
        <div className="how__head">
          <p className="label how__eyebrow" data-reveal>
            <span className="index-num">05</span> Cómo empezar
          </p>
          <h2 id="how-title" className="h2" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
            Tres pasos para <em>dar el primero.</em>
          </h2>
        </div>
        <ol className="how__steps" role="list">
          {steps.map((s, i) => (
            <ProcessStep key={s.title} index={i} {...s} />
          ))}
        </ol>
        <div className="how__foot" data-reveal>
          <p className="small">
            Esta guía describe cómo iniciar el contacto. No sustituye un protocolo clínico ni las indicaciones de un
            profesional de la salud.
          </p>
          <Button to="/contacto#valoracion" arrow>
            {ctaLabels.primary}
          </Button>
        </div>
      </div>
    </section>
  );
}
