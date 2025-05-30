import Slider from "@/components/Slider";
import AboutSection from "./about/page";
import PartenaireScroller from "./partenaires/page";
import Footer from "@/components/Footer";
import { Metadata } from 'next'
import { SEO } from '@/components/SEO'

export const metadata: Metadata = SEO({
  title: 'ONG SEED - Accueil', 
  description: 'Soyez le bienvenu sur la page d’accueil de l’ONG SEED, où nous travaillons pour améliorer la vie des enfants en difficulté.', 
})

export default function Home() {
  return (
    <main>
      <Slider />
      <AboutSection />
      <PartenaireScroller />
      <Footer />
    </main>
  );
}
