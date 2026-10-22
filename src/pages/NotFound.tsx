import { Button } from '../components/Button';
import { PageIntro } from '../components/PageIntro';
import { ctaLabels } from '../content/site';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({ title: 'Página no encontrada' });
  return (
    <PageIntro
      title={
        <>
          Esta página <em>no</em> existe.
        </>
      }
      lead={
        <>
          <p className="lead">Es posible que el enlace haya cambiado. Puedes volver al inicio o explorar las especialidades.</p>
          <div className="notfound-actions">
            <Button to="/" arrow>
              Volver al inicio
            </Button>
            <Button to="/especialidades" variant="secondary">
              {ctaLabels.secondary}
            </Button>
          </div>
        </>
      }
    />
  );
}
