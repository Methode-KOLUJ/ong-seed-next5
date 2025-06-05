import { SEO } from "@/components/SEO";
import { Metadata } from "next";
import Histoire from "@/components/history/notre-histoire";

export const metadata: Metadata = SEO({
  title: 'Notre Histoire',
  description: "Découvrez l'histoire de l'ONG SEED, son engagement et sa mission pour les enfants en difficulté.",
});

export default function NotreHistoirePage() {
  return <Histoire />;
}