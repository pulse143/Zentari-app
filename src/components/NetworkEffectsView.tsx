import React from 'react';
import { Share2, Globe, Network, Activity, Zap, Cpu, ShieldCheck, Database } from 'lucide-react';

const NetworkNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const NetworkEffectsView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Network Effects</h2>
      <p className="text-brand-muted text-lg">The viral growth and ecosystem dynamics of Zentari.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <NetworkNode icon={Share2} title="Node Growth" desc="Exponential growth of the validator and evidence-capture network." />
      <NetworkNode icon={Globe} title="Global Impact" desc="Viral adoption across diverse geographies and impact sectors." />
      <NetworkNode icon={Activity} title="Trust Velocity" desc="Increasing speed of verification and trust-score convergence." />
      <NetworkNode icon={Zap} title="Capital Flow" desc="The flywheel effect of verified impact driving more capital." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Share2 className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Network Effect Visualization Loading...</p>
      </div>
    </div>
  </div>
);
