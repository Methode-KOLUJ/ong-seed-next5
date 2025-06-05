"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GoogleAd from "@/components/GoogleAd";

// Tableau d'images
const images = [
  {
    url: "https://images.radio-canada.ca/q_auto,w_1250/v1/ici-info/16x9/aines-soins-longue-duree.png",
    alt: "Soins longue durée",
  },
  {
    url: "https://img.freepik.com/photos-gratuite/travailleur-social-masculin-prenant-soin-vieille-femme_23-2149031318.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Aide à domicile",
  },
  {
    url: "https://img.freepik.com/photos-gratuite/personne-beneficiant-massage-du-cuir-chevelu-au-spa_23-2151454785.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Maison de retraite",
  },
];

export default function AideAuxAines() {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((index + 1) % images.length);
  const handlePrev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-br from-gray-950 to-black text-white text-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-500 mt-8 sm:mt-10 uppercase tracking-wider"
      >
        aide <span className="text-gray-300 font-extrabold">aux ainés</span>
      </motion.h2>

      <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto rounded-full mb-8 sm:mb-10" />

      {/* CARROUSEL */}
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
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-600" />
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-4xl md:max-w-5xl lg:max-w-6xl text-base sm:text-xl md:text-2xl lg:text-3xl text-center md:text-justify text-gray-300 mt-8 sm:mb-12 px-4 leading-relaxed sm:leading-loose"
      >
        L'organisation Sauvons l'Enfance en Difficulté (SEED) offre des services et programmes d'aide aux personnes âgées en leur offrant des services d'appui à domicile, en les aidant à se déplacer et en organisant des activités de relaxation ou d'animation pour leur bien-être et santé.
      </motion.p>

      <GoogleAd adSlot="8513366484" />
    </section>
  );
}
