import { useEffect, useMemo, useRef, useState } from 'react'
import { Sparkles, Stars, Bookmark, Plus, Wand2 } from 'lucide-react'

const suggestions = [
  'A serene lake at sunrise, ultra realistic, 35mm film',
  'Cyberpunk city street at night, neon lights, rain, reflective',
  'Studio portrait of a golden retriever wearing glasses',
  'Astronaut riding a horse on Mars, dramatic lighting',
  'Origami dragon made of galaxies, cosmic dust, bokeh',
]

const styles = ['Realistic','Artistic','Anime','3D Render','Oil Painting','Cyberpunk','Sketch','Watercolor']

export default function PromptPanel({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState('')
  const [neg, setNeg] = useState('')
  const [num, setNum] = useState(2)
  const [style, setStyle] = useState('Realistic')
  const [ar, setAr] = useState('1:1')
  const [quality, setQuality] = useState('Standard')
  const [cfg, setCfg] = useState(7)
  const [steps, setSteps] = useState(30)
  const [seed, setSeed] = useState('')
  const [model, setModel] = useState('Stable-Diffusion-XL')

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleGenerate()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleGenerate = () => {
    if (!prompt.trim() || loading) return
    const settings = { aspect_ratio: ar, num_images: num, style, quality, cfg_scale: cfg, steps, seed: seed? Number(seed): undefined, model }
    onGenerate({ prompt, negative_prompt: neg || undefined, settings })
  }

  const enhancePrompt = () => {
    if (!prompt) return
    setPrompt(prev => prev + ', ultra detailed, volumetric lighting, high contrast, professional, masterpiece')
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6 text-blue-100">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <textarea
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            rows={3}
            placeholder="Describe your image..."
            className="w-full resize-y bg-slate-900/40 border border-white/10 rounded-xl p-4 outline-none focus:ring-2 ring-blue-500/50 placeholder:text-blue-200/40"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((s, i)=> (
              <button key={i} onClick={()=>setPrompt(s)} className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs border border-white/10">{s}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <button onClick={enhancePrompt} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/20">
            <Wand2 size={16}/>
            Improve my prompt
          </button>
          <button onClick={handleGenerate} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 disabled:opacity-50">
            <Sparkles size={18}/>
            {loading? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="space-y-1">
          <label className="text-xs text-blue-200/60">Style</label>
          <select value={style} onChange={(e)=>setStyle(e.target.value)} className="w-full bg-slate-900/40 border border-white/10 rounded-lg p-2">
            {styles.map(s=> <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-blue-200/60">Aspect Ratio</label>
          <select value={ar} onChange={(e)=>setAr(e.target.value)} className="w-full bg-slate-900/40 border border-white/10 rounded-lg p-2">
            {['1:1','16:9','9:16','4:3','3:4','custom'].map(s=> <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-blue-200/60">Quality</label>
          <select value={quality} onChange={(e)=>setQuality(e.target.value)} className="w-full bg-slate-900/40 border border-white/10 rounded-lg p-2">
            {['Draft','Standard','HD','Ultra HD'].map(s=> <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-blue-200/60">Images</label>
          <input type="number" min={1} max={4} value={num} onChange={(e)=>setNum(Number(e.target.value))} className="w-full bg-slate-900/40 border border-white/10 rounded-lg p-2"/>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-blue-200/60">CFG Scale</label>
          <input type="range" min={1} max={20} step={0.5} value={cfg} onChange={(e)=>setCfg(Number(e.target.value))} className="w-full"/>
          <div className="text-xs text-blue-200/60">{cfg}</div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-blue-200/60">Steps</label>
          <input type="range" min={5} max={150} value={steps} onChange={(e)=>setSteps(Number(e.target.value))} className="w-full"/>
          <div className="text-xs text-blue-200/60">{steps}</div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-blue-200/60">Seed</label>
          <input value={seed} onChange={(e)=>setSeed(e.target.value)} placeholder="optional" className="w-full bg-slate-900/40 border border-white/10 rounded-lg p-2"/>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-blue-200/60">Model</label>
          <select value={model} onChange={(e)=>setModel(e.target.value)} className="w-full bg-slate-900/40 border border-white/10 rounded-lg p-2">
            {['Stable-Diffusion-XL','SD Turbo','Playground v2.5','Flux Pro'].map(m=> <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="col-span-2 space-y-1">
          <label className="text-xs text-blue-200/60">Negative Prompt</label>
          <input value={neg} onChange={(e)=>setNeg(e.target.value)} placeholder="what to avoid" className="w-full bg-slate-900/40 border border-white/10 rounded-lg p-2"/>
        </div>
      </div>
    </div>
  )
}
