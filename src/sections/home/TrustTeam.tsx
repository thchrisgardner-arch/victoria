import type { CSSProperties } from 'react';
import { Figure } from '../../components/Figure';
import { PendingNote, showPending } from '../../components/Pending';
import { media } from '../../content/media';
import { credentials, team } from '../../content/team';
import { getSpecialty } from '../../content/specialties';
import './TrustTeam.css';

const slotFields = ['Nombre', 'Especialidad', 'Registro profesional'];

/**
 * Sección de confianza preparada para contenido verificado. Sin datos reales
 * y fuera del modo de revisión, la sección no se muestra.
 */
export function TrustTeam() {
  const hasTeam = team.length > 0;
  if (!hasTeam && credentials.length === 0 && !showPending) return null;

  return (
    <section className="trust section" aria-labelledby="trust-title">
      <div className="trust__grid container">
        <div className="trust__head">
          <p className="label trust__eyebrow" data-reveal>
            <span className="index-num">06</span> Confianza
          </p>
          <h2 id="trust-title" className="h2" data-reveal style={{ '--reveal-i': 1 } as CSSProperties}>
            Personas reales, <em>información verificable.</em>
          </h2>
          <p className="body" data-reveal style={{ '--reveal-i': 2 } as CSSProperties}>
            Conocer a quién te atiende es parte de una decisión tranquila. Este espacio presenta a los profesionales, sus
            credenciales y las instalaciones de Victoria.
          </p>
        </div>

        <ul className="trust__team" role="list">
          {hasTeam
            ? team.map((m, i) => (
                <li key={m.name} className="trust__member" data-reveal style={{ '--reveal-i': i } as CSSProperties}>
                  {m.photo && <Figure media={m.photo} ratio="4 / 5" reveal={false} />}
                  <h3 className="h3">{m.name}</h3>
                  <p className="small">{m.role}</p>
                  <p className="small">{m.specialties.map((s) => getSpecialty(s)?.name).filter(Boolean).join(' · ')}</p>
                  {m.registry && <p className="small">Registro: {m.registry}</p>}
                </li>
              ))
            : [0, 1, 2].map((i) => (
                <li key={i} className="trust__slot" data-reveal style={{ '--reveal-i': i } as CSSProperties}>
                  <div className="trust__slot-photo" aria-hidden="true" />
                  <p className="label">Perfil profesional</p>
                  <dl>
                    {slotFields.map((f) => (
                      <div key={f}>
                        <dt>{f}</dt>
                        <dd aria-label="pendiente">—</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
        </ul>

        <div className="trust__facilities">
          <Figure media={media.facilities} ratio="21 / 9" />
        </div>

        <div className="trust__creds" data-reveal>
          <p className="label">Credenciales e información institucional</p>
          {credentials.length > 0 ? (
            <ul role="list">
              {credentials.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong> · {c.issuer}
                  {c.year && ` · ${c.year}`}
                </li>
              ))}
            </ul>
          ) : (
            <PendingNote>
              Equipo médico, registros profesionales, habilitaciones y fotografías de instalaciones. Se publicarán solo
              datos verificados y autorizados.
            </PendingNote>
          )}
        </div>
      </div>
    </section>
  );
}
