'use client';

import React from "react";
import { FaYoutube } from "react-icons/fa";
import GoogleAd from "@/components/GoogleAd";

interface Channel {
  name: string;
  url: string;
}

const channels: Channel[] = [
  { name: "ONG SEED TV", url: "https://www.youtube.com/@ONGSEEDTVEDUCATIVE" },
  {
    name: "SEED TV CINEMA",
    url: "https://www.youtube.com/@SEEDTVCINEMAFran%C3%A7ais",
  },
  {
    name: "SEED LES VRAIS ADORATEURS TV",
    url: "https://www.youtube.com/@SVATV%C3%89VANG%C3%89LIQUE",
  },
  { name: "3 SAVOIRS TV", url: "https://www.youtube.com/@3savoirstv" },
];

const YoutubeLinks: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-black min-h-screen">
      <div className="h-screen relative flex items-center justify-center py-20 md:py-32">
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full px-6 md:px-20">
          {channels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
              title={channel.name}
            >
              <div className="rounded-full border-4 bg-gray-100 hover:bg-white border-red-700 hover:border-red-600 p-8 md:p-12 shadow-lg transition-transform transform group-hover:scale-110 dark:shadow-gray-700">
                <FaYoutube size={60} className="text-red-700 hover:text-red-600" />
              </div>
              <span className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 text-center font-semibold">
                {channel.name}
              </span>
            </a>
          ))}
        </div>
        <GoogleAd adSlot="8513366484" />
      </div>
    </div>
  );
};

export default YoutubeLinks;
