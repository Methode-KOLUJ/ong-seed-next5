"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GoogleAd from "@/components/GoogleAd";

export default function HeroSection() {
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
        aide <span className="text-gray-300 font-extrabold">éducative</span>
      </motion.h2>

      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto rounded-full mb-8 sm:mb-10"
      />

      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl aspect-video relative mb-8 sm:mb-10 rounded-2xl overflow-hidden shadow-xl"
      >
        <Image
          src="/Services/Education.png"
          alt="Aide éducative pour enfants en difficulté"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-600" />
      </motion.div>

      <motion.p
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl md:max-w-5xl lg:max-w-6xl text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 px-4 leading-relaxed sm:leading-loose"
      >
        L'organisme à but non lucratif Sauvons l'Enfance en Difficulté (SEED)
        offre un service d'aide éducative qui vise à aider un enfant en
        difficulté atteint d'une anomalie à trouver des solutions aux
        difficultés qu'il traverse dans le présent, avant d'améliorer sa qualité
        de vie et son bien-être.
      </motion.p>
      <GoogleAd adSlot="8513366484" />
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl bg-white/90 text-gray-900 rounded-2xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 text-center backdrop-blur-sm"
      >
        <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose">
          Le travail de terrain de l'organisation non gouvernementale Sauvons
          l'Enfance en Difficulté (SEED) se centre sur « ici et maintenant » en
          utilisant son approche cognitivo-comportementale.
        </p>
      </motion.div>
    </section>
  );
}
