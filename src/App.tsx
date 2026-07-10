import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Capabilities from "./pages/Capabilities";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {
  Sparkles,
  FileText,
  Plus,
  Search,
  BookOpen,
  Terminal,
  Upload,
  Check,
  ChevronRight,
  Code,
  Globe,
  Trash2,
  FileCode,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Network,
  Command,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { Source, NoteBlock, Message, Citation, SearchResult } from "./types";
import { INITIAL_SOURCES } from "./data";
import CommandPalette from "./components/CommandPalette";

export default function App() {
  const location = useLocation();

  // Navigation & View states
  const [activeTab, setActiveTab] = useState<"lab" | "notebook" | "palette">("lab");
  const [citationTab, setCitationTab] = useState<"citation" | "parsing" | "links" | "graph" | "latex">("citation");
  
  // Custom states for interactive elements
  const [sources, setSources] = useState<Source[]>(INITIAL_SOURCES);
  const [selectedSourceId, setSelectedSourceId] = useState<string>("attention");
  
  // Custom Draft/Editor state
  const [draftText, setDraftText] = useState<string>(
    `# Transformers in Modern Architecture\n\nThe introduction of the transformer architecture [1] revolutionized sequence-to-sequence modeling, dispensing with recurrence entirely.\n\nBy relying solely on self-attention mechanisms, these models achieve greater parallelization and superior performance on translation tasks [2]. This has unlocked massive multi-parameter scaling paradigms, as exemplified in GPT-3 [3] which scales autoregressive learning to 175 billion parameters.`
  );
  
  // Highlighted Citation Popup state
  const [activeCitation, setActiveCitation] = useState<Citation | null>({
    index: 1,
    title: "Attention is all you need",
    quote: "We propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism...",
    page: "Page 2"
  });

  // Semantic search input & results states
  const [semanticQuery, setSemanticQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // AI query & message states
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "assistant",
      text: "Based on Kaplan et al. (2020) [1] and Hoffmann et al. (2022) [2], performance scales predictably as a power-law with model size, compute, and data.",
      timestamp: "10:25 AM",
      grounded: true
    }
  ]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Notebook View States
  const [noteBlocks, setNoteBlocks] = useState<NoteBlock[]>([
    { id: "b1", content: "Pre-training strategy allows context extraction", level: 0 },
    { id: "b2", content: "Fine-tuning uses task-specific outer heads", level: 1 },
    { id: "b3", content: "Self-attention resolves the backprop bottleneck", level: 0 },
    { id: "b4", content: "Power-laws: compute remains the primary governor of loss", level: 1 }
  ]);
  const [newBlockText, setNewBlockText] = useState("");

  // Source upload inputs
  const [newSourceTitle, setNewSourceTitle] = useState("");
  const [newSourceContent, setNewSourceContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Command palette overlay state
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Notification Banner State
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // Fetch the selected source details safely
  const selectedSource = useMemo(() => {
    return sources.find((s) => s.id === selectedSourceId) || sources[0];
  }, [sources, selectedSourceId]);

  // Handle Citation click in active editor
  const handleCitationClick = (index: number) => {
    if (index === 1) {
      setActiveCitation({
        index: 1,
        title: "Attention is all you need",
        quote: "We propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism...",
        page: "Page 2"
      });
    } else if (index === 2) {
      setActiveCitation({
        index: 2,
        title: "BERT: Pre-training",
        quote: "BERT is designed to pre-train deep bidirectional representations from unlabeled text...",
        page: "Page 1"
      });
    } else if (index === 3) {
      setActiveCitation({
        index: 3,
        title: "GPT-3 Architecture",
        quote: "We train GPT-3, an autoregressive language model with 175 billion parameters...",
        page: "Page 4"
      });
    } else {
      const match = sources[index - 1];
      if (match) {
        setActiveCitation({
          index,
          title: match.title,
          quote: match.content.substring(0, 100) + "...",
          page: "Paragraph 1"
        });
      }
    }
  };

  // Run Semantic Search on local text or endpoint
  const handleSemanticSearch = async (queryStr: string) => {
    setSemanticQuery(queryStr);
    if (!queryStr.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch("/api/semantic-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryStr, sources }),
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results || []);
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (e) {
      // Fallback local text ranking if server is preparing
      const matches = sources.map((src, idx) => {
        const score = src.content.toLowerCase().includes(queryStr.toLowerCase()) ? 0.88 : 0.45;
        return {
          id: src.id,
          title: src.title,
          score,
          snippet: `Found matching concepts surrounding "${queryStr}" in our active model...`,
          sourceIndex: idx + 1
        };
      }).sort((a, b) => b.score - a.score);
      setSearchResults(matches);
    } finally {
      setIsSearching(false);
    }
  };

  // Run AI Synthesis query using real server API
  const handleRunAiQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    
    // Add User Message
    const userMsg: Message = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsSynthesizing(true);

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText, sources }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: Message = {
          id: "ai-" + Date.now(),
          sender: "assistant",
          text: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          simulated: data.simulated,
          grounded: data.grounded
        };
        setMessages(prev => [...prev, aiMsg]);
        if (data.simulated) {
          triggerToast("Showing a synthesized preview. Configure your API key for live generation.");
        }
      } else {
        throw new Error("Non-200 status");
      }
    } catch (error) {
      // Offline fallback
      const aiMsg: Message = {
        id: "ai-fb-" + Date.now(),
        sender: "assistant",
        text: `Based on your research documents, BERT: Pre-training introduces a bidirectional Transformer [2] that pre-trains on unlabeled text. It improves sentence-level inference and token-level tasks significantly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        grounded: true,
        simulated: true
      };
      setMessages(prev => [...prev, aiMsg]);
      triggerToast("Synthesized based on active local draft.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Helper to show temporal UI toasts
  const triggerToast = (msg: string) => {
    setBannerMessage(msg);
    setTimeout(() => {
      setBannerMessage(null);
    }, 5000);
  };

  // Handle Source Ingestion / Custom Upload
  const handleIngestSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceTitle.trim() || !newSourceContent.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const newSrc: Source = {
        id: "src-" + Date.now(),
        title: newSourceTitle,
        format: "TXT",
        size: `${Math.round(newSourceContent.length / 100) / 10} KB`,
        date: "Jul 2026",
        category: "Ingested",
        content: newSourceContent
      };
      setSources(prev => [...prev, newSrc]);
      setSelectedSourceId(newSrc.id);
      setIsUploading(false);
      setUploadSuccess(true);
      newAudioPing();
      
      // Auto-update LaTeX and Draft references in simulated citation state
      triggerToast(`Document "${newSourceTitle}" ingested and mapped to source [${sources.length + 1}].`);
      
      setNewSourceTitle("");
      setNewSourceContent("");
      setTimeout(() => setUploadSuccess(false), 2000);
    }, 800);
  };

  // Trigger feedback ping
  const newAudioPing = () => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.connect(gain);
      gain.connect(context.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, context.currentTime); // High pitch success note
      gain.gain.setValueAtTime(0.02, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3);
      osc.start();
      osc.stop(context.currentTime + 0.3);
    } catch (e) {
      // Ignored if browser policy blocks autoplay AudioContext
    }
  };

  // Remove source
  const handleRemoveSource = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sources.length <= 1) {
      triggerToast("You must keep at least one source document in your Knowledge Base.");
      return;
    }
    setSources(prev => prev.filter(s => s.id !== id));
    if (selectedSourceId === id) {
      const remaining = sources.filter(s => s.id !== id);
      setSelectedSourceId(remaining[0].id);
    }
    triggerToast("Document removed from workspace.");
  };

  // Notebook add blocks
  const handleAddNoteBlock = () => {
    if (!newBlockText.trim()) return;
    const newBlock: NoteBlock = {
      id: "block-" + Date.now(),
      content: newBlockText,
      level: 0
    };
    setNoteBlocks(prev => [...prev, newBlock]);
    setNewBlockText("");
  };

  // Toggle indentation for active note outline blocks
  const indentBlock = (id: string, direction: "left" | "right") => {
    setNoteBlocks(prev => prev.map(b => {
      if (b.id === id) {
        const newLevel = direction === "right" ? Math.min(2, b.level + 1) : Math.max(0, b.level - 1);
        return { ...b, level: newLevel };
      }
      return b;
    }));
  };

  // Delete note block
  const deleteNoteBlock = (id: string) => {
    setNoteBlocks(prev => prev.filter(b => b.id !== id));
  };

  // Generates copyable raw LaTeX draft
  const generatedLaTeX = useMemo(() => {
    return `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}

\\title{Transformers in Modern Architecture}
\\author{Mythrix Research OS Workspace}
\\date{July 2026}

\\begin{document}

\\maketitle

\\section{Introduction}
The introduction of the transformer architecture \\cite{vaswani2017attention} revolutionized sequence-to-sequence modeling, dispensing with recurrence entirely. By relying solely on self-attention mechanisms, these models achieve greater parallelization and superior performance on translation tasks \\cite{devlin2018bert}. This has unlocked massive multi-parameter scaling paradigms, as exemplified in GPT-3 \\cite{brown2020gpt3} which scales autoregressive learning to 175 billion parameters.

\\begin{thebibliography}{9}
\\bibitem{vaswani2017attention}
Vaswani, et al. "Attention is all you need." \\emph{Advances in neural information processing systems}. 2017.
\\bibitem{devlin2018bert}
Devlin, et al. "Bert: Pre-training of deep bidirectional transformers for language understanding." \\emph{arXiv preprint arXiv:1810.04805}. 2018.
\\bibitem{brown2020gpt3}
Brown, et al. "Language models are few-shot learners." \\emph{Advances in Neural Information Processing Systems}. 2020.
\\end{thebibliography}

\\end{document}`;
  }, []);

  if (location.pathname !== "/app") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white flex flex-col font-sans relative overflow-x-hidden antialiased">
      
      {/* Refined atmospheric foggy-glass ambient glow with a distinct hidden sun-like core */}
      <div className="absolute -top-[500px] left-0 right-0 w-full h-[1800px] pointer-events-none overflow-hidden z-0">
        {/* The Hidden Sun / Luminous Core at the top center, shifted inside the expanded safety container */}
        <div className="absolute top-[350px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/[0.22] rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-[280px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-yellow-500/[0.09] rounded-full blur-[160px]" />

        {/* Soft, warm solar, highly-diffused atmospheric halo (The Bloom) radiating downward */}
        <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[160%] md:w-[140%] h-[1300px] bg-gradient-to-b from-amber-500/[0.12] via-yellow-600/[0.03] to-transparent blur-[220px] rounded-full" />
        
        {/* Layered deeper smoke/fog light source right behind the hero text to provide quiet depth */}
        <div className="absolute top-[550px] left-1/2 -translate-x-1/2 w-[100%] md:w-[85%] h-[600px] bg-amber-600/[0.02] blur-[180px] rounded-full" />
        
        {/* Smoked/Frosted glass panel mask with multi-stop gradients to ensure absolutely seamless rubber-banding/overscroll */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/5 via-[25%] to-black/90 pointer-events-none" />
        
        {/* A subtle grid of light intersection to anchor the tech aesthetic slightly under the glass blur */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#f59e0b04_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_28%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>

      {/* Floating Temporal Notification Banner */}
      <AnimatePresence>
        {bannerMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs py-3 px-6 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{bannerMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP NAVIGATION */}
      <nav id="navbar" className="fixed top-0 w-full z-50 border-b border-zinc-900/60 bg-black/40 backdrop-blur-md transition-all h-16">
        <div className="max-w-[1280px] mx-auto px-8 flex justify-between items-center h-full">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
              Mythrix
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => { setActiveTab("lab"); triggerToast("Workspace switched to Research Lab."); }}
                className={`text-sm font-medium tracking-tight transition-colors duration-200 ${
                  activeTab === "lab" ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Sources
              </button>
              <button
                onClick={() => { setActiveTab("notebook"); triggerToast("Workspace switched to Notebook view."); }}
                className={`text-sm font-medium tracking-tight transition-colors duration-200 ${
                  activeTab === "notebook" ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Notebooks
              </button>
              <button
                onClick={() => setIsPaletteOpen(true)}
                className="text-sm font-medium tracking-tight text-zinc-400 hover:text-white transition-colors duration-200"
              >
                Semantic Search
              </button>
              <button
                onClick={() => setCitationTab("latex")}
                className="text-sm font-medium tracking-tight text-zinc-400 hover:text-white transition-colors duration-200"
              >
                Reports
              </button>
              <a href="#pricing" className="text-sm font-medium tracking-tight text-zinc-400 hover:text-white transition-colors duration-200">
                Pricing
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-900 transition-colors hidden sm:flex"
              title="Search Workspace (Ctrl+K)"
            >
              <Command className="w-4 h-4" />
            </button>
            <a href="#login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" onClick={() => triggerToast("Direct login simulation active.")}>
              Sign In
            </a>
            <button
              onClick={() => { setActiveTab("lab"); triggerToast("Starting research run! Ingest some source files."); }}
              className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold hover:bg-zinc-200 transition-all scale-98 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* CORE WORKSPACE ENTRY POINT */}
      <main className="flex-grow pt-[120px] pb-24">
        
        {/* HERO HEADER SECTION */}
        <section id="hero" className="max-w-[1280px] mx-auto px-8 mb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <h1 className="text-5xl md:text-[84px] font-bold tracking-tighter leading-[1.05] text-white">
                The Research OS <br />for Deep Work
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <button
                  onClick={() => { setActiveTab("lab"); triggerToast("Upload technical papers below to ground findings."); }}
                  className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-zinc-200"
                >
                  Get Started
                </button>
                <a
                  href="#contact"
                  onClick={() => triggerToast("Synthesized lead system active. We will get back to you soon!")}
                  className="bg-transparent border border-zinc-800 text-white px-6 py-3 rounded-full font-medium text-sm transition-all hover:bg-zinc-900"
                >
                  Contact sales
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-sm pt-4">
                Mythrix is a premium AI workspace to upload sources, organize notebooks, and generate source-grounded reports with precision citations.
              </p>
            </div>
          </div>
        </section>

        {/* HERO INTERACTIVE PRODUCT PANEL (THE BENTO HERO CONTROL) */}
        <section id="interactive-workspace" className="max-w-[1280px] mx-auto px-8 mb-32 relative z-10">
          <div className="bg-zinc-950/40 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden border border-white/[0.04] min-h-[640px] justify-between backdrop-blur-[24px] shadow-[0_0_50px_-12px_rgba(255,255,255,0.02)]">
            
            {/* Control Panel Headers */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10 border-b border-zinc-900 pb-6 mb-6">
              <div className="flex bg-zinc-950 p-1 rounded-full border border-zinc-800 shadow-inner">
                <button
                  onClick={() => setActiveTab("lab")}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeTab === "lab"
                      ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Research Lab
                </button>
                <button
                  onClick={() => setActiveTab("notebook")}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeTab === "notebook"
                      ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Notebooks
                </button>
                <button
                  onClick={() => setIsPaletteOpen(true)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <Command className="w-3 h-3" /> Palette
                </button>
              </div>
              
              <div className="bg-zinc-950 px-4 py-2 rounded-full border border-zinc-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-zinc-200">Active Knowledge Base: {sources.length} Documents</span>
              </div>
            </div>

            {/* Inner Dashboard Viewports */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 flex-grow mb-8">
              
              {/* Dynamic View Left-Side Panel: 7/12 layout */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {activeTab === "lab" && (
                    <motion.div
                      key="tab-lab"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Technical interactive uploader widget */}
                      <div className="border border-zinc-800 rounded-2xl bg-zinc-950 p-6 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30 pointer-events-none" />
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <Upload className="w-4 h-4 text-zinc-400" />
                          Ingest New Research Document
                        </h3>
                        <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                          Paste technical whitepapers, essays, or transcripts to expand Mythrix's context window. Works with real-time semantic synthesis.
                        </p>

                        <form onSubmit={handleIngestSource} className="flex flex-col gap-3 relative z-10">
                          <input
                            type="text"
                            placeholder="Document Title (e.g. 'Chinchilla Neural Scaling laws')"
                            value={newSourceTitle}
                            onChange={(e) => setNewSourceTitle(e.target.value)}
                            required
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                          />
                          <textarea
                            rows={4}
                            placeholder="Paste technical contents / plain text representing the document..."
                            value={newSourceContent}
                            onChange={(e) => setNewSourceContent(e.target.value)}
                            required
                            className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 font-mono"
                          />
                          <button
                            type="submit"
                            disabled={isUploading}
                            className={`w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                              uploadSuccess
                                ? "bg-emerald-600 text-white"
                                : "bg-white text-black hover:bg-zinc-200"
                            }`}
                          >
                            {isUploading ? (
                              <span className="w-4 h-4 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
                            ) : uploadSuccess ? (
                              <>
                                <Check className="w-4 h-4" /> Ingested Successfully
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" /> Build Grounded Reference
                              </>
                            )}
                          </button>
                        </form>
                      </div>

                      {/* Displaying Ingested Quick Grid */}
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-3">Active Sources Grid</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {sources.map((s) => {
                            const isSelected = s.id === selectedSourceId;
                            return (
                              <div
                                key={s.id}
                                onClick={() => setSelectedSourceId(s.id)}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? "bg-zinc-900 border-zinc-600 shadow-md"
                                    : "bg-zinc-950/50 border-zinc-900 hover:border-zinc-800"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <FileText className={`w-4 h-4 ${isSelected ? "text-white" : "text-zinc-500"}`} />
                                  <div className="overflow-hidden">
                                    <h4 className="text-xs font-semibold text-zinc-200 truncate max-w-[120px]">{s.title}</h4>
                                    <span className="text-[10px] text-zinc-500 font-mono uppercase">{s.format || "TXT"} • {s.size}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  <button
                                    onClick={(e) => handleRemoveSource(s.id, e)}
                                    className="p-1 hover:text-red-400 text-zinc-600 transition-colors"
                                    title="Eject Source"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "notebook" && (
                    <motion.div
                      key="tab-notebook"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="border border-zinc-800 rounded-2xl bg-zinc-950 p-6 flex flex-col justify-between min-h-[400px]"
                    >
                      <div>
                        <h3 className="text-md font-bold text-white mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-zinc-400" />
                          Structured Workspace Outline
                        </h3>
                        <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                          Organize technical points, insights, and synthesized fragments in infinite nesting branches. Double click text or use indent.
                        </p>

                        {/* Interactive Note Blocks */}
                        <div className="flex flex-col gap-2.5 mb-6">
                          {noteBlocks.map((block) => (
                            <div
                              key={block.id}
                              style={{ marginLeft: `${block.level * 24}px` }}
                              className="group flex items-center justify-between py-2 px-3 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-lg transition-colors"
                            >
                              <div className="flex items-center gap-2.5 flex-1">
                                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full shrink-0 group-hover:bg-white transition-colors" />
                                <input
                                  type="text"
                                  value={block.content}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setNoteBlocks(prev => prev.map(b => b.id === block.id ? { ...b, content: val } : b));
                                  }}
                                  className="bg-transparent border-none text-xs text-zinc-200 outline-none w-full font-medium"
                                />
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity">
                                <button
                                  onClick={() => indentBlock(block.id, "left")}
                                  className="p-1 hover:bg-zinc-800 text-zinc-400 rounded hover:text-white"
                                  title="Unindent Block"
                                >
                                  <ChevronUp className="w-3 h-3 rotate-270" />
                                </button>
                                <button
                                  onClick={() => indentBlock(block.id, "right")}
                                  className="p-1 hover:bg-zinc-800 text-zinc-400 rounded hover:text-white"
                                  title="Indent Block"
                                >
                                  <ChevronDown className="w-3 h-3 rotate-270" />
                                </button>
                                <button
                                  onClick={() => deleteNoteBlock(block.id)}
                                  className="p-1 hover:bg-zinc-800 text-zinc-500 hover:text-red-400 rounded"
                                  title="Delete Block"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Node insertion bar */}
                      <div className="flex gap-2 border-t border-zinc-900 pt-4">
                        <input
                          type="text"
                          placeholder="Draft a new nested note concept..."
                          value={newBlockText}
                          onChange={(e) => setNewBlockText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddNoteBlock()}
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
                        />
                        <button
                          onClick={handleAddNoteBlock}
                          className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200"
                        >
                          Add Node
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Dynamic View Right-Side Panel: 5/12 layout (Interactive Document Reader) */}
              <div className="lg:col-span-5 flex flex-col justify-between border-l border-zinc-900 lg:pl-8">
                
                {/* Visual Technical Grids & active paper contents */}
                <div className="flex flex-col gap-4 flex-grow justify-between min-h-[360px]">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Document Reader</span>
                      <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                        {selectedSource.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{selectedSource.title}</h3>
                    
                    <div className="h-64 overflow-y-auto pr-2 no-scrollbar bg-zinc-950 border border-zinc-900 rounded-2xl p-4 text-xs text-zinc-400 leading-relaxed font-sans">
                      {selectedSource.content}
                    </div>
                  </div>

                  <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Citation Engine Preview</span>
                    {activeCitation ? (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-blue-400 uppercase">CITATION [{activeCitation.index}]</span>
                          <span className="text-[10px] text-zinc-500 font-mono">{activeCitation.page || "Page 1"}</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 italic leading-relaxed mb-1.5">"{activeCitation.quote}"</p>
                        <span className="text-[9px] text-zinc-500 block font-mono">{activeCitation.title}</span>
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-600 italic">Click citation numbers [1] or [2] inside the drafts below to view real references mapped on this sidebar.</p>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Citation & Report tabs */}
            <div className="border-t border-zinc-900 pt-6 mt-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
                  {[
                    { id: "citation", label: "Citation Engine" },
                    { id: "parsing", label: "PDF Parsing" },
                    { id: "links", label: "Semantic Links" },
                    { id: "graph", label: "Graph View" },
                    { id: "latex", label: "Export to LaTeX" }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setCitationTab(sub.id as any);
                        triggerToast(`Switched report detail to ${sub.label}.`);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        citationTab === sub.id
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsPaletteOpen(true)}
                  className="bg-white text-black px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap self-stretch md:self-auto hover:bg-zinc-200"
                >
                  Upload Source
                </button>
              </div>

              {/* Sub-tab viewport detailed panel container */}
              <div className="mt-4 bg-zinc-950/40 rounded-2xl p-4 border border-zinc-900 min-h-[140px] text-xs">
                
                {citationTab === "citation" && (
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-zinc-300 block mb-1">Interactive Footnote References Map</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {sources.map((s, idx) => (
                        <div key={s.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                          <div className="text-zinc-500 font-mono text-[10px] mb-1">INDEX REFERENCE [{idx + 1}]</div>
                          <div className="font-bold text-zinc-300 truncate mb-1">{s.title}</div>
                          <p className="text-[10px] text-zinc-500 line-clamp-2">{s.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {citationTab === "parsing" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-zinc-500 block mb-1">Total Words Loaded</span>
                      <span className="text-xl font-bold font-mono text-white">
                        {sources.reduce((acc, curr) => acc + curr.content.split(/\s+/).length, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">Average Source Density</span>
                      <span className="text-xl font-bold font-mono text-white">94% Grounded</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">Embedding Dimensions</span>
                      <span className="text-xl font-bold font-mono text-white">1,536 Dimensional</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">Active File Parser</span>
                      <span className="text-xl font-bold font-mono text-emerald-400">PDF-Parse 2.0</span>
                    </div>
                  </div>
                )}

                {citationTab === "links" && (
                  <div className="flex flex-col gap-2">
                    <span className="text-zinc-300 font-semibold mb-1">Draft to Source Mapping Links</span>
                    <div className="flex flex-wrap gap-2">
                      {sources.map((s, idx) => (
                        <span key={s.id} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-mono text-zinc-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          research_draft.md ⇄ [{idx + 1}] {s.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {citationTab === "graph" && (
                  <div>
                    <span className="text-zinc-300 font-semibold block mb-1">Workspace Relationship Network Map</span>
                    <p className="text-[11px] text-zinc-500 mb-4">Click documents or keywords in this map to focus relevant grounding indices.</p>
                    
                    {/* CSS Custom Network Node representation */}
                    <div className="relative h-24 bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex items-center justify-center gap-6">
                      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] bg-[size:16px_16px] opacity-60" />
                      
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full z-10 cursor-pointer hover:border-zinc-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-mono text-[10px]">Mythrix Workspace Draft</span>
                      </div>

                      <div className="h-px bg-zinc-800 w-12 z-0 relative">
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500" />
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full z-10 cursor-pointer hover:border-zinc-500">
                        <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                        <span className="font-mono text-[10px]">Attention paper [1]</span>
                      </div>

                      <div className="h-px bg-zinc-800 w-12 z-0 relative">
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full z-10 cursor-pointer hover:border-zinc-500">
                        <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                        <span className="font-mono text-[10px]">BERT model [2]</span>
                      </div>
                    </div>
                  </div>
                )}

                {citationTab === "latex" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-300 font-semibold">Grounded Compileable LaTeX Output Draft</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedLaTeX);
                          triggerToast("Raw LaTeX report copied to clipboard!");
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded text-zinc-300 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy LaTeX
                      </button>
                    </div>
                    <pre className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl overflow-x-auto text-[10px] font-mono text-zinc-500 leading-relaxed max-h-48">
                      {generatedLaTeX}
                    </pre>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* TRUST STRIP SECTION */}
        <section className="max-w-[1280px] mx-auto px-8 text-center mb-10">
          <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-0">
            Trusted by top-tier creators and high-end research labs
          </h3>
        </section>

        {/* TRUST SLIDING MARQUEE */}
        <section className="w-full overflow-hidden mt-0 mb-32 py-4 relative z-10">
          <div className="flex whitespace-nowrap overflow-hidden group border-y border-zinc-900 py-6 bg-zinc-950/30">
            {/* Sliding animation pauses on hover */}
            <div className="flex items-center gap-24 animate-marquee group-hover:[animation-play-state:paused]">
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Globe className="w-5 h-5" /> MIT Lab
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Sparkles className="w-5 h-5" /> DeepMind
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <BookOpen className="w-5 h-5" /> Stanford
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Terminal className="w-5 h-5" /> OpenAI
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Code className="w-5 h-5" /> Oxford
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Network className="w-5 h-5" /> Max Planck
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Globe className="w-5 h-5" /> CERN
              </div>
            </div>
            
            {/* Duplicate set for endless sliding effect */}
            <div aria-hidden="true" className="flex items-center gap-24 animate-marquee group-hover:[animation-play-state:paused]">
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Globe className="w-5 h-5" /> MIT Lab
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Sparkles className="w-5 h-5" /> DeepMind
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <BookOpen className="w-5 h-5" /> Stanford
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Terminal className="w-5 h-5" /> OpenAI
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Code className="w-5 h-5" /> Oxford
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Network className="w-5 h-5" /> Max Planck
              </div>
              <div className="flex items-center gap-2 text-zinc-600/60 font-bold text-xl tracking-widest uppercase">
                <Globe className="w-5 h-5" /> CERN
              </div>
            </div>
          </div>
        </section>

        {/* ONE SYSTEM FOR YOUR ENTIRE KNOWLEDGE BASE SECTION */}
        <section id="features-one" className="max-w-[1280px] mx-auto px-8 mb-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-[64px] font-bold tracking-tighter leading-tight text-white mb-6">
              One system for your entire knowledge base
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              A unified environment to ingest literature, annotate key insights, and draft comprehensive, citation-rich documents.
            </p>
          </div>

          {/* Side-by-side feature teaser cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Card 1 */}
            <div
              onClick={() => { setCitationTab("citation"); triggerToast("Check the 'Citation Engine' tab in the main workspace console!"); }}
              className="bg-zinc-950 rounded-3xl p-8 border border-zinc-800/80 h-[300px] flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:border-zinc-700 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start z-10">
                <span className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400">
                  <BookOpen className="w-5 h-5" />
                </span>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <div className="z-10">
                <h4 className="text-xl font-bold mb-2 text-white">Side-by-side Citations</h4>
                <p className="text-sm text-zinc-400">View your draft alongside the original source material, ensuring absolute accuracy.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => setIsPaletteOpen(true)}
              className="bg-zinc-950 rounded-3xl p-8 border border-zinc-800/80 h-[300px] flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:border-zinc-700 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start z-10">
                <span className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400">
                  <Terminal className="w-5 h-5" />
                </span>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <div className="z-10">
                <h4 className="text-xl font-bold mb-2 text-white">Command Palette</h4>
                <p className="text-sm text-zinc-400">Execute semantic searches, create links, and structure data without leaving your keyboard.</p>
              </div>
            </div>

          </div>

          {/* Side-by-side workspace interactive sandbox (Desktop view mockup) */}
          <div className="w-full aspect-[16/9] bg-[#0a0a0a] rounded-3xl border border-zinc-800 flex items-center justify-center overflow-hidden relative group p-4 sm:p-8">
            <div className="absolute inset-0 bg-black/80" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="relative w-full h-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl flex shadow-2xl overflow-hidden z-10">
              
              {/* Sandbox Sidebar */}
              <div className="w-48 sm:w-64 border-r border-zinc-900 flex flex-col p-4 gap-4 bg-zinc-950 shrink-0">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Sources</div>
                <div className="flex flex-col gap-2">
                  {sources.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedSourceId(s.id); triggerToast(`Opened source: ${s.title}`); }}
                      className={`flex items-center gap-2 px-2 py-2 rounded-lg text-[11px] text-left transition-colors ${
                        selectedSourceId === s.id
                          ? "bg-zinc-900 text-white font-medium"
                          : "text-zinc-400 hover:bg-zinc-900/40"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sandbox Main Draft Editor */}
              <div className="flex-1 flex flex-col bg-zinc-950">
                <div className="h-12 border-b border-zinc-900 flex items-center px-4 justify-between bg-zinc-950/40">
                  <span className="text-xs font-mono text-zinc-400">research_draft_v2.md</span>
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  </div>
                </div>

                <div className="flex-1 p-6 relative flex flex-col justify-between">
                  <div>
                    <h1 className="text-xl font-bold mb-4 text-white">Transformers in Modern Architecture</h1>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4 font-sans">
                      The introduction of the transformer architecture
                      <span
                        onClick={() => handleCitationClick(1)}
                        className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-1 rounded text-[10px] ml-1 cursor-pointer font-bold inline-block"
                      >
                        [1]
                      </span>{" "}
                      revolutionized sequence-to-sequence modeling, dispensing with recurrence entirely.
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      By relying solely on self-attention mechanisms, these models achieve greater parallelization and superior performance on translation tasks
                      <span
                        onClick={() => handleCitationClick(2)}
                        className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-1 rounded text-[10px] ml-1 cursor-pointer font-bold inline-block"
                      >
                        [2]
                      </span>.
                    </p>
                  </div>

                  {/* Grounded Popover block directly in the preview */}
                  <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-xl z-20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-blue-400 uppercase">Interactive Popover Citation Reference</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Vaswani et al.</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 italic mb-2">
                      "We propose the Transformer, a model architecture eschewing recurrence and relying entirely on an attention mechanism..."
                    </p>
                    <span className="text-[9px] text-zinc-500 font-mono block">Page 2.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* COLLECT ORGANIZE AND SYNTHESIZE SECTION */}
        <section id="features-two" className="max-w-[1280px] mx-auto px-8 mb-32 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-zinc-900 text-zinc-300 border border-zinc-800 px-3 py-1 rounded-full">
              Mythrix Workspace
            </span>
            <div className="h-px bg-zinc-800 flex-grow opacity-50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-[48px] font-bold text-white tracking-tighter leading-tight">
                Collect, Organize, and Synthesize
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Bring structure to chaos. Organize thousands of documents and extract insights instantly with our semantic indexing engine.
              </p>
            </div>
          </div>

          {/* Large details cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Details Card 1 */}
            <div className="bg-zinc-950 rounded-3xl border border-zinc-800 h-[320px] flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 bg-zinc-900/50 flex flex-col p-6 gap-3">
                <div className="w-full h-8 bg-zinc-800/40 rounded border border-zinc-700/50 flex items-center px-3 text-[10px] text-zinc-400 font-mono">01. Research_paper_review.pdf</div>
                <div className="w-3/4 h-8 bg-zinc-800/40 rounded border border-zinc-700/50 flex items-center px-3 text-[10px] text-zinc-400 font-mono">02. Chinchilla_scaling_formula.txt</div>
                <div className="w-5/6 h-8 bg-zinc-800/40 rounded border border-zinc-700/50 flex items-center px-3 text-[10px] text-zinc-400 font-mono">03. BERT_pretraining_notes.docx</div>
              </div>
              <div className="z-10 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 p-6 rounded-b-3xl">
                <h4 className="text-lg font-bold mb-1 text-white">Notebook View</h4>
                <p className="text-xs text-zinc-400">Structure your research with flexible blocks and infinite nesting.</p>
              </div>
            </div>

            {/* Details Card 2 (Semantic search interactive console) */}
            <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800 h-[320px] flex flex-col justify-between relative overflow-hidden">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Semantic Search Engine</span>
                  <Search className="w-4 h-4 text-zinc-500" />
                </div>
                
                {/* Search input bar */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter concept (e.g. 'Self-attention' or 'Scaling')"
                    value={semanticQuery}
                    onChange={(e) => handleSemanticSearch(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                  <button className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-lg hover:bg-zinc-200">
                    Query
                  </button>
                </div>

                {/* Instant ranked results preview */}
                <div className="h-28 overflow-y-auto no-scrollbar flex flex-col gap-2 bg-zinc-950 border border-zinc-900 p-2 rounded-xl">
                  {isSearching ? (
                    <span className="text-[10px] text-zinc-500 animate-pulse">Running semantic scan across dimensions...</span>
                  ) : searchResults.length > 0 ? (
                    searchResults.map(res => (
                      <div key={res.id} className="p-2 bg-zinc-900/60 rounded-lg flex items-center justify-between border border-zinc-800/50">
                        <div className="overflow-hidden">
                          <span className="text-[9px] font-bold text-blue-400 block uppercase">MATCH SCORE {Math.round(res.score * 100)}%</span>
                          <span className="text-[11px] text-zinc-300 font-medium truncate block">{res.title}</span>
                        </div>
                        <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700 shrink-0">[{res.sourceIndex}]</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[10px] text-zinc-600 italic">Type above to see semantic matches ranked with relevance scores.</span>
                  )}
                </div>
              </div>
              
              <div className="z-10">
                <h4 className="text-lg font-bold mb-1 text-white">Semantic Search</h4>
                <p className="text-xs text-zinc-400 font-sans">Find concepts, not just keywords, across your entire library.</p>
              </div>
            </div>

          </div>

          {/* Quick utility widgets cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "PDFs", icon: FileText, desc: "Academic papers" },
              { label: "Code Snippets", icon: Code, desc: "Python & LaTeX" },
              { label: "Web Clips", icon: Globe, desc: "Technical blogs" },
              { label: "Transcripts", icon: FileCode, desc: "Lecture notes" }
            ].map((card, idx) => (
              <div
                key={idx}
                onClick={() => {
                  triggerToast(`Filtering workspace elements by: ${card.label}.`);
                }}
                className="bg-zinc-950 rounded-2xl p-5 border border-zinc-800/80 flex flex-col gap-3 items-start hover:bg-zinc-900 hover:border-zinc-700 transition-all cursor-pointer"
              >
                <span className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white">
                  <card.icon className="w-4 h-4" />
                </span>
                <div>
                  <span className="font-semibold text-sm text-zinc-200 block">{card.label}</span>
                  <span className="text-[11px] text-zinc-500">{card.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI THAT CITES ITS SOURCES SECTION */}
        <section id="ai-synthesis" className="max-w-[1280px] mx-auto px-8 mb-32 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-zinc-900 text-zinc-300 border border-zinc-800 px-3 py-1 rounded-full">
              Mythrix Intelligence
            </span>
            <div className="h-px bg-zinc-800 flex-grow opacity-50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-[48px] font-bold text-white tracking-tighter leading-tight">
                AI that cites its sources
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Generate summaries, answer complex queries, and draft literature reviews with an AI that mathematically grounds every assertion in your uploaded documents.
              </p>
            </div>
          </div>

          {/* Synthesis Console UI Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Chat Sandbox Card (Left Column) */}
            <div className="bg-zinc-950 rounded-3xl p-6 md:p-8 border border-zinc-800 flex flex-col justify-between min-h-[460px] relative">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-white">Insight Panel</span>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold font-mono">Model: Mythrix Reasoning</span>
              </div>

              {/* Chat Viewport */}
              <div className="flex-grow flex flex-col gap-4 overflow-y-auto mb-6 pr-2 no-scrollbar max-h-72">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-zinc-900 border border-zinc-800 text-white rounded-tr-sm"
                        : "bg-zinc-900/40 border border-zinc-850 text-zinc-300 rounded-tl-sm"
                    }`}>
                      <p>{msg.text}</p>
                      
                      {msg.sender === "assistant" && (
                        <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center gap-2 text-[9px] text-zinc-500 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>Grounded Source references intact</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isSynthesizing && (
                  <div className="flex gap-2 items-center text-xs text-zinc-500 font-medium">
                    <span className="w-4 h-4 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
                    <span>Mythrix OS is synthesizing findings...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Container */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask Mythrix details from your sources..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRunAiQuery(chatInput)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                  <button
                    onClick={() => handleRunAiQuery(chatInput)}
                    className="bg-white text-black p-2.5 rounded-xl hover:bg-zinc-200 transition-colors shrink-0"
                    title="Send Query"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Suggestions Quick Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleRunAiQuery("Synthesize findings on neural scaling laws.")}
                    className="px-3 py-1 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 rounded-full text-[10px] text-zinc-400 hover:text-white transition-colors"
                  >
                    Synthesize scaling laws
                  </button>
                  <button
                    onClick={() => handleRunAiQuery("Explain bidirectional pre-training from BERT.")}
                    className="px-3 py-1 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 rounded-full text-[10px] text-zinc-400 hover:text-white transition-colors"
                  >
                    Explain BERT pretraining
                  </button>
                </div>
              </div>
            </div>

            {/* Source Inspector Card (Right Column) */}
            <div className="bg-zinc-950 rounded-3xl p-6 md:p-8 border border-zinc-800 flex flex-col justify-between min-h-[460px] relative">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300">
                    <Terminal className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-white">Source Inspector</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">100% Verifiable</span>
              </div>

              {/* Technical bar diagrams representing checked document facts */}
              <div className="flex-grow flex flex-col justify-center gap-6 my-4">
                <div className="flex items-end gap-3 h-36 w-full px-4">
                  
                  {/* Document Bar 1 */}
                  <div className="w-full bg-zinc-900/80 rounded-xl border border-zinc-800 h-[60%] p-3 flex flex-col justify-between relative">
                    <span className="text-[10px] font-mono text-zinc-500">SRC 1</span>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-5/6 h-full bg-zinc-500" />
                    </div>
                  </div>

                  {/* Document Bar 2 (Active highlighted / Checked source) */}
                  <div className="w-full bg-blue-950/20 rounded-xl border border-blue-900/60 h-[90%] p-3 flex flex-col justify-between relative shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <div className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border border-black shadow">
                      <Check className="w-3 h-3 text-black font-extrabold" />
                    </div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold">SRC 2</span>
                    <div className="w-full h-1.5 bg-blue-900 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-blue-400" />
                    </div>
                  </div>

                  {/* Document Bar 3 */}
                  <div className="w-full bg-zinc-900/80 rounded-xl border border-zinc-800 h-[45%] p-3 flex flex-col justify-between relative">
                    <span className="text-[10px] font-mono text-zinc-500">SRC 3</span>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-zinc-500" />
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-4 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-850">
                <h4 className="text-lg font-bold mb-1 text-white">Verified Facts</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Every generated claim is mapped back to its mathematical source paragraph, completely eliminating the risk of hallucinations.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* PRICING PLANS SECTION */}
        <section id="pricing" className="max-w-[1280px] mx-auto px-8 mb-32 relative z-10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-zinc-900 text-zinc-300 border border-zinc-800 px-3 py-1 rounded-full">
              Workspace Pricing
            </span>
            <h2 className="text-3xl md:text-[48px] font-bold text-white tracking-tighter mt-4 mb-4">
              Designed for Academic & Corporate Research Teams
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">Flexible licensing built to power your second brain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Plan 1 */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between min-h-[380px]">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-zinc-500 block mb-2">Individual Researcher</span>
                <h3 className="text-3xl font-bold text-white mb-4">$0 <span className="text-sm text-zinc-500 font-normal">/ month</span></h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">Fully loaded offline sandbox client with simulated grounded generation. Perfect for solo prototyping and testing.</p>
                
                <ul className="flex flex-col gap-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-400" /> 3 pre-loaded foundational research papers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-400" /> Active Notebook outline workspace editor
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-400" /> Interactive Citation popovers & LaTeX exports
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => { setActiveTab("lab"); triggerToast("Active Individual Sandbox activated."); }}
                className="w-full mt-8 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-semibold text-xs hover:bg-zinc-800"
              >
                Access Free Sandbox
              </button>
            </div>

            {/* Plan 2 */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-700 relative flex flex-col justify-between min-h-[380px] shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              <div className="absolute top-4 right-4 bg-white text-black text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Enterprise Recommended
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-zinc-400 block mb-2">Mythrix Pro Workspace</span>
                <h3 className="text-3xl font-bold text-white mb-4">$39 <span className="text-sm text-zinc-500 font-normal">/ month</span></h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">Full grounded pipeline integrated with server-side live reasoning. Instant vector scanning and precision citation metrics.</p>
                
                <ul className="flex flex-col gap-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white" /> Live grounded answer synthesis via Deep Reasoning
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white" /> Infinite document storage & vector parsing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white" /> Custom domain reports & semantic indexing
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => { triggerToast("Enterprise licenses can be coordinated with team accounts. Contact sales."); }}
                className="w-full mt-8 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200"
              >
                Start Premium Plan
              </button>
            </div>

          </div>
        </section>

        {/* SIGN OFF END CALLOUT */}
        <section id="sign-off" className="max-w-[1280px] mx-auto px-8 mb-24 text-center flex flex-col items-center relative z-10">
          <h2 className="text-4xl md:text-[54px] font-bold text-white mb-8 max-w-2xl tracking-tighter leading-tight">
            Build your second brain with Mythrix
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => { setActiveTab("lab"); triggerToast("Ingest some source files in the control panel below."); }}
              className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-zinc-200"
            >
              Get Started
            </button>
            <a
              href="#contact"
              onClick={() => triggerToast("We are coordinating private team allocations. Fill details via email.")}
              className="bg-transparent border border-zinc-800 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-zinc-900"
            >
              Talk to sales
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 mt-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-12 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold text-lg flex items-center gap-2">
              <img src="https://i.ibb.co/fYkSF7jT/logo.png" alt="Mythrix Logo" className="w-5 h-5 shrink-0 object-contain" />
              Mythrix
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
              © 2026 MYTHRIX. PRECISION INTELLIGENCE.
            </span>
          </div>
          <div className="col-span-2 flex flex-wrap gap-6 justify-end">
            <Link to="/app" className="text-xs text-zinc-400 hover:text-white transition-colors">Workspace</Link>
            <Link to="/docs" className="text-xs text-zinc-400 hover:text-white transition-colors">API</Link>
            <Link to="/docs" className="text-xs text-zinc-400 hover:text-white transition-colors">Documents</Link>
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Changelog</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Research Lab</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Docs</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Legal</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      {/* Ctrl+K Command Palette Overlay */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        sources={sources}
        onSelectSource={(src) => {
          setSelectedSourceId(src.id);
          triggerToast(`Loaded document: "${src.title}" into reader.`);
        }}
        onRunQuery={(q) => handleRunAiQuery(q)}
        onAddSource={() => {
          setActiveTab("lab");
          triggerToast("Use the Ingestion panel below to create a document.");
        }}
      />

    </div>
  );
}
