import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import PromptPanel from './components/PromptPanel'
import GenerationGrid from './components/GenerationGrid'

function App() {
  const [theme, setTheme] = useState('dark')
  const [active, setActive] = useState('generate')
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Idle')
  const [history, setHistory] = useState([])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark')
  },[theme])

  const fetchCredits = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/credits`)
      const data = await res.json()
      setCredits(data.credits ?? 0)
    } catch (e) {}
  }

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/history?limit=100`)
      const data = await res.json()
      setHistory(data.items || [])
    } catch (e) {}
  }

  useEffect(()=>{ fetchCredits(); fetchHistory(); },[])

  const simulateProgress = (durationMs) => {
    setProgress(0)
    setStatus('Analyzing prompt...')
    const steps = [
      { pct: 20, delay: durationMs*0.2, msg: 'Creating composition...' },
      { pct: 55, delay: durationMs*0.35, msg: 'Rendering details...' },
      { pct: 85, delay: durationMs*0.25, msg: 'Applying final touches...' },
      { pct: 100, delay: durationMs*0.2, msg: 'Finalizing...' },
    ]
    let acc = 0
    steps.forEach((s, i)=>{
      acc += s.delay
      setTimeout(()=>{ setProgress(s.pct); setStatus(s.msg) }, acc)
    })
  }

  const handleGenerate = async (payload) => {
    setLoading(true)
    const duration = 2500 + Math.random()*2500
    simulateProgress(duration)
    try {
      const res = await fetch(`${baseUrl}/api/generate`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      await fetchCredits()
      await fetchHistory()
    } catch (e) {
      alert(e.message)
    } finally {
      setTimeout(()=>{ setLoading(false); setStatus('Completed') }, duration)
    }
  }

  const toggleFav = async (item) => {
    try {
      await fetch(`${baseUrl}/api/generation/${item.id}/favorite?value=${!item.favorite}`, { method: 'PATCH' })
      fetchHistory()
    } catch (e) {}
  }

  const deleteItem = async (item) => {
    if (!confirm('Delete this item?')) return
    try {
      await fetch(`${baseUrl}/api/generation/${item.id}`, { method: 'DELETE' })
      fetchHistory()
    } catch (e) {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <Header active={active} onNavigate={setActive} credits={credits} onToggleTheme={()=>setTheme(t=> t==='dark'?'light':'dark')} theme={theme} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Hero />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <PromptPanel onGenerate={handleGenerate} loading={loading} />
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-200/80">Status: {status}</div>
                <div className="text-blue-200/60">Progress: {progress}%</div>
              </div>
              <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <GenerationGrid items={history} onToggleFav={toggleFav} onDelete={deleteItem} />
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-semibold mb-2">Recent generations</h3>
              <div className="space-y-2 max-h-[420px] overflow-auto pr-2">
                {history.slice(0,8).map(h => (
                  <div key={h.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                    <img src={h.images?.[0]?.url} className="w-12 h-12 rounded object-cover" />
                    <div className="text-xs text-blue-200 line-clamp-2">{h.prompt}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-semibold mb-2">Popular prompts</h3>
              <ul className="space-y-2 text-sm text-blue-200/80">
                <li>Neon cyberpunk alley, rain, reflections</li>
                <li>Cozy cabin in snowy forest, twilight</li>
                <li>Portrait, soft natural light, kodak portra</li>
                <li>Isometric city, pastel colors, flat design</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-semibold mb-2">Tips</h3>
              <ul className="text-sm text-blue-200/80 list-disc pl-5 space-y-1">
                <li>Be specific about lighting and mood</li>
                <li>Use negative prompt to avoid artifacts</li>
                <li>Try different styles for variety</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
