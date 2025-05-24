'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import {useRouter} from "next/navigation"
import { CheckCircle } from 'lucide-react';
import GoogleAd from '@/components/GoogleAd';

export default function JobOfferSection() {
  const router = useRouter();

  // Vue globale du poste
  const jobOverview = (
    <motion.div 
      className="mb-12 p-6 rounded-xl border border-white/10 shadow-xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <p className="text-lg md:text-xl text-center text-gray-300 leading-relaxed select-text">
        Postulez pour faire partie de l'équipe formidable de l'Organisation Non Gouvernementale Sauvons l'Enfance en Difficulté (SEED) !
      </p>
    </motion.div>
  );

  const criteria = [
    "Avoir au moins un diplôme d'étude secondaire",
    "Etre capable d'intervenir sur le terrain auprès des enfants en besoin",
    "Etre capable de travailler en équipe",
    "Avoir une expérience minimum de 2 mois auprès des enfants dans le besoin",
    "Avoir un sens de ponctualité et d'initiative",
    "Avoir une orientation vers la clientèle",
  ];

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const listItem: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, delay: i * 0.1 }
    })
  };


  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 to-black text-white overflow-hidden py-12 px-6 flex items-center justify-center">
      {/* Fond animé */}
      <div className="fixed top-4 right-6 z-50 flex space-x-3">
        <button
          onClick={() => router.back()}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
        >
          Fermer
        </button>
      </div>
      <motion.div
        className="absolute inset-0 opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3 }}
      >
        <Image
          src="/images/Bg.jpg"
          alt="Fond offre d'emploi"
          fill
          className="object-cover pointer-events-none select-none"
          priority
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Titre */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
         <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-2xl md:text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-500 uppercase"
          >
            Opportunité <span className="text-2xl md:text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-300 uppercase">d'emploi</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto" />
        </motion.div>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-center text-gray-300 text-xl md:text-2xl lg:text-3xl max-w-6xl font-semibold mx-auto mb-6"
        >
          Vous avez l'ambition de faire la différence dans la vie d'un enfant en difficulté ?
        </motion.p>

        {/* Vue globale du poste */}
        {jobOverview}

        {/* Illustration + critères - Modifié pour aligner le haut de l'image avec le haut des critères */}
        <div className="flex flex-col md:flex-row items-start gap-12"> {/* Changé de items-center à items-start */}
          {/* Image */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
          >
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <Image
                src="/images/Embauche.png"
                alt="Poste développeur"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </motion.div>

          {/* Critères */}
          <motion.ul
            className="w-full lg:w-1/2 space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            {criteria.map((critère, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={listItem}
                className="flex items-start gap-3 text-gray-100 bg-gray-900/60 hover:bg-gray-800/80 px-5 py-3 rounded-xl backdrop-blur-md border border-white/10 transition-colors duration-300 shadow-md"
                whileHover={{ x: 5 }}
              >
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-base md:text-lg">{critère}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Bouton postuler */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <button
            onClick={() => router.push('/postuler')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg hover:scale-105 transition-all cursor-pointer"
          >
            Je postule !
          </button>
        </motion.div>
            <GoogleAd adSlot="8513366484" />
      </div>
    </section>
  );
}