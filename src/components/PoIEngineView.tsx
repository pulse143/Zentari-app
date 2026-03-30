import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Target, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Calculator,
  Layers,
  TrendingUp,
  History,
  Lock,
  Scale,
  Database,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

const ScoringVariable = ({ label, value, weight, icon: Icon, color }: any) => (
  <div className="p-4 border border-brand-border rounded-2xl bg-white/[0.02] space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className={cn("w-4 h-4", color)} />
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-[10px] font-mono font-bold text-brand-muted">w = {weight}</span>
    </div>
    <div className="flex items-end justify-between">
      <div className="text-2xl font-bold font-mono">{value.toFixed(2)}</div>
      <div className="text-[10px] font-mono text-brand-muted">/ 1.00</div>
    </div>
    <div className="h-1 bg-brand-border rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value * 100}%` }}
        className={cn("h-full", color.replace('text-', 'bg-'))} 
      />
    </div>
  </div>
);

const TrustTierCard = ({ tier, range, release, active }: any) => (
  <div className={cn(
    "p-4 border rounded-2xl transition-all",
    active ? "border-brand-accent bg-brand-accent/5 shadow-[0_0_20px_rgba(0,255,0,0.1)]" : "border-brand-border bg-white/[0.01]"
  )}>
    <div className="flex items-center justify-between mb-2">
      <h4 className={cn("text-xs font-bold uppercase tracking-widest", active ? "text-brand-accent" : "text-brand-muted")}>
        {tier}
      </h4>
      <span className="text-[10px] font-mono">{range}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-brand-muted">Funding Release</span>
      <span className={cn("text-xs font-bold", active ? "text-brand-accent" : "text-brand-paper")}>{release}%</span>
    </div>
  </div>
);

export const PoIEngineView = () => {
  const [v, setV] = useState(0.95);
  const [p, setP] = useState(0.80);
  const [e, setE] = useState(0.70);
  const [w, setW] = useState(1.10);
  const [b, setB] = useState(1.00);
  
  const baseScore = (v * 0.6) + (p * 0.3) + (e * 0.1);
  const finalScore = Math.min(1.0, baseScore * w * b);

  const getTier = (s: number) => {
    if (s >= 0.90) return 'Platinum';
    if (s >= 0.75) return 'Gold';
    if (s >= 0.50) return 'Silver';
    if (s >= 0.30) return 'Bronze';
    return 'Flagged';
  };

  const activeTier = getTier(finalScore);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">PoI Scoring Engine</h2>
          <p className="text-brand-muted text-sm mt-1">Proof of Impact: Mathematical Trust Synthesis</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Calculator className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Formula: S = (Vw + Pw + Ew) * W * B</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Inputs & Calculation */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScoringVariable label="Verification (V)" value={v} weight={0.6} icon={Shield} color="text-brand-accent" />
            <ScoringVariable label="PAS Score (P)" value={p} weight={0.3} icon={History} color="text-blue-500" />
            <ScoringVariable label="Engagement (E)" value={e} weight={0.1} icon={TrendingUp} color="text-purple-500" />
          </div>

          <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-6 flex-1">
                <h3 className="text-xl font-bold">Multipliers & Boosts</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span>Policy Weight (W)</span>
                      <span className="text-brand-accent">x{w.toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="1.5" step="0.05" value={w} 
                      onChange={(e) => setW(parseFloat(e.target.value))}
                      className="w-full accent-brand-accent bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span>Boosting Factor (B)</span>
                      <span className="text-brand-accent">x{b.toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" min="1.0" max="2.0" step="0.1" value={b} 
                      onChange={(e) => setB(parseFloat(e.target.value))}
                      className="w-full accent-brand-accent bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 p-8 border border-brand-accent/20 bg-brand-accent/5 rounded-[2rem] min-w-[240px]">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted">Final PoI Score</span>
                <motion.div 
                  key={finalScore}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-bold font-mono text-brand-accent"
                >
                  {finalScore.toFixed(3)}
                </motion.div>
                <div className="px-4 py-1 bg-brand-accent text-brand-ink text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {activeTier} Tier
                </div>
              </div>
            </div>
          </div>

          {/* Anti-Gaming & Lifecycle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="p-6 border border-brand-border rounded-3xl bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-brand-muted" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Anti-Gaming Mechanisms</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Sybil Resistance', desc: 'PoI scores tied to K-ID with mandatory staking.', icon: Lock },
                  { title: 'Outlier Detection', desc: 'Peer variance penalty for abnormal verification scores.', icon: Target },
                  { title: 'Collusion Detection', desc: 'Cross-node GPS/Timestamp correlation analysis.', icon: Search }
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="p-2 bg-white/5 rounded-lg h-fit">
                      <item.icon className="w-4 h-4 text-brand-muted" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-brand-paper">{item.title}</h4>
                      <p className="text-[10px] text-brand-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-6 border border-brand-border rounded-3xl bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-5 h-5 text-brand-muted" />
                <h3 className="text-sm font-bold uppercase tracking-widest">PoI Lifecycle</h3>
              </div>
              <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-brand-border">
                {[
                  'Submission of multi-modal evidence',
                  'AVE Verification (V-Score generation)',
                  'Contextual Synthesis (PAS & Engagement)',
                  'PoI Scoring & Tier Mapping',
                  'Treasury Settlement & Funding Release'
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 pl-6 relative">
                    <div className="absolute left-0 w-4 h-4 bg-brand-ink border border-brand-border rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                    </div>
                    <span className="text-[10px] text-brand-muted leading-tight">{step}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Tiers & Live Feed */}
        <div className="col-span-12 xl:col-span-4 space-y-8">
          <section className="p-6 border border-brand-border rounded-3xl bg-white/[0.01]">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Trust Tiers</h3>
            <div className="space-y-4">
              <TrustTierCard tier="Platinum" range="0.90 - 1.00" release={100} active={activeTier === 'Platinum'} />
              <TrustTierCard tier="Gold" range="0.75 - 0.89" release={90} active={activeTier === 'Gold'} />
              <TrustTierCard tier="Silver" range="0.50 - 0.74" release={70} active={activeTier === 'Silver'} />
              <TrustTierCard tier="Bronze" range="0.30 - 0.49" release={40} active={activeTier === 'Bronze'} />
              <TrustTierCard tier="Flagged" range="< 0.30" release={0} active={activeTier === 'Flagged'} />
            </div>
          </section>

          <section className="p-6 border border-brand-border rounded-3xl bg-white/[0.01]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest">Example Record</h3>
              <Database className="w-4 h-4 text-brand-muted" />
            </div>
            <div className="p-4 bg-brand-ink/80 border border-brand-border rounded-xl font-mono text-[10px] leading-relaxed">
              <pre className="text-brand-paper/60">
{`{
  "nodeId": "NODE_04",
  "vScore": ${v.toFixed(2)},
  "pasScore": ${p.toFixed(2)},
  "eScore": ${e.toFixed(2)},
  "multiplier": ${w.toFixed(2)},
  "poiScore": ${finalScore.toFixed(3)},
  "tier": "${activeTier.toUpperCase()}",
  "status": "settled"
}`}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
