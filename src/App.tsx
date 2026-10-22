import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useReveal } from './hooks/useReveal';
import About from './pages/About';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Home from './pages/Home';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import Specialties from './pages/Specialties';
import SpecialtyDetail from './pages/SpecialtyDetail';

function Layout() {
  const { pathname, hash, search } = useLocation();
  useReveal(pathname + search);

  // Scroll al ancla o al inicio en cada navegación
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="especialidades" element={<Specialties />} />
        <Route path="especialidades/:slug" element={<SpecialtyDetail />} />
        <Route path="experiencia-del-paciente" element={<Experience />} />
        <Route path="nosotros" element={<About />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="legal/tratamiento-de-datos" element={<Legal doc="tratamiento-de-datos" />} />
        <Route path="legal/aviso-de-privacidad" element={<Legal doc="aviso-de-privacidad" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
