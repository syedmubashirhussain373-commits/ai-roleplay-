import React from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Heart, Shield, Award } from 'lucide-react';
import { CharacterSheet, LoreEntry } from '../types';

interface Props {
  character: CharacterSheet;
  lore: LoreEntry[];
}

export default function Sidebar({ character, lore }: Props) {
  const { attributes } = character;
  
  return (
    <aside className="w-80 h-full border-r border-white/10 flex flex-col bg-obsidian text-slate-400 overflow-hidden">
      {/* Stats Section */}
      <div className="p-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
        <div>
          <h3 className="text-[10px] font-mono text-copper uppercase tracking-[0.2em] mb-4">Vitals Summary</h3>
          <div className="space-y-4">
            <StatBar 
              label="Integrity" 
              value={attributes.health} 
              max={attributes.maxHealth} 
              icon={<Heart size={14}/>} 
              color="bg-rose-500"
            />
            <StatBar 
              label="Aetheric Strain" 
              value={attributes.strain} 
              max={attributes.maxStrain} 
              icon={<Zap size={14}/>} 
              color="bg-aether-glow"
              reverse
            />
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-tighter text-slate-300">
                <Shield size={14} className="text-copper"/> Social Standing
              </span>
              <span className="text-white font-bold">{attributes.standing}</span>
            </div>
          </div>
        </div>

        {/* Character Info */}
        <div>
          <h3 className="text-[10px] font-mono text-copper uppercase tracking-[0.2em] mb-4">Deployment Log</h3>
          <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
            <div className="text-[10px] font-mono text-slate-500">RESIDENT: {character.name.toUpperCase()}</div>
            <div className="text-[10px] font-mono text-slate-500">CASTE: {character.lineage.toUpperCase()}</div>
            <div className="text-[10px] font-mono text-slate-500">BIO-AGE: {character.age} SOLAR CYCLES</div>
          </div>
        </div>

        {/* Lore Codex */}
        <div>
          <h3 className="text-[10px] font-mono text-copper uppercase tracking-[0.2em] mb-4">Aetheric Codex</h3>
          <div className="space-y-3">
            {lore.map(entry => (
              <motion.div 
                key={entry.id}
                layout
                className={`p-3 rounded-lg border transition-all ${entry.discovered ? 'bg-white/5 border-white/10 cursor-pointer hover:bg-white/10' : 'bg-black/20 border-white/5 grayscale opacity-50 select-none'}`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Award size={12} className={entry.discovered ? 'text-aether-glow' : 'text-slate-500'}/> {entry.title}
                </div>
                {entry.discovered && (
                  <p className="mt-2 text-[10px] leading-relaxed text-slate-400 font-mono">
                    {entry.content}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-white/5 text-center">
        <div className="text-[8px] font-mono text-slate-600 tracking-widest uppercase">
          V1.0.4 - OMNI-CHRONICLER ENGINE
        </div>
      </div>
    </aside>
  );
}

function StatBar({ label, value, max, icon, color, reverse = false }: any) {
  const percentage = (value / max) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-tighter">
        <span className="flex items-center gap-1.5 text-slate-300">{icon} {label}</span>
        <span className={reverse && percentage > 70 ? 'text-mana-ozone font-bold' : 'text-slate-300'}>{value} / {max}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
        />
      </div>
    </div>
  );
}
