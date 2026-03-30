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
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Proof of Impact (PoI)</h2>
      <p className="text-brand-muted text-lg">The core unit of trust in the KulimaVerse protocol.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <PoINode icon={Binary} title="PoI Record" desc="The core unit of impact, containing evidence, metadata, and trust scores." />
      <PoINode icon={ShieldCheck} title="Trust Score" desc="Dynamic reputation metrics for nodes, projects, and validators." />
      <PoINode icon={Zap} title="Funding Tranche" desc="Smart contract-controlled tranches released upon PoI verification." />
      <PoINode icon={Database} title="Impact Ledger" desc="The immutable history of all impact events and capital flows." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Binary className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Interactive PoI Record Explorer Loading...</p>
      </div>
    </div>
  </div>
);
