import Slider from "@/components/Slider";
import AboutSection from "./about/page";
import PartenaireScroller from "./partenaires/page";
import Footer from "@/components/Footer";

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
