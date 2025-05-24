"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Networks from "@/components/Networks";
import { FaBook, FaUserGraduate, FaChild } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import React from "react";
import GoogleAd from "@/components/GoogleAd";

// Types
type ValueItem = {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
};

// Variants d’animation
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function NotreVision() {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const valeurs: ValueItem[] = [
    {
      id: 1,
      title: "Les capacités des enfants en difficulté",
      icon: <FaChild className="text-white text-6xl mb-4" />,
      description: `Nous nous engageons à révéler le potentiel unique de chaque enfant en difficulté. Notre mission : les accompagner avec détermination vers l'autonomie et l'épanouissement, sans compromis.`,
      color: "from-purple-600/70 to-indigo-700/70",
    },
    {
      id: 2,
      title: "Le développement des talents",
      icon: <FaUserGraduate className="text-white text-6xl mb-4" />,
      description: `Nous identifions et cultivons les talents de chaque enfant, quels que soient leurs défis physiques ou cognitifs. Notre conviction : toutes les différences cachent des capacités extraordinaires à faire grandir.`,
      color: "from-amber-600/70 to-orange-700/70",
    },
    {
      id: 3,
      title: "Les valeurs",
      icon: <FaStar className="text-white text-6xl mb-4" />,
      description: `Nous nous engageons à accompagner les enfants avec amour et sans discrimination, comme s’ils étaient nos propres enfants. Nous encourageons aussi les valeurs et le sens du devoir en eux.`,
      color: "from-emerald-600/70 to-teal-700/70",
    },
    {
      id: 4,
      title: "L'éducation",
      icon: <FaBook className="text-white text-6xl mb-4" />,
      description: `L'Organisation non gouvernementale Sauvons l'Enfance en Difficulté (ONG SEED) vise à promouvoir l'éducation intégrale des enfants en difficulté en les accompagnant grâce à des moyens matériels et financiers.`,
      color: "from-rose-600/70 to-pink-700/70",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto min-h-screen bg-gradient-to-br from-gray-950 to-black">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-500 mt-10 uppercase"
        >
          Notre <span className="text-gray-300 font-extrabold">vision</span>
        </motion.h2>

        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto" />

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-100 mx-auto leading-relaxed mt-6 lg:mt-10"
        >
          L'Organisation non Gouvernementale Sauvons l'Enfance en Difficulté (ONG SEED) vise à promouvoir :
        </motion.p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {valeurs.map((valeur) => (
          <motion.div
            key={valeur.id}
            variants={cardVariants}
            className="relative group"
            onMouseEnter={() => setHoveredValue(valeur.id)}
            onMouseLeave={() => setHoveredValue(null)}
          >
            <div
              className={`relative h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 bg-gradient-to-t ${valeur.color} flex flex-col items-center justify-center`}
              onClick={() => setActiveValue(activeValue === valeur.id ? null : valeur.id)}
            >
              {valeur.icon}
              <h3 className="text-white text-2xl font-bold text-center mb-3 px-4">
                {valeur.title}
              </h3>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: hoveredValue === valeur.id ? "80%" : "40%" }}
                className="h-1 bg-white rounded-full"
              />
            </div>

            <AnimatePresence>
              {activeValue === valeur.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
                  onClick={() => setActiveValue(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    className={`relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl bg-white`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={`h-4 w-full bg-gradient-to-r ${valeur.color}`} />
                    
                    <div className="p-8">
                      <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setActiveValue(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <h3 className="text-3xl font-bold mb-4 text-gray-800 text-center">{valeur.title}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed text-center">{valeur.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <Networks />
          <GoogleAd adSlot='8513366484'/>
      {/* Légende animée en bas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto mt-16 text-center"
      >
        <p className="text-gray-500 italic">
          Cliquez sur une image pour en savoir plus
        </p>
        <div className="mt-4 flex justify-center">
          {valeurs.map((valeur) => (
            <motion.div
              key={valeur.id}
              animate={{
                scale: hoveredValue === valeur.id ? 1.2 : 1,
              }}
              className="w-3 h-3 mx-1 rounded-full bg-gray-400"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
