import { SEO } from "@/components/SEO";
import { Metadata } from "next";
import AideAuxAines from "@/components/services/aide-aux-ainés";

export const metadata: Metadata = SEO({
  title: 'Aides aux ainés', 
  description: "L'ONG Sauvons l'Enfance en Difficulté (SEED) aide les personnes âgées en leur fournissant des aides de base."
})


export default function AideEducativePage() {
  return <AideAuxAines />;
}
