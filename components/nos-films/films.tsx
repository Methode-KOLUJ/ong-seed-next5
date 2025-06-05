'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID as string;
const MAX_RESULTS = 12;


type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    [key: string]: unknown; 
  };
};

type YouTubeResponse = {
  items: Video[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo?: {
    totalResults: number;
  };
};

let dbPromise: Promise<IDBDatabase> | null = null;

const openDB = (name: string, version: number): Promise<IDBDatabase> => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('videos')) {
          db.createObjectStore('videos', { keyPath: 'token' });
        }
      };

      request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
      request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);
    });
  }
  return dbPromise;
};

const saveVideos = async (db: IDBDatabase, token: string, data: YouTubeResponse) => {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('videos', 'readwrite');
    const store = transaction.objectStore('videos');
    const request = store.put({ token, ...data });

    request.onsuccess = () => resolve();
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

const getVideos = async (db: IDBDatabase, token: string): Promise<YouTubeResponse | undefined> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('videos', 'readonly');
    const store = transaction.objectStore('videos');
    const request = store.get(token);

    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

const shouldFetchNewVideos = (): boolean => {
  const lastFetchDate = localStorage.getItem('lastFetchDate');
  if (!lastFetchDate) return true;

  const now = new Date();
  const lastFetch = new Date(lastFetchDate);
  const diffInDays = Math.floor((now.getTime() - lastFetch.getTime()) / (1000 * 60 * 60 * 24));

  return diffInDays >= 2;
};

const NosFilms = () => {
  const storedPage = typeof window !== 'undefined' ? sessionStorage.getItem('currentPage') : null;
  const storedPageToken = typeof window !== 'undefined' ? sessionStorage.getItem('pageToken') : null;

  const [videos, setVideos] = useState<Video[]>([]);
  const [pageToken, setPageToken] = useState<string>(storedPageToken || '');
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [prevPageToken, setPrevPageToken] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(storedPage ? parseInt(storedPage, 10) : 1);

  const router = useRouter();

  const fetchVideos = async (token = '', page = 1) => {
    const db = await openDB('youtubeCache', 1);

    const useCache = (page !== 1 || !shouldFetchNewVideos());

    if (useCache) {
      const cachedData = await getVideos(db, token);
      if (cachedData) {
        updateState(cachedData, token, page);
        return;
      }
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${MAX_RESULTS}&order=date&type=video&key=${API_KEY}&pageToken=${token}`
      );
      const data: YouTubeResponse = await response.json();
      await saveVideos(db, token, data);

      if (page === 1) {
        localStorage.setItem('lastFetchDate', new Date().toISOString());
      }

      updateState(data, token, page);
    } catch (error) {
      console.error('Erreur lors de la récupération des vidéos :', error);
    }
  };

  const updateState = (data: YouTubeResponse, token: string, page: number) => {
    setVideos(data.items || []);
    setNextPageToken(data.nextPageToken || null);
    setPrevPageToken(data.prevPageToken || null);
    setTotalResults(data.pageInfo?.totalResults || 0);
    setCurrentPage(page);
    setPageToken(token);
    sessionStorage.setItem('currentPage', page.toString());
    sessionStorage.setItem('pageToken', token);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchVideos(pageToken, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = useMemo(() => Math.ceil(totalResults / MAX_RESULTS), [totalResults]);

  return (
    <section className="relative bg-white dark:bg-black min-h-screen px-6">
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-950 via-transparent to-red-950 opacity-20 dark:opacity-30 pointer-events-none" aria-hidden="true"></div>

      <div className="fixed top-4 right-6 z-50 flex space-x-3">
        <button
          onClick={() => router.back()}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
        >
          Fermer
        </button>
      </div>

      <div className="max-w-[95%] mx-auto text-center relative pt-16">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-750 text-red-700 mb-12"
        >
          SEED TV CINEMA
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6">
          {videos.map((video) => (
            <motion.div
              key={video.id.videoId}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
              className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
            >
              <iframe
                className="w-full h-52 md:h-40 lg:h-44"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allowFullScreen
              ></iframe>
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-800 dark:text-white">{video.snippet.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
            disabled={!prevPageToken}
            onClick={() => fetchVideos(prevPageToken ?? '', currentPage - 1)}
          >
            ← Retour
          </button>
          <span className="text-gray-950 dark:text-white font-bold">{currentPage} / {totalPages}</span>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
            disabled={!nextPageToken}
            onClick={() => fetchVideos(nextPageToken ?? '', currentPage + 1)}
          >
            Suivant →
          </button>
        </div>
      </div>
    </section>
  );
};

export default NosFilms;
