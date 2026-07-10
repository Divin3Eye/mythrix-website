import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, FileText, Network, Code, BookOpen, ShieldCheck, Database, Search, Brain, ArrowRight, Check, Command, Terminal, ChevronDown, Layers, Users } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';

export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (openFaq === index) setOpenFaq(null);
    else setOpenFaq(index);
  };

  return (
    <MarketingLayout>
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* HERO SECTION */}
        <div className="flex flex-col items-center text-center pt-24 md:pt-36 px-6 md:px-16 w-full pb-24">
          <h1 className="text-5xl md:text-7xl lg:text-[84px] font-medium tracking-tighter leading-[1.05] text-white max-w-4xl font-sans">
            The Research OS <br className="hidden md:block" />for Deep Work
          </h1>
          <p className="mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            Mythrix is a premium AI workspace to upload sources, organize notebooks, and generate source-grounded reports with precision citations.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-base transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
              Try Mythrix Free
            </button>
            <Link to="/product" className="bg-zinc-800/50 hover:bg-zinc-800 text-white border border-white/5 px-8 py-4 rounded-full font-semibold text-base transition-all">
              Explore Product
            </Link>
          </div>
        </div>

        {/* 1. TRUST / PROOF SECTION */}
        <div className="w-full max-w-5xl mx-auto px-6 mt-16 md:mt-24 mb-32 border-t border-white/5 pt-12">
          <p className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest mb-8">
            The foundation for rigorous synthesis
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Zero Hallucination Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Unlimited Context Window</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-white" />
              <span className="text-white font-medium">LaTeX Native Export</span>
            </div>
          </div>
        </div>

        {/* 2. PRODUCT OVERVIEW SECTION */}
        <div className="w-full px-6 mb-32">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
              A workspace built for intelligence, not just storage.
            </h2>
            <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed">
              Drop your academic papers, financial reports, or legal transcripts into Mythrix. Our engine instantly processes them into a semantic graph, allowing you to converse with your data as a single, omniscient entity.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto bg-zinc-900/40 border border-white/10 rounded-[32px] md:rounded-[48px] p-2 md:p-4 shadow-2xl backdrop-blur-sm">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#050505] rounded-[24px] md:rounded-[36px] border border-white/5 overflow-hidden flex flex-col">
              {/* Fake UI Header */}
              <div className="h-14 border-b border-white/5 flex items-center px-6 justify-between shrink-0 bg-black/20">
                <div className="flex gap-4 items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="ml-4 text-xs font-medium text-zinc-500">mythrix-os / research-lab</span>
                </div>
                <div className="hidden md:flex gap-4 text-xs text-zinc-500">
                  <span>14 Sources</span>
                  <span>•</span>
                  <span>1.2M Tokens Processed</span>
                </div>
              </div>
              {/* Fake UI Body */}
              <div className="flex-1 flex bg-black/40">
                <div className="w-1/3 border-r border-white/5 p-6 hidden md:block">
                  <div className="h-4 w-24 bg-zinc-800 rounded mb-6" />
                  <div className="space-y-4">
                    <div className="h-8 w-full bg-white/5 rounded-md border border-white/5" />
                    <div className="h-8 w-[90%] bg-white/5 rounded-md border border-white/5" />
                    <div className="h-8 w-[95%] bg-white/5 rounded-md border border-white/5" />
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-end">
                  <div className="bg-zinc-900/80 p-5 rounded-2xl border border-white/5 mb-4 max-w-xl shadow-lg inline-block self-end">
                    <div className="h-2 w-full bg-zinc-700 rounded-full mb-3" />
                    <div className="h-2 w-[90%] bg-zinc-700 rounded-full mb-3 inline-flex items-center gap-2">
                       <span className="w-4 h-3 bg-amber-500/20 rounded border border-amber-500/30 inline-block" />
                    </div>
                    <div className="h-2 w-[70%] bg-zinc-700 rounded-full" />
                  </div>
                  <div className="h-12 w-full bg-zinc-900 border border-white/10 rounded-xl mt-4 px-4 flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20" />
                    <div className="h-2 w-48 bg-zinc-800 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CORE CAPABILITIES SECTION */}
        <div className="w-full px-6 mb-32 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 hover:bg-zinc-900/50 transition-colors">
              <Database className="w-8 h-8 text-amber-400 mb-6" />
              <h3 className="text-xl font-medium text-white mb-3">Unified Source Library</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Upload PDFs, TXTs, or markdown. Mythrix automatically ingests and generates semantic embeddings for your entire literature collection.
              </p>
            </div>
            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 hover:bg-zinc-900/50 transition-colors">
              <Brain className="w-8 h-8 text-amber-400 mb-6" />
              <h3 className="text-xl font-medium text-white mb-3">Grounded Chat</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Converse directly with your documents. The engine synthesizes answers across multiple sources simultaneously without hallucinating.
              </p>
            </div>
            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 hover:bg-zinc-900/50 transition-colors">
              <Search className="w-8 h-8 text-amber-400 mb-6" />
              <h3 className="text-xl font-medium text-white mb-3">Semantic Discovery</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Search by concept, not keyword. Instantly surface highly specific passages across hundreds of documents instantly.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to="/capabilities" className="inline-flex items-center gap-2 text-white font-medium hover:text-amber-400 transition-colors">
              View all capabilities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4. WORKFLOW SECTION */}
        <div className="w-full px-6 mb-32 border-y border-white/5 py-24 bg-black/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-16 text-center">
              The continuous research loop
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
              {[
                { step: '01', title: 'Ingest', desc: 'Upload your raw files. We chunk and map them.' },
                { step: '02', title: 'Query', desc: 'Ask natural questions across your entire library.' },
                { step: '03', title: 'Synthesize', desc: 'Mythrix drafts cohesive insights from the fragments.' },
                { step: '04', title: 'Cite', desc: 'Every claim is traceably linked back to the source.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col relative">
                  <span className="text-5xl font-bold text-zinc-800/50 mb-4">{item.step}</span>
                  <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-white/10" />}
                </div>
              ))}
            </div>

            {/* Abstract Product System / Knowledge Map Visualization */}
            <div className="relative w-full max-w-5xl h-[400px] hidden md:block">
              {/* SVG Connections */}
              <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.05))" }}>
                <path d="M 500 40 C 500 120, 200 180, 200 280" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
                <path d="M 500 40 C 500 120, 350 180, 350 280" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
                <path d="M 500 40 C 500 160, 500 220, 500 300" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
                <path d="M 500 40 C 500 120, 650 180, 650 280" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
                <path d="M 500 40 C 500 120, 800 180, 800 280" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
                
                <path d="M 200 280 C 200 340, 150 360, 150 400" fill="none" stroke="url(#lineGradFade)" strokeWidth="1.5" />
                <path d="M 200 280 C 200 340, 250 360, 250 400" fill="none" stroke="url(#lineGradFade)" strokeWidth="1.5" />
                <path d="M 800 280 C 800 340, 750 360, 750 400" fill="none" stroke="url(#lineGradFade)" strokeWidth="1.5" />
                <path d="M 800 280 C 800 340, 850 360, 850 400" fill="none" stroke="url(#lineGradFade)" strokeWidth="1.5" />

                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                  </linearGradient>
                  <linearGradient id="lineGradFade" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Nodes */}
              <div className="absolute top-[40px] left-[500px] -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">Synthesize Knowledge</span>
              </div>

              {/* File Node */}
              <div className="absolute top-[280px] left-[200px] -translate-x-1/2 -translate-y-1/2 bg-zinc-950/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-52 shadow-xl hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                  <FileText className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full mb-3" />
                <div className="h-1.5 w-2/3 bg-zinc-800 rounded-full" />
              </div>
              
              {/* Concept Node */}
              <div className="absolute top-[280px] left-[350px] -translate-x-1/2 -translate-y-1/2 bg-zinc-950/80 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-xl hover:-translate-y-1 transition-transform">
                <Network className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-300 font-medium">Semantic Graph</span>
              </div>

              {/* Central Focus Node */}
              <div className="absolute top-[310px] left-[500px] -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-white/20 px-6 py-5 rounded-2xl w-72 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                  <span className="text-sm font-semibold text-white">Source-Grounded Report</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Generated insights with precision citations mapped to uploaded papers [1], eliminating hallucination.</p>
              </div>
              
              {/* Code Node */}
              <div className="absolute top-[280px] left-[650px] -translate-x-1/2 -translate-y-1/2 bg-zinc-950/80 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-xl hover:-translate-y-1 transition-transform">
                <Code className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-300 font-medium">LaTeX Export</span>
              </div>

              {/* Notebook Node */}
              <div className="absolute top-[280px] left-[800px] -translate-x-1/2 -translate-y-1/2 bg-zinc-950/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-52 shadow-xl hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                  <BookOpen className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
                  </div>
                  <div className="flex items-center gap-3 pl-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                    <div className="h-1.5 w-4/5 bg-zinc-800 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. GROUNDED AI / TRUST SECTION */}
        <div className="w-full px-6 mb-32 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-medium text-amber-400 mb-4">
              Precision Architecture
            </div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
              End the hallucination era.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Standard language models guess. Mythrix computes. By forcing the AI to retrieve exact context windows from your uploaded texts before generating a single word, we ensure every output is verifiable. If it's not in your documents, Mythrix won't say it.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-zinc-300">
                <Check className="w-5 h-5 text-amber-500" /> Inline reference markers
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <Check className="w-5 h-5 text-amber-500" /> Clickable source passages
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <Check className="w-5 h-5 text-amber-500" /> Transparent retrieval logs
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full relative">
             <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full" />
             <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl relative shadow-2xl">
               <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                 "The integration of semantic vectors allows for near-instant retrieval of conceptual frameworks <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-xs">[1]</span>, fundamentally altering the speed of qualitative research <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-xs">[2]</span>."
               </p>
               <div className="h-px bg-white/10 w-full mb-6" />
               <div className="space-y-3">
                 <div className="flex items-start gap-3">
                   <span className="text-xs font-mono text-zinc-500 mt-0.5">[1]</span>
                   <p className="text-xs text-zinc-400">Smith, J. (2025). Vector Database Optimizations. p.42.</p>
                 </div>
                 <div className="flex items-start gap-3">
                   <span className="text-xs font-mono text-zinc-500 mt-0.5">[2]</span>
                   <p className="text-xs text-zinc-400">Advanced AI Methodologies, Ch 4.</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* 6. USE CASES SECTION */}
        <div className="w-full px-6 mb-32">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Who uses Mythrix?</h2>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, title: 'Academics', desc: 'Synthesize literature reviews instantly.' },
              { icon: Layers, title: 'Analysts', desc: 'Cross-reference financial filings and reports.' },
              { icon: FileText, title: 'Writers', desc: 'Organize dense world-building and character notes.' },
              { icon: Users, title: 'Teams', desc: 'Build shared, semantically searchable knowledge bases.' },
            ].map((useCase, i) => (
              <div key={i} className="bg-zinc-900/20 border border-white/5 p-6 rounded-2xl text-left">
                <useCase.icon className="w-6 h-6 text-zinc-400 mb-4" />
                <h4 className="text-white font-medium mb-2">{useCase.title}</h4>
                <p className="text-zinc-500 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. PRODUCT DEEP DIVE (Teaser) */}
        <div className="w-full px-6 mb-32 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-medium text-white mb-6">Designed for speed.</h2>
          <p className="text-lg text-zinc-400 font-light mb-12 max-w-2xl mx-auto">
            A command-palette driven interface keeps your hands on the keyboard. Everything in Mythrix is accessible via quick commands.
          </p>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 max-w-2xl mx-auto shadow-2xl relative overflow-hidden flex flex-col gap-2">
             <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 rounded-xl border border-white/5">
                <Command className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-300">Generate report</span>
             </div>
             <div className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 rounded-xl transition-colors">
                <Command className="w-4 h-4 text-zinc-600" />
                <span className="text-sm text-zinc-500">Search documents</span>
             </div>
             <div className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 rounded-xl transition-colors">
                <Command className="w-4 h-4 text-zinc-600" />
                <span className="text-sm text-zinc-500">New notebook</span>
             </div>
          </div>
        </div>

        {/* 8. PRICING TEASER */}
        <div className="w-full px-6 mb-32">
          <div className="max-w-4xl mx-auto bg-zinc-900/30 border border-white/5 rounded-[40px] p-12 text-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/10 blur-[80px]" />
            <h2 className="text-3xl font-medium text-white mb-4 relative z-10">Start building your knowledge base</h2>
            <p className="text-zinc-400 mb-10 relative z-10">Free to start. Powerful when you need it.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button onClick={() => navigate('/signup')} className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-colors w-full sm:w-auto">
                Start for free
              </button>
              <Link to="/pricing" className="text-white font-medium hover:text-zinc-300 transition-colors px-6 py-4">
                View all plans
              </Link>
            </div>
          </div>
        </div>

        {/* 9. FAQ SECTION */}
        <div className="w-full px-6 mb-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-medium text-white mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What file types can I upload?",
                a: "Mythrix currently supports PDFs, plain text (.txt), markdown (.md), and direct text paste. We are working on adding support for DOCX and direct URL ingestion soon."
              },
              {
                q: "Is my data private?",
                a: "Yes. Your uploaded documents are isolated within your account. We do not use your private research data to train our foundational models."
              },
              {
                q: "How accurate are the citations?",
                a: "Extremely. Mythrix uses a strict retrieval-augmented generation (RAG) pipeline. The AI is constrained to only answer using the exact text chunks it retrieved, ensuring accurate, hallucination-free citations."
              },
              {
                q: "Can I export my reports?",
                a: "Yes. You can export generated reports as Markdown, raw text, or LaTeX format for academic publishing."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-medium hover:bg-white/5 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 10. FINAL CTA */}
        <div className="w-full px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-8">
            Ready to dive deep?
          </h2>
          <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
            Open the Workspace
          </button>
        </div>

      </div>
    </MarketingLayout>
  );
}

