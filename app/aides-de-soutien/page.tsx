import { SEO } from "@/components/SEO";
import { Metadata } from "next";
import AideDeSoutien from "@/components/services/aides-de-soutien";


export const metadata: Metadata = SEO({
  title: 'Aides de soutien', 
  description: "L'ONG Sauvons l'Enfance en Difficulté (SEED) aide les enfants atteints d'anomalie à s'en sortir sur différents plans de leur vie."
})


export default function AideSoutien() {
  return <AideDeSoutien />;
}
