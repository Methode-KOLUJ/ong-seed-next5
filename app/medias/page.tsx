import { SEO } from "@/components/SEO";
import { Metadata } from "next";
import Medias from "@/components/services/Medias";


export const metadata: Metadata = SEO({
  title: 'Médias', 
  description: "L'ONG Sauvons l'Enfance en Difficulté (SEED) aide les enfants atteints d'anomalie à s'en sortir sur différents plans de leur vie."
})


export default function Media() {
  return <Medias />;
}
