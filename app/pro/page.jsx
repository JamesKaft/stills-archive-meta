"use client"

import { useState } from "react"
import ControlsPanel from "./components/ControlsPanel"
import PromptList from "./components/PromptList"

export default function ProPage() {
  // --- state (defaults) ---
  const defaultState = {
    subject: "",
    mode: "image", // image | 2d | 3d
    studio: "random",
    lighting: "random",
    weather: "random",
    camera: "random",
    lens: "50mm",
    tone: "random",
    preset: "none",
    duration: 6,
    fps: 30,
    easing: "smooth",
    physics: true,
    grain: 0.4,
    bloom: 0.3,
    saturation: 0,
  }

  const [subject, setSubject] = useState(defaultState.subject)
  const [mode, setMode] = useState(defaultState.mode)
  const [studio, setStudio] = useState(defaultState.studio)
  const [lighting, setLighting] = useState(defaultState.lighting)
  const [weather, setWeather] = useState(defaultState.weather)
  const [camera, setCamera] = useState(defaultState.camera)
  const [lens, setLens] = useState(defaultState.lens)
  const [tone, setTone] = useState(defaultState.tone)
  const [preset, setPreset] = useState(defaultState.preset)
  const [duration, setDuration] = useState(defaultState.duration)
  const [fps, setFps] = useState(defaultState.fps)
  const [easing, setEasing] = useState(defaultState.easing)
  const [physics, setPhysics] = useState(defaultState.physics)
  const [grain, setGrain] = useState(defaultState.grain)
  const [bloom, setBloom] = useState(defaultState.bloom)
  const [saturation, setSaturation] = useState(defaultState.saturation)

  const [prompts, setPrompts] = useState([])
  const [copied, setCopied] = useState(false)

  // --- lists ---
  const studios = ["Universal .com","A24 .com","Warner Bros .com","Disney .com","Netflix .com","Paramount .com","Sony Pictures .com","Columbia .com"]
  const lightings = ["golden hour","neon night","overcast soft","candlelit low","studio key & fill","volumetric backlight"]
  const weathers = ["clear","light rain","heavy rain","fog","sandstorm","snow"]
  const cameras = ["ARRI Alexa 65","RED Komodo 6K","Sony Venice 2","Leica SL2","Panavision DXL2","Blackmagic URSA 12K"]
  const tones = ["epic","melancholic","dreamlike","ominous","heroic","intimate"]

  // --- preset pack (starter set) ---
  const presets = {
    "none": {},
    "indie-melancholy": {studio:"A24 .com", lighting:"overcast soft", weather:"light rain", tone:"melancholic"},
    "epic-heroic": {studio:"Universal .com", lighting:"golden hour", weather:"clear", tone:"heroic"},
    "neon-sci": {studio:"Sony Pictures .com", lighting:"neon night", weather:"light rain", tone:"dreamlike"},
    "ghibli-2d": {studio:"Studio Ghibli .com", lighting:"golden hour", weather:"clear", tone:"dreamlike", mode:"2d"},
    "dune-desert": {studio:"Paramount .com", lighting:"high noon hard light", weather:"sandstorm", tone:"epic"},
    "noir-bleach": {studio:"Warner Bros .com", lighting:"candlelit low", weather:"fog", tone:"ominous"},
    "rainy-bluish": {studio:"Netflix .com", lighting:"volumetric backlight", weather:"heavy rain", tone:"melancholic"},
  }

  // --- utilities ---
  function applyPreset(name) {
    if (!name || name === "none") return
    const p = presets[name] || {}
    if (p.studio) setStudio(p.studio)
    if (p.lighting) setLighting(p.lighting)
    if (p.weather) setWeather(p.weather)
    if (p.tone) setTone(p.tone)
    if (p.mode) setMode(p.mode)
  }

  function resetAll() {
    setSubject(defaultState.subject)
    setMode(defaultState.mode)
    setStudio(defaultState.studio)
    setLighting(defaultState.lighting)
    setWeather(defaultState.weather)
    setCamera(defaultState.camera)
    setLens(defaultState.lens)
    setTone(defaultState.tone)
    setPreset(defaultState.preset)
    setDuration(defaultState.duration)
    setFps(defaultState.fps)
    setEasing(defaultState.easing)
    setPhysics(defaultState.physics)
    setGrain(defaultState.grain)
    setBloom(defaultState.bloom)
    setSaturation(defaultState.saturation)
    setPrompts([])
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

    // actions for variation
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

    // film tokens and safe camera phrasing to avoid camera appearing in-frame
    const filmTokens = `35mm film texture, film grain ${grain.toFixed(2)}, bloom ${bloom.toFixed(2)}, saturation ${saturation.toFixed(2)}`
    const lensPhrase = lens ? `shot on ${lens} lens, ARRI color science` : `shot on ${lens}`

    // animation / motion block
    let animBlock = ""
    if (mode === "2d") {
      animBlock = `, animation: 2D smooth ${duration}s @${fps}fps, easing ${easing}, physics:${physics ? "realistic" : "stylized"}, style: hand-painted -> photoreal blend`
    } else if (mode === "3d") {
      animBlock = `, animation: 3D cinematic ${duration}s @${fps}fps, camera motion: dolly/orbit, lens: ${lens}, physical lighting, physics:${physics ? "ON" : "OFF"}`
    }

    // final prompt uses safe camera wording (no "camera in frame")
    const final = `#prompt_${idx+1}
#mode ${mode}
#token stills archive, ${s}
#studio ${s}
#lighting ${l}
#weather ${w}
#camera ${c}
#lens ${lens}
#tone ${t}
#subject ${subject}
#final stills archive, ${s} — cinematic ${mode === "image" ? "movie still" : (mode === "2d" ? "2D animated still" : "3D animated shot")} of ${subject} ${action}, ${l} lighting, ${w} conditions, ${lensPhrase}, ${t} tone, ${filmTokens}${animBlock} —ar 2.39:1 --q 2 --v 6`

    return final
  }

  function generateAll() {
    if (!subject.trim()) { alert("Please enter a subject or scene."); return }
    // apply preset if chosen
    applyPreset(preset)
    const out = []
    for (let i=0;i<10;i++) out.push(buildPromptVariant(i))
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
    const payload = {meta:{subject,mode,studio,lighting,weather,camera,lens,tone,duration,fps,easing,physics,grain,bloom,saturation},prompts}
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
              <button onClick={generateAll} className="text-base px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded font-semibold">Generate 10 Prompts</button>
              <button onClick={copyAll} className="text-base px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded">Copy All</button>
              <button onClick={downloadJSON} className="text-base px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded">Export JSON</button>
              <button onClick={resetAll} className="text-base px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded">Reset</button>
              {copied && <div className="text-blue-400 px-2">✅ Copied</div>}
            </div>

            <PromptList prompts={prompts} />
          </div>

          <aside className="bg-neutral-900 p-4 rounded border border-neutral-800">
            <h4 className="text-sm font-medium mb-2">Quick Presets</h4>
            <div className="space-y-2">
              <button onClick={()=>{ setPreset("indie-melancholy"); applyPreset("indie-melancholy") }} className="w-full px-3 py-2 rounded bg-neutral-800 text-sm">Indie Melancholy</button>
              <button onClick={()=>{ setPreset("epic-heroic"); applyPreset("epic-heroic") }} className="w-full px-3 py-2 rounded bg-neutral-800 text-sm">Epic Heroic</button>
              <button onClick={()=>{ setPreset("neon-sci"); applyPreset("neon-sci") }} className="w-full px-3 py-2 rounded bg-neutral-800 text-sm">Neon Sci-Fi</button>
              <button onClick={()=>{ setPreset("ghibli-2d"); applyPreset("ghibli-2d") }} className="w-full px-3 py-2 rounded bg-neutral-800 text-sm">Ghibli 2D</button>
              <button onClick={()=>{ setPreset("dune-desert"); applyPreset("dune-desert") }} className="w-full px-3 py-2 rounded bg-neutral-800 text-sm">Dune Desert</button>
              <button onClick={()=>{ setPreset("noir-bleach"); applyPreset("noir-bleach") }} className="w-full px-3 py-2 rounded bg-neutral-800 text-sm">Noir Bleach</button>
              <button onClick={()=>{ setPreset("rainy-bluish"); applyPreset("rainy-bluish") }} className="w-full px-3 py-2 rounded bg-neutral-800 text-sm">Rainy Bluish</button>
            </div>

            <div className="mt-6 text-xs text-neutral-400">
              <p className="mb-2">Tips</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Use <strong>Mode = 2D</strong> for smooth, frame-aware style prompts (good for Nano Banana).</li>
                <li>Use <strong>Mode = 3D</strong> for camera-centric prompts and CGI pipelines.</li>
                <li>Export JSON to run batch renders or store metadata for VFX pipelines.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
