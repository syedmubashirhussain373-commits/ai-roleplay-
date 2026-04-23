import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, History, User, ShieldCheck } from 'lucide-react';
import { CharacterSheet } from '../constants';

interface Props {
  onComplete: (sheet: CharacterSheet) => void;
}

export default function CharacterCreation({ onComplete }: Props) {
  const [sheet, setSheet] = useState<CharacterSheet>({
    name: '',
    socialStatus: 'Initiate',
    lifeHistory: '',
    spark: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sheet.name && sheet.lifeHistory && sheet.spark) {
      onComplete(sheet);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 aether-card"
    >
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 font-mono tracking-tighter">ZENITH REGISTRY</h1>
        <p className="text-slate-400">Initialize your Aetheric Signature to enter the Academy.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-mono text-aether-glow mb-2">
            <User size={16} /> DESIGNATION
          </label>
          <input 
            type="text"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-aether-glow transition-colors"
            placeholder="Identity name..."
            value={sheet.name}
            onChange={e => setSheet({...sheet, name: e.target.value})}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-mono text-aether-glow mb-2">
            <ShieldCheck size={16} /> SOCIAL STATUS
          </label>
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-aether-glow transition-colors"
            value={sheet.socialStatus}
            onChange={e => setSheet({...sheet, socialStatus: e.target.value})}
          >
            <option className="bg-obsidian">Initiate</option>
            <option className="bg-obsidian">Praetor-Caste</option>
            <option className="bg-obsidian">House Scion</option>
            <option className="bg-obsidian">The Null (Unsanctioned)</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-mono text-aether-glow mb-2">
            <History size={16} /> LIFE HISTORY
          </label>
          <textarea 
            required
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-aether-glow transition-colors resize-none"
            placeholder="Origin story and previous affiliations..."
            value={sheet.lifeHistory}
            onChange={e => setSheet({...sheet, lifeHistory: e.target.value})}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-mono text-aether-glow mb-2">
            <Sparkles size={16} /> THE SPARK (POWER TYPE)
          </label>
          <textarea 
            required
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-aether-glow transition-colors resize-none"
            placeholder="Describe your unique aetheric manipulation..."
            value={sheet.spark}
            onChange={e => setSheet({...sheet, spark: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-aether-glow text-obsidian font-bold py-4 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
        >
          INITIALIZE CHRONICLE
        </button>
      </form>
    </motion.div>
  );
}
