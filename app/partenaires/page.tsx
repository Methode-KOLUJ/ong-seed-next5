'use client';

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  Variants
} from "framer-motion";
import Marquee from "react-fast-marquee";
import { Dialog } from "@headlessui/react";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { GiSpinningBlades } from "react-icons/gi";
import Image from "next/image";
import GoogleAd from "@/components/GoogleAd";

interface Partenaire {
  id: string;
  name: string;
  image: string;
  website?: string;
  description?: string;
  color?: string;
}

const PartenaireScroller = () => {

   const fadeIn: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // États
  const [selectedPartenaire, setSelectedPartenaire] = useState<Partenaire | null>(null);
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  

  // Ref
  const ref = useRef<HTMLElement>(null);

  // Effets
  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch("https://ong-seed.onrender.com/api/partenaires");
        // const response = await fetch("http://localhost:5000/api/partenaires");
        const data: Partenaire[] = await response.json();
        const partenairesAvecCouleurs = data.map((p) => ({
          ...p,
          color: [
            "from-purple-600/70 to-indigo-700/70",
            "from-amber-600/70 to-orange-700/70",
            "from-emerald-600/70 to-teal-700/70",
            "from-rose-600/70 to-pink-700/70",
          ][Math.floor(Math.random() * 4)],
        }));
        setPartenaires(partenairesAvecCouleurs);
      } catch (error) {
        console.error("Erreur lors de la récupération des partenaires:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartenaires();
  }, []);

  // Animations
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-16 px-4 sm:px-6 lg:px-8 mx-auto overflow-hidden bg-gradient-to-b from-gray-950 to-black"
    >
      {/* Background optimisé avec Image */}
      <motion.div 
        className="absolute inset-0 opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3 }}
      >
        <Image
          src="/images/Bg.jpg"
          alt="Background"
          fill
          className="object-cover pointer-events-none select-none"
          priority
          quality={80}
          sizes="100vw"
        />
      </motion.div>

      <div className="relative z-10">
        <div className="mx-auto text-center mb-16">
           <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeIn}
                    viewport={{ once: false, margin: "-100px" }}
                    className="text-center mb-10"
                  >
                   <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: false }}
                      className="text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-500 uppercase"
                    >
                      Nos <span className="text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-300 uppercase">partenaires</span>
          
                    </motion.h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto" />
                  </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="text-lg md:text-xl lg:text-2xl text-gray-100 mx-auto leading-relaxed mt-6"
          >
            Voici les entreprises et particuliers qui permettent à l'ONG SEED de mener à bien sa mission humanitaire.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-5xl text-gray-500"
            >
              <GiSpinningBlades />
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.container}
            className="mx-auto px-4"
          >
            <div className="relative">
              <Marquee
                gradient={false}
                speed={40}
                pauseOnHover
                className="w-full py-4"
              >
                {partenaires.map((partenaire, index) => (
                  <motion.div
                    key={partenaire.id}
                    variants={animations.item}
                    custom={index}
                    className="mx-4 cursor-pointer flex-shrink-0"
                    onClick={() => setSelectedPartenaire(partenaire)}
                  >
                    <div className={`relative h-30 w-30 md:h-40 md:w-40 lg:w-45 lg:h-45 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}>
                      <div className="relative h-full w-full">
                        <Image
                          src={partenaire.image}
                          alt={partenaire.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 768px) 100px, 160px"
                        />
                        <div className={`absolute inset-0 opacity-80 flex flex-col items-center justify-end pb-8 px-6`}></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Marquee>
            </div>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedPartenaire && (
            <Dialog
              static
              open={true}
              onClose={() => setSelectedPartenaire(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0"
                onClick={() => setSelectedPartenaire(null)}
              />

              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className={`relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl bg-white`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`h-4 w-full bg-gradient-to-r ${selectedPartenaire.color}`} />
                <div className="p-8">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setSelectedPartenaire(null)}
                  >
                    <FaTimes className="h-8 w-8" />
                  </button>

                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-inner mb-4 w-32 h-32 relative">
                      <Image
                        src={selectedPartenaire.image}
                        alt={selectedPartenaire.name}
                        fill
                        className="object-contain"
                        sizes="128px"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 text-center">
                      {selectedPartenaire.name}
                    </h3>
                    {selectedPartenaire.website && (
                      <a
                        href={selectedPartenaire.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 mt-2 hover:underline"
                      >
                        Visiter le site <FaExternalLinkAlt className="ml-2" />
                      </a>
                    )}
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-gray-700 leading-relaxed text-center">
                      {selectedPartenaire.description ||
                        "Ce partenaire soutient activement notre mission."}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setSelectedPartenaire(null)}
                      className="px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
                <GoogleAd adSlot='8513366484'/>
      
    </section>
  );
};

export default PartenaireScroller;