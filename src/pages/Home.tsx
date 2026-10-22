import { ContactCTA } from '../components/ContactCTA';
import { usePageMeta } from '../hooks/usePageMeta';
import { BrandIntro } from '../sections/home/BrandIntro';
import { EditorialHero } from '../sections/home/EditorialHero';
import { FeaturedService } from '../sections/home/FeaturedService';
import { HowItWorks } from '../sections/home/HowItWorks';
import { PatientExperience } from '../sections/home/PatientExperience';
import { SpecialtyExplorer } from '../sections/home/SpecialtyExplorer';
import { TrustTeam } from '../sections/home/TrustTeam';

export default function Home() {
  usePageMeta({ path: '/' });
  return (
    <>
      <EditorialHero />
      <BrandIntro />
      <SpecialtyExplorer />
      <FeaturedService />
      <PatientExperience />
      <HowItWorks />
      <TrustTeam />
      <ContactCTA />
    </>
  );
}
