import React from 'react';
import { Lock, ShieldCheck, Zap, Cpu, Globe, Database, Network, Activity } from 'lucide-react';

const MoatNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const StrategicMoatView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Strategic Moat</h2>
      <p className="text-brand-muted text-lg">The long-term defensibility of the Zentari protocol.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <MoatNode icon={Lock} title="Data Network" desc="The largest immutable dataset of verified impact and forensic evidence." />
      <MoatNode icon={ShieldCheck} title="Trust Graph" desc="A proprietary network of high-trust nodes and reputation scores." />
      <MoatNode icon={Zap} title="AI Advantage" desc="Forensic agents trained on years of verified and fraudulent data." />
      <MoatNode icon={Globe} title="Global Reach" desc="Unmatched physical presence across diverse impact geographies." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Lock className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Strategic Moat Analysis Loading...</p>
      </div>
    </div>
  </div>
);
