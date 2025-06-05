import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import ContactForm from '@/components/opportunites/postuler';

export const metadata: Metadata = SEO({
  title: 'Candidature',
  description: "Vous pouvez postuler en ligne pour rejoindre notre mission en tant que partenaire, donateur ou bénévole.",
});


export default function Page() {
  return (
    <>
      <ContactForm />
    </>
  );
}