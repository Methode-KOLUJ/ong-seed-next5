'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaHistory,
  FaBullseye,
  FaServicestack,
  FaBriefcase,
  FaDonate,
  FaFilm,
  FaRobot,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { FaShop } from "react-icons/fa6";

interface SubMenuItem {
  name: string;
  path: string;
  external?: boolean;
}

interface MenuItem {
  name: string;
  path?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  external?: boolean;
  subItems?: SubMenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  { path: '/', name: 'Accueil', icon: FaHome, iconColor: 'text-green-500' },
  { path: '/notre-histoire', name: 'Découvrez nos 5 ans histoire', icon: FaHistory, iconColor: 'text-orange-600' },
  {
    name: 'Mission', icon: FaBullseye, iconColor: 'text-red-600',
    subItems: [
      { path: '/nos-valeurs', name: 'Nos valeurs' },
      { path: '/notre-vision', name: 'Notre vision' },
      { path: '/nos-projets', name: 'Nos projets' },
      { path: '/resultats-escomptes', name: 'Résultats' },
    ],
  },
  {
    name: 'Services', icon: FaServicestack, iconColor: 'text-blue-500',
    subItems: [
      { path: '/aide-educative', name: 'Aide éducative' },
      { path: '/aide-soutien', name: 'Soutien' },
      { path: '/sante-mentale', name: 'Santé mentale' },
      { path: '/medias', name: 'Médias' },
      { path: '/seniors', name: 'Aînés' },
      { path: 'https://www.youtube.com/@3savoirstv', name: 'Formations', external: true },
    ],
  },
  {
    name: 'Opportunités', icon: FaBriefcase, iconColor: 'text-yellow-600',
    subItems: [
      { path: '/opportunites-d-emploi', name: "Opportunités d'emploi" },
      { path: '/postuler', name: 'Postuler' },
    ],
  },
  { path: '/faites-un-don', name: 'Dons', icon: FaDonate, iconColor: 'text-yellow-500' },
  {
    name: 'Médias', icon: FaFilm, iconColor: 'text-teal-500',
    subItems: [
      { path: '/nos-films', name: 'Films' },
      { path: 'https://seedmagasine73.blogspot.com', name: 'Magazine', external: true },
    ],
  },
  { path: '/conversations', name: 'Chatbot', icon: FaRobot, iconColor: 'text-gray-300' },
  { path: '/boutique', name: 'Boutique', icon: FaShop, iconColor: 'text-purple-400' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);
  
  const hasActiveSubItem = useCallback((subItems?: SubMenuItem[]) => 
    subItems?.some(subItem => !subItem.external && isActive(subItem.path)) ?? false, 
    [isActive]
  );

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (menuRef.current && e.target instanceof Node && !menuRef.current.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenSubMenu(null);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  interface DesktopMenuItemProps {
    item: MenuItem;
  }

  const DesktopMenuItem = memo(({ item }: DesktopMenuItemProps) => (
    <li className="relative group h-full flex items-center">
      {item.path ? (
        item.external || item.path.startsWith('http') ? (
          <a
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 lg:px-2 py-2 flex flex-col items-center justify-center transition-colors h-full ${
              isActive(item.path) ? 'text-yellow-400 font-medium' : 'text-white hover:text-yellow-300'
            }`}
          >
            <item.icon className={`text-2xl mb-1 ${item.iconColor}`} />
            <span className="text-sm md:text-xs xl:text-sm">{item.name}</span>
          </a>
        ) : (
          <Link
            href={item.path}
            className={`px-4 lg:px-2 py-2 flex flex-col items-center justify-center transition-colors h-full ${
              isActive(item.path) ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-300'
            }`}
          >
            <item.icon className={`text-2xl mb-1 ${item.iconColor}`} />
            <span className="text-sm md:text-xs xl:text-sm">{item.name}</span>
          </Link>
        )
      ) : (
        <div className="h-full flex flex-col items-center justify-center px-4 py-2 text-white hover:text-yellow-300 cursor-pointer">
          <item.icon className={`text-2xl mb-1 ${item.iconColor}`} />
          <span className="text-xs">{item.name}</span>
          <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-100 shadow-md rounded-md p-1 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-40">
            {item.subItems?.map((subItem) => (
              <li key={subItem.path}>
                {subItem.external || subItem.path.startsWith('http') ? (
                  <a
                    href={subItem.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md whitespace-nowrap"
                  >
                    {subItem.name}
                  </a>
                ) : (
                  <Link
                    href={subItem.path}
                    className={`block px-3 py-2 text-sm ${
                      isActive(subItem.path) ? 'bg-yellow-50 text-yellow-600 font-bold' : 'text-gray-700 hover:bg-blue-50'
                    } rounded-md whitespace-nowrap`}
                  >
                    {subItem.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  ));

  DesktopMenuItem.displayName = 'DesktopMenuItem';

  return (
    <nav 
      ref={menuRef} 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/30 backdrop-blur-xs' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-0 py-3 flex justify-between items-center">
        <Link href="#" className="flex-shrink-0">
          <Image 
            src="/Logo/White-Logo.png" 
            alt="Logo" 
            width={180} 
            height={70} 
            className="object-contain"
          />
        </Link>

        <ul className="hidden lg:flex items-center space-x-1">
          {MENU_ITEMS.map((item) => (
            <DesktopMenuItem key={item.path || item.name} item={item} />
          ))}
        </ul>

        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-950 text-white shadow-xs h-screen overflow-y-auto">
          <ul className="flex flex-col">
            {MENU_ITEMS.map((item) => (
              <li key={item.path || item.name} className="border-b border-gray-700">
                {item.path ? (
                  item.external || item.path.startsWith('http') ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center px-6 py-4 ${isActive(item.path) ? 'bg-gray-800 text-yellow-400' : 'hover:bg-gray-800'}`}
                      onClick={closeMobileMenu}
                    >
                      <item.icon className={`text-xl mr-3 ${item.iconColor}`} />
                      <span className="text-lg">{item.name}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.path}
                      className={`flex items-center px-6 py-4 ${isActive(item.path) ? 'bg-gray-800 text-yellow-400' : 'hover:bg-gray-800'}`}
                      onClick={closeMobileMenu}
                    >
                      <item.icon className={`text-xl mr-3 ${item.iconColor}`} />
                      <span className="text-lg">{item.name}</span>
                    </Link>
                  )
                ) : (
                  <div>
                    <button
                      className={`flex items-center justify-between w-full px-6 py-4 ${openSubMenu === item.name || hasActiveSubItem(item.subItems) ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
                      onClick={() => setOpenSubMenu(openSubMenu === item.name ? null : item.name)}
                    >
                      <div className="flex items-center">
                        <item.icon className={`text-xl mr-3 ${item.iconColor}`} />
                        <span className="text-lg">{item.name}</span>
                      </div>
                      {openSubMenu === item.name || hasActiveSubItem(item.subItems) ? (
                        <FaChevronUp className="text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </button>
                    {(openSubMenu === item.name || hasActiveSubItem(item.subItems)) && (
                      <ul className="bg-gray-800">
                        {item.subItems?.map((subItem) => (
                          <li key={subItem.path} className="border-t border-gray-700">
                            {subItem.external || subItem.path.startsWith('http') ? (
                              <a
                                href={subItem.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-10 py-3 hover:bg-gray-700"
                                onClick={closeMobileMenu}
                              >
                                <span className="text-gray-300">{subItem.name}</span>
                              </a>
                            ) : (
                              <Link
                                href={subItem.path}
                                className={`flex items-center px-10 py-3 ${isActive(subItem.path) ? 'text-yellow-400' : 'text-gray-300 hover:bg-gray-700'}`}
                                onClick={closeMobileMenu}
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default memo(Navbar);