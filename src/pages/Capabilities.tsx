import React from 'react';
import MarketingLayout from '../components/MarketingLayout';
import { Check } from 'lucide-react';

export default function Capabilities() {
  return (
    <MarketingLayout>
      <div className="relative z-10 w-full pt-20 px-6 md:px-16 pb-24 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-16 text-center">
          Deep Capabilities
        </h1>

        <div className="space-y-24">
          {/* Section 1 */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-medium text-white">Ingestion & Organization</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Mythrix supports high-fidelity parsing of complex documents. Whether you're uploading a 100-page academic paper or a dense financial report, the system intelligently extracts text, structures, and metadata.
              </p>
              <ul className="space-y-4 pt-4">
                {['Multi-format support (PDF, TXT, MD, CSV)', 'Automatic metadata extraction', 'Custom notebook categorization', 'Real-time embedding generation'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-amber-400" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full bg-zinc-900/50 rounded-3xl border border-white/5 aspect-[4/3] p-6 relative overflow-hidden">
               {/* Abstract UI representation */}
               <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black/50" />
               <div className="relative h-full flex flex-col gap-4">
                 <div className="w-full h-12 bg-zinc-800/50 rounded-xl border border-white/5 flex items-center px-4 gap-3">
                   <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center"><div className="w-3 h-3 bg-blue-400 rounded-sm" /></div>
                   <div className="h-2 w-32 bg-zinc-700 rounded-full" />
                   <div className="ml-auto h-2 w-12 bg-zinc-700/50 rounded-full" />
                 </div>
                 <div className="w-full h-12 bg-zinc-800/50 rounded-xl border border-white/5 flex items-center px-4 gap-3">
                   <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center"><div className="w-3 h-3 bg-emerald-400 rounded-sm" /></div>
                   <div className="h-2 w-48 bg-zinc-700 rounded-full" />
                   <div className="ml-auto h-2 w-12 bg-zinc-700/50 rounded-full" />
                 </div>
                 <div className="w-full h-12 bg-zinc-800/50 rounded-xl border border-white/5 flex items-center px-4 gap-3">
                   <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center"><div className="w-3 h-3 bg-purple-400 rounded-sm" /></div>
                   <div className="h-2 w-40 bg-zinc-700 rounded-full" />
                   <div className="ml-auto h-2 w-12 bg-zinc-700/50 rounded-full" />
                 </div>
               </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-medium text-white">Precision & Synthesis</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Generate reports that are rigorously tied to your sources. Every claim made by Mythrix's AI is backed by a specific citation, allowing you to trace insights back to the original text instantly.
              </p>
              <ul className="space-y-4 pt-4">
                {['Source-grounded chat responses', 'Inline, clickable citations', 'Cross-document synthesis', 'Hallucination prevention architecture'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-amber-400" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full bg-zinc-900/50 rounded-3xl border border-white/5 aspect-[4/3] p-6 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-black/50" />
               <div className="relative h-full flex flex-col justify-center">
                 <div className="bg-zinc-800/80 p-5 rounded-2xl border border-white/5 mb-4 shadow-xl">
                   <div className="h-2 w-24 bg-zinc-600 rounded-full mb-4" />
                   <div className="space-y-2">
                     <div className="h-2 w-full bg-zinc-700 rounded-full" />
                     <div className="h-2 w-[90%] bg-zinc-700 rounded-full inline-flex items-center gap-2">
                        <span className="w-4 h-3 bg-amber-500/20 rounded border border-amber-500/30 inline-block" />
                     </div>
                     <div className="h-2 w-[70%] bg-zinc-700 rounded-full" />
                   </div>
                 </div>
                 
                 <div className="ml-12 bg-zinc-800/40 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                    <div className="w-1 h-full bg-amber-500/50 rounded-full" />
                    <div className="space-y-2 flex-grow">
                      <div className="h-1.5 w-16 bg-zinc-600 rounded-full" />
                      <div className="h-1.5 w-full bg-zinc-700/50 rounded-full" />
                      <div className="h-1.5 w-[80%] bg-zinc-700/50 rounded-full" />
                    </div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </MarketingLayout>
  );
}
