"use client"

import { useState } from "react"
import ControlsPanel from "./components/ControlsPanel"
import PromptList from "./components/PromptList"

export default function ProPage() {
  const [subject, setSubject] = useState("")
  const [mode, setMode] = useState("image") // image | 2d | 3d
  const [studio, setStudio] = useState("random")
  const [lighting, setLighting] = useState("random")
  const [weather, setWeather] = useState("random")
  const [camera, setCamera] = useState("random")
  const [lens, setLens] = useState("50mm")
  const [tone, setTone] = useState("random")
  const [preset, setPreset] = useState("none")
  const [duration, setDuration] = useState(6) // seconds for animation
  const [fps, setFps] = useState(30)
  const [easing, setEasing] = useState("smooth")
  const [physics, setPhysics] = useState(true)
  const [grain, setGrain] = useState(0.4)
  const [bloom, setBloom] = useState(0.3)
  const [saturation, setSaturation] = useState(0)
  const [prompts, setPrompts] = useState([])
  const [copied, setCopied] = useState(false)

  // Small lookup lists (kept concise here for clarity)
  const studios = ["Universal .com","A24 .com","Warner Bros .com","Disney .com","Netflix .com","Paramount .com","Sony Pictures .com"]
  const lightings = ["golden hour","neon night","overcast soft","candlelit low","studio key & fill","volumetric backlight"]
  const weathers = ["clear","light rain","heavy rain","fog","sandstorm","snow"]
  const cameras = ["ARRI Alexa 65","RED Komodo 6K","Sony Venice 2","Leica SL2","Panavision DXL2","Blackmagic URSA 12K"]
  const tones = ["epic","melancholic","dreamlike","ominous","heroic","intimate"]
  const presets = {
    "none": {},
    "indie-melancholy": {studio:"A24 .com", lighting:"overcast soft", weather:"light rain", tone:"melancholic"},
    "epic-heroic": {studio:"Universal .com", lighting:"golden hour", weather:"clear", tone:"heroic"},
    "neon-sci": {studio:"Sony Pictures .com", lighting:"neon night", weather:"light rain", tone:"dreamlike"},
    "ghibli-2d": {studio:"Studio Ghibli .com", lighting:"golden hour", weather:"clear", tone:"dreamlike"},
  }

  function applyPreset(name) {
    if (name === "none") return
    const p = presets[name] || {}
    if (p.studio) setStudio(p.studio)
    if (p.lighting) setLighting(p.lighting)
    if (p.weather) setWeather(p.weather)
    if (p.tone) setTone(p.tone)
  }

  function choose(list, forced) {
    if (forced && forced !== "random") return forced
    return list[Math.floor(Math.random()*list.length)]
  }

  function buildPromptVariant(idx) {
    const s = choose(studios, studio)
    const l = choose(lightings, lighting)
    const w = choose(weathers, weather)
    const c = choose(cameras, camera)
    const t = choose(tones, tone)

    // base action variations (index-based)
    const actions = [
      "walking across a vast wasteland",
      "trudging through cracked desert",
      "standing on a ridge facing the wind",
      "stumbling through a ruined city street",
      "gazing at a distant ruined skyline",
      "silhouetted against a low sun",
      "caught in a gust of sand and dust",
      "bracing against heavy wind",
      "pausing while scanning the horizon",
      "tracing footsteps across empty plains"
    ]
    const action = actions[idx % actions.length]

    // Common token block
    const filmTokens = `35mm film texture, film grain ${+grain.toFixed(2)}, bloom ${+bloom.toFixed(2)}, saturation ${+saturation.toFixed(2)}`

    // Mode-specific animation block
    let animBlock = ""
    if (mode === "2d") {
      animBlock = `, animation: 2D smooth ${duration}s @ ${fps}fps, easing ${easing}, physics:${physics ? "realistic" : "stylized"}, style: hand-painted -> photoreal blend`
    } else if (mode === "3d") {
      animBlock = `, animation: 3D cinematic ${duration}s @ ${fps}fps, camera: dolly/orbit, lens: ${lens}, physical lighting, real-world physics ${physics ? "ON" : "OFF"}`
    }

    // Compose final single-paragraph prompt (with hashtags metadata for parsing)
    const prompt = `#prompt_${idx+1}
#mode ${mode}
#token stills archive, ${s}
#studio ${s}
#lighting ${l}
#weather ${w}
#camera ${c}
#lens ${lens}
#tone ${t}
#subject ${subject}
#final stills archive, ${s} — cinematic ${mode === "image" ? "movie still" : (mode === "2d" ? "2D animated still" : "3D animated shot")} of ${subject} ${action}, ${l} lighting, ${w} conditions, captured using ${c} with ${lens}, ${t} tone, ${filmTokens}${animBlock} —ar 2.39:1 --q 2 --v 6`

    return prompt
  }

  function generateAll() {
    if (!subject.trim()) return alert("Please enter a subject or scene.")
    applyPreset(preset)
    const out = []
    for (let i=0;i<10;i++){
      out.push(buildPromptVariant(i))
    }
    setPrompts(out)
  }

  function copyAll() {
    if (!prompts.length) return
    const text = prompts.join("\n\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(()=>setCopied(false),2000)
  }

  function downloadJSON() {
    const payload = {subject, mode, studio, lighting, weather, camera, lens, tone, duration, fps, easing, physics, grain, bloom, saturation, prompts}
    const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "stills_prompts.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Stills Archive — Pro Mode</h1>
            <p className="text-sm text-neutral-400">Advanced image + 2D/3D animation prompt studio • Electric blue accents</p>
          </div>
          <nav className="space-x-4">
            <a href="/" className="text-sm text-neutral-300 underline">← Quick Mode</a>
            <span className="px-3 py-1 rounded text-xs bg-blue-700">Live</span>
          </nav>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <ControlsPanel
              subject={subject} setSubject={setSubject}
              mode={mode} setMode={setMode}
              studio={studio} setStudio={setStudio}
              lighting={lighting} setLighting={setLighting}
              weather={weather} setWeather={setWeather}
              camera={camera} setCamera={setCamera}
              lens={lens} setLens={setLens}
              tone={tone} setTone={setTone}
              preset={preset} setPreset={setPreset}
              applyPreset={()=>applyPreset(preset)}
              duration={duration} setDuration={setDuration}
              fps={fps} setFps={setFps}
              easing={easing} setEasing={setEasing}
              physics={physics} setPhysics={setPhysics}
              grain={grain} setGrain={setGrain}
              bloom={bloom} setBloom={setBloom}
              saturation={saturation} setSaturation={setSaturation}
            />

            <div className="flex gap-3">
              <button onClick={generateAll} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold">Generate 10 Prompts</button>
              <button onClick={copyAll} className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded">Copy All</button>
              <button onClick={downloadJSON} className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded">Export JSON</button>
              {copied && <div className="text-blue-400 px-2">✅ Copied</div>}
            </div>

            <PromptList prompts={prompts} />
          </div>

          <aside className="bg-neutral-900 p-4 rounded border border-neutral-800">
            <h4 className="text-sm font-medium mb-2">Quick Presets</h4>
            <div className="space-y-2">
              <button onClick={()=>{ setPreset("indie-melancholy"); applyPreset("indie-melancholy") }} className="w-full px-3 py-2 rounded bg-neutral-800">Indie Melancholy</button>
              <button onClick={()=>{ setPreset("epic-heroic"); applyPreset("epic-heroic") }} className="w-full px-3 py-2 rounded bg-neutral-800">Epic Heroic</button>
              <button onClick={()=>{ setPreset("neon-sci"); applyPreset("neon-sci") }} className="w-full px-3 py-2 rounded bg-neutral-800">Neon Sci-Fi</button>
              <button onClick={()=>{ setPreset("ghibli-2d"); applyPreset("ghibli-2d") }} className="w-full px-3 py-2 rounded bg-neutral-800">Ghibli 2D</button>
            </div>

            <div className="mt-6 text-xs text-neutral-400">
              <p className="mb-2">Tips</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Use <strong>Mode = 2D</strong> for smooth, frame-aware style prompts (good for Nano Banana / stylized pipelines).</li>
                <li>Use <strong>Mode = 3D</strong> for camera-centric prompts (targeting 3D render bake workflows or photoreal virtual production).</li>
                <li>Export JSON to run batch renders or store metadata for later VFX pipelines.</li>
              </ul>
            </div>
          </aside>
        </div>

      </div>
    </div>
  )
}
