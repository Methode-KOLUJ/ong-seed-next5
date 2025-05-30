"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LivrePC from "@/components/LivrePC";
import GoogleAd from "@/components/GoogleAd";


const Histoire = () => {
  const router = useRouter();
  const [showBook, setShowBook] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-gray-950 to-black text-white min-h-screen flex flex-col items-center justify-center px-4">
      {!showBook ? (
        <div className="text-center max-w-xl animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 uppercase">
            Bienvenue !
          </h1>
          <p className="text-md md:text-lg mb-6">
            Vous devez cliquer du côté droit du livre pour feuilleter. <br />
            👇🏻
          </p>
          <button
            onClick={() => setShowBook(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition shadow-lg"
          >
            Lire
          </button>
          <div className="mt-6">
            <button
              onClick={() => router.back()}
              className="text-lg font-extrabold text-gray-400 hover:text-white hover:underline"
            >
              Quitter
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-end items-center p-4">
            <button
              onClick={() => setShowBook(false)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
            >
              Fermer
            </button>
          </div>
          <LivrePC />
          <GoogleAd adSlot="8513366484" />
        </>
      )}
    </section>
  );
};

export default Histoire;
