import { SEO } from "@/components/SEO";
import { Metadata } from "next";
import SanteMentale from "@/components/services/sante-mentale";


export const metadata: Metadata = SEO({
  title: 'Santé mentale', 
  description: "L'ONG Sauvons l'Enfance en Difficulté (SEED) aide les enfants atteints d'anomalie en contribuant à leur santé mentale."
})


export default function santeMentale() {
  return <SanteMentale />;
}
