import React, { useState } from 'react';
import MarketingLayout from '../components/MarketingLayout';
import { ChevronRight } from 'lucide-react';

export default function Documentation() {
  const [activeDoc, setActiveDoc] = useState('getting-started');

  const docs = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'uploading', title: 'Uploading Sources' },
    { id: 'semantic-search', title: 'Semantic Search' },
    { id: 'chat', title: 'Document Chat' },
    { id: 'reports', title: 'Generating Reports' },
    { id: 'citations', title: 'Citation Management' },
  ];

  return (
    <MarketingLayout>
      <div className="relative z-10 w-full flex-grow flex flex-col md:flex-row pt-12 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 mb-12 md:mb-0 md:pr-8 md:border-r border-white/5">
          <div className="sticky top-24">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">User Guide</h3>
            <ul className="space-y-1">
              {docs.map((doc) => (
                <li key={doc.id}>
                  <button 
                    onClick={() => setActiveDoc(doc.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      activeDoc === doc.id 
                        ? 'bg-white/10 text-white' 
                        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                    }`}
                  >
                    {doc.title}
                    {activeDoc === doc.id && <ChevronRight className="w-4 h-4 text-zinc-500" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 md:pl-12 max-w-3xl">
          {activeDoc === 'getting-started' && (
            <div className="prose prose-invert prose-zinc max-w-none">
              <h1 className="text-3xl font-medium text-white mb-6">Getting Started with Mythrix</h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Welcome to Mythrix, your AI-powered research workspace. Mythrix helps you synthesize information from multiple sources, discover connections, and generate grounded reports.
              </p>
              
              <h2 className="text-xl font-medium text-white mt-12 mb-4">The Workspace Structure</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Mythrix is built around the concept of Notebooks. A Notebook is a dedicated workspace containing a specific set of sources (documents) and the chats/reports generated from those sources.
              </p>
              
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 mb-8">
                <h3 className="text-white font-medium mb-2">Step 1: Create a Notebook</h3>
                <p className="text-zinc-400 text-sm">Start by creating a new Notebook for your project or topic of research.</p>
              </div>
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 mb-8">
                <h3 className="text-white font-medium mb-2">Step 2: Upload Sources</h3>
                <p className="text-zinc-400 text-sm">Add PDFs, documents, or paste text to build the knowledge base for your Notebook.</p>
              </div>
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 mb-8">
                <h3 className="text-white font-medium mb-2">Step 3: Ask Questions</h3>
                <p className="text-zinc-400 text-sm">Use the Research Lab to ask questions across all your uploaded sources simultaneously.</p>
              </div>
            </div>
          )}
          
          {activeDoc !== 'getting-started' && (
            <div className="prose prose-invert prose-zinc max-w-none">
              <h1 className="text-3xl font-medium text-white mb-6 capitalize">{activeDoc.replace('-', ' ')}</h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Documentation for this section is currently being updated. Check back soon for detailed guides on advanced features and workflows.
              </p>
            </div>
          )}
        </div>
      </div>
    </MarketingLayout>
  );
}
