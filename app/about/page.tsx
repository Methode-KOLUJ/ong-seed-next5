'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import GoogleAd from '@/components/GoogleAd';

interface ValueCard {
  title: string;
  desc: string;
  color: string;
}

export default function AboutSection() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const values: ValueCard[] = [
    {
      title: "Comportement",
      desc: "Troubles du comportement et difficultés d'adaptation sociale.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Communication",
      desc: "Troubles du langage et difficultés de communication.",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Intellect",
      desc: "Difficultés d'apprentissage et troubles cognitifs.",
      color: "from-red-500 to-amber-500"
    },
    {
      title: "Physique",
      desc: "Handicaps physiques et troubles moteurs.",
      color: "from-teal-500 to-green-500"
    },
    {
      title: "Anomalies multiples",
      desc: "Troubles complexes avec multiples déficiences.",
      color: "from-purple-700 to-gray-600"
    }
  ];

  const swiperRef = useRef<SwiperCore | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-950 to-black">
     
      {/* Fond animé */}
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
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Titre avec animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
         <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-500 uppercase"
          >
            Qui <span className="text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-300 uppercase">sommes-nous ?</span>

          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto" />
        </motion.div>

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Colonne image */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <div className="relative rounded-xl overflow-hidden border-4 border-white/10 aspect-video">
              <Image
                src="/Mission/Equipe.jpeg"
                alt="Notre équipe"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Colonne texte */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h3 className="text-3xl font-bold text-white mb-6 text-center lg:text-left">
              Nous sommes une organisation <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500">multifacettes</span>
            </h3>
            <p className="text-gray-300 mb-3 text-lg lg:text-xl text-center lg:text-justify">
              Sauvons l'enfance en difficulté est un organisme à but non lucratif qui prend en charge 5 types d'enfants en difficulté : ceux atteints d'une anomalie de comportement, de communication, d'ordre intellectuel, d'ordre physique ou d'anomalie multiple.
            </p>
            <p className="text-gray-300 mb-6 text-lg lg:text-xl text-center lg:text-justify">
              L'organisme offre son aide de soutien, aide éducative et aide thérapeutique aux enfants en difficulté âgés de 0 à 21 ans.
            </p>
          </motion.div>
        </div>

        {/* Paragraphe supplémentaire */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="mt-2 lg:mt-4"
        >
          <p className="text-gray-300 mb-4 text-lg lg:text-xl text-center lg:text-left">
            Notre objectif est d'offrir aux enfants en difficulté un état de bien-être en satisfaisant leurs besoins essentiels afin qu'ils puissent mener une vie de qualité et trouver la sérénité et nous utilisons une succession de procédés pour mener nos actions : identifier un enfant en difficulté atteint d'une anomalie, procéder à la documentation, et finalement résoudre ses besoins essentiels pour atteindre nos 5 grands résultats.
          </p>
        </motion.div>
          <GoogleAd adSlot='8513366484'/>

        {/* Slider des valeurs */}
        <motion.div
          className="mt-10 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        >
          {/* Boutons navigation */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300 group"
          >
            <motion.div animate={{ x: [-3, 0, -3] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <FaChevronLeft className="text-white text-xl group-hover:text-purple-300 transition-colors" />
            </motion.div>
          </button>

          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300 group"
          >
            <motion.div animate={{ x: [3, 0, 3] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <FaChevronRight className="text-white text-xl group-hover:text-purple-300 transition-colors" />
            </motion.div>
          </button>
          {/* Swiper */}
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            loop={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              // @ts-expect-error: Swiper's types are incomplete for navigation elements
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error: Swiper's types are incomplete for navigation elements
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {values.map((value, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="h-full">
                  <div className="bg-gradient-to-br rounded-xl p-6 lg:p-8 relative overflow-hidden h-full flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-20`} />
                    <div className="relative z-10 flex-grow">
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-3 text-center">{value.title}</h4>
                      <p className="text-gray-300 text-sm lg:text-base text-center">{value.desc}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}