"use client"
export default function ControlsPanel(props) {
  const {
    subject, setSubject,
    mode, setMode,
    studio, setStudio,
    lighting, setLighting,
    weather, setWeather,
    camera, setCamera,
    lens, setLens,
    tone, setTone,
    preset, setPreset, applyPreset,
    duration, setDuration,
    fps, setFps,
    easing, setEasing,
    physics, setPhysics,
    grain, setGrain,
    bloom, setBloom,
    saturation, setSaturation,
    modelEngine, setModelEngine,
    aspectRatio, setAspectRatio
  } = props

  const studios = ["random","Universal .com","A24 .com","Warner Bros .com","Disney .com","Netflix .com","Paramount .com","Sony Pictures .com"]
  const lightings = ["random","golden hour","neon night","overcast soft","candlelit low","volumetric backlight"]
  const weathers = ["random","clear","light rain","heavy rain","fog","sandstorm","snow"]
  const cameras = ["random","ARRI Alexa 65","RED Komodo 6K","Sony Venice 2","Leica SL2","Panavision DXL2","Blackmagic URSA 12K"]
  const tones = ["random","epic","melancholic","dreamlike","ominous","heroic","intimate"]
  const easings = ["smooth","ease-in-out","linear","spring"]

  const modelOptions = ["NanoBanana","Midjourney V6","Midjourney V5","Midjourney Niji","Stable Diffusion XL"]
  const aspectOptions = ["1:1","4:5","3:2","16:9","20:9","9:16","2.39:1","IMAX"]

  return (
    <div className="bg-neutral-900 p-4 rounded border border-neutral-800">
      <label className="block text-xs text-neutral-400">Subject</label>
      <input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Describe your subject..." className="w-full p-3 rounded bg-neutral-800 text-white mb-3" />

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="text-xs text-neutral-400">Mode</label>
          <select value={mode} onChange={e=>setMode(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            <option value="image">Image</option>
            <option value="2d">2D Animation (smooth)</option>
            <option value="3d">3D Animation (cinematic)</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Model Engine</label>
          <select value={modelEngine} onChange={e=>setModelEngine(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            {modelOptions.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Aspect Ratio</label>
          <select value={aspectRatio} onChange={e=>setAspectRatio(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            {aspectOptions.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Preset</label>
          <select value={preset} onChange={(e)=>setPreset(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            <option value="none">None</option>
            <option value="indie-melancholy">Indie Melancholy</option>
            <option value="epic-heroic">Epic Heroic</option>
            <option value="neon-sci">Neon Sci</option>
            <option value="ghibli-2d">Ghibli 2D</option>
            <option value="dune-desert">Dune Desert</option>
            <option value="noir-bleach">Noir Bleach</option>
            <option value="rainy-bluish">Rainy Bluish</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Studio</label>
          <select value={studio} onChange={e=>setStudio(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            {studios.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Lighting</label>
          <select value={lighting} onChange={e=>setLighting(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            {lightings.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Weather</label>
          <select value={weather} onChange={e=>setWeather(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            {weathers.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Camera</label>
          <select value={camera} onChange={e=>setCamera(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            {cameras.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="col-span-1">
          <label className="text-xs text-neutral-400">Lens</label>
          <input value={lens} onChange={e=>setLens(e.target.value)} className="w-full p-2 rounded bg-neutral-800" />
        </div>

        <div className="col-span-1">
          <label className="text-xs text-neutral-400">Tone</label>
          <select value={tone} onChange={e=>setTone(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            {tones.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="text-xs text-neutral-400">Duration (s)</label>
          <input type="number" value={duration} onChange={e=>setDuration(Number(e.target.value))} className="w-full p-2 rounded bg-neutral-800" />
        </div>

        <div>
          <label className="text-xs text-neutral-400">FPS</label>
          <input type="number" value={fps} onChange={e=>setFps(Number(e.target.value))} className="w-full p-2 rounded bg-neutral-800" />
        </div>

        <div>
          <label className="text-xs text-neutral-400">Easing</label>
          <select value={easing} onChange={e=>setEasing(e.target.value)} className="w-full p-2 rounded bg-neutral-800">
            {easings.map(x => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Physics</label>
          <select value={physics ? "real" : "stylized"} onChange={e=>setPhysics(e.target.value === "real")} className="w-full p-2 rounded bg-neutral-800">
            <option value="real">Realistic</option>
            <option value="stylized">Stylized</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-neutral-400">Film Grain: {grain.toFixed(2)}</label>
        <input type="range" min="0" max="1" step="0.01" value={grain} onChange={e=>setGrain(Number(e.target.value))} className="w-full" />

        <label className="text-xs text-neutral-400">Bloom: {bloom.toFixed(2)}</label>
        <input type="range" min="0" max="1" step="0.01" value={bloom} onChange={e=>setBloom(Number(e.target.value))} className="w-full" />

        <label className="text-xs text-neutral-400">Saturation: {saturation.toFixed(2)}</label>
        <input type="range" min="-1" max="1" step="0.01" value={saturation} onChange={e=>setSaturation(Number(e.target.value))} className="w-full" />
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={applyPreset} className="text-base px-3 py-1.5 bg-blue-600 rounded">Apply Preset</button>
        <button onClick={()=>{ setPreset("none"); setStudio("random"); setLighting("random"); setWeather("random"); setCamera("random"); setTone("random") }} className="text-base px-3 py-1.5 bg-neutral-800 rounded">Reset Panel</button>
      </div>
    </div>
  )
}
