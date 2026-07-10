import React from 'react';
import { Search, Brain, FileText, Database, ArrowRight } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import { Link } from 'react-router-dom';

export default function Product() {
  return (
    <MarketingLayout>
      <div className="relative z-10 flex flex-col items-center pt-20 px-6 md:px-16 pb-24 w-full">
        <div className="max-w-4xl text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            The Complete Research Workflow
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            Mythrix unifies your scattered sources, notes, and insights into a single, semantically-aware workspace. Move from raw data to structured knowledge without losing context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Feature 1 */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col items-start hover:bg-zinc-900/80 transition-colors">
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
              <Database className="w-6 h-6 text-zinc-300" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">Unified Source Library</h3>
            <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
              Upload PDFs, whitepapers, transcripts, and web links. Mythrix automatically ingests, chunks, and embeddings every document, building a personalized knowledge base for your research.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col items-start hover:bg-zinc-900/80 transition-colors">
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
              <Search className="w-6 h-6 text-zinc-300" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">Semantic Discovery</h3>
            <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
              Search by concept, not just keywords. Mythrix understands the semantic meaning of your query and surfaces the exact passages across hundreds of documents instantly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col items-start hover:bg-zinc-900/80 transition-colors">
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
              <Brain className="w-6 h-6 text-zinc-300" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">Document Chat</h3>
            <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
              Have a conversation with your library. Ask complex questions and get synthesized answers that draw from multiple sources simultaneously, complete with inline citations.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col items-start hover:bg-zinc-900/80 transition-colors">
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
              <FileText className="w-6 h-6 text-zinc-300" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">Grounded Reports</h3>
            <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
              Turn your insights into structured reports. Mythrix can generate comprehensive overviews, literature reviews, or comparative analyses, rigorously cited back to your original texts.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <Link to="/app" className="group inline-flex items-center gap-2 text-white font-medium hover:text-amber-400 transition-colors">
            Experience the workspace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
