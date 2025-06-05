import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import NosProjets from '@/components/mission/nos-projets';

export const metadata: Metadata = SEO({
  title: 'Nos projets',
  description: "Découvrez les projets de l'ONG SEED dans sa mission d'aide aux enfants en situation de vulnérabilité.",
});

export default function Page() {
  return (
    <>
      <NosProjets />
    </>
  );
}