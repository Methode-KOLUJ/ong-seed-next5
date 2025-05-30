import { Metadata } from 'next';
import {SEO} from '@/components/SEO'
import YoutubeLinks from '@/components/nos-chaines/page';


export const metadata: Metadata = SEO({
  title: 'Chaînes YouTube',
  description: "Découvrez les 4 chaînes grâces auxquelles nous diffusons nos contenus gratuitement.", 
});

export default function Page() {
  return (
    <>
      <YoutubeLinks />
    </>
  );
}