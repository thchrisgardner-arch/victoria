import { Link } from 'react-router-dom';
import { MixedTitle } from '../components/MixedTitle';
import { PageIntro } from '../components/PageIntro';
import { PendingNote } from '../components/Pending';
import { usePageMeta } from '../hooks/usePageMeta';

const docs = {
  'tratamiento-de-datos': {
    title: 'Política de tratamiento de datos personales',
    note: 'Texto oficial de la política de tratamiento de datos de Victoria, conforme a la Ley 1581 de 2012 y sus decretos reglamentarios. Debe ser provisto y aprobado por Victoria.',
  },
  'aviso-de-privacidad': {
    title: 'Aviso de privacidad',
    note: 'Aviso de privacidad oficial de Victoria: responsable del tratamiento, finalidades, derechos del titular y canales de atención.',
  },
} as const;

export type LegalDoc = keyof typeof docs;

export default function Legal({ doc }: { doc: LegalDoc }) {
  const d = docs[doc];
  usePageMeta({ title: d.title, path: `/legal/${doc}` });
  return (
    <>
      <PageIntro crumbs={[{ label: d.title }]} title={<MixedTitle text={d.title} />} />
      <section className="page-block">
        <div className="page-block__grid container">
          <div className="page-block__content">
            <PendingNote>{d.note}</PendingNote>
            <p className="body">
              Si tienes preguntas sobre el uso de tus datos, escríbenos desde la página de{' '}
              <Link to="/contacto" className="text-link">
                contacto
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
