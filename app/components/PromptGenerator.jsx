"use client";
import { useState } from "react";

export default function PromptGenerator() {
  const [subject, setSubject] = useState("");
  const [prompts, setPrompts] = useState([]);

  const studios = [
    "Universal .com",
    "Disney .com",
    "Warner Bros .com",
    "Paramount .com",
    "Sony Pictures .com",
    "Lionsgate .com",
    "A24 .com",
    "DreamWorks .com",
    "Netflix .com",
    "Columbia .com",
  ];

  const generatePrompts = () => {
    if (!subject.trim()) return;
    const results = studios.map(
      (studio) =>
        `stills archive, ${studio} — cinematic movie still of ${subject}, hyper-realistic lighting, 35 mm film texture, depth-of-field composition, dramatic tone`
    );
    setPrompts(results);
  };

  return (
    <div className="w-full max-w-xl">
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Describe your subject..."
        className="w-full p-3 rounded-xl bg-neutral-800 text-white outline-none"
      />
      <button
        onClick={generatePrompts}
        className="mt-3 w-full bg-amber-600 hover:bg-amber-700 p-3 rounded-xl font-semibold"
      >
        Generate 10 Cinematic Prompts
      </button>

      {prompts.length > 0 && (
        <div className="mt-6 space-y-3">
          {prompts.map((p, i) => (
            <div
              key={i}
              className="p-3 bg-neutral-900 rounded-xl text-sm border border-neutral-800"
            >
              {p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
