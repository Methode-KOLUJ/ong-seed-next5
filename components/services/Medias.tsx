"use client";

import React from "react";
import Image from "next/image";
import GoogleAd from "@/components/GoogleAd";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const images = [
  {
    url: "https://img.freepik.com/psd-gratuit/icone-3d-pour-application-medias-sociaux_23-2150049567.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Soins longue durée",
  },
  {
    url: "https://img.freepik.com/vecteurs-premium/icone-facebook_488108-2.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Aide à domicile",
  },
  {
    url: "https://img.freepik.com/psd-gratuit/icone-3d-pour-application-medias-sociaux_23-2150049581.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Maison de retraite",
  },
   {
    url: "https://img.freepik.com/vecteurs-premium/x-nouveau-reseau-social-icone-application-noire-twitter-rebaptise-x-logo-twitter-ete-change_277909-568.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Maison de retraite",
  },
   {
    url: "https://img.freepik.com/photos-premium/icone-tiktok-isole-fond-blanc_75891-1159.jpg?uid=R200764655&ga=GA1.1.897716781.1747638220&semt=ais_hybrid&w=740",
    alt: "Maison de retraite",
  },
];

export default function Medias() {

const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((index + 1) % images.length);
  const handlePrev = () => setIndex((index - 1 + images.length) % images.length);

  // URL d'une image thématique libre de droits (remplacez par votre URL préférée)
  const educationImageUrl = "";

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3, duration: 0.7 },
    },
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
        Services <span className="text-gray-300 font-extrabold">médiatiques</span>
      </motion.h2>

      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto rounded-full mb-8 sm:mb-10"
      />

        <div className="relative w-full max-w-xl aspect-square mb-10 rounded-lg overflow-hidden shadow-2xl">
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
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="text-center md:text-justify max-w-4xl md:max-w-5xl lg:max-w-6xl text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 mt-4 sm:mb-12 px-4 leading-relaxed sm:leading-loose"
      >
       L'organisme à but non lucratif Sauvons l'Enfance en Difficulté (SEED) offre des services de média gratuits et payants afin de vendre ses contenus de médias sociaux promotionnels et pertinents en vue de générer des revenus et accroître la visibilité de sa marque.
      </motion.p>
      
      <GoogleAd adSlot="8513366484" />
    </section>
  );
}