import React from 'react';
import { Box, Network, Database, ShieldCheck, Zap, Cpu, Globe, Share2 } from 'lucide-react';

const TechNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const SystemArchitectureView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">System Architecture</h2>
      <p className="text-brand-muted text-lg">The multi-layered trust stack of Zentari.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <TechNode icon={Globe} title="Physical Layer" desc="IoT sensors, satellite constellations, and ground-truth mobile nodes." />
      <TechNode icon={Cpu} title="AI Verification" desc="Gemini-powered forensic agents analyzing multimodal evidence in real-time." />
      <TechNode icon={Database} title="Impact Ledger" desc="Immutable record of Proof of Impact (PoI) and funding tranches." />
      <TechNode icon={Share2} title="Liquidity Layer" desc="Automated VU minting and capital allocation via smart contracts." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Network className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Interactive Architecture Map Loading...</p>
      </div>
    </div>
  </div>
);
