'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Chargement...",
    "Presque terminé...",
    "Encore un instant...",
    "Prêt !"
  ];

  // Bloc pour désactiver le scroll (body + html + fix position)
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
    };
  }, [isVisible]);

  // Texte qui évolue
  useEffect(() => {
    if (textIndex < texts.length - 1) {
      const textInterval = setTimeout(() => {
        setTextIndex((prevIndex) => prevIndex + 1);
      }, 2500);

      return () => clearTimeout(textInterval);
    } else {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2300);

      return () => clearTimeout(hideTimeout);
    }
  }, [textIndex]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6 }}
        >
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="absolute" width="250" height="250" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradientColors)"
                strokeWidth="9"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="gradientColors" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex items-center justify-center">
              <span className="text-3xl font-extrabold text-gray-950 dark:text-white">
                ONG SEED
              </span>
            </div>
          </div>
          <div className="fixed bottom-8 text-lg text-gray-500 dark:text-gray-400">
            {texts[textIndex]}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
