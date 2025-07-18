"use client";

import React from "react";
import Image from "next/image";
import GoogleAd from "@/components/GoogleAd";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const images = [
  {
    url: "https://img.freepik.com/photos-gratuite/maman-aidant-son-enfant-coiffer-cheveux-afro_23-2149625727.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Soins longue durée",
  },
  {
    url: "https://img.freepik.com/photos-premium/bouleverse-petit-enfant-noir-qui-pleure-lors-seance-psychotherapie_116547-17149.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Aide à domicile",
  },
  {
    url: "https://img.freepik.com/photos-premium/mere-afro-americaine-appliquant-ecran-solaire-nez-son-fils-plage-contre-ciel-clair-espace-copie-inaltere-famille-ensemble-protection-soin-peau-nature-vacances-plaisir-ete_13339-311150.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Maison de retraite",
  },
];

export default function AideDeSoutien() {

const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((index + 1) % images.length);
  const handlePrev = () => setIndex((index - 1 + images.length) % images.length);

  // URL d'une image thématique libre de droits (remplacez par votre URL préférée)

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.7 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.7 } },
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-br from-gray-950 to-black text-white text-center overflow-hidden">
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-500 mt-8 sm:mt-10 uppercase tracking-wider"
      >
        aide <span className="text-gray-300 font-extrabold">de soutien</span>
      </motion.h2>

      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto rounded-full mb-8 sm:mb-10"
      />

        <div className="relative w-full max-w-3xl aspect-video mb-10 rounded-2xl overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index].url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index].url}
              alt={images[index].alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-600" />
          </motion.div>
        </AnimatePresence>

        {/* Boutons navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 p-2 rounded-full"
        >
          ⬅
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 p-2 rounded-full"
        >
          ➡
        </button>
      </div>

      <motion.p
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl md:max-w-5xl lg:max-w-6xl text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 px-4 leading-relaxed sm:leading-loose"
      >
        L'organisme à but non lucratif Sauvons l'Enfance en Difficulté (SEED) offre son service de soutien ponctuel à 1 enfant en difficulté atteint d'une anomalie pour l'aider à trouver une solution à ses problèmes immédiats ou à se libérer de ses émotions pénibles.
      </motion.p>
      
      <GoogleAd adSlot="8513366484" />
      
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl bg-white/90 text-gray-900 rounded-2xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 text-center backdrop-blur-sm"
      >
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-loose">
          Notre approche vise à apporter un soutien personnalisé et bienveillant, en mettant l'accent sur le bien-être émotionnel et mental de l'enfant.
        </p>
      </motion.div>
    </section>
  );
}