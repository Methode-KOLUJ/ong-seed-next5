"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserShield, FaImage, FaInfoCircle } from "react-icons/fa";
import Image from "next/image";

interface FormData {
  name: string;
  image: string;
  description: string;
}

interface LoginData {
  email: string;
  password: string;
}

const AddPartners = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    image: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

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
  };

  const modal = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  useEffect(() => {
    document.body.classList.add("bg-gradient-to-br", "from-blue-50", "to-gray-100", "dark:from-gray-900", "dark:to-blue-900/20");
    return () => {
      document.body.classList.remove("bg-gradient-to-br", "from-blue-50", "to-gray-100", "dark:from-gray-900", "dark:to-blue-900/20");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result as string,
        });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      setIsModalOpen(false);
    } else {
      alert("Identifiants incorrects");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch("https://ong-seed.onrender.com/api/partenaires", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Partenaire ajouté avec succès !");
        setFormData({ name: "", image: "", description: "" });
        setImagePreview(null);
      } else {
        alert("Erreur lors de l'ajout du partenaire.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur s'est produite.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-tl from-gray-900 to-black mt-20">
      {isAuthenticated && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={container}
          className="w-full max-w-md bg-white dark:bg-gray-950 border-2 border-gray-500 dark:border-gray-400 rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-700 dark:to-blue-700 p-4 text-white text-center">
            <h2 className="text-xl font-bold uppercase">Ajouter un partenaire</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <motion.div variants={item} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaUserShield className="mr-2 text-teal-600 dark:text-teal-400" />
                Nom du partenaire
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900 dark:text-white"
                required
              />
            </motion.div>

            <motion.div variants={item} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaImage className="mr-2 text-teal-600 dark:text-teal-400" />
                Logo du partenaire
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900 dark:text-white"
                required
              />
              {imagePreview && (
                <div className="mt-4 flex justify-center">
                  <Image
                    src={imagePreview}
                    alt="Aperçu du logo"
                    className="w-20 h-20 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                </div>
              )}
            </motion.div>

            <motion.div variants={item} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaInfoCircle className="mr-2 text-teal-600 dark:text-teal-400" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                rows={4}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900 dark:text-white resize-none"
                required
              />
            </motion.div>

            <motion.div variants={item}>
              <button
                type="submit"
                className=" uppercase w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-700 dark:to-blue-700 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 dark:hover:from-teal-600 dark:hover:to-blue-600 transition-all shadow-md"
              >
                Valider
              </button>
            </motion.div>
          </form>
        </motion.div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 dark:bg-black/90 flex items-center justify-center p-4 z-50">
            <motion.div
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-700 dark:to-blue-700 p-4 text-white text-center">
                <h2 className="text-xl font-bold uppercase">Connexion Admin</h2>
              </div>
              
              <form onSubmit={handleLoginSubmit} className="p-6 space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-700 dark:to-blue-700 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 dark:hover:from-teal-600 dark:hover:to-blue-600 transition-all shadow-md"
                >
                  Se connecter
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AddPartners;