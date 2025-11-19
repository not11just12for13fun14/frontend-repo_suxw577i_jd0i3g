import { useState } from 'react'
import { Download, Heart, Share2, Trash2, Maximize2, Wand2, Shuffle } from 'lucide-react'

export default function GenerationGrid({ items, onToggleFav, onDelete }) {
  const [active, setActive] = useState(null)

  const download = async (url, format='png') => {
    const res = await fetch(url)
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `image.${format}`
    a.click()
  }

  return (
    <div>
      {items.length === 0 && (
        <div className="text-center text-blue-200/60 py-20">No generations yet. Try creating something!</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((g) => (
          <div key={g.id} className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={g.images?.[0]?.url} alt="gen" className="w-full h-64 object-cover" loading="lazy"/>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-xs text-blue-200 line-clamp-2 max-w-[65%]">{g.prompt}</div>
              <div className="flex items-center gap-1">
                <button onClick={()=>download(g.images?.[0]?.url, g.images?.[0]?.format)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white" title="Download"><Download size={16}/></button>
                <button onClick={()=>onToggleFav(g)} className={`p-2 rounded-lg ${g.favorite? 'bg-pink-500/30 text-pink-200':'bg-white/10 text-white hover:bg-white/20'}`} title="Favorite"><Heart size={16}/></button>
                <button onClick={()=>navigator.clipboard.writeText(g.images?.[0]?.url)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white" title="Share"><Share2 size={16}/></button>
                <button onClick={()=>onDelete(g)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white" title="Delete"><Trash2 size={16}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
