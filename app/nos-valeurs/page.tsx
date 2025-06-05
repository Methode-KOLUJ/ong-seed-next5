import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import NosValeurs from '@/components/mission/nos-valeurs';

export const metadata: Metadata = SEO({
  title: 'Nos valeurs',
  description: "Découvrez les valeurs qui guident l'ONG SEED dans sa mission d'aide aux enfants en situation de vulnérabilité.",
});

export default function Page() {
  return (
    <>
      <NosValeurs />
    </>
  );
}