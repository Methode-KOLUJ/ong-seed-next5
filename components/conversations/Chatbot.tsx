'use client'

import React, { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaComments,
  FaTrash,
  FaPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

// Typage TypeScript
type MessageType = 'bot' | 'user';

interface Message {
  type: MessageType;
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

// Hook personnalisé avec TypeScript
const useMobileKeyboardFix = (inputRef: React.RefObject<HTMLInputElement | null>) => {
  useEffect(() => {
    if (!inputRef.current || typeof window === 'undefined') return;

    const handleFocus = () => {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }, 300);
    };

    const input = inputRef.current;
    input.addEventListener('focus', handleFocus);

    return () => {
      input.removeEventListener('focus', handleFocus);
    };
  }, [inputRef]);
};

const Chatbot = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("chatbotConversations");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: Date.now(),
              title: "Nouvelle conversation",
              messages: [
                {
                  type: "bot" as MessageType,
                  content: "Bonjour ! Vous avez besoin des renseignements supplémentaires sur l'ONG SEED ?",
                },
              ],
            },
          ];
    }
    return [
      {
        id: Date.now(),
        title: "Nouvelle conversation",
        messages: [
          {
            type: "bot" as MessageType,
            content: "Bonjour ! Vous avez besoin des renseignements supplémentaires sur l'ONG SEED ?",
          },
        ],
      },
    ];
  });

  const [activeConversation, setActiveConversation] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useMobileKeyboardFix(inputRef);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("chatbotConversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  useEffect(() => {
    inputRef.current?.focus();
    scrollToBottom();
  }, [activeConversation, conversations[activeConversation]?.messages.length]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  };

  useEffect(() => {
    const handleResize = () => scrollToBottom();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { type: "user", content: input };

    setConversations((prev) => {
      const newConversations = [...prev];
      if (!newConversations[activeConversation].messages) {
        newConversations[activeConversation].messages = [];
      }

      const lastMessage = newConversations[activeConversation].messages.slice(-1)[0];
      if (!lastMessage || lastMessage.content !== input || lastMessage.type !== "user") {
        newConversations[activeConversation].messages.push(userMessage);
      }

      if (newConversations[activeConversation].messages.length === 2) {
        newConversations[activeConversation].title =
          input.length > 20 ? `${input.substring(0, 20)}...` : input;
      }

      return newConversations;
    });

    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("https://ong-seed.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      setConversations((prev) => {
        const newConversations = [...prev];
        const lastMessage = newConversations[activeConversation].messages.slice(-1)[0];

        if (!lastMessage || lastMessage.content !== data.reply || lastMessage.type !== "bot") {
          newConversations[activeConversation].messages.push({
            type: "bot",
            content: data.reply,
          });
        }

        return newConversations;
      });
    } catch (error) {
      console.error("Erreur lors de la communication avec l'API", error);
      setConversations((prev) => {
        const newConversations = [...prev];
        newConversations[activeConversation].messages.push({
          type: "bot",
          content: "Une erreur s'est produite. Veuillez réessayer.",
        });
        return newConversations;
      });
    } finally {
      setLoading(false);
      setIsTyping(false);
      scrollToBottom();
    }
  };

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now(),
      title: "Nouvelle conversation",
      messages: [
        {
          type: "bot",
          content: "Bonjour ! Vous avez besoin des renseignements supplémentaires sur l'ONG SEED ?",
        },
      ],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversation(0);
    setSidebarOpen(true);
  };

  const deleteConversation = (index: number) => {
    if (conversations.length <= 1) {
      createNewConversation();
      return;
    }

    setConversations((prev) => prev.filter((_, i) => i !== index));
    setActiveConversation((prev) =>
      index === prev ? 0 : prev > index ? prev - 1 : prev
    );
  };

  return (
    <>
      {/* Styles globaux remplacés par un fichier CSS global */}
 
      <div className="chat-app-container">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-4 flex items-center justify-between relative z-20">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white"
              aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {sidebarOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
            </button>
            <FaComments className="text-blue-600 dark:text-teal-500" size={26} />
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-500">
              SEED Chatbot
            </h1>
          </div>
          <button
            onClick={() => router.back()}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Overlay pour mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: sidebarOpen ? 0 : -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0 absolute left-0 top-0 bottom-0 z-20"
            style={{ marginTop: "2px" }}
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={createNewConversation}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white transition-colors"
              >
                <FaPlus size={14} /> Nouvelle conversation
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation, index) => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer flex justify-between items-center ${
                    index === activeConversation
                      ? "bg-blue-50 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => {
                    setActiveConversation(index);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="truncate dark:text-white">
                    {conversation.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(index);
                    }}
                    className="text-gray-500 hover:text-red-500 p-1"
                    title="Supprimer"
                    aria-label="Supprimer la conversation"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4">
              {/* ThemeSwitcher peut être implémenté avec un contexte ou un hook personnalisé */}
            </div>
          </motion.div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950 w-full">
            <div ref={chatContainerRef} className="messages-container">
              <div className="max-w-3xl mx-auto">
                {conversations[activeConversation]?.messages.map(
                  (message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 flex ${
                        message.type === "bot" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[90%] rounded-lg px-4 py-3 ${
                          message.type === "bot"
                            ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  )
                )}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-4"
                  >
                    <div className="bg-white dark:bg-gray-700 rounded-lg px-4 py-3 flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="input-container p-4 bg-white dark:bg-gray-950 sm:mb-0 lg:mb-4">
              <div className="max-w-3xl mx-auto flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Écrivez un message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || loading}
                  className={`p-3 rounded-lg ${
                    input.trim()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-400"
                  } transition-colors`}
                  aria-label="Envoyer le message"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;