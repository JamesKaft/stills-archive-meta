"use client"

import { useState } from "react"
import PromptList from "./components/PromptList"

export default function ProGenerator() {
  const [subject, setSubject] = useState("")
  const [prompts, setPrompts] = useState([])

  function generatePrompts() {
    if (!subject.trim()) return

    const studios = [
      "stills archive, Universal.com",
      "stills archive, WarnerBros.com",
      "stills archive, Paramount.com",
      "stills archive, SonyPictures.com",
      "stills archive, A24.com",
      "stills archive, Netflix.com",
      "stills archive, Lionsgate.com",
      "stills archive, Columbia.com",
      "stills archive, DreamWorks.com",
      "stills archive, MGM.com"
    ]

    const baseDescriptors = [
      "cinematic movie still",
      "hyper-realistic lighting",
      "35mm film texture",
      "shallow depth of field",
      "dramatic cinematic tone",
      "natural composition",
      "no props, no text, no logos, no equipment in frame"
    ]

    const generated = studios.map((studio, i) => {
      return `${studio} — ${baseDescriptors.join(", ")}, subject: ${subject}`
    })

    setPrompts(generated)
  }

  function resetAll() {
    setSubject("")
    setPrompts([])
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <h1 className="text-xl font-semibold mb-4">
        Stills Archive Meta Generator — Pro
      </h1>

      <div className="space-y-4 max-w-3xl">
        <textarea
          className="w-full p-3 rounded bg-neutral-900 border border-neutral-800 text-sm"
          placeholder="Describe your subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={generatePrompts}
            className="text-base px-3 py-1.5 bg-blue-600 rounded"
          >
            Generate 10 Prompts
          </button>

          <button
            onClick={resetAll}
            className="text-base px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded"
          >
            Reset
          </button>
        </div>

        <PromptList prompts={prompts} />
      </div>
    </main>
  )
}
