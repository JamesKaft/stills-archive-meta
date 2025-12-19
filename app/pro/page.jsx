"use client"

import { useState } from "react"
import PromptList from "./components/PromptList"

export default function ProGenerator() {
  const [subject, setSubject] = useState("")
  const [model, setModel] = useState("nano")
  const [aspect, setAspect] = useState("cinematic widescreen")
  const [lighting, setLighting] = useState("neutral cinematic lighting")
  const [tone, setTone] = useState("dramatic")
  const [composition, setComposition] = useState("natural framing")
  const [prompts, setPrompts] = useState([])

  function buildAspectPhrase() {
    if (model === "nano") {
      return `cinematic ${aspect} composition`
    }
    return `--ar ${aspect}`
  }

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

    const aspectPhrase = buildAspectPhrase()

    const generated = studios.map((studio) => {
      return `${studio} — cinematic movie still, ${lighting}, ${tone} tone, ${composition}, ${aspectPhrase}, hyper-realistic, no props, no equipment, no text, no logos, subject: ${subject}`
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
        Stills Archive Meta Generator — Pro Studio
      </h1>

      <div className="space-y-4 max-w-3xl">
        <textarea
          className="w-full p-3 rounded bg-neutral-900 border border-neutral-800 text-sm"
          placeholder="Describe your subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3 text-sm">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded p-2"
          >
            <option value="nano">Nano Banana</option>
            <option value="mj">Midjourney</option>
          </select>

          <select
            value={aspect}
            onChange={(e) => setAspect(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded p-2"
          >
            <option value="cinematic widescreen">Cinematic Widescreen</option>
            <option value="ultra-wide panoramic">Ultra-Wide Panoramic</option>
            <option value="portrait vertical">Portrait Vertical</option>
            <option value="square frame">Square Frame</option>
            <option value="2.39:1">2.39:1</option>
            <option value="16:9">16:9</option>
            <option value="4:5">4:5</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <select
            value={lighting}
            onChange={(e) => setLighting(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded p-2"
          >
            <option>neutral cinematic lighting</option>
            <option>soft low-key lighting</option>
            <option>high-contrast cinematic lighting</option>
            <option>natural ambient lighting</option>
          </select>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded p-2"
          >
            <option>dramatic</option>
            <option>moody</option>
            <option>intimate</option>
            <option>epic</option>
          </select>

          <select
            value={composition}
            onChange={(e) => setComposition(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded p-2"
          >
            <option>natural framing</option>
            <option>cinematic wide composition</option>
            <option>tight portrait framing</option>
            <option>balanced symmetrical composition</option>
          </select>
        </div>

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
