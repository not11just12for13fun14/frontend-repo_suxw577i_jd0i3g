import { useEffect, useState } from 'react'
import { Menu, Sparkles, Clock, Image as ImageIcon, Settings, User, Coins, Sun, Moon } from 'lucide-react'

export default function Header({ active, onNavigate, credits, onToggleTheme, theme }) {
  const tabs = [
    { key: 'generate', label: 'Generate', icon: Sparkles },
    { key: 'gallery', label: 'Gallery', icon: ImageIcon },
    { key: 'history', label: 'History', icon: Clock },
    { key: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
            <div>
              <div className="text-white font-semibold leading-none">AstraForge AI</div>
              <div className="text-xs text-blue-300/70">Create stunning images with AI</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${active===key? 'bg-white/10 text-white shadow-inner':'text-blue-200 hover:text-white hover:bg-white/5'}`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-400/20">
              <Coins size={16} />
              <span className="text-sm font-medium">{credits} credits</span>
            </div>

            <button onClick={onToggleTheme} className="p-2 rounded-lg bg-white/5 text-blue-200 hover:text-white hover:bg-white/10">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-blue-200 hover:text-white hover:bg-white/10">
                <img src={`https://i.pravatar.cc/24?img=3`} className="w-6 h-6 rounded-full"/>
                <User size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden pb-3 flex gap-2">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`px-3 py-1.5 rounded-lg text-xs ${active===key? 'bg-white/10 text-white':'text-blue-200 bg-white/5'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
