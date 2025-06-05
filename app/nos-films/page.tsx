import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import NosFilms from '@/components/nos-films/films';

export const metadata: Metadata = SEO({
  title: 'Nos Films',
  description: "Découvrez les films produits par l'ONG SEED pour vous divertir et vous sensibliser sur des sujets divers et variés.",
});
 
 const Films = () => {
  return <NosFilms />;
}

export default Films