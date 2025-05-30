import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import JobOfferSection from '@/components/opportunites/Emploi';

export const metadata: Metadata = SEO({
  title: 'Opportunités d\'emploi',
  description: "Vous pouvez avoir un poste en tant que travailleur en permanence au sein de l'ONG SEED !"
});

export default function Page() {
  return (
    <>
      <JobOfferSection />
    </>
  );
}