import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import Don from '@/components/faites-un-don/don';

export const metadata: Metadata = SEO({
  title: 'Faites un D💖n',
  description: "Faites un don à l'ONG SEED pour faire avancer sa mission, celle de venir à l'aide aux enfants en situation de vulnérabilité."
});

export default function Page() {
  return (
      <Don />
  );
}
