import React from 'react';
import MarketingLayout from '../components/MarketingLayout';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <MarketingLayout>
      <div className="relative z-10 flex flex-col items-center pt-20 px-6 md:px-16 pb-24 w-full">
        <div className="max-w-3xl text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            Choose the plan that fits your research volume. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Plan 1 */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-10 backdrop-blur-sm flex flex-col">
            <h3 className="text-2xl font-medium text-white mb-2">Researcher</h3>
            <p className="text-zinc-400 mb-8">For individuals organizing personal knowledge.</p>
            <div className="mb-8">
              <span className="text-5xl font-medium text-white">$0</span>
              <span className="text-zinc-500 ml-2">/ month</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {['Up to 50 documents', 'Basic semantic search', 'Standard chat responses', 'Community support'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-zinc-500" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            
            <button onClick={() => navigate('/signup')} className="w-full py-4 rounded-full bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-zinc-900/80 border border-amber-500/20 rounded-[32px] p-10 backdrop-blur-sm flex flex-col relative shadow-[0_0_50px_-12px_rgba(245,158,11,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500/10 border border-amber-500/20 rounded-b-xl text-xs font-medium text-amber-400">
              Most Popular
            </div>
            <h3 className="text-2xl font-medium text-white mb-2">Pro</h3>
            <p className="text-zinc-400 mb-8">For deep research and professional synthesis.</p>
            <div className="mb-8">
              <span className="text-5xl font-medium text-white">$20</span>
              <span className="text-zinc-500 ml-2">/ month</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {['Unlimited documents', 'Advanced vector search', 'GPT-4 / Claude 3 Opus models', 'Report generation & LaTeX export', 'Priority support'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-amber-400" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            
            <button onClick={() => navigate('/signup')} className="w-full py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
              Subscribe to Pro
            </button>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
