import React from 'react';
import { Brain, Zap, Cpu, ShieldCheck, Activity, Globe, Database, Network } from 'lucide-react';

const AgentNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const AIAgentLogicView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">AI Agent Logic</h2>
      <p className="text-brand-muted text-lg">The forensic intelligence powering the Zentari protocol.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <AgentNode icon={Brain} title="Forensic Agent" desc="Analyzes multimodal evidence to detect fraud and verify impact." />
      <AgentNode icon={Zap} title="Predictive Agent" desc="Suggests optimal capital allocation tranches based on trust scores." />
      <AgentNode icon={ShieldCheck} title="Audit Agent" desc="Continuously audits the protocol for systemic risks and node collusion." />
      <AgentNode icon={Activity} title="Impact Agent" desc="Quantifies real-world impact metrics from verified PoI records." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Brain className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Agent Logic Flow Visualization Loading...</p>
      </div>
    </div>
  </div>
);
