import React from 'react';
import { Gavel, Users, ShieldCheck, Zap, Cpu, Globe, Database, Network } from 'lucide-react';

const GovernanceNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const ProtocolGovernanceView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Protocol Governance</h2>
      <p className="text-brand-muted text-lg">The decentralized decision-making of Zentari.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <GovernanceNode icon={Gavel} title="Proposals" desc="Community-driven proposals for protocol upgrades and funding." />
      <GovernanceNode icon={Users} title="Voting" desc="Weighted voting based on reputation and VU token holdings." />
      <GovernanceNode icon={ShieldCheck} title="Council" desc="A rotating council of high-trust nodes and impact experts." />
      <GovernanceNode icon={Zap} title="Execution" desc="Automated execution of approved proposals via smart contracts." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Gavel className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Governance Dashboard Loading...</p>
      </div>
    </div>
  </div>
);
