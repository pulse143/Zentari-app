import React from 'react';
import { ShieldCheck, Lock, Zap, Cpu, Globe, Database, Network, Activity } from 'lucide-react';

const SecurityNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const ProtocolSecurityView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Protocol Security</h2>
      <p className="text-brand-muted text-lg">The multi-layered security of Zentari.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <SecurityNode icon={ShieldCheck} title="Audits" desc="Continuous security audits of the protocol and smart contracts." />
      <SecurityNode icon={Lock} title="Encryption" desc="End-to-end encryption of evidence metadata and sensor data." />
      <SecurityNode icon={Zap} title="Slashing" desc="Automated slashing of malicious nodes and staked capital." />
      <SecurityNode icon={Cpu} title="Formal Verification" desc="Formally verified smart contracts for impact funding." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <ShieldCheck className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Security Monitoring Terminal Loading...</p>
      </div>
    </div>
  </div>
);
