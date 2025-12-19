"use client"

import { useState } from "react"
import ControlsPanel from "./components/ControlsPanel"
import PromptList from "./components/PromptList"

/**
 * Pro Mode — page.jsx
 * Medium Safety Transformer + NanoBanana AR engine
 */

export default function ProPage() {
  const defaultState = {
    subject: "",
    mode: "image",
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
    saturation: 0
  }

  // state
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

  const [modelEngine, setModelEngine] = useState("NanoBanana")
  const [aspectRatio, setAspectRatio] = useState("2.39:1")
  const [prompts, setPrompts] = useState([])
  const [copied, setCopied] = useState(false)

  // lists
  const studios = ["Universal .com","A24 .com","Warner Bros .com","Disney .com","Netflix .com","Paramount .com","Sony Pictures .com","Columbia .com"]
  const lightings = ["golden hour","neon night","overcast soft","candlelit low","studio key & fill","volumetric backlight"]
  const weathers = ["clear","light rain","heavy rain","fog","sandstorm","snow"]
  const cameras = ["ARRI Alexa 65","RED Komodo 6K","Sony Venice 2","Leica SL2","Panavision DXL2","Blackmagic URSA 12K"]
  const tones = ["epic","melancholic","dreamlike","ominous","heroic","intimate"]

  // presets
  const presets = {
    "none": {},
    "indie-melancholy": {studio:"A24 .com", lighting:"overcast soft", weather:"light rain", tone:"melancholic"},
    "epic-heroic": {studio:"Universal .com", lighting:"golden hour", weather:"clear", tone:"heroic"},
    "neon-sci": {studio:"Sony Pictures .com", lighting:"neon night", weather:"light rain", tone:"dreamlike"},
    "ghibli-2d": {studio:"Studio Ghibli .com", lighting:"golden hour", weather:"clear", tone:"dreamlike", mode:"2d"},
    "dune-desert": {studio:"Paramount .com", lighting:"high noon hard light", weather:"sandstorm", tone:"epic"},
    "noir-bleach": {studio:"Warner Bros .com", lighting:"candlelit low", weather:"fog", tone:"ominous"},
    "rainy-bluish": {studio:"Netflix .com", lighting:"volumetric backlight", weather:"heavy rain", tone:"melancholic"}
  }

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
  setSubject("")
  setPrompts([])
}


  function choose(list, forced) {
    if (forced && forced !== "random") return forced
    return list[Math.floor(Math.random()*list.length)]
  }

  // ----------------------
  // Safety Transformer (Medium)
  // a set of targeted rewrite rules that transform literal triggers
  // into safe cinematic descriptions, while keeping expressiveness.
  // ----------------------
  function safetyTransformText(text) {
    if (!text) return text
    let out = String(text)

    // Lighting / object triggers -> non-objective phrases
    out = out.replace(/\bcandlelit\b/gi, "warm low-key ambient glow with golden falloff (no visible candles)")
    out = out.replace(/\bcandlelight\b/gi, "warm golden ambient illumination (no visible candles)")
    out = out.replace(/\bspotlight\b/gi, "focused highlight sculpting the subject")
    out = out.replace(/\bstage light(s)?\b/gi, "professional soft illumination")
    out = out.replace(/\bneon-lit\b/gi, "vibrant edge-lit neon tones (no neon signs visible)")
    out = out.replace(/\bneon\b/gi, "vibrant edge-lit highlights")
    out = out.replace(/\bheadlight(s)?\b/gi, "directional rim highlights")

    // Camera / lens -> visual style phrasing (avoid camera bodies in frame)
    out = out.replace(/\bshot on\s+ARRI\s*Alexa\s*65\b/gi, "ARRI-style color science and cinematic depth")
    out = out.replace(/\bARRI\s*Alexa\s*65\b/gi, "ARRI-style color profile")
    out = out.replace(/\bRED\s*Komodo\b/gi, "high-end cinematic color profile")
    out = out.replace(/\b(shot on|captured using|captured with)\s*(a|an)?\s*(camera|ARRI|RED|Blackmagic|Sony|Panavision)[^.,;]*/gi,
                      (m) => m.replace(/(shot on|captured using|captured with)/gi, "rendered with").replace(/camera/gi,""))
    // common numeric lens mentions -> translate to "shot with Xmm-style field of view"
    out = out.replace(/\b(\d{2,3})mm\b/gi, (m, mm) => ` ${mm}mm-style field of view`)
    out = out.replace(/\b50mm-style field of view mm-style?/gi, "50mm-style field of view") // idempotent

    // Avoid literal 'frame' or 'picture frame'
    out = out.replace(/\bframe\b/gi, "composition")
    out = out.replace(/\bpicture frame\b/gi, "compositional frame")

    // Environment triggers -> mood-only phrases
    out = out.replace(/\bfoggy\b/gi, "soft muted atmosphere with gentle diffusion (subtle haze, no dense fog props)")
    out = out.replace(/\bfog\b/gi, "subtle atmospheric haze")
    out = out.replace(/\brainy\b/gi, "cool reflective surfaces and moisture-inspired sheen")
    out = out.replace(/\brain\b/gi, "light reflective moisture sheen")
    out = out.replace(/\bsmoke\b/gi, "soft volumetric diffusion (no smoke props)")
    out = out.replace(/\bdusty\b/gi, "warm textured ambience with subtle particulate glow")
    out = out.replace(/\bsandstorm\b/gi, "fine wind-driven particulate atmosphere (no flying debris)")

    // Avoid clothing / accessory injection by rewriting 'vibe' or 'style' into color/lighting
    out = out.replace(/\bstreet vibe\b/gi, "urban-inspired cinematic mood without adding clothing props")
    out = out.replace(/\bcozy scene\b/gi, "intimate warm atmosphere (no furniture added)")
    out = out.replace(/\bromantic\b/gi, "warm intimate emotional tone")

    // Avoid explicit 'add X' or 'with X props' patterns
    out = out.replace(/\bwith (a )?(camera|tripod|lens|microphone|boom|lights|lighting rig)\b/gi, "")
    out = out.replace(/\bfeaturing (a )?(camera|tripod|lens|microphone|boom)\b/gi, "")

    // Magic / energy / effects -> only if explicitly requested keep as 'subtle'
    out = out.replace(/\bglow(ing)?\b/gi, "soft luminous glow (subtle)")
    out = out.replace(/\bsparks?\b/gi, "small spark-like highlights (subtle, no particles)")
    out = out.replace(/\baura\b/gi, "soft halo of backlight")

    // Facial feature protections
    out = out.replace(/\bexaggerated (expression|features)\b/gi, "subtle dramatic expression")
    out = out.replace(/\bintense expression\b/gi, "subtle dramatic tension in the face")

    // Final safety blanket for Medium mode (keeps creative freedom but forbids unexpected objects)
    const safetySuffix = " — without introducing additional objects, props, equipment, or visible camera gear, keep the scene cinematic and clean."

    // avoid double-appending if already present
    if (!/without introducing additional objects/i.test(out)) {
      out = out + safetySuffix
    }

    return out
  }

  // ----------------------
  // Aspect Ratio Engine (already tailored for NanoBanana vs Midjourney)
  // ----------------------
  function getARInstruction(engine, ar) {
    const map = {
      "1:1": { nano: "square 1:1 composition, centered composition", mj: "--ar 1:1" },
      "4:5": { nano: "vertical portrait composition, full-body balanced framing", mj: "--ar 4:5" },
      "3:2": { nano: "classic 3:2 photography aspect, balanced composition", mj: "--ar 3:2" },
      "16:9": { nano: "widescreen 16:9 landscape composition", mj: "--ar 16:9" },
      "20:9": { nano: "tall phone portrait cinematic composition", mj: "--ar 20:9" },
      "9:16": { nano: "vertical portrait composition, cinematic 9:16 framing", mj: "--ar 9:16" },
      "2.39:1": { nano: "ultra-wide anamorphic frame, cinematic widescreen composition", mj: "--ar 2.39:1" },
      "IMAX": { nano: "IMAX-style tall frame, grand scale composition", mj: "--ar 1.90:1" }
    }
    const picked = map[ar] || map["2.39:1"]
    if (engine && engine.toLowerCase().includes("midjourney")) {
      return { body: "", flag: picked.mj || "" }
    } else {
      return { body: picked.nano, flag: "" }
    }
  }

  // ----------------------
  // Build single prompt (applies safetyTransform to the subject and art directives)
  // ----------------------
  function buildPromptVariant(idx) {
    const s = choose(studios, studio)
    const l = choose(lightings, lighting)
    const w = choose(weathers, weather)
    const c = choose(cameras, camera)
    const t = choose(tones, tone)

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

    // Safe lens phrasing: avoid explicit camera bodies in subject
    const lensPhrase = lens ? `shot with ${lens} lens, ARRI color science` : ""

    const filmTokens = `35mm film texture, film grain ${grain.toFixed(2)}, bloom ${bloom.toFixed(2)}, saturation ${saturation.toFixed(2)}`

    let animBlock = ""
    if (mode === "2d") {
      animBlock = `, animation: 2D smooth ${duration}s @${fps}fps, easing ${easing}, physics:${physics ? "realistic" : "stylized"}, style: hand-painted -> photoreal blend`
    } else if (mode === "3d") {
      animBlock = `, animation: 3D cinematic ${duration}s @${fps}fps, camera motion: dolly/orbit, lens: ${lens}, physical lighting, physics:${physics ? "ON" : "OFF"}`
    }

    // Build base (subject + directives)
    let rawSubject = `${subject} ${action}`
    // safety transform the raw subject and other descriptors
    const safeSubjectBlock = safetyTransformText(rawSubject)

    // aspect
    const arInstr = getARInstruction(modelEngine, aspectRatio)

    // Compose final prompt
    let base = `#prompt_${idx+1}
#mode ${mode}
#token stills archive, ${s}
#studio ${s}
#lighting ${l}
#weather ${w}
#camera ${c}
#lens ${lens}
#tone ${t}
#subject ${subject}
#final stills archive, ${s} — cinematic ${mode === "image" ? "movie still" : (mode === "2d" ? "2D animated still" : "3D animated shot")} of ${safeSubjectBlock}, ${l} lighting, ${w} conditions, ${lensPhrase}, ${t} tone, ${filmTokens}${animBlock}`

    // Append AR phrasing or flags depending on model
    if (arInstr.body) base = base + `, ${arInstr.body}`
    if (arInstr.flag && modelEngine.toLowerCase().includes("midjourney")) {
      base = base + ` ${arInstr.flag} --q 2 --v 6`
    } else {
      base = base + `, high-fidelity, photorealistic, ultra-detailed`
    }

    return base
  }

  function generateAll() {
    if (!subject.trim()) { alert("Please enter a subject or scene."); return }
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
    const payload = {meta:{subject,modelEngine,aspectRatio,mode,studio,lighting,weather,camera,lens,tone,duration,fps,easing,physics,grain,bloom,saturation},prompts}
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
            <p className="text-sm text-neutral-400">Advanced image + 2D/3D animation prompt studio • Electric blue accents • Safety: Medium</p>
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
              modelEngine={modelEngine} setModelEngine={setModelEngine}
              aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
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
                <li>Model selector changes prompt format (NanoBanana vs Midjourney).</li>
                <li>Aspect engine converts numeric AR into safe phrasing for NanoBanana and flags for Midjourney.</li>
                <li>Safety Transformer (Medium) rewrites risky tokens into safe cinematic language and adds a protective suffix.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

