import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import NotreVision from '@/components/mission/notre-vision';

export const metadata: Metadata = SEO({
  title: 'Notre vision',
  description: "Découvrez la vision qui guide l'ONG SEED dans sa mission d'aide aux enfants en situation de vulnérabilité.",
});

export default function Page() {
  return (
    <>
      <NotreVision />
    </>
  );
}