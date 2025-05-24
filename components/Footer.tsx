"use client";

import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  } as const;

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  } as const;

  const workingHours = [
    { days: "Lundi - Vendredi", hours: "08H - 17H", icon: <FaClock /> },
    { days: "Samedi", hours: "08H - 15H", icon: <FaCalendarAlt /> },
    { days: "Dimanche", hours: "Fermé", icon: <FaCalendarAlt /> }
  ];

  const contacts = [
    { name: "WhatsApp", icon: <FaWhatsapp />, href: "https://wa.me/16132192671" },
    { name: "Email", icon: <FaEnvelope />, href: "mailto:ongseedtv@gmail.com" },
    { name: "Téléphone", icon: <FaPhone />, href: "tel:+16132192671" }
  ];

  const bureau1 = {
    line1: "Directions nationales",
    line2: "L'ONG SEED se situe dans la ville de Kinshasa et Matadi en République Démocratique du Congo.",
    icon: <FaMapMarkerAlt />
  };

  const bureau2 = {
    line1: "Coordinnation Générale",
    line2: "La Coordinnation Générale de l'ONG SEED se situe dans la ville d'Ottawa au Canada.",
    icon: <FaMapMarkerAlt />
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
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

      <footer className="relative z-10 text-gray-300 text-center py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto"
          >
            {/* Adresse */}
            <motion.div variants={item} className="space-y-8">
              <h3 className="text-2xl font-bold uppercase tracking-wide">Adresse</h3>
              <div className="flex items-start justify-center gap-5">
                <span className="text-2xl text-gray-400 mt-1">{bureau1.icon}</span>
                <div className="text-left">
                  <p className="text-lg font-medium">{bureau1.line1}</p>
                  <p className="text-lg">{bureau1.line2}</p>
                </div>
              </div>
              <div className="flex items-start justify-center gap-5">
                <span className="text-2xl text-gray-400 mt-1">{bureau2.icon}</span>
                <div className="text-left">
                  <p className="text-lg font-medium">{bureau2.line1}</p>
                  <p className="text-lg">{bureau2.line2}</p>
                </div>
              </div>
            </motion.div>

            {/* Horaires */}
            <motion.div variants={item} className="space-y-8">
              <h3 className="text-2xl font-bold uppercase tracking-wide">Horaires</h3>
              <ul className="space-y-6">
                {workingHours.map((el, index) => (
                  <motion.li
                    key={index}
                    variants={item}
                    className="flex items-center justify-center gap-5"
                  >
                    <span className="text-2xl text-gray-400">{el.icon}</span>
                    <div className="text-left">
                      <p className="text-lg font-light">{el.days}</p>
                      <p className="text-lg font-medium">{el.hours}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contacts */}
            <motion.div variants={item} className="space-y-8">
              <h3 className="text-2xl font-bold uppercase tracking-wide">Contacts</h3>
              <ul className="space-y-6">
                {contacts.map((contact, index) => (
                  <motion.li key={index} variants={item}>
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-5 hover:text-white transition-colors text-lg"
                    >
                      <span className="text-2xl text-gray-400">{contact.icon}</span>
                      <span className="text-lg font-medium">{contact.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            variants={item}
            className="mt-10 pt-6 border-t border-gray-800"
          >
            <p className="text-lg text-gray-500">
              &copy; {currentYear} ONG SEED | Développé par{" "}
              <a
                href="https://wa.me/243812539000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                KOLUJ_DEV
              </a>
            </p>
          </motion.div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;