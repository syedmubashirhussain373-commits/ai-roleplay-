import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Terminal, Loader2, Play } from 'lucide-react';
import { CharacterSheet, GameMessage, INITIAL_LORE, LoreEntry } from './types';
import CharacterCreator from './components/CharacterCreator';
import Sidebar from './components/Sidebar';

export default function App() {
  const [character, setCharacter] = useState<CharacterSheet | null>(null);
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [lore, setLore] = useState<LoreEntry[]>(INITIAL_LORE);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStartGame = (sheet: CharacterSheet) => {
    setCharacter(sheet);
    setMessages([{ 
      role: 'system', 
      content: `INITIALIZING CHRONICLE for ${sheet.name.toUpperCase()}... DEPLOYMENT TO ${sheet.location.toUpperCase()} CONFIRMED.` 
    }]);
    setIsGameStarted(true);
    sendAction("Initialize Cold Open as per protocol.", sheet);
  };

  const sendAction = async (action: string, contextSheet?: CharacterSheet) => {
    if (isLoading) return;
    setIsLoading(true);

    const userMessage: GameMessage = { role: 'user', content: action };
    const currentMessages = contextSheet ? [] : [...messages, userMessage];
    
    if (!contextSheet) setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: currentMessages.filter(m => m.role !== 'system'),
          character: contextSheet || character 
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      
      // Dynamic Lore Logic: Check if model mentioned a keyword
      updateLore(data.content);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'system', content: "ERROR: FLUX DISRUPTION AT THE COGNITIVE CORE." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLore = (responseText: string) => {
    setLore(prev => prev.map(entry => {
      if (!entry.discovered && responseText.toLowerCase().includes(entry.title.toLowerCase())) {
        return { ...entry, discovered: true };
      }
      return entry;
    }));
  };

  if (!character) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center relative overflow-hidden">
        {/* Landing Background Effects */}
        <div className="absolute inset-0 bg-radial-at-t from-aether-glow/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-aether-glow/20 to-transparent absolute top-1/4" />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-aether-glow/20 to-transparent absolute bottom-1/4" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10 space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-6xl font-mono font-bold text-white tracking-widest uppercase">
              Aethelgard
            </h1>
            <p className="text-copper font-mono text-sm tracking-[0.5em] uppercase">Omni-Chronicler Engine</p>
          </div>
          
          <button 
            onClick={() => setIsGameStarted(true)} // This triggers the creator
            className="group relative px-12 py-4 bg-transparent border border-aether-glow text-aether-glow font-mono font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-aether-glow hover:text-obsidian"
          >
            <div className="absolute inset-0 bg-aether-glow/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative flex items-center gap-2"><Play size={16}/> Begin Your Legend</span>
          </button>
        </motion.div>

        <AnimatePresence>
          {isGameStarted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <CharacterCreator onComplete={handleStartGame} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-obsidian overflow-hidden">
      {/* Sidebar - Dashboard */}
      <Sidebar character={character} lore={lore} />

      {/* Main Game Interface */}
      <main className="flex-1 flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]">
        <div className="absolute inset-0 bg-obsidian/90 pointer-events-none" />
        
        {/* Terminal Header */}
        <header className="relative z-10 p-4 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-aether-glow animate-pulse" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Aethel-OS // Transmission Link Stable</span>
          </div>
          <div className="text-[10px] font-mono text-copper uppercase tracking-widest">
            Loc: {character.location}
          </div>
        </header>

        {/* Narrative Log */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar scroll-smooth"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`
                    max-w-[85%] p-6 rounded-2xl font-sans leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-aether-glow/5 border border-aether-glow/20 text-white rounded-br-none' 
                      : msg.role === 'system'
                      ? 'bg-mana-ozone/5 border border-mana-ozone/20 text-mana-ozone font-mono text-xs rounded-none'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none shadow-xl'
                    }
                  `}>
                    {msg.content.split('\n').map((line, linI) => (
                      <p key={linI} className={line.trim() === '' ? 'h-4' : 'mb-2'}>{line}</p>
                    ))}
                  </div>
                  <span className="text-[8px] font-mono text-slate-600 mt-2 uppercase tracking-tighter">
                    {msg.role === 'assistant' ? 'OMNI-CHRONICLER :: INCOMING' : msg.role.toUpperCase()}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 text-aether-glow font-mono text-xs items-center">
                <Loader2 className="animate-spin" size={14} /> ANALYZING AETHERIC RESONANCE...
              </motion.div>
            )}
          </div>
        </div>

        {/* Action Input */}
        <footer className="relative z-10 p-8 border-t border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-aether-glow/20 to-copper/20 rounded-xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000" />
            <div className="relative flex items-center bg-obsidian border border-white/10 rounded-xl p-2 gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && input.trim() && (sendAction(input), setInput(''))}
                placeholder="Commit an action to the timeline..."
                className="flex-1 bg-transparent border-none outline-none text-white p-3 font-sans text-sm"
              />
              <button 
                onClick={() => input.trim() && (sendAction(input), setInput(''))}
                disabled={isLoading}
                className="p-3 bg-aether-glow text-obsidian rounded-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
