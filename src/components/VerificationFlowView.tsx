import React from 'react';
import { ShieldCheck, Zap, Cpu, Globe, Database, Network, Activity, Brain } from 'lucide-react';

const FlowNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const VerificationFlowView = () => (
  <div className="space-y-8 md:space-y-12">
    <div className="space-y-2 md:space-y-3">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Verification Flow</h2>
      <p className="text-brand-muted text-base md:text-lg">The end-to-end process of impact verification.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      <FlowNode icon={Globe} title="Evidence Capture" desc="Mobile nodes capture PoI with GPS, camera, and sensor metadata." />
      <FlowNode icon={Brain} title="AI Verification" desc="Forensic agents analyze evidence and cross-reference with satellite data." />
      <FlowNode icon={Network} title="Node Consensus" desc="Validators reach consensus on the AI's trust signal." />
      <FlowNode icon={Database} title="Ledger Commit" desc="Verified PoI is committed to the immutable impact ledger." />
    </div>
    <div className="p-10 md:p-20 border border-brand-border rounded-3xl md:rounded-[3rem] bg-white/[0.01] flex items-center justify-center min-h-[300px] md:min-h-[400px]">
      <div className="text-center space-y-4 md:space-y-6">
        <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-4">Interactive Verification Flow Chart Loading...</p>
      </div>
    </div>
  </div>
);
