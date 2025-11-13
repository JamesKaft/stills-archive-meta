// File: app/pro/page.jsx

"use client"
import { useState } from 'react'

export default function ProPage() {
  const [subject, setSubject] = useState('')
  const [studio, setStudio] = useState('random')
  const [lighting, setLighting] = useState('random')
  const [weather, setWeather] = useState('random')
  const [camera, setCamera] = useState('random')
  const [tone, setTone] = useState('random')
  const [variationMode, setVariationMode] = useState(true)
  const [useEnhancers, setUseEnhancers] = useState(true)
  const [prompts, setPrompts] = useState([])
  const [copied, setCopied] = useState(false)

  const studios = [
    'Universal .com', 'Warner Bros .com', 'Paramount .com', 'Sony Pictures .com',
    '20thcenturystudios .com', 'Disney .com', 'DreamWorks .com', 'Lionsgate .com',
    'Netflix .com', 'A24 .com', 'Columbia .com'
  ]

  const lightings = [
    'golden hour', 'overcast soft', 'neon night', 'high noon hard light', 'candlelit low',
    'twilight rim', 'studio key and fill', 'volumetric backlight', 'foggy diffuse'
  ]

  const weathers = [
    'clear sky', 'light rain', 'heavy rain', 'sandstorm', 'windy dust', 'dense fog', 'drifting snow'
  ]

  const cameras = [
    'ARRI Alexa 65, Zeiss 50mm', 'RED Komodo 6K, Canon 85mm', 'Sony Venice 2, Atlas 40mm anamorphic',
    'Leica SL2, Summilux 35mm', 'Panavision DXL2, Cooke S4/i 75mm', 'Blackmagic URSA 12K, Fujinon 80mm'
  ]

  const tones = [
    'tragic', 'heroic', 'dreamlike', 'ominous', 'melancholic', 'epic', 'intimate'
  ]

  const enhancersPool = [
    'archival film still scan', 'cinema negative scan, 35mm log profile', 'Kodak Vision3 stock',
    'IMAX 70mm plate feel', 'cinematic backlight diffusion', 'neon spill reflections, volumetric dust rays',
    'film grain texture, halation glow', 'ungraded log footage aesthetic', 'shallow depth of field, bokeh'
  ]

  function choose(list, forced) {
    if (forced && forced !== 'random') return forced
    return list[Math.floor(Math.random() * list.length)]
  }

  function pickEnhancers() {
    const shuffled = enhancersPool.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3).join(', ')
  }

  function buildSinglePrompt(idx, baseStudio, baseLighting, baseWeather, baseCamera, baseTone) {
    const s = choose(studios, baseStudio)
    const l = choose(lightings, baseLighting)
    const w = choose(weathers, baseWeather)
    const c = choose(cameras, baseCamera)
    const t = choose(tones, baseTone)

    const actionVariants = [
      'walking across a vast wasteland',
      'trudging through cracked desert',
      'standing on a ridge and facing the wind',
      'stumbling through a ruined city street',
      'gazing at a distant ruined skyline',
      'silhouetted against a low sun' 
    ]

    const action = variationMode ? actionVariants[idx % actionVariants.length] : actionVariants[0]

    const enh = useEnhancers ? (', ' + pickEnhancers()) : ''

    // Compose final prompt with hashtags style blocks separated visually for parsing
    return `#prompt_${idx + 1}\n#token stills archive, ${s}\n#studio ${s}\n#lighting ${l}\n#weather ${w}\n#camera ${c}\n#tone ${t}\n#subject ${subject}\n#final stills archive, ${s} — cinematic movie still of ${subject} ${action}, ${l} lighting, ${w}, captured on ${c}, ${t} tone${enh}, 35mm film texture, depth-of-field composition, dramatic cinematic grading —ar 2.39:1 --q 2 --v 6`
  }

  function generate() {
    if (!subject.trim()) return alert('Please enter a subject or scene')
    const results = []
    for (let i = 0; i < 10; i++) {
      results.push(buildSinglePrompt(i, studio, lighting, weather, camera, tone))
    }
    setPrompts(results)
  }

  function copyAll() {
    if (!prompts.length) return
    const text = prompts.join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Stills Archive — Pro Mode</h1>
            <p className="text-sm text-neutral-400">Dark cinematic UI • Electric blue accents</p>
          </div>
          <nav>
            <a href="/" className="text-sm text-neutral-300 underline">← Quick Mode</a>
          </nav>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <label className="block text-xs text-neutral-400 mb-2">Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Describe your subject..." className="w-full p-3 rounded bg-neutral-800 text-white outline-none" />

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-neutral-400">Studio</label>
                  <select value={studio} onChange={(e) => setStudio(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
                    <option value="random">Random</option>
                    {studios.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-neutral-400">Lighting</label>
                  <select value={lighting} onChange={(e) => setLighting(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
                    <option value="random">Random</option>
                    {lightings.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400">Weather</label>
                  <select value={weather} onChange={(e) => setWeather(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
                    <option value="random">Random</option>
                    {weathers.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400">Camera</label>
                  <select value={camera} onChange={(e) => setCamera(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
                    <option value="random">Random</option>
                    {cameras.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-neutral-400">Tone / Emotion</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
                    <option value="random">Random</option>
                    {tones.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="text-sm text-neutral-300">Variation Mode</label>
                  <button onClick={() => setVariationMode(!variationMode)} className={`px-3 py-1 rounded ${variationMode ? 'bg-blue-600' : 'bg-neutral-700'}`}>{variationMode ? 'ON' : 'OFF'}</button>

                  <label className="text-sm text-neutral-300">Cinematic Enhancers</label>
                  <button onClick={() => setUseEnhancers(!useEnhancers)} className={`px-3 py-1 rounded ${useEnhancers ? 'bg-blue-600' : 'bg-neutral-700'}`}>{useEnhancers ? 'ON' : 'OFF'}</button>
                </div>

                <div className="flex gap-2">
                  <button onClick={generate} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold">Generate 10 Prompts</button>
                  <button onClick={copyAll} className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded text-sm">Copy All</button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-neutral-900 rounded border border-neutral-800">
              <h3 className="text-sm text-neutral-300 mb-2">Generated Prompts</h3>
              {prompts.length === 0 && <p className="text-neutral-500 text-sm">No prompts yet. Enter a subject and click Generate.</p>}
              <div className="space-y-3">
                {prompts.map((p, i) => (
                  <pre key={i} className="p-3 bg-black/60 rounded text-xs text-white whitespace-pre-wrap">{p}</pre>
                ))}
              </div>
            </div>

          </div>

          <aside className="col-span-1 bg-neutral-900 p-4 rounded-lg border border-neutral-800">
            <h4 className="text-sm font-medium mb-2">Quick Presets</h4>
            <div className="space-y-2">
              <button onClick={() => { setStudio('A24 .com'); setLighting('overcast soft'); setWeather('light rain'); setCamera('ARRI Alexa 65, Zeiss 50mm'); setTone('melancholic') }} className="w-full text-left px-3 py-2 rounded bg-neutral-800">Indie Melancholy (A24)</button>
              <button onClick={() => { setStudio('Universal .com'); setLighting('golden hour'); setWeather('clear sky'); setCamera('Panavision DXL2, Cooke S4/i 75mm'); setTone('heroic') }} className="w-full text-left px-3 py-2 rounded bg-neutral-800">Epic Heroic (Universal)</button>
              <button onClick={() => { setStudio('Disney .com'); setLighting('twilight rim'); setWeather('clear sky'); setCamera('Leica SL2, Summilux 35mm'); setTone('dreamlike') }} className="w-full text-left px-3 py-2 rounded bg-neutral-800">Fantasy Magical (Disney)</button>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-medium mb-2">Tips</h5>
              <ul className="text-xs text-neutral-400 list-disc pl-4 space-y-1">
                <li>Try Variation Mode ON for unique actions per prompt.</li>
                <li>Toggle Enhancers OFF for simple base prompts.</li>
                <li>Use Copy All to paste into Midjourney or Nano Banana.</li>
              </ul>
            </div>

            {copied && <p className="mt-4 text-blue-400 text-sm">✅ Copied!</p>}
          </aside>
        </section>

        <footer className="mt-8 text-xs text-neutral-500">Made with cinematic love — deploy updated on save.</footer>
      </div>
    </div>
  )
}
