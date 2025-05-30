import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import Resultats from '@/components/mission/resultats';

export const metadata: Metadata = SEO({
  title: 'Résultats escomptés',
  description: "Découvrez les résultats escomptés de l'ONG SEED dans sa mission d'aide aux enfants en situation de vulnérabilité.",
});

export default function Page() {
  return (
    <>
      <Resultats />
    </>
  );
}