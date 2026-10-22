import { useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { specialties } from '../content/specialties';
import { logisticsServices } from '../content/logistics';
import { ctaLabels } from '../content/site';
import { Button } from './Button';
import './ContactForm.css';

/**
 * Formulario de solicitud de valoración.
 *
 * INTEGRACIÓN PENDIENTE: define VITE_CONTACT_ENDPOINT (URL que acepte POST JSON)
 * para activar el envío. Sin endpoint, el formulario valida pero informa con
 * claridad que el envío en línea no está activo: nunca simula un éxito.
 */
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type Fields = { name: string; contact: string; service: string; message: string; consent: boolean; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error' | 'unavailable';

const empty: Fields = { name: '', contact: '', service: '', message: '', consent: false, website: '' };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^\+?[\d\s()-]{7,20}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Escribe tu nombre.';
  const c = f.contact.trim();
  if (!c) e.contact = 'Necesitamos un correo electrónico o un teléfono para responderte.';
  else if (!emailRe.test(c) && !phoneRe.test(c)) e.contact = 'Revisa el formato: por ejemplo, nombre@correo.com o +57 300 000 0000.';
  if (!f.service) e.service = 'Selecciona un servicio o la opción “Aún no lo sé”.';
  if (f.message.length > 600) e.message = 'El mensaje puede tener como máximo 600 caracteres.';
  if (!f.consent) e.consent = 'Para enviar la solicitud debes aceptar la política de tratamiento de datos.';
  return e;
}

export function ContactForm({ defaultService = '' }: { defaultService?: string }) {
  const [fields, setFields] = useState<Fields>({ ...empty, service: defaultService });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    const firstInvalid = Object.keys(e)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    if (fields.website) return; // honeypot anti-spam

    if (!endpoint) {
      setStatus('unavailable');
      statusRef.current?.focus();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          contact: fields.contact.trim(),
          service: fields.service,
          message: fields.message.trim(),
          consent: fields.consent,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      setFields({ ...empty });
    } catch {
      setStatus('error');
    }
    statusRef.current?.focus();
  }

  const describe = (k: keyof Fields, hint?: string) =>
    [hint && id(`${k}-hint`), errors[k] && id(`${k}-err`)].filter(Boolean).join(' ') || undefined;

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p className="field__error" id={id(`${k}-err`)}>
        <span aria-hidden="true">— </span>
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} className="contact-form" noValidate onSubmit={onSubmit} aria-describedby={id('intro')}>
      <p id={id('intro')} className="small">
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisco</span> son obligatorios. No incluyas información médica detallada
        en este primer contacto.
      </p>

      <div className={`field ${errors.name ? 'has-error' : ''}`}>
        <label htmlFor={id('name')}>Nombre *</label>
        <input
          id={id('name')}
          name="name"
          autoComplete="name"
          value={fields.name}
          onChange={(e) => set('name', e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={describe('name')}
          required
        />
        {err('name')}
      </div>

      <div className={`field ${errors.contact ? 'has-error' : ''}`}>
        <label htmlFor={id('contact')}>Correo electrónico o teléfono *</label>
        <input
          id={id('contact')}
          name="contact"
          autoComplete="email"
          inputMode="email"
          value={fields.contact}
          onChange={(e) => set('contact', e.target.value)}
          aria-invalid={!!errors.contact}
          aria-describedby={describe('contact', 'hint')}
          required
        />
        <p className="field__hint" id={id('contact-hint')}>
          Te responderemos por el medio que indiques.
        </p>
        {err('contact')}
      </div>

      <div className={`field ${errors.service ? 'has-error' : ''}`}>
        <label htmlFor={id('service')}>Servicio de interés *</label>
        <div className="field__select">
          <select
            id={id('service')}
            name="service"
            value={fields.service}
            onChange={(e) => set('service', e.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={describe('service')}
            required
          >
            <option value="">Selecciona una opción</option>
            <optgroup label="Especialidades médicas">
              {specialties.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Experiencia del paciente">
              {logisticsServices.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.name}
                </option>
              ))}
            </optgroup>
            <option value="no-se">Aún no lo sé</option>
          </select>
        </div>
        {err('service')}
      </div>

      <div className={`field ${errors.message ? 'has-error' : ''}`}>
        <label htmlFor={id('message')}>
          Mensaje <span className="field__optional">(opcional)</span>
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={4}
          maxLength={600}
          value={fields.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={describe('message', 'hint')}
        />
        <p className="field__hint" id={id('message-hint')}>
          Cuéntanos brevemente qué te interesa. {fields.message.length}/600
        </p>
        {err('message')}
      </div>

      <div className="field--honeypot" aria-hidden="true">
        <label htmlFor={id('website')}>No completar</label>
        <input id={id('website')} name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(e) => set('website', e.target.value)} />
      </div>

      <div className={`field field--check ${errors.consent ? 'has-error' : ''}`}>
        <input
          type="checkbox"
          id={id('consent')}
          name="consent"
          checked={fields.consent}
          onChange={(e) => set('consent', e.target.checked)}
          aria-invalid={!!errors.consent}
          aria-describedby={describe('consent')}
        />
        <label htmlFor={id('consent')}>
          Autorizo el tratamiento de mis datos personales según la{' '}
          <Link to="/legal/tratamiento-de-datos" target="_blank">
            política de tratamiento de datos
            <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
          </Link>
          . *
        </label>
        {err('consent')}
      </div>

      <div className="contact-form__submit">
        <Button type="submit" disabled={status === 'sending'} arrow={status !== 'sending'}>
          {status === 'sending' ? 'Enviando…' : ctaLabels.primary}
        </Button>
      </div>

      <div ref={statusRef} tabIndex={-1} className={`form-status form-status--${status}`} role="status" aria-live="polite">
        {status === 'success' && (
          <p>
            <strong>Solicitud enviada.</strong> Gracias por escribirnos; el equipo de Victoria se pondrá en contacto
            contigo por el medio que indicaste.
          </p>
        )}
        {status === 'error' && (
          <p>
            <strong>No pudimos enviar tu solicitud.</strong> Revisa tu conexión e inténtalo de nuevo en unos minutos.
          </p>
        )}
        {status === 'unavailable' && (
          <p>
            <strong>Tu solicitud no se ha enviado.</strong> El envío en línea aún no está activo en esta versión del
            sitio. Mientras tanto, utiliza los canales oficiales de contacto.
          </p>
        )}
      </div>
    </form>
  );
}
