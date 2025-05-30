"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Networks from "@/components/Networks";
import {
  FaUserTie,
  FaComments,
  FaHandsHelping,
  FaGraduationCap,
  FaTimes,
} from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import React from "react";
import GoogleAd from "@/components/GoogleAd";

type ValueItem = {
  id: number;
  title: string;
  icon: (isModal?: boolean) => React.ReactNode;
  description: string;
  color: {
    from: string;
    to: string;
  };
};

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

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  hidden: { scale: 0.9, y: 50 },
  visible: { scale: 1, y: 0 },
  exit: { scale: 0.9, y: 50 },
};

export default function Resultats() {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const valeurs: ValueItem[] = [
    {
      id: 1,
      title: "Rehaussement de l'estime de soi",
      icon: (isModal = false) => (
        <IoMdHeart
          className={`size-[3.75rem] ${
            isModal ? "text-gray-800" : "text-white mb-4"
          }`}
        />
      ),
      description:
        "Nous visons à renforcer l'estime de soi des enfants en difficulté atteint d'une anomalie.",
      color: {
        from: "from-pink-600/70",
        to: "to-rose-700/70",
      },
    },
    {
      id: 2,
      title: "Développement de l'autonomie",
      icon: (isModal = false) => (
        <FaUserTie
          className={`size-[3.75rem] ${
            isModal ? "text-gray-800" : "text-white mb-4"
          }`}
        />
      ),
      description:
        "Permettre aux enfants en difficultés atteint d'une anomalie physique et/ou mentale de gagner en indépendance.",
      color: {
        from: "from-blue-600/70",
        to: "to-indigo-700/70",
      },
    },
    {
      id: 3,
      title: "Amélioration de la communication",
      icon: (isModal = false) => (
        <FaComments
          className={`size-[3.75rem] ${
            isModal ? "text-gray-800" : "text-white mb-4"
          }`}
        />
      ),
      description:
        "Construction d'une école d'enseignement personnalisé, lancement d'un centre hospitalier, centre agro-éducatif et centre de formation des jeunes en difficulté atteints d'une anomalie.",
      color: {
        from: "from-teal-600/70",
        to: "to-emerald-700/70",
      },
    },
    {
      id: 4,
      title: "Intégration sociale et professionnelle",
      icon: (isModal = false) => (
        <FaHandsHelping
          className={`size-[3.75rem] ${
            isModal ? "text-gray-800" : "text-white mb-4"
          }`}
        />
      ),
      description:
        "Au sein de l'ONG SEED, nous visons à favoriser l'inclusion des enfants en milieu social, scolaire et professionnel.",
      color: {
        from: "from-purple-600/70",
        to: "to-violet-700/70",
      },
    },
    {
      id: 5,
      title: "Réussite scolaire et professionnelle",
      icon: (isModal = false) => (
        <FaGraduationCap
          className={`size-[3.75rem] ${
            isModal ? "text-gray-800" : "text-white mb-4"
          }`}
        />
      ),
      description:
        "Dans l'Organisation non Gouvernementale Sauvons l'Enfance en Difficulté, nous encourageons la réussite professionnelle, scolaire et professionnelle.",
      color: {
        from: "from-amber-600/70",
        to: "to-orange-700/70",
      },
    },
  ];

  return (
    <section className="mx-auto min-h-screen bg-gradient-to-br from-gray-950 to-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-500 mt-10 uppercase"
        >
          résultats{" "}
          <span className="text-gray-300 font-extrabold">escomptés</span>
        </motion.h2>

        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto" />

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 text-lg leading-relaxed text-gray-100 md:text-xl lg:mt-10 lg:text-2xl"
        >
          L'organisation non gouvernementale Sauvons l'Enfance en Difficulté
          (SEED) divise son projet social en trois axes majeurs pour répondre
          aux défis sociaux et éducatifs en République Démocratique du Congo
        </motion.p>
      </div>

      <motion.div
        className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {valeurs.map((valeur) => (
          <motion.div
            key={valeur.id}
            variants={cardVariants}
            className="group relative"
            onMouseEnter={() => setHoveredValue(valeur.id)}
            onMouseLeave={() => setHoveredValue(null)}
          >
            <div
              className={`relative flex h-90 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-t shadow-xl transition-all duration-300 ${valeur.color.from} ${valeur.color.to}`}
              onClick={() =>
                setActiveValue(activeValue === valeur.id ? null : valeur.id)
              }
            >
              {valeur.icon()}
              <h3 className="mb-3 px-4 text-center text-2xl font-bold text-white">
                {valeur.title}
              </h3>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: hoveredValue === valeur.id ? "80%" : "40%" }}
                className="h-1 rounded-full bg-white"
              />
            </div>

            <AnimatePresence>
              {activeValue === valeur.id && (
                <motion.div
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/100 p-4"
                  onClick={() => setActiveValue(null)}
                >
                  <motion.div
                    variants={contentVariants}
                    className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className={`h-4 w-full bg-gradient-to-r ${valeur.color.from} ${valeur.color.to}`}
                    />
                    <div className="p-8">
                      <button
                        className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
                        onClick={() => setActiveValue(null)}
                      >
                        <FaTimes className="size-8" />
                      </button>
                      <div className="mb-4 flex justify-center">
                        {valeur.icon(true)}
                      </div>
                      <h3 className="mb-4 text-center text-3xl font-bold text-gray-800">
                        {valeur.title}
                      </h3>
                      <p className="text-center text-lg leading-relaxed text-gray-700">
                        {valeur.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <Networks />
      <GoogleAd adSlot="8513366484" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mx-auto mt-16 max-w-7xl text-center"
      >
        <p className="italic text-gray-500">
          Cliquez sur une image pour en savoir plus
        </p>
        <div className="mt-4 flex justify-center">
          {valeurs.map((valeur) => (
            <motion.div
              key={valeur.id}
              animate={{
                scale: hoveredValue === valeur.id ? 1.2 : 1,
              }}
              className="mx-1 h-3 w-3 rounded-full bg-gray-400"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
