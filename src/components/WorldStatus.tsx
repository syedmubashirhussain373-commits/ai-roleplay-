import React from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Shield, Globe } from 'lucide-react';

interface Props {
  fluxLevel: number;
  manaOzone: number;
  biome: string;
}

export default function WorldStatus({ fluxLevel, manaOzone, biome }: Props) {
  const getStatusColor = (val: number) => {
    if (val < 30) return 'text-emerald-400';
    if (val < 70) return 'text-yellow-400';
    return 'text-mana-ozone underline decoration-mana-ozone animate-pulse';
  };

  return (
    <div className="w-80 h-full border-r border-white/10 p-6 space-y-8 flex flex-col bg-obsidian/50">
      <div>
        <h2 className="text-xs font-mono text-slate-500 mb-4 tracking-widest uppercase">World Metrics</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="flex items-center gap-2"><Zap size={14} className="text-aether-glow" /> Ambient Flux</span>
              <span className={getStatusColor(fluxLevel)}>{fluxLevel}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${fluxLevel}%` }}
                className="h-full bg-aether-glow shadow-[0_0_10px_#00f2ff]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="flex items-center gap-2"><Activity size={14} className="text-mana-ozone" /> Mana-Ozone</span>
              <span className={getStatusColor(manaOzone)}>{manaOzone} ppm</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${manaOzone}%` }}
                className="h-full bg-mana-ozone shadow-[0_0_10px_#ff5e00]"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-mono text-slate-500 mb-4 tracking-widest uppercase">Location Data</h2>
        <div className="aether-card p-4 border-l-2 border-l-aether-glow">
          <div className="flex items-center gap-2 text-white font-medium mb-1">
            <Globe size={16} className="text-aether-glow" /> {biome}
          </div>
          <p className="text-xs text-slate-400">Scan intensity: High</p>
        </div>
      </div>

      <div className="mt-auto">
        <h2 className="text-xs font-mono text-slate-500 mb-4 tracking-widest uppercase">Houses Standing</h2>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className="p-2 border border-white/5 rounded bg-white/5">VALERION: +12</div>
          <div className="p-2 border border-white/5 rounded bg-white/5">SOLARI: 0</div>
          <div className="p-2 border border-white/5 rounded bg-white/5">THALASSIC: -5</div>
          <div className="p-2 border border-white/5 rounded bg-white/5 text-mana-ozone">IGNIS: +45</div>
        </div>
      </div>
    </div>
  );
}
