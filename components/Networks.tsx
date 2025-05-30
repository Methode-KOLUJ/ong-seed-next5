'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface YoutubeLink {
  name: string;
  url: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  bgColor: string;
}

const YouTubeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const youtubeLinks: YoutubeLink[] = [
    { name: 'Les vrais adorateurs', url: 'https://www.youtube.com/@SVATV%C3%89VANG%C3%89LIQUE' },
    { name: '3 Savoirs', url: 'https://www.youtube.com/@3savoirstv' },
    { name: 'SEED TV Cinéma', url: 'https://www.youtube.com/@SEEDTVCINEMAFran%C3%A7ais' },
    { name: 'ONG SEED TV', url: 'https://www.youtube.com/@ONGSEEDTVEDUCATIVE' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaYoutube size={20} />
        <motion.span 
          className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          animate={{ scale: isOpen ? 0 : 1 }}
        >
          {youtubeLinks.length}
        </motion.span>
      </motion.button>

      {isOpen && (
        <motion.div
          className="absolute -bottom-2 right-0  mb-2 w-55 bg-white rounded-lg shadow-xl overflow-hidden z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {youtubeLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              title={link.name} 
            >
              <div className="flex items-center">
                <FaYoutube className="mr-2 text-red-600 flex-shrink-0" />
                <span className="overflow-hidden text-ellipsis">{link.name}</span>
              </div>
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const Networks = () => {
  const socialLinks: SocialLink[] = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/Sauvonslenfanceendifficulte', 
      icon: <FaFacebook size={18} />, 
      bgColor: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/ongseedtv', 
      icon: <FaInstagram size={18} />, 
      bgColor: 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/jeannot-kashala-49653b356', 
      icon: <FaLinkedin size={18} />, 
      bgColor: 'bg-blue-500 hover:bg-blue-600'
    },
  ];

  return (
    <div className="fixed bottom-1 right-1  z-30 flex flex-col items-center gap-3 whitespace-nowrap">
      <YouTubeDropdown />

      <div className="flex flex-col gap-2">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${link.bgColor} text-white shadow-lg transition-all duration-300`}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Networks;