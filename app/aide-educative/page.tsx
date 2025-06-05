import { SEO } from "@/components/SEO";
import { Metadata } from "next";
import AideEducative from "@/components/services/aide-educative";


export const metadata: Metadata = SEO({
  title: 'Aides éducatives', 
  description: "L'ONG Sauvons l'Enfance en Difficulté (SEED) aide les enfants à poursuivre leurs cursus scolaires."
})


export default function AideEducativePage() {
  return <AideEducative />;
}
