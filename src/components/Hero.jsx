import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <div className="relative h-[320px] sm:h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/40 via-slate-900/40 to-fuchsia-900/30">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/20 to-slate-900/60 pointer-events-none" />
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl sm:text-4xl font-semibold text-white drop-shadow">Create images with your imagination</h2>
        <p className="mt-2 text-blue-200/80 max-w-2xl">Describe what you want and let the AI craft beautiful visuals. Perfect for beginners, powerful for pros.</p>
      </div>
    </div>
  )
}
