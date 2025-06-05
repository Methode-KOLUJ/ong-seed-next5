// app/form/page.tsx
"use client"; // Nécessaire pour les hooks

import { useState } from "react";

export default function FormPage() {
  const [input, setInput] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-50">Formulaire intégré</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full mb-2 max-w-md"
      />
      <button 
        onClick={() => alert(input)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Envoyer
      </button>
    </div>
  );
}