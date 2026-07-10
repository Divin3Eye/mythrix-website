import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-zinc-800 selection:text-white flex flex-col font-sans relative overflow-x-hidden antialiased">
      {/* Refined atmospheric foggy-glass ambient glow with a distinct hidden sun-like core */}
      <div className="absolute -top-[500px] left-0 right-0 w-full h-[1800px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[350px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/[0.18] rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-[280px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-yellow-500/[0.08] rounded-full blur-[160px]" />
        <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[160%] md:w-[140%] h-[1300px] bg-gradient-to-b from-amber-500/[0.1] via-yellow-600/[0.02] to-transparent blur-[220px] rounded-full" />
        <div className="absolute top-[550px] left-1/2 -translate-x-1/2 w-[100%] md:w-[85%] h-[600px] bg-amber-600/[0.015] blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/5 via-[25%] to-[#050505]/90 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#f59e0b04_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_28%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>

      {/* Minimal Nav */}
      <nav className="relative z-50 w-full pt-6 pb-2 transition-all">
        <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
              Mythrix
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/product" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">Overview</Link>
              <Link to="/capabilities" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">Capabilities</Link>
              <Link to="/pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">Plans</Link>
              <Link to="/docs" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">Docs</Link>
              <Link to="/about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">About</Link>
              <Link to="/contact" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">Contact</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/signin" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block">Sign In</Link>
            <button onClick={() => navigate('/signup')} className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all active:scale-95 shadow-sm">
              Get the app
            </button>
          </div>
        </div>
      </nav>

      {/* Premium Rounded Container */}
      <main className="flex-grow pt-8 px-4 sm:px-8 pb-12 w-full flex flex-col items-center relative z-10">
        <div className="w-full max-w-[1400px] flex-grow bg-zinc-950/40 backdrop-blur-2xl rounded-[40px] md:rounded-[64px] border border-white/[0.04] overflow-hidden flex flex-col relative shadow-[0_0_80px_-20px_rgba(255,255,255,0.03)]">
          
          {/* Soft inner highlight at the top of the container to catch the ambient light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

          {children}
        </div>
      </main>
    </div>
  );
}
