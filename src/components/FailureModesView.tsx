import React from 'react';
import { AlertCircle, ShieldAlert, Gavel, Briefcase, MapPin, LineChart, PieChart, Activity } from 'lucide-react';

const FailureNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center text-rose-400">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const FailureModesView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Failure Modes</h2>
      <p className="text-brand-muted text-lg">Systemic risks and forensic analysis of the protocol.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <FailureNode icon={ShieldAlert} title="Fraud Alert" desc="Duplicate image farms and sensor spoofing detected via AI." />
      <FailureNode icon={AlertCircle} title="Node Collusion" desc="Validators attempting to manipulate trust scores for profit." />
      <FailureNode icon={Gavel} title="Forensic Slashing" desc="Automated slashing of node reputation and staked capital." />
      <FailureNode icon={Briefcase} title="Systemic Risk" desc="Protocol-level analysis of systemic vulnerabilities and threats." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <ShieldAlert className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Interactive Failure Mode Analysis Loading...</p>
      </div>
    </div>
  </div>
);
