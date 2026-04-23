import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Scroll, Shield, MapPin, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { CharacterSheet } from '../types';

interface Props {
  onComplete: (sheet: CharacterSheet) => void;
}

export default function CharacterCreator({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [sheet, setSheet] = useState<Partial<CharacterSheet>>({
    lineage: 'Commoner',
    location: 'The Academy',
    attributes: {
      health: 100,
      maxHealth: 100,
      strain: 0,
      maxStrain: 50,
      standing: 10
    }
  });

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if (sheet.name && sheet.age && sheet.spark && sheet.location) {
      onComplete(sheet as CharacterSheet);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full aether-card overflow-hidden"
      >
        {/* Parchment-style Header */}
        <div className="bg-gradient-to-b from-copper/20 to-transparent p-8 border-b border-white/10">
          <h2 className="text-3xl font-mono text-white tracking-widest text-center uppercase">Initial Signature</h2>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 w-8 rounded-full ${step >= i ? 'bg-aether-glow' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-mono text-copper uppercase tracking-widest"><User size={14}/> Designation</label>
                  <input 
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-aether-glow transition-all"
                    placeholder="Enter name..."
                    onChange={e => setSheet({...sheet, name: e.target.value})}
                  />
                  <label className="flex items-center gap-2 text-xs font-mono text-copper uppercase tracking-widest"><Scroll size={14}/> Age</label>
                  <input 
                    type="number"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-aether-glow transition-all"
                    placeholder="Enter age..."
                    onChange={e => setSheet({...sheet, age: parseInt(e.target.value)})}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-mono text-copper uppercase tracking-widest"><Shield size={14}/> Family Lineage</label>
                  <div className="grid grid-cols-1 gap-3">
                    {(['Noble', 'Commoner', 'Outcast'] as const).map(l => (
                      <button 
                        key={l}
                        onClick={() => setSheet({...sheet, lineage: l})}
                        className={`p-4 rounded-lg border text-left transition-all ${sheet.lineage === l ? 'bg-aether-glow/10 border-aether-glow text-aether-glow' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-mono text-copper uppercase tracking-widest"><Sparkles size={14}/> The Spark (Power Description)</label>
                  <textarea 
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-aether-glow transition-all resize-none"
                    placeholder="Describe your aetheric manipulation capabilities at a molecular level..."
                    onChange={e => setSheet({...sheet, spark: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-mono text-copper uppercase tracking-widest"><MapPin size={14}/> Deployment Location</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-aether-glow transition-all"
                    onChange={e => setSheet({...sheet, location: e.target.value})}
                  >
                    <option value="The Academy">The Academy (Aero-Static rotating fortress)</option>
                    <option value="The Demon Wastes">The Demon Wastes (ATP-depleted rust desert)</option>
                    <option value="The High Court">The High Court (House concentration zone)</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4 mt-12">
            {step > 1 && (
              <button 
                onClick={prev}
                className="flex-1 flex items-center justify-center gap-2 p-4 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-all font-mono text-sm uppercase"
              >
                <ChevronLeft size={16}/> Previous
              </button>
            )}
            <button 
              onClick={step === 4 ? handleSubmit : next}
              className="flex-[2] flex items-center justify-center gap-2 p-4 rounded-lg bg-aether-glow text-obsidian hover:scale-[1.02] active:scale-[0.98] transition-all font-mono font-bold text-sm uppercase shadow-[0_0_20px_rgba(0,242,255,0.2)]"
            >
              {step === 4 ? 'Initialize Chronicle' : 'Next Resonance'} <ChevronRight size={16}/>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
