import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, FileText, Plus, X, ArrowRight } from "lucide-react";
import { Source } from "../types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  sources: Source[];
  onSelectSource: (source: Source) => void;
  onRunQuery: (query: string) => void;
  onAddSource: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  sources,
  onSelectSource,
  onRunQuery,
  onAddSource,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle Escape and Ctrl+K globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter commands and sources
  const sourceMatches = sources.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const commandMatches = [
    {
      id: "synthesize",
      title: "Synthesize Neural Scaling Laws",
      desc: "Ask Mythrix Intelligence to analyze scaling papers",
      action: () => onRunQuery("Synthesize the findings on neural scaling laws."),
      icon: Sparkles,
    },
    {
      id: "transformer",
      title: "Analyze Transformer Architecture",
      desc: "Query the model regarding self-attention",
      action: () => onRunQuery("How does the transformer architecture revolutionize translation?"),
      icon: Sparkles,
    },
    {
      id: "add_source",
      title: "Upload New Source Document",
      desc: "Paste or drag a new technical text / article",
      action: () => {
        onAddSource();
        onClose();
      },
      icon: Plus,
    },
  ].filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = sourceMatches.length + commandMatches.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === "Enter") {
      e.preventDefault();
      triggerSelected();
    }
  };

  const triggerSelected = () => {
    if (selectedIndex < sourceMatches.length) {
      onSelectSource(sourceMatches[selectedIndex]);
      onClose();
    } else {
      const cmdIdx = selectedIndex - sourceMatches.length;
      if (commandMatches[cmdIdx]) {
        commandMatches[cmdIdx].action();
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none border-none text-md"
            placeholder="Type a command or search documents..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded-full hover:bg-zinc-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Lists */}
        <div className="max-h-[380px] overflow-y-auto p-2 no-scrollbar">
          {totalItems === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No matching commands or sources found.
            </div>
          ) : (
            <>
              {/* Sources Segment */}
              {sourceMatches.length > 0 && (
                <div className="mb-4">
                  <div className="px-3 py-1.5 text-[11px] font-bold tracking-widest text-zinc-500 uppercase">
                    Source Documents
                  </div>
                  {sourceMatches.map((src, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={src.id}
                        onClick={() => {
                          onSelectSource(src);
                          onClose();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                          isSelected
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`w-4 h-4 ${isSelected ? "text-white" : "text-zinc-500"}`} />
                          <div>
                            <div className="text-sm font-medium">{src.title}</div>
                            <div className="text-[11px] text-zinc-500">
                              {src.format} • {src.size} • {src.category}
                            </div>
                          </div>
                        </div>
                        {isSelected && <ArrowRight className="w-4 h-4 text-zinc-400" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Commands Segment */}
              {commandMatches.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-bold tracking-widest text-zinc-500 uppercase">
                    Commands & Shortcuts
                  </div>
                  {commandMatches.map((cmd, idx) => {
                    const globalIdx = sourceMatches.length + idx;
                    const isSelected = globalIdx === selectedIndex;
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          cmd.action();
                          onClose();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                          isSelected
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-zinc-500"}`} />
                          <div>
                            <div className="text-sm font-medium">{cmd.title}</div>
                            <div className="text-xs text-zinc-500">{cmd.desc}</div>
                          </div>
                        </div>
                        {isSelected && <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">Enter</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-zinc-950 border-t border-zinc-900 px-4 py-2 flex justify-between items-center text-[11px] text-zinc-500">
          <div className="flex gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
          <span className="font-mono text-[10px]">Mythrix OS v1.0</span>
        </div>
      </div>
    </div>
  );
}
