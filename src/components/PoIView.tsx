import React from 'react';
import { Binary, ShieldCheck, Zap, Cpu, Globe, Database, Network, Activity } from 'lucide-react';

const PoINode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const PoIView = () => (
  <div className="space-y-8 md:space-y-12">
    <div className="space-y-2 md:space-y-3">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Proof of Impact (PoI)</h2>
      <p className="text-brand-muted text-base md:text-lg">The core unit of trust in the Zentari protocol.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      <PoINode icon={Binary} title="PoI Record" desc="The core unit of impact, containing evidence, metadata, and trust scores." />
      <PoINode icon={ShieldCheck} title="Trust Score" desc="Dynamic reputation metrics for nodes, projects, and validators." />
      <PoINode icon={Zap} title="Funding Tranche" desc="Smart contract-controlled tranches released upon PoI verification." />
      <PoINode icon={Database} title="Impact Ledger" desc="The immutable history of all impact events and capital flows." />
    </div>
    <div className="p-10 md:p-20 border border-brand-border rounded-3xl md:rounded-[3rem] bg-white/[0.01] flex items-center justify-center min-h-[300px] md:min-h-[400px]">
      <div className="text-center space-y-4 md:space-y-6">
        <Binary className="w-12 h-12 md:w-16 md:h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-4">Interactive PoI Record Explorer Loading...</p>
      </div>
    </div>
  </div>
);
